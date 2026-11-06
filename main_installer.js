const installedExtensions = new Map(); // store all isntaleld extensions here

let urls = [
    'https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/filepicker/filepicker.js'
];

async function getClassNameFromUrl(url) {
    const response = await fetch(url);
    const code = await response.text();

    // Matches "class ClassName" or "class ClassName extends..."
    const match = code.match(/\bclass\s+([A-Za-z_$][A-Za-z0-9_$]*)/);

    return match ? match[1] : null;
}


function loadScript(url) {
    return new Promise(async (resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}

async function createScratchRuntime() {
    if (window.Scratch?.vm?.runtime) {
        window.scratchRuntimeIsStandalone = false;
        return window.Scratch;
    }

    if (typeof window.VirtualMachine !== 'function') {
        console.warn('Loading Scratch VM');
        await loadScript('https://unpkg.com/scratch-vm/dist/web/scratch-vm.js');
    }

    if (typeof window.VirtualMachine !== 'function') {
        throw new Error('The scratch-vm package loaded without exposing its VirtualMachine constructor.');
    }

    const vm = new window.VirtualMachine();
    const extensionManager = vm.extensionManager;
    if (!vm.runtime || typeof extensionManager?._registerInternalExtension !== 'function') {
        throw new Error('The Scratch VM did not initialize a runtime with internal extension registration.');
    }

    window.Lucy = {} // initliaze the lucy object from which youll be calling the functions in standard IDE's

    window.Scratch = {
        vm,
        Cast: { toString: value => String(value) },
        BlockType: {
            BOOLEAN: 'Boolean',
            BUTTON: 'button',
            COMMAND: 'command',
            CONDITIONAL: 'conditional',
            EVENT: 'event',
            HAT: 'hat',
            LOOP: 'loop',
            REPORTER: 'reporter'
        },
        ArgumentType: {
            ANGLE: 'angle',
            BOOLEAN: 'Boolean',
            COLOR: 'color',
            NUMBER: 'number',
            STRING: 'string',
            MATRIX: 'matrix',
            NOTE: 'note',
            IMAGE: 'image'
        },
        extensions: {
            register: extension => {
                const info = extension.getInfo();
                const serviceName = extensionManager._registerInternalExtension(extension);
                installedExtensions.set(info.id, {
                    id: info.id,
                    name: info.name,
                    serviceName,
                    instance: extension
                });

                let constructor = extension.constructor
                window.Lucy[info.id] = new constructor(window.Scratch.vm.runtime);
                return serviceName;
            },
            getAll: () => [...installedExtensions.values()]
        }
    };
    window.scratchRuntimeIsStandalone = true;

    return window.Scratch;
}

window.scratchRuntimeReady = createScratchRuntime();
window.mainInstallerReady = window.scratchRuntimeReady.then(async Scratch => {
    for (const url of urls) {
        await loadScript(url);
    }
    return Scratch;
});