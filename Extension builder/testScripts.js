class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: 'test',
      name: 'test',
      blocks: [
        {
          opcode: 'opcode_name',
          blockType: Scratch.BlockType.COMMAND,
          text: 'image: [IMAGE]',
          arguments: {
            'IMAGE': { type: Scratch.ArgumentType.IMAGE, dataURI: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxt_0PJ8T-KXXZa6YvyLG9iwdnCjpy-VfAQ&s', width: 16, height: 16, alt: 'Alt Text' },
          },

        },

      ],

    }
  }


  async opcode_name(args, util) {

  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());

class MyCoolAndAwesomeExtension {
    constructor(runtime = {}) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'test',
            name: 'test',
            blocks: [
                {
                    opcode: 'opcode_name',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'test block', // Standard label text
                    // FIX: This places the image at the very front of the block as an icon
                    blockIconUri: 'data:image/png;base64,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'                }
            ]
        };
    }

    async opcode_name(args, util) {
        // Opcode implementation
    }
}

Scratch.extensions.register(new MyCoolAndAwesomeExtension());