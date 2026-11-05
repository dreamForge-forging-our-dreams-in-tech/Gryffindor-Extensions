let urls = [
    'https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/Extension%20builder/extension_builder.js'
];
let i;

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

(async function () {
    for (i of urls) {
        try {
            await loadScript(i);

            if (Scratch.vm.runtime === 'undefined') { // inject the scratch vm if ran from a IDE
                console.warn('Injecting Scratch VM')
                await loadScript('https://unpkg.com/scratch-vm/dist/web/scratch-vm.js');
            }
        } catch (err) {
            console.error("Failed to load remote extension script:", err);
        }
    }
})();