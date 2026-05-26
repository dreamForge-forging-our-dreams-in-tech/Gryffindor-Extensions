class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.dreamforgeturbowarpextensionbuilder_buildBlockType = this.runtime.getOpcodeFunction('dreamforgeturbowarpextensionbuilder_buildBlockType');

  }

  getInfo() {
    return {
      id: "test",
      name: "test",
      color1: "#008dcd",
      blocks: [
        {
          opcode: "opcode_name"
blockType: await this.dreamforgeturbowarpextensionbuilder_buildBlockType({}, util);
          text: "test code"
        },

      ],
      menus: {

      },

    }
  }


  async opcode_name(args, util) {

  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));