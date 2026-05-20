class MyCoolAndAwesomeExtension {
            constructor(runtime) {
            this.runtime = runtime;
            this.control_if = this.runtime.getOpcodeFunction('control_if');

            }

            
              
            
 async opcode_name (args, util) {
await this.control_if({ SUBSTACK : await this.control_if({ SUBSTACK : await this.control_if({ SUBSTACK : await this.control_if({ SUBSTACK : await this.control_if({}, util) }, util) }, util) }, util) }, util);
  }

            }
            Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));