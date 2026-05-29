class MyCoolAndAwesomeExtension {
  constructor(runtime) {

  }

  getInfo() {
    return {
      id: "test",
      name: "test",
      color1: "#008dcd",
      blocks: [
        {
          opcode: "alert",
          blockType: Scratch.BlockType.COMMAND,
          text: "Alert!",
        },

      ],

    }
  }


  async alert(args, util) {
    alert('THis is a unsandboxed extensin');
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());