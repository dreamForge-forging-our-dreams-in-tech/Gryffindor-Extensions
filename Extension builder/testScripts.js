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
          blockType: 'test',
        },

      ],

    }
  }


  async opcode_name(args, util) {
    try { new Function('a', `return 'alert()'`.replaceAll(`'`, ``))(); } catch (e) { console.error(`Error: ${e.message}`); }
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());