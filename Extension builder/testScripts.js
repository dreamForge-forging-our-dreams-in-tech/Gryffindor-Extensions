class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;
    this.sensing_askandwait = this.runtime.getOpcodeFunction('sensing_askandwait');
    this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');
    this.sensing_answer = this.runtime.getOpcodeFunction('sensing_answer');
    this.looks_sayforsecs = this.runtime.getOpcodeFunction('looks_sayforsecs');

  }

  getInfo() {
    return {
      id: 'test',
      name: 'test',
      blocks: [
        {
          opcode: 'opcode_name',
          blockType: Scratch.BlockType.COMMAND,
          text: 'doSomething',
        },

      ],

    }
  }


  async opcode_name(args, util) {
    await this.sensing_askandwait({ QUESTION: `What's your name?` }, util);
    if (await this.operator_equals({ OPERAND1: await this.sensing_answer({}, util), OPERAND2: `Luke` }, util)) {
      await this.looks_sayforsecs({ MESSAGE: `Awesome`, SECS: 2 }, util);
    }
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));