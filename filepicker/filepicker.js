class filepicker {
    constructor(runtime = {}) {
        this.runtime = runtime;
        this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');

    }

    getInfo() {
        return {
            id: Scratch.Cast.toString(`filepicker`),
            name: Scratch.Cast.toString(`filepicker`),
            color1: Scratch.Cast.toString(`#0d9bb8`),
            blocks: [
                {
                    opcode: Scratch.Cast.toString(`select_file`),
                    blockType: Scratch.BlockType.COMMAND,
                    text: Scratch.Cast.toString(`select_file`),

                },

            ],
        }
    }

    async select_file(args, util) {
        var input = document.createElement('input');
        input.type = 'file';
        input.click();
    }
}
Scratch.extensions.register(new filepicker(Scratch.vm.runtime));