class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: `test`,
      name: `test`,
      color1: `#008dcd`,
      blocks: [
        {
          opcode: `opcode_name`,
          blockType: Scratch.BlockType.REPORTER,
          text: `[COLOR]`,
          arguments: {
            "COLOR": { type: Scratch.ArgumentType.STRING, defaultValue: `Default Value` },
          },

        },

      ],

    }
  }


  async opcode_name(args, util) {

  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());