class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;
    this.control_repeat = this.runtime.getOpcodeFunction('control_repeat');
    this.control_if = this.runtime.getOpcodeFunction('control_if');
    this.operator_gt = this.runtime.getOpcodeFunction('operator_gt');

  }

  getInfo() {
    return {


    }
  }


  async opcode_name(args, util) {
    await this.control_repeat({ TIMES: 10 }, util);
    await this.control_if({ SUBSTACK: await this.control_repeat({ TIMES: 10 }, util), CONDITION: await this.operator_gt({ OPERAND1: '', OPERAND2: '50' }, util) }, util);
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));