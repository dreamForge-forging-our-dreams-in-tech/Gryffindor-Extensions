class MyCoolAndAwesomeExtension {
  constructor(runtime) {
    this.runtime = runtime;

  }

  getInfo() {
    return {

      menus:
      {
        "Menu Name"
          : {

          acceptReporters:

            true
          , items: [


          ]

        }

      },


    }
  }


}
Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime || {}));