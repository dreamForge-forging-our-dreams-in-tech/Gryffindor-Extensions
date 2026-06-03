// Adds an ASD block to the turbowarp editor
// It takes a string of code entered in CODE and evaluates it as Javascript
// there are two types COMMAND and REPORTER
// COMMAND executes a piece of code and returns nothing, while REPORTER executes a piece of code and returns a value.

class ASD_COMMAND {
    constructor(runtime) {
        this.runtime = runtime;

        try { // check if the registery is available and prevent crashes if not
            window.extensionBuilder["dreamForgeJSTools"] = 'https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Gryffindor-Extensions/refs/heads/main/ASD%20blocks/';
        } catch (e) {
            window.extensionBuilder = { // feel free to initialize it yourself too, helps if the user installs your extension first before the builder
                "dreamForgeJSTools": 'https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Gryffindor-Extensions/refs/heads/main/ASD%20blocks/'
            }
        }
    }
    getInfo() {
        return {
            id: 'dreamForgeJSTools', // Ensure this is lowercase/no symbols
            name: 'ASD',
            color1: '#0088ff', // Main block color
            color2: '#0066cc', // Hover/Outline color
            blocks: [
                {
                    opcode: 'evalCode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Evaluate [CODE]',
                    arguments: {
                        CODE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '2 * 2'
                        },

                    }
                },
                {
                    opcode: 'evalCode_Reporter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Evaluate [CODE] and return it's result",
                    arguments: {
                        CODE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '2 * 2'
                        },

                    }
                }
            ]
        };
    }

    // The function name MUST match the opcode above exactly
    evalCode_Reporter(args) {
        return this.evalCode(args); // reuse evalCode to avoid code duplication, only reason for extra function is due to how turbowarp handles identification of blocks.
    }

    evalCode(args) {
        try {
            const fn = new Function('a', `return ${args.CODE}`);
            return fn(); // keep return statement because reporter reuses the same function
        } catch (e) {
            return `Error: ${e.message}`;
        }
    }
}

Scratch.extensions.register(new ASD_COMMAND());