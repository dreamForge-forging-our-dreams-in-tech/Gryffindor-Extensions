class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;

    }

    getInfo() {
        return {
            id: "dreamforge_debugging",
            name: "Debugging",
            blocks: [
                {
                    opcode: "console_log",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Log [MESSAGE] as [TYPE] to the console",
                    arguments: {
                        "MESSAGE": {
                            type: Scratch.ArgumentType.STRING,
                            undefined: "message"
                        },
                        "TYPE": {
                            type: Scratch.ArgumentType.STRING,
                            undefined: "log-types"
                        },
                    }
                },

            ],
            menus: {
                "log-types": {
                    acceptReporters: false,
                    items: [
                        {
                            text: "Log",
                            value: "log"
                        },
                        {
                            text: "Warn",
                            value: "warn"
                        },
                        {
                            text: "Error",
                            value: "error"
                        },
                    ]
                },

            },

        };
    }


    async console_log(args, util) {

    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));