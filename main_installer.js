let urls = [
    'https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/filepicker/filepicker.js'
];

function loadScript(url) {
    return new Promise((resolve, reject) => {
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
            register: extension => extensionManager._registerInternalExtension(extension)
        }
    };
    window.scratchRuntimeIsStandalone = true;

    return window.Scratch;
}

window.scratchRuntimeReady = createScratchRuntime();
window.mainInstallerReady = window.scratchRuntimeReady.then(async Scratch => {
    if (window.scratchRuntimeIsStandalone) {
        return Scratch;
    }

    for (const url of urls) {
        await loadScript(url);
    }
    return Scratch;
});