class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;

    }

    getInfo() {
        return {
            id: "dreamforge debugging extension",
            name: "Debugging",
            blocks: [
                {
                    opcode: "console_logging",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Log [MESSAGE] as [TYPE] to the console",
                    arguments: {
                        "MESSGAE": {
                            type: Scratch.ArgumentType.STRING,
                            null: "Message"
                        }
"TYPE": {
                            type: Scratch.ArgumentType.STRING,
                            null: "LOG_TYPE"
                        }
                    }
                },

            ],
            menus: {
                "LOG_TYPE": {
                    acceptReporters: false,
                    items: [
                        {
                            text: "Log",
                            value: "log"
                        },
                        {
                            text: "Warning",
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


    async console_logging(args, util) {

    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime)); 