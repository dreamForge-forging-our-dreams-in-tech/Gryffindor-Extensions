let extension_id = 'dreamforgeturbowarpextensionbuilder';
window.extensionBuilder = window.extensionBuilder || {}; // init the global registery for extensions

function fetchJson(file_name, folder = 'block_menus', url = 'https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Gryffindor-Extensions/refs/heads/main/Extension%20builder/') {
    return fetch(`${url}JSON%20files/${folder}/${file_name}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            // console.log(data)
            return data;
        })
        .catch(error => {
            console.error(`Error loading ${file_name}.json:`, error);
            return {}; // Return an empty object on error to prevent crashes
        });
}

//makes a fetch request to get the block json
// NOTE: when making new block json you no longer need to enter Scrtch.BlockType or Scratch.ArgumentType in the json,
// you can just enter the string (e.g. "HAT" or "STRING") and the buildBlocks function will convert it to the corresponding Scratch.BlockType or Scratch.ArgumentType value.
// This is to make the json more readable and easier to edit.

async function buildBlocks(file_name, Scratch) {
    let json = await fetchJson(file_name, 'blocks');

    let i;

    for (i in json) {

        //Turn any blockType strings (e.g. HAT or COMMAND) into the corresponding Scratch.BlockType value.
        if (json[i]['blockType']) {
            json[i].blockType = Scratch.BlockType[json[i].blockType];
        }

        //turn any argument type strings into the corresponding Scratch.ArgumentType value.
        if (json[i]['arguments']) {
            let argName;
            for (argName in json[i]['arguments']) {
                let arg = json[i]['arguments'][argName];
                if (arg['type'] && Scratch.ArgumentType[arg['type']]) {
                    arg['type'] = Scratch.ArgumentType[arg['type']];
                }
            }
        }
    }

    return json;
}

// Function to set or remove warning comments when certain conditions are met
function setWarnings(args, util, condition, message) {
    // Veiligheidscheck: bestaat de Scratch/Blockly runtime wel in deze context?
    if (typeof Blockly !== 'undefined' && util && util.thread && util.thread.peekStack()) {

        // 2. Haal het huidige blok-ID op uit de Scratch runtime util
        const blockId = util.thread.peekStack();
        const workspace = Blockly.getMainWorkspace();

        if (workspace) {
            // Zoek het daadwerkelijke Blockly-blok op
            const block = workspace.getBlockById(blockId);

            if (block) {
                if (condition) {
                    // 3. Voeg een comment toe (or verander de tekst)
                    block.setCommentText(message);
                } else {
                    // Verwijder de comment door er 'null' of een lege string in te zetten
                    block.setCommentText(null);
                }
            }
        }
    }
}

//function for registering extensions with a url to the files of the extensions wanting to be registered
window.registerExtension = async (url = 'https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Gryffindor-Extensions/refs/heads/main/Extension%20builder/') => {
    let j;

    let fetched_directory = await fetchJson('directory', 'block_codes', url); // log the code json for the new extension to verify it was loaded correctly. This also serves as a way to easily access the code json for each extension in the global registery.

    for (j in fetched_directory) {
        window.code_directory[j] = fetched_directory[j]; // add the code blocks from the new extension to the code_directory so they can be used in the transpile function. This allows us to easily add new blocks and specify how they should be transpiled without having to edit the transpile function itself.
        window[j] = await fetchJson(j, 'block_codes', url); // This gets the actual code block for the corresponding opcode from the JSON file specified in the directory.json file.
    }
}

(async function (Scratch) {
    'use strict';

    //load all extension json files, this allowed us to introduce background updates and make code easier to maintain.
    let dependency_registery = await fetchJson('dependency_registery', "block_codes");

    let definition_block_menus = await fetchJson('definition_menus', 'block_menus');
    let block_definition_menus = await fetchJson('block_definitions_menu', 'block_menus');
    let code_blocks_menus = await fetchJson('code_blocks_menus', 'block_menus');

    let definition_blocks = await buildBlocks('definition_blocks', Scratch);
    let block_definition_blocks = await buildBlocks('block_definition_blocks', Scratch);
    let code_blocks = await buildBlocks('code_blocks', Scratch);

    //pre load all code json files, so they dont have to be accesed inside of the loop
    window.code_directory = {};
    await window.registerExtension();

    class definitionBlocks {
        constructor(runtime) {
            this.runtime = runtime;
            this.generatedCode = "";
            this.presetCode = `// This code is generated by the Turbowarp Extension Builder extension by dreamForge. You can edit the blocks in the workspace to change this code.\n\n`; // You can use this variable to preset some code that you want to be included in every block, for example if you want to always include a certain variable or function definition in every block.
            this.codeDependencies = []; // empty array gets stringified afterwards in code generation because multiple dependencies are seperated by a ,
        }

        getInfo() {
            return {
                id: extension_id,
                name: 'Extension Definition Blocks',
                color1: '#9595eb', // Main block color
                blocks: definition_blocks,
                menus: definition_block_menus,
            };
        }

        setMetaData(args, util) {
            let condition;
            if (args.METATAG === 'id') {
                condition = /[A-Z]/.test(args.VALUE) || /-/.test(args.VALUE) || /_/.test(args.VALUE || / /.test(args.VALUE)); // Check if the ID contains uppercase letters, dashes, or underscores, which are not allowed in extension IDs.
            }
            setWarnings(args, util, condition, 'Incorrect typing conventions used: only lowercase and numbers are allowed.');
        }

        /**
         * This helper looks at the blocks snapped under the Hat
         * and turns them into a JS string.
         */
        transpile(currentId, target) {
            const allBlocks = target.blocks._blocks;

            let lines = [];

            while (currentId) {
                const block = target.blocks.getBlock(currentId);
                const opcode = block.opcode;
                const opcodeWithoutExtension = opcode.substring(opcode.indexOf('_') + 1, opcode.length); // Remove the extension_id prefix from the opcode to get the base opcode name, which is used in the directory.json file to find the corresponding code block for this opcode. This allows us to reuse the same code blocks for multiple extensions without having to duplicate them in the directory.json file.
                let code_json;
                let i;
                for (i in window.code_directory) { //find the correct file path conencted to the opcode in the directory.json file so we can use it to get the code block for that opcode. This allows us to easily organize our code blocks into different files and keep the transpile function clean and organized.
                    if (window.code_directory) {
                        if (window.code_directory[i].includes(opcodeWithoutExtension)) { // The replace here is to remove the extension_id prefix from the opcode so that we can match it to the entries in the directory.json file, which do not include the extension_id prefix. This allows us to reuse the same code blocks for multiple extensions without having to duplicate them in the directory.json file.
                            code_json = window[i];
                            break;
                        }
                    }
                }

                if (block.fields && block.fields.NUM) {
                    return block.fields.NUM.value; // Returns "2"
                }
                if (block.fields && block.fields.TEXT) {
                    return `"${block.fields.TEXT.value}"`; // Returns "Hello"
                }

                let substackId = null;
                try {
                    substackId = block.inputs.SUBSTACK ? block.inputs.SUBSTACK.block : null;
                } catch (e) {
                    console.error(`Error processing block ${opcode}:`, e);
                }

                // Helper to get a clean value for any input
                const getVal = (name) => {
                    let result = this.resolveInput(block, name, target);
                    if (name.startsWith('RAW_')) {
                        return result.substring(1, result.length - 1); // remove the quotes added by JSON.stringify for raw code inputs since we want to insert the raw code directly into the generated code without quotes around it. This allows users to write blocks that return values without worrying about quotes breaking their code.
                    }
                    if (result === 'null') { // null needs to be a string since its returned as a string
                        result = block.fields[name].value
                    }
                    return result.replaceAll("'", '&#39;'); // replace all backticks by a safer backtick that html will display as a backtick but wont break the code.
                };

                if (code_json && code_json[opcodeWithoutExtension]) {
                    let code_block = code_json[opcodeWithoutExtension].code; // Get the code block for this opcode from the JSON file
                    let i, codeToInsert = '';

                    for (i of code_block) { // Replace any placeholders in the code block with the actual values from the block
                        let argValue;
                        let dependencies = code_json[opcodeWithoutExtension].dependencies;

                        if (dependencies) {
                            let i;
                            for (i of dependencies) {
                                const item = dependency_registery[i];

                                if (item && !this.codeDependencies.includes(item)) {
                                    this.codeDependencies.push(item);
                                }
                            }
                        }

                        //generate code for arguments or for blocks only
                        if (i.substring(0, 1) === '[' && i.substring(i.length - 1) === ']') { // This is a placeholder for a value from the block (e.g. [VALUE] or [ARGUMENTS])
                            if (i == '[TRANSPILE]') {
                                let substackCode = this.transpile(substackId, target); // Recursively transpile the substack blocks to get the code for the substack and insert it into the code block. This allows users to write blocks that include substacks and have the code for those substacks be included in the generated code correctly.

                                if (code_json[opcodeWithoutExtension].singleLine) {
                                    codeToInsert += '\n'; //make sure transpiled substacks are actually on a new line even if newline is set to true
                                    substackCode += '\n';
                                }

                                codeToInsert += substackCode; // Insert the transpiled substack code into the lines array so it will be included in the generated code.
                                continue; // Skip the rest of the loop for this iteration since we've already handled this placeholder
                            }

                            let argName = i.replaceAll('[', '').replaceAll(']', ''); // Get the name of the argument from the placeholder (e.g. "VALUE" from "[VALUE]")
                            argValue = getVal(argName).replaceAll('"', "'"); // Get the value for this argument and turn any "" strings into `` strings
                            codeToInsert += argValue // Insert the value into the code block, removing any quotes to avoid issues in the generated code when "" are removed. This allows users to write blocks that return values without worrying about quotes breaking their code.
                        } else {
                            codeToInsert += i; // This is just a regular line of code that should be included as is in the generated code
                        }

                        if (!code_json[opcodeWithoutExtension].singleLine) {
                            codeToInsert += '\n'; // Add a space at the end of the line to separate it from the next line since we are combining all lines into one line for singleLine code blocks.
                        }
                    }

                    if (codeToInsert) { // If there is code to insert that was generated from the placeholders, add it to the lines array. We do this after processing all lines of the code block to ensure that any values that need to be evaluated (e.g. reporter blocks) are fully generated before being inserted into the code.
                        lines.push(codeToInsert); // Add the generated code for this block to the lines array
                    }
                } else {
                    const scratchVMTarget = Scratch.vm.runtime.getEditingTarget();

                    //check for the runtime dependency, if its there dont add the dependency else add it since its required to access the turbowarp blocks.
                    if (!this.codeDependencies.includes(dependency_registery['runtime'])) {
                        this.codeDependencies.push(dependency_registery['runtime']);
                    }

                    // If the preset code already contains this opcode, skip it to avoid duplicates
                    if (!this.presetCode.includes(`this.${opcode}`)) {
                        this.presetCode += `this.${opcode} = this.runtime.getOpcodeFunction('${opcode}');\n`;
                    }
                    // remove all "" so that functions will still work.
                    lines.push(`await this.${opcode}(${this.getBlockArguments(block, target).replaceAll('"', " ")}, util)`);
                }

                currentId = target.blocks.getNextBlock(currentId);
            }
            return lines.join('\n');
        }

        isReporter(opcode) {
            // Get the block definition from the runtime
            const blockDef = Scratch.vm.runtime.getBlocksXML().find(b => b.opcode === opcode);

            // Check if it's a reporter (round) or a boolean (hexagonal)
            // These are the blocks that return values rather than executing 'next' blocks
            return blockDef && (blockDef.blockType === 'reporter' || blockDef.blockType === 'boolean');
        }

        getBlockArguments(block, target) {
            const args = {};

            for (const inputName in block.inputs) {
                const input = block.inputs[inputName];
                // Check if the input is a simple value (shadow) or another block (reporter)
                if (input.shadow && !input.block) {
                    // It's a direct value like a number or string
                    const value = target.blocks.getBlock(input.shadow).fields.VALUE.value;
                    args[inputName] = JSON.stringify(value); // JSON.stringify adds quotes to strings automatically
                } else if (input.block) {
                    // It's a nested reporter block (e.g., 'distance to mouse')
                    // You would recursively call a 'generateCode' function here
                    let transpiledCode = this.transpile(input.block, target);// Recursively transpile the nested block
                    if (transpiledCode[0] === '"' && transpiledCode[transpiledCode.length - 1] === '"') {
                        transpiledCode = transpiledCode.replaceAll('"', "`"); // Convert double quotes to single quotes for string literals to avoid issues in the generated code when "" are removed
                    }
                    args[inputName] = transpiledCode.replace(';', ''); // remove semicolons to avoid issues in the generated code when ";" are removed. This is a bit hacky but it allows users to write blocks that return values without worrying about semicolons breaking their code.
                }
            }
            return JSON.stringify(args).replace(/\\/g, ''); // Convert the args object to a string for code generation and remove backslashes
        }

        resolveInput(parentBlock, inputName, target) {
            const input = parentBlock.inputs[inputName];
            if (!input || !input.block) return 'null';

            const inputBlock = target.blocks.getBlock(input.block);

            // 1. Check for Shadow Blocks (Simple inputs)
            // Opcode 'text' is the white bubble for strings
            // Opcode 'math_number' is the white bubble for numbers
            if (inputBlock.opcode === 'text') {
                return `"${inputBlock.fields.TEXT.value}"`;
            }
            if (inputBlock.opcode === 'math_number') {
                return inputBlock.fields.NUM.value;
            }

            // 2. Check for Reporter Blocks (e.g. "x position", "my variable")
            // If it's a real block, transpile it to get its "code" representation
            return this.transpile(input.block, target).trim();
        }

        updateCode(args, util) {
            const target = util.target;
            const allBlocks = target.blocks._blocks;

            let pre_production_code = '';

            this.presetCode = ''; // Reset preset code on each update to avoid duplicates
            this.codeDependencies = []; // remove all dependencies with every recompile.

            // 1. Find our "Define" Hat block in the workspace
            let hatId = null;
            let opcode_hats = this.getAllHats('defineBlockFunction', allBlocks); // Get all hats that define block functions
            for (const id in allBlocks) {
                if (allBlocks[id].opcode === `${extension_id}_defineExtensionHat`) {
                    if (!hatId) {
                        hatId = id;
                    }
                }
            }

            if (!hatId) {
                this.generatedCode = "// Please place the 'define' hat block!";
                return;
            }

            // 2. Get the name from the hat block's inputs
            const nameBlockId = allBlocks[hatId].inputs.NAME.block;
            const extensionName = allBlocks[nameBlockId].fields.TEXT.value || "MyExtension";

            // get code for all hat blocks and put them in the correct place in the generated code
            let blockHats = this.getAllHats('defineExtensionBlock', allBlocks); // Get all hats that define block functions
            let menuHats = this.getAllHats('defineExtensionMenus', allBlocks); // Get all hats that define block menus

            let blocks = this.getHatCode(blockHats, allBlocks, target);
            let menuBlocks = this.getHatCode(menuHats, allBlocks, target);

            // check if the block or menu blocks are empty, if so dont include them in the final code.
            let sendingCode = '';
            if (blocks !== '') {
                sendingCode += `blocks: [\n${blocks}\n],\n `;
            }
            if (menuBlocks !== '') {
                sendingCode += `menus: \n${menuBlocks}\n`; // keep {} away as they are automatically added by the getHatCode function
            }

            // 3. Generate the class string
            const body = this.transpile(target.blocks.getNextBlock(hatId), target); // pass the hat id here instead of in the transpile function so we ca nreuse the transpile function

            let opcode_body = this.getHatCode(opcode_hats, allBlocks, target); // Generate code for all opcode hats

            pre_production_code = `
            class ${extensionName} {
            constructor(runtime = {}) {
            this.runtime = runtime;
            ${this.presetCode}
            }

            getInfo() {
            return {
            ${body}
            ${sendingCode}
            }
            }
              
            ${opcode_body}
            }
            Scratch.extensions.register(new ${extensionName}(${this.codeDependencies.join(',')}));`;

            if (pre_production_code === this.generatedCode) return; // If the generated code is the same as the previous generated code, don't log it again to avoid spamming the console with duplicate code.

            this.generatedCode = pre_production_code; // Store the generated code in a variable so we can compare it on the next update to avoid duplicates.
            console.log(pre_production_code);
        }

        getAllHats(opcode, allBlocks) { // gets all hats with the specified opcode
            let hats = [];
            for (const id in allBlocks) {
                if (allBlocks[id].opcode === `${extension_id}_${opcode}`) {
                    hats.push(id);
                }
            }
            return hats;
        }

        getHatCode(hats, allBlocks, target) { // gets all the code for the list of the hats provided
            let code = '';
            hats.forEach(hatId => {
                try {
                    const opcode_name_block_id = allBlocks[hatId].inputs.OPCODENAME.block;
                    const opcode_name = allBlocks[opcode_name_block_id].fields.TEXT.value || "opcode_name";

                    const hat_body = this.transpile(target.blocks.getNextBlock(hatId), target);
                    code += `\n async ${opcode_name} (args, util) {\n${hat_body}\n  }\n`;
                } catch (e) {
                    const hat_body = this.transpile(target.blocks.getNextBlock(hatId), target);
                    code += "{\n" + hat_body + "\n},\n";
                }
            });

            return code;
        }

        defineExtensionHat(args, util) {
            this.updateCode(args, util); // allows the user to press the green flag to update and print the generated code.
        }

    }

    class blockDefinitionBlocks {
        constructor(runtime) { }

        getInfo() {
            return {
                id: extension_id,
                name: 'Extension Block Definitions Blocks',
                color1: '#5c9ba5', // Main block color
                blocks: block_definition_blocks,
                menus: block_definition_menus,
            };
        }

        defineExtensionMenus() {
            return false;
        }

        generateMenu() {
            return false;
        }

        setMetaDataBlocks() {
            return false; // The actual generation of the block meta data is handled in the generated code, this block just serves as a trigger for users to indicate they want to generate block meta data and to specify which type of meta data they want to generate.
        }

        defineExtensionBlock() {
            return false;
        }

    }

    class codeBlocks {
        constructor(runtime) { }

        getInfo() {
            return {
                id: extension_id,
                name: 'Extension Code Blocks',
                color1: '#725ca5', // Main block color
                blocks: code_blocks,
                menus: code_blocks_menus,
            };
        }

        executeBranchBlocks() {
            return false; // The actual execution of the blocks is handled in the generated code, this block just serves as a trigger for users to indicate they want to execute branch blocks and to specify which branch number they want to execute.
        }

        checkFunctionAvailability() {
            return false;
        }

        defineBlockFunction() {
            return false;
        }

    }

    Scratch.extensions.register(new definitionBlocks(Scratch.vm.runtime));
    Scratch.extensions.register(new blockDefinitionBlocks(Scratch.vm.runtime));
    Scratch.extensions.register(new codeBlocks(Scratch.vm.runtime));
})(Scratch);    