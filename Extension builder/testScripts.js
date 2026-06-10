

            class MyCoolAndAwesomeExtension {
            constructor(runtime = {}) {
            this.runtime = runtime;
            
            }

            getInfo() {
            return {
            id: 'test',
name: 'test',
            blocks: [
{
opcode: 'opcode_name',
blockType: Scratch.BlockType.COMMAND,
text: 'test',
},

],
 
            }
            }
              
            
 async opcode_name (args, util) {
try {new Function('a', `return 'alert()'`.replaceAll(`'`, ``))();} catch (e) {console.log(`Error: ${e.message}`);}
  }

            }
            Scratch.extensions.register(new MyCoolAndAwesomeExtension());