 class debuggingtools {
            constructor(runtime = {}) {
            this.runtime = runtime;
            
            }

            getInfo() {
            return {
            id: 'debuggingtools',
name: 'Debugging Tools',
color1: '#898989',
            blocks: [
{
opcode: 'consoleLogs',
blockType: Scratch.BlockType.COMMAND,
text: 'Log [type] [message] to browser console.',
arguments: {
'type': {  type: Scratch.ArgumentType.STRING, menu  : 'logTypes'},
'message': {  type: Scratch.ArgumentType.STRING, defaultValue  : 'Message'},},

},

],
 menus: 
{
'logTypes'
: {
acceptReporters: 
false
, items: [
{ text: 'Message', value: 'log'},
{ text: 'Warning', value: 'warn'},
{ text: 'Error', value: 'error'},]
}

},


            }
            }
              
            
 async consoleLogs (args, util) {
try {new Function('a', `return console[${args.type}](${args.message});`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

            }
            Scratch.extensions.register(new debuggingtools());