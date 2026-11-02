(async function () {
    const remoteVersionUrl = "https://dreamforge-forging-our-dreams-in-tech.github.io/Gryffindor-Extensions/Debugging%20tools/debugging_tools.js";

    try {
        const response = await fetch(remoteVersionUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const latestCode = await response.text();

        // Pass the native global Scratch object into the runtime module
        const dynamicModule = new Function('Scratch', latestCode);
        dynamicModule(Scratch);
    } catch (err) {
        console.error("Failed to load remote extension script:", err);
    }
})();