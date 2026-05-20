class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.sensing_askandwait = this.runtime.getOpcodeFunction('sensing_askandwait');
        this.sensing_answer = this.runtime.getOpcodeFunction('sensing_answer');

    }

    getInfo() {
        return {
            id: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            name: "Advanced Ask",
            color1: "#008dcd",
            blocks: [
                {
                    opcode: "opcode_name",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Ask for [MESSAGE] with input type [INPUT] and wait",
                    arguments: {
                        "MESSAGE": {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "message"
                        },
                        "INPUT": {
                            type: Scratch.ArgumentType.STRING,
                            menu: "input_types"
                        },
                    }
                },

            ],
            menus: {
                "input_types": {
                    acceptReporters: false,
                    items: [
                        {
                            text: "Text",
                            value: "string"
                        },
                        {
                            text: "Number",
                            value: "number"
                        },
                    ]
                },

            },

        };
    }


    async opcode_name(args, util) {

        await this.sensing_askandwait({ QUESTION: args.MESSAGE }, util);

        return await this.sensing_answer({}, util);;
    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));