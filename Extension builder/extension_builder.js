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
                name: 'JS Code Maker',
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
                        text: 'Define extension meta data',
                        branchCount: 1 // This is the magic property
                    },
                    {
                        opcode: 'getCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Display generated code',
                        disableMonitor: false
                    },
                    {
                        opcode: 'updateCode',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Log code'
                    }
                ]
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

                console.log(opcode)
                // Simple Translation Map
                if (opcode === 'motion_movesteps') {
                    const steps = target.blocks.getBlock(block.inputs.STEPS.block).fields.NUM.value;
                    lines.push(`    this.move(${steps});`);
                } else if (opcode === 'looks_say') {
                    const message = target.blocks.getBlock(block.inputs.MESSAGE.block).fields.TEXT.value;
                    lines.push(`    console.log("${message}");`);
                } else if (opcode === `${extension_id}_generateExtensionMetaData`) {
                    // 1. Get the ID of the block literally inside the mouth
                    const branchInput = block.inputs.SUBSTACK;
                    const branchBlockId = branchInput ? branchInput.block : null;

                    // 2. Transpile that branch (using a helper or the same function)
                    let branchCode = "";
                    if (branchBlockId) {
                        branchCode = this.transpile(branchBlockId, target);
                    }

                    lines.push(`  getInfo() {`);
                    lines.push(`    return {`);
                    lines.push(branchCode); // Put the contents of the mouth here
                    lines.push(`    };`);
                    lines.push(`  }`);
                } else {
                    lines.push(`    // Unknown block: ${opcode}`);
                }

                currentId = target.blocks.getNextBlock(currentId);
            }
            return lines.join('\n');
        }

        generateExtensionMetaData() {
            return `
            getInfo() {
    return {
    };
  }
`;
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
            this.generatedCode = `class ${extensionName} {\n  constructor() {\n super();\n  }\n ${body}\n }`;
            console.log(this.generatedCode);
        }

        getCode() {
            return this.generatedCode;
        }

        // The Hat block itself doesn't need to do anything special to "run"
        defineExtensionHat() {
            return false;
        }
    }

    Scratch.extensions.register(new CodeGeneratorExtension());
})(Scratch);