class prompts {
  constructor(runtime) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: "promptExtensionForTurbowarp",
      name: "Prompts",
      color1: "#008dcd",
      blocks: [
        {
          opcode: "alert",
          blockType: Scratch.BlockType.COMMAND,
          text: "Show [message]",
          arguments: {
            "message": {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "message"
            },
          }
        },

      ],
      menus: {

      },

    };
  }


  async alert(args, util) {
    alert(args.message);
  }

}
Scratch.extensions.register(new prompts(Scratch.vm.runtime));