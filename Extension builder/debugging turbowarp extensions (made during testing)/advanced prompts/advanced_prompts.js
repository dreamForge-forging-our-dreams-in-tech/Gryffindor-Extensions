class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.sensing_askandwait = this.runtime.getOpcodeFunction('sensing_askandwait');
        this.control_expandableIf = this.runtime.getOpcodeFunction('control_expandableIf');
        this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');

    }

    getInfo() {
        return {
            id: "dreamforge_advanced_prompts",
            name: "Advanced Prompts",
            blocks: [
                {
                    opcode: "ask",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Ask [MESSAGE] and wait for [ANSWER_TYPE]",
                    arguments: {
                        "MESSAGE": {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "Message"
                        },
                        "ANSWER_TYPE": {
                            type: Scratch.ArgumentType.STRING,
                            menu: "TYPES"
                        },
                    }
                },

            ],
            menus: {
                "TYPES": {
                    acceptReporters: false,
                    items: [
                        {
                            text: "Text",
                            value: "string"
                        },
                        {
                            text: "Numberic",
                            value: "number"
                        },
                    ]
                },

            },

        };
    }


    async ask(args, util) {

        await this.sensing_askandwait({ QUESTION: args.MESSAGE }, util);


        await this.control_expandableIf({ BOOL1: await this.operator_equals({ OPERAND1: args.INPUT_TYPE, OPERAND2: 'string' }, util), SUBSTACK1:  , BOOL2:  , SUBSTACK2:  }, util);

    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));