class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.dreamforgeturbowarpextensionbuilder_runningUnsandboxed = this.runtime.getOpcodeFunction('dreamforgeturbowarpextensionbuilder_runningUnsandboxed');

  }

  getInfo() {
    return {
      id: "test",
      name: "test",
      color1: "#008dcd",
      blocks: [
        {
          opcode: "Default Value",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "is sandboxed?",
        },

      ],

    }
  }


  async sandboxed(args, util) {
    return await this.dreamforgeturbowarpextensionbuilder_runningUnsandboxed({}, util);
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));