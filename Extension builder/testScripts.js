class prompts {
  constructor(runtime) {
    this.runtime = runtime;
    this.motion_movesteps = this.runtime.getOpcodeFunction('motion_movesteps');
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
    await this.motion_movesteps({ STEPS : 10 }, util);

    console.log(await this.motion_movesteps({ STEPS : 10 }, util));
  }

}
Scratch.extensions.register(new prompts(Scratch.vm.runtime));