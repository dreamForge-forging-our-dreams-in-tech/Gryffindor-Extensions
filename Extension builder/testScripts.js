class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.control_expandableIf = this.runtime.getOpcodeFunction('control_expandableIf');
        this.operator_trueBoolean = this.runtime.getOpcodeFunction('operator_trueBoolean');
        this.sensing_askandwait = this.runtime.getOpcodeFunction('sensing_askandwait');

    }

    getInfo() {
        return {
            id: "ttestesteste",
            name: "test",
            blocks: [
                {
                    opcode: "opcode_name",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Test",
                },

            ],
            menus: {

            },

        };
    }


    async opcode_name(args, util) {

        await this.control_expandableIf({ BOOL1: await this.operator_trueBoolean({}, util), SUBSTACK1: await this.sensing_askandwait({ QUESTION: 'bbb' }, util), SUBSTACK2:  }, util);

    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));