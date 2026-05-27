class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: "test",
      name: "test",
      color1: "#008dcd",
      blocks: [
        {
          opcode: "sandboxed",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "is sandboxed?",
        },

      ],

    }
  }


  async sandboxed(args, util) {
    return Scratch.extensions.unsandboxed;
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime ? Scratch.vm.runtime : {}));