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
                    branchCount: "1",
                }
            ]
        };
    }


    async opcode_name(args, util) {
        util.startBranch(1, false);     // Start branch 1

    }


}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));