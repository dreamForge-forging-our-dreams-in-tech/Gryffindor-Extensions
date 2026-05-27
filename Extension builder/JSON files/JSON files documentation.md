# blocks

### defining the block or argument type
Block/Argument types are no longer defined using Scratch.blockType or Scratch.argumentType but instead are now jsut a upper case string of the type you want e.g. "HAT" or "STRING"

# block_codes

## The directory.json file
The directory.json file tells the compiler where the code for each opcode is located, the key is the file name and the value is an array wit hal lthe opcodes inside of that file.

## defining the opcode

You can define the opcode in a json file by simply putting the Opcode in it, the compiler then grabs the opcode associated with a block and finds the correct opcode in the json file.

### opcode name

{
    "getArgumentValue": { <--- the name of the opcode
        "singleline": true,
        "code": [
            "args.",
            "NAME"
        ]
    }
}

### argument values
The extension builder compiler builds your code from a simple array, in this array you have to explicity tell it where to place the values of the arguments, you do this by making a seperate list item with the name of the argument.

{
    "getArgumentValue": {
        "singleline": true,
        "code": [
            "args.",
            "[NAME]" <--- Argument name with brackets to tell the system its an argument, do not call it [TRANSPILE] as this tells the compiler it should transpile the next blocks.
        ]
    }
}

### compiling singleLine code

Due to readability issues the compiler can sometimes make single line code become multi line code or vice versa, to solve this you can use the singleLine property in the json to explicity tell the compiler to compile the current batch as a single line, by default this is false (multiline), if its set to false the compiler automatically appends a newline at the end of each line of code to create a more readable code structure.

{
    "getArgumentValue": {
        "singleLine": true, <--- Tells the compiler to make the code into a singleLine, defaults to false (multiline code)
        "code": [
            "args.",
            "NAME"
        ]
    }
}

# extension support
Are you a extension developer and you want to bring support for the extension builder and your extension? Then this section is for you!

## file structure
By default all code for the blocks is placed inside of the JSON files folder then inside of that folder is another folder placed called block_codes, inside this folder you place a directory.json file (used by the compiler to find where the code is located)