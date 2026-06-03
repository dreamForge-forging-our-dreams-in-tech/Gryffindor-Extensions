
class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;
    this.sensing_askandwait = this.runtime.getOpcodeFunction('sensing_askandwait');
    this.control_if_else = this.runtime.getOpcodeFunction('control_if_else');
    this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');
    this.operator_add = this.runtime.getOpcodeFunction('operator_add');

  }

  getInfo() {
    return {


    }
  }


  async opcode_name(args, util) {
    await this.sensing_askandwait({ QUESTION: `What's your name?` }, util);
    await this.control_if_else({ SUBSTACK2: return  result, CONDITION: await this.operator_equals({ OPERAND1: `50`, OPERAND2: `50` }, util), SUBSTACK: await this.control_if({ SUBSTACK: return  response was not a number, CONDITION: await this.operator_equals({ OPERAND1: `50`, OPERAND2: await this.operator_add({ NUM1: 50, NUM2: 0 }, util) }, util) }, util)nreturn  result }, util);
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));