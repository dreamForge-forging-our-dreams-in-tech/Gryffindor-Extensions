class filepicker {
    constructor(runtime = {}) {
        this.runtime = runtime;



    }

    getInfo() {
        return {
            id: Scratch.Cast.toString(`filepicker`),
            name: Scratch.Cast.toString(`filepicker`),
            blocks: [
                {
                    opcode: Scratch.Cast.toString(`select_file`),
                    blockType: Scratch.BlockType.COMMAND,
                },

            ],

        }
    }


    async select_file(args, util) {
        try { new Function('a', `return (multiple = false, accept = '*') {   return new Promise((resolve, reject) => {     // 1. Create a hidden file input element     const input = document.createElement('input');     input.type = 'file';     input.multiple = multiple;     input.accept = accept;      // 2. Listen for when the user selects a file     input.onchange = (event) => {       const files = event.target.files;       if (files.length > 0) {         resolve(multiple ? Array.from(files) : files[0]);       } else {         reject(new Error('No file selected'));       }     };      // 3. Trigger the native file picker dialog     input.click();   }); }`)(); } catch (e) { console.error(`Error: ${e.message}`); }
    }

}
Scratch.extensions.register(new filepicker());