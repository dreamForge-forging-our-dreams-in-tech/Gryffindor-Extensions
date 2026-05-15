class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.dreamforgeturbowarpextensionbuilder_executeBranchBlocks = this.runtime.getOpcodeFunction('dreamforgeturbowarpextensionbuilder_executeBranchBlocks');

    }
    getInfo() {
        return {
            id: "afasf",
            name: "Default Value",
            color1: "#008dcd",
            color2: "#008dcd",
            blocks: [
                {
                    opcode: "opcode_name",
                    blockType: Scratch.BlockType.CONDITIONAL,
                    text: "opcode_name",
                    branchCount: "3",
                }
            ]
        };
    }


    async opcode_name(args, util) {
        util.startBranch(1, false);     // Start branch 1

    }


}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));

class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.looks_sayforsecs = this.runtime.getOpcodeFunction('looks_sayforsecs');

    }

    getInfo() {
        return {
            id: "asasfdasf",
            name: "Default Value",
            color1: "#008dcd",
            color2: "#008dcd",
            blocks: [
                {
                    opcode: "opcode_name",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Say something [MESSAGE]",
                    arguments: {
                        "MESSAGE": {
                            type: Scratch.ArgumentType.STRING,
                            menu: "MESSAGES"
                        }
                    }
                },

            ],
            menus: {
                "MESSAGES": {
                    acceptReporters: false,
                    items: [
                        {
                            text: "a",
                            value: "a"
                        },
                        {
                            text: "b",
                            value: "b"
                        },
                        {
                            text: "c",
                            value: "c"
                        },
                    ]
                },

            },

        };
    }


    async opcode_name(args, util) {

        await this.looks_sayforsecs({ MESSAGE: args.MESSAGE, SECS: 2 }, util);

    }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));