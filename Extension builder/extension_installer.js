(async function () {
    const remoteVersionUrl = "https://dreamforge-forging-our-dreams-in-tech.github.io/Gryffindor-Extensions/Extension%20builder/extension_builder.js";

    try {
        const response = await fetch(remoteVersionUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const latestCode = await response.text();

        console.log(latestCode)
        // Pass the native global Scratch object into the runtime module
        const dynamicModule = new Function('Scratch', latestCode);
        dynamicModule(Scratch);
    } catch (err) {
        console.error("Failed to load remote extension script:", err);
    }
})();