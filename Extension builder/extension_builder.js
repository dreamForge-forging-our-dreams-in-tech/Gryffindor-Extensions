let extension_id = 'dreamforgeturbowarpextensionbuilder';

(function (Scratch) {
    'use strict';

    class CodeGeneratorExtension {
        constructor(runtime) {
            this.runtime = runtime;
            this.generatedCode = "";
        }

        getInfo() {
            return {
                id: extension_id,
                name: 'Turbowarp Extension Builder',
                blocks: [
                    {
                        opcode: 'defineExtensionHat',
                        blockType: Scratch.BlockType.HAT,
                        text: 'define turbowarp extension [NAME]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'MyCoolAndAwesomeExtension'
                            }
                        }
                    },
                    {
                        opcode: 'defineBlockFunction',
                        blockType: Scratch.BlockType.HAT,
                        text: 'Define block opcode [OPCODENAME]',
                        arguments: {
                            OPCODENAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'opcode_name'
                            }
                        }
                    },
                    {
                        opcode: 'generateExtensionMetaData',
                        blockType: Scratch.BlockType.CONDITIONAL,
                        text: 'Define [DEFINITIONTYPE]',
                        branchCount: 1, // This is the magic property
                        arguments: {
                            DEFINITIONTYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'definitionTypes' // Must match the key in the menus object
                            }
                        }
                    },
                    {
                        opcode: 'getCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Display generated code',
                        disableMonitor: false
                    },
                    {
                        opcode: 'defineArguments',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Define argument [NAME] as [TYPE] with defaultValue [DEFAULT]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Argument Name'
                            },
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'argumentTypes' // Must match the key in the menus object
                            },
                            DEFAULT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Default Value'
                            }
                        }
                    },
                    {
                        opcode: 'setMetaData',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [METATAG] to [VALUE]',
                        arguments: {
                            METATAG: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'metaData' // Must match the key in the menus object
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Default Value'
                            }
                        }
                    },
                    {
                        opcode: 'buildBlockType',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'block type[TYPE]',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'blockTypes' // Must match the key in the menus object
                            }
                        }
                    }
                ],
                menus: {
                    metaData: {
                        acceptReporters: false, // Allows users to drop a round block into the menu
                        items: [
                            { text: 'ID', value: 'id' },
                            { text: 'Name', value: 'name' },
                            { text: 'Block Color', value: 'color1' },
                            { text: 'Hover Color', value: 'color2' },
                            { text: 'Function', value: 'opcode' },
                            { text: 'Type', value: 'blockType' },
                            { text: 'Text', value: 'text' }
                        ]
                    },
                    blockTypes: {
                        acceptReporters: false, // Allows users to drop a round block into the menu
                        items: [
                            { text: 'Command', value: 'Scratch.BlockType.COMMAND' },
                            { text: 'Reporter', value: 'Scratch.BlockType.REPORTER' },
                            { text: 'Boolean', value: 'Scratch.BlockType.BOOLEAN' },
                            { text: 'Conditional', value: 'Scratch.BlockType.CONDITIONAL' },
                            { text: 'Loop', value: 'Scratch.BlockType.LOOP' },
                            { text: 'Hat', value: 'Scratch.BlockType.HAT' },
                            { text: 'Event', value: 'Scratch.BlockType.EVENT' }
                        ]
                    },
                    argumentTypes: {
                        acceptReporters: false, // Allows users to drop a round block into the menu
                        items: [
                            { text: 'String', value: 'Scratch.ArgumentType.STRING' },
                            { text: 'Number', value: 'Scratch.ArgumentType.NUMBER' },
                            { text: 'Boolean', value: 'Scratch.ArgumentType.BOOLEAN' }
                        ]
                    },
                    definitionTypes: {
                        acceptReporters: false, // Allows users to drop a round block into the menu
                        items: [
                            { text: 'Extension meta data', value: 'emd' },
                            { text: 'Extension blocks', value: 'eb' },
                            { text: 'Block meta data', value: 'bmd' },
                            { text: 'Block arguments', value: 'bargs' },
                        ]
                    }
                }
            };
        }

        /**
         * This helper looks at the blocks snapped under the Hat
         * and turns them into a JS string.
         */
        transpile(currentId, target) {
            let lines = [];

            while (currentId) {
                const block = target.blocks.getBlock(currentId);
                const opcode = block.opcode;

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
                const getVal = (name) => this.resolveInput(block, name, target);

                switch (opcode) {
                    case `${extension_id}_setMetaData`:
                        const tag = block.fields.METATAG.value;
                        const val = getVal('VALUE');
                        // Formatting for your JSON/Object view
                        lines.push(`  ${tag}: ${val},`);
                        break;

                    case `${extension_id}_generateExtensionMetaData`:
                        const definitionType = block.fields.DEFINITIONTYPE.value;

                        this.buildDefinition(definitionType, lines, substackId, target);
                        break;

                    case `${extension_id}_buildBlockType`:
                        lines.push(block.fields.TYPE.value);
                        break;

                    case `${extension_id}_defineArguments`:
                        let arg_type = block.fields.TYPE.value;
                        let arg_default = getVal('DEFAULT');
                        let arg_name = getVal('NAME');

                        lines.push(arg_name + `: {`);
                        lines.push(`  type: ${arg_type},`);
                        lines.push(`  defaultValue: ${arg_default}`);
                        lines.push(`}`);
                        break;

                    default:
                        const target = Scratch.vm.runtime.getEditingTarget();
                        const spriteName = target.sprite.name;

                        lines.push(`${spriteName}.${opcode}(${this.getBlockArguments(block, target)});\n`);
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
            const args = [];
            for (const inputName in block.inputs) {
                const input = block.inputs[inputName];

                // Check if the input is a simple value (shadow) or another block (reporter)
                if (input.shadow && !input.block) {
                    // It's a direct value like a number or string
                    const value = target.blocks.getBlock(input.shadow).fields.VALUE.value;
                    args.push(JSON.stringify(value)); // JSON.stringify adds quotes to strings automatically
                } else if (input.block) {
                    // It's a nested reporter block (e.g., 'distance to mouse')
                    // You would recursively call a 'generateCode' function here
                    console.log(input.block)
                    args.push(this.transpile(input.block, target)); // Recursively transpile the nested block
                }
            }
            return args.join(', ');
        }

        buildDefinition(definitionType, lines, substackId, target) {
            switch (definitionType) {
                case 'emd':
                    lines.push(`  getInfo() {`);
                    lines.push(`    return {`);
                    if (substackId) lines.push(this.transpile(substackId, target));
                    lines.push(`    };`);
                    lines.push(`  }`);
                    break;

                case 'eb':
                    lines.push(`blocks: [`);
                    if (substackId) lines.push(this.transpile(substackId, target));
                    lines.push(`]`);
                    break;

                case 'bmd':
                    lines.push(`{`);
                    if (substackId) lines.push(this.transpile(substackId, target));
                    lines.push(`}`);
                    break;

                case 'bargs':
                    lines.push(`arguments: {`);
                    if (substackId) lines.push(this.transpile(substackId, target));
                    lines.push(`}`);
                    break;

                default:
                    lines.push(`// Unknown definition type: ${definitionType}`);
            }
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

            // 1. Find our "Define" Hat block in the workspace
            let hatId = null;
            let opcode_hats = [];
            for (const id in allBlocks) {
                if (allBlocks[id].opcode === `${extension_id}_defineExtensionHat`) {
                    if (!hatId) {
                        hatId = id;
                    }
                } else if (allBlocks[id].opcode === `${extension_id}_defineBlockFunction`) {
                    opcode_hats.push(id);
                }
            }

            if (!hatId) {
                this.generatedCode = "// Please place the 'define' hat block!";
                return;
            }

            // 2. Get the name from the hat block's inputs
            const nameBlockId = allBlocks[hatId].inputs.NAME.block;
            const extensionName = allBlocks[nameBlockId].fields.TEXT.value || "MyExtension";

            // 3. Generate the class string
            const body = this.transpile(target.blocks.getNextBlock(hatId), target); // pass the hat id here instead of in the transpile function so we ca nreuse the transpile function

            let opcode_body = '';
            opcode_hats.forEach(hatId => {
                const opcode_name_block_id = allBlocks[hatId].inputs.OPCODENAME.block;
                const opcode_name = allBlocks[opcode_name_block_id].fields.TEXT.value || "opcode_name";

                const hat_body = this.transpile(target.blocks.getNextBlock(hatId), target);
                opcode_body += `\n  ${opcode_name} (args, util) {\n${hat_body}\n  }\n`.replaceAll('"', ''); // Remove quotes if any
            });

            this.generatedCode = `class ${extensionName} {\n  constructor() {}\n ${body}\n \n ${opcode_body}\n\n}\n Scratch.extensions.register(new ${extensionName}());`;
            console.log(this.generatedCode);
        }

        getCode(args, util) {
            this.updateCode(args, util); // Ensure code is up-to-date before returning
            return this.generatedCode;
        }

        // The Hat block itself doesn't need to do anything special to "run"
        defineExtensionHat() {
            return false;
        }
    }

    Scratch.extensions.register(new CodeGeneratorExtension());
})(Scratch);