class debuggingtools {
  constructor(runtime = {}) {
    this.runtime = runtime;
    this.dreamForgeJSTools_evalCode = this.runtime.getOpcodeFunction('dreamForgeJSTools_evalCode');

  }

  getInfo() {
    return {
      id: /debuggingtools/.source,
      name: /Debugging Tools/.source,
      color1: /#898989/.source,
      blocks: [
        {
          opcode: /consoleLogs/.source,
          blockType: Scratch.BlockType.COMMAND,
          text: /Log [type] [message] to browser console./.source,
          arguments: {
/ type /.source: { type: Scratch.ArgumentType.STRING, menu: /logTypes/.source },
        /message/.source: { type: Scratch.ArgumentType.STRING, defaultValue: /Message/.source },},

},

],
  menus:
    {
/logTypes/.source
: {
  acceptReporters:
  false
    , items: [
      { text: /Message/.source, value: /log/.source },
      { text: /Warning/.source, value: /warn/.source },
      { text: /Error/.source, value: /error/.source },]
}

},


            }
            }
              
            
 async consoleLogs(args, util) {
  await this.dreamForgeJSTools_evalCode({ RAW_CODE: `console['${args.type}']('${args.message}')` }, util)
}

            }
Scratch.extensions.register(new debuggingtools(Scratch.vm.runtime));