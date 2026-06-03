
class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;
    this.control_repeat = this.runtime.getOpcodeFunction('control_repeat');

  }

  getInfo() {
    return {


    }
  }


  async opcode_name(args, util) {
    await this.control_repeat({ TIMES: 10, SUBSTACK: util.startBranch(1, '[ACTIONTYPE]' == 'loop'])nreturn `result` }, util);
}

            }
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));