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
                            { text: 'Hat', value: 'Scratch.BlockType.EVENT' }
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

                let substackId = null;
                try {
                    substackId = block.inputs.SUBSTACK ? block.inputs.SUBSTACK.block : null;
                } catch (e) {
                    console.error(`Error processing block ${opcode}:`, e);
                }

                // Helper to get a clean value for any input
                const getVal = (name) => this.resolveInput(block, name, target);

                switch (opcode) {
                    case 'motion_movesteps':
                        lines.push(`sprite.moveSteps(${getVal('STEPS')});`);
                        break;

                    case 'looks_say':
                        lines.push(`sprite.say(${getVal('MESSAGE')});`);
                        break;

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
                        lines.push(`// Logic for ${opcode} not yet implemented`);
                }

                currentId = target.blocks.getNextBlock(currentId);
            }
            return lines.join('\n');
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
            for (const id in allBlocks) {
                if (allBlocks[id].opcode === `${extension_id}_defineExtensionHat`) {
                    hatId = id;
                    break;
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
            this.generatedCode = `class ${extensionName} {\n  constructor() {}\n ${body}\n }\n Scratch.extensions.register(new ${extensionName}());`;
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