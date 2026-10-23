class MyCoolAndAwesomeExtension {
    constructor(runtime = {}) {
        this.runtime = runtime;
        this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');

    }

    getInfo() {
        return {
            id: Scratch.Cast.toString(`debuggingtools`),
            name: Scratch.Cast.toString(`Debugging Tools`),
            blocks: [
                {
                    opcode: Scratch.Cast.toString(`console`),
                    blockType: Scratch.BlockType.COMMAND,
                    text: Scratch.Cast.toString(`Log [TYPE] [MESSAGE] to console`),
                    arguments: {
                        TYPE: { type: Scratch.ArgumentType.STRING, menu: Scratch.Cast.toString(`console_types`) },
                        MESSAGE: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.Cast.toString(`Message`) },
                    },

                },
                {
                    blockType: Scratch.BlockType.REPORTER,
                    disableMonitor: true,
                    opcode: Scratch.Cast.toString(`history`),
                    text: Scratch.Cast.toString(`Get [TYPE] history`),
                    arguments: {
                        TYPE: { type: Scratch.ArgumentType.STRING, menu: Scratch.Cast.toString(`console_types`) },
                    },

                },

            ],
            menus:
            {
                console_types
                    : {
                    acceptReporters:
                        true
                    , items: [
                        { text: Scratch.Cast.toString(`Message`), value: Scratch.Cast.toString(`log`) },
                        { text: Scratch.Cast.toString(`Warning`), value: Scratch.Cast.toString(`warn`) },
                        { text: Scratch.Cast.toString(`Error`), value: Scratch.Cast.toString(`error`) },]
                }

            },


        }
    }


    async console(args, util) {
        try { new Function('a', `return console['${args.TYPE}']('${args.MESSAGE}');`)(); } catch (e) { console.error(`Error: ${e.message}`); }
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `log` }, util)) {
            (window['log_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
        }
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `warn` }, util)) {
            (window['warn_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
        }
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `error` }, util)) {
            (window['error_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
        }
    }

    async history(args, util) {
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `log` }, util)) {
            return window['log_history']
        }
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `warn` }, util)) {
            return window['warn_history']
        }
        if (await this.operator_equals({ OPERAND1: args[Scratch.Cast.toString(`TYPE`)], OPERAND2: `error` }, util)) {
            return window['error_history']
        }
    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));