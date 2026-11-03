class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;


    (window['test'] ??= []).push(Scratch.Cast.toString(`text1`));
      (window['test'] ??= []).push(Scratch.Cast.toString(`text2`));
  }

  getInfo() {
    return {
      id: Scratch.Cast.toString(`test`),
      name: Scratch.Cast.toString(`test`),
      blocks: [
        {
          opcode: Scratch.Cast.toString(`opcode_name`),
          blockType: Scratch.BlockType.COMMAND,
          branchCount: Scratch.Cast.toString(`2`),
          text: window['test'],
        },

      ],

    }
  }


  async opcode_name(args, util) {

  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());