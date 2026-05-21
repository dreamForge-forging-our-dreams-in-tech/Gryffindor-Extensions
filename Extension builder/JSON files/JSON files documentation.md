# block_codes

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
            "NAME" <--- Argument name
        ]
    }
}

### compiling singleLine code

Due to readability issues the compiler can sometimes make single line code become multi line code or vice versa, to solve this you can use the singleLine property in the json to explicity tell the compiler to compile the current batch as a single line,

{
    "getArgumentValue": {
        "singleLine": true, <--- Tells the compiler to make the code into a singleLine, defaults to false (multiline code)
        "code": [
            "args.",
            "NAME"
        ]
    }
}