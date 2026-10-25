            class MyCoolAndAwesomeExtension {
            constructor(runtime = {}) {
            this.runtime = runtime;
            this.operator_equals = this.runtime.getOpcodeFunction('operator_equals');

            }

            getInfo() {
            return {
            id: Scratch.Cast.toString(`debuggingtools`),
name: Scratch.Cast.toString(`Debugging Tools`),
color1: Scratch.Cast.toString(`#989898`),
            blocks: [
{
opcode: Scratch.Cast.toString(`console`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Log [TYPE] [MESSAGE] to console`),
arguments: {
TYPE: {  type: Scratch.ArgumentType.STRING, menu  : Scratch.Cast.toString(`console_types`)},
MESSAGE: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`Message`)},},

},
{
blockType: Scratch.BlockType.REPORTER,
disableMonitor: true,
opcode: Scratch.Cast.toString(`history`),
text: Scratch.Cast.toString(`Get [TYPE] history`),
arguments: {
TYPE: {  type: Scratch.ArgumentType.STRING, menu  : Scratch.Cast.toString(`console_types`)},},

},
{
opcode: Scratch.Cast.toString(`clear`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Clear console`),
},
{
opcode: Scratch.Cast.toString(`trace`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Output stack trace`),
},
{
opcode: Scratch.Cast.toString(`time`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Start console timer [ID]`),
arguments: {
ID: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`TimerID`)},},

},
{
opcode: Scratch.Cast.toString(`timeEnd`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Stop console timer [ID]`),
arguments: {
ID: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`TimerID`)},},

},
{
opcode: Scratch.Cast.toString(`timeLog`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Log console timer time [ID]`),
arguments: {
ID: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`TimerID`)},},

},
{
opcode: Scratch.Cast.toString(`group`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Create [GROUPTYPE] console group with [ID]`),
arguments: {
ID: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`GroupID`)},
GROUPTYPE: {  type: Scratch.ArgumentType.STRING, menu  : Scratch.Cast.toString(`groupType`)},},

},
{
opcode: Scratch.Cast.toString(`groupEnd`),
blockType: Scratch.BlockType.COMMAND,
text: Scratch.Cast.toString(`Close group [ID]`),
arguments: {
ID: {  type: Scratch.ArgumentType.STRING, defaultValue  : Scratch.Cast.toString(`GroupID`)},},

},

],
 menus: 
{
console_types
: {
acceptReporters: 
false
, items: [
{ text: Scratch.Cast.toString(`Message`), value: Scratch.Cast.toString(`log`)},
{ text: Scratch.Cast.toString(`Warning`), value: Scratch.Cast.toString(`warn`)},
{ text: Scratch.Cast.toString(`Error`), value: Scratch.Cast.toString(`error`)},]
},

groupType
: {
acceptReporters: 
false
, items: [
{ text: Scratch.Cast.toString(`Standard`), value: Scratch.Cast.toString(`group`)},
{ text: Scratch.Cast.toString(`Collapsed`), value: Scratch.Cast.toString(`groupCollapsed`)},]
},

},


            }
            }
              
            
 async console (args, util) {
try {new Function('a', `return console['${args.TYPE}']('${args.MESSAGE}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `log` }, util)) {
(window['log_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
}
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `warn` }, util)) {
(window['warn_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
}
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `error` }, util)) {
(window['error_history'] ??= []).push(args[Scratch.Cast.toString(`MESSAGE`)])
}
  }

 async history (args, util) {
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `log` }, util)) {
return window['log_history']
}
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `warn` }, util)) {
return window['warn_history']
}
if (await this.operator_equals({ OPERAND1 : args[Scratch.Cast.toString(`TYPE`)] , OPERAND2 : `error` }, util)) {
return window['error_history']
}
  }

 async clear (args, util) {
try {new Function('a', `return console.clear();`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async trace (args, util) {
try {new Function('a', `return console.trace();`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async time (args, util) {
try {new Function('a', `return console.time('${args.ID}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async timeEnd (args, util) {
try {new Function('a', `return console.timeEnd('${args.ID}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async timeLog (args, util) {
try {new Function('a', `return console.timeLog('${args.ID}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async group (args, util) {
try {new Function('a', `return console['${args.GROUPTYPE}']('${args.ID}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

 async groupEnd (args, util) {
try {new Function('a', `return console.groupEnd('${args.ID}');`)();} catch (e) {console.error(`Error: ${e.message}`);}
  }

            }
            Scratch.extensions.register(new MyCoolAndAwesomeExtension(Scratch.vm.runtime));