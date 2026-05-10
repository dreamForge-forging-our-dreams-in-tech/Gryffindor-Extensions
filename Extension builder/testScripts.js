class MyCoolAndAwesomeExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.looks_sayforsecs = this.runtime.getOpcodeFunction('looks_sayforsecs');

    }
    getInfo() {
        return {
            id: "asda",
            name: "Default Value",
            color1: "#008dcd",
            color2: "#008dcd",
            blocks: [
                {
                    opcode: "opcode_name",
                    blockType: "Default Value",
                    text: "Default Value",
                }
            ]
        };
    }


    async opcode_name(args, util) {

        await this.looks_sayforsecs({ MESSAGE: !String(this.runtime.getOpcodeFunction('asdfddd')) === 'undefined', SECS: 5 }, util);

    }


}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));