class file_picker {
    constructor(runtime = {}) {
        this.runtime = runtime;
        this.dreamForgeJSTools_evalCode = this.runtime.getOpcodeFunction('dreamForgeJSTools_evalCode');



    }

    getInfo() {
        return {
            id: Scratch.Cast.toString(`file_picker`),
            name: Scratch.Cast.toString(`file_picker`),
            blocks: [
                {
                    opcode: Scratch.Cast.toString(`open`),
                    blockType: Scratch.BlockType.REPORTER,
                    text: Scratch.Cast.toString(`select_file`),
                },

            ],

        }
    }


    async select_file(args, util) {
        await this.dreamForgeJSTools_evalCode({ RAW_CODE: `const openFilePicker = (multiple = false, accept = '*') {   return new Promise((resolve, reject) => {     // 1. Create a hidden file input element     const input = document.createElement('input')     input.type = 'file';     input.multiple = multiple;     input.accept = accept;      // 2. Listen for when the user selects a file     input.onchange = (event) => {       const files = event.target.files;       if (files.length > 0) {         resolve(multiple ? Array.from(files) : files[0]);       } else {         reject(new Error('No file selected'));       }     };      // 3. Trigger the native file picker dialog     input.click();   }); }` }, util)
    }

}
Scratch.extensions.register(new file_picker(Scratch.vm.runtime));