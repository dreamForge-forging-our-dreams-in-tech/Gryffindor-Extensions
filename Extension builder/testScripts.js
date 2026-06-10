class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: 'tes',
      name: 'tes',
      blocks: [
        {
          opcode: 'opcode_name',
          blockType: Scratch.BlockType.COMMAND,
          text: 'test [ARG]',
          arguments: {
            'ARG': { type: Scratch.ArgumentType.STRING, defaultValue: 'Default Value' },
          },

        },

      ],

    }
  }


  async opcode_name(args, util) {
    try { new Function('a', `return 'alert(${args.ARG})'`.replaceAll(`'`, ``))(); } catch (e) { console.error(`Error: ${e.message}`); }
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());