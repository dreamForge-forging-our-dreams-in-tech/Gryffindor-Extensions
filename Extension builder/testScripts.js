class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;

  }

  getInfo() {
    return {
      id: "test",
      name: "test",
      color1: "#008dcd",

    }
  }


}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));