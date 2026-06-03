
class MyCoolAndAwesomeExtension {
  constructor(runtime = {}) {
    this.runtime = runtime;

  }

  getInfo() {
    return {


    }
  }


  async opcode_name(args, util) {
    try {
      new Function('a', `return "alert()"`.replace(/[      ]+/g, ' '));
    } catch (e) { return `Error: ${e.message}`; }
  }

}
Scratch.extensions.register(new MyCoolAndAwesomeExtension());