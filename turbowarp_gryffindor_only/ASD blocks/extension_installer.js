(async function () {
    const remoteVersionUrl = "https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/turbowarp_gryffindor_only/ASD%20blocks/ASD.js";

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