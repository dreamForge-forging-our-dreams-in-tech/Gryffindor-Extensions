class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.control_repeat = this.runtime.getOpcodeFunction('control_repeat');
    this.motion_movesteps = this.runtime.getOpcodeFunction('motion_movesteps');

  }

  getInfo() {
    return {


    }
  }


  async opcode_name(args, util) {
    await this.control_repeat({ "TIMES": "10", "SUBSTACK": "await this.motion_movesteps({\"STEPS\":\"10\"}, util)" }, util);


  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));