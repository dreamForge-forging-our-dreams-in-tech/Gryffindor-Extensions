# Class and Category naming

## Use simple and clear names

Make sure that the class name is a easily recognizable name for example, a extension for picking files should be called file_picker and not file_explorer, file_explorer indicates that its a place to explore files not that its a file picker that lets users select files.

The class and extension name should immediatly tell the user what it does.

## CamelCasing

Because Scratch editors dont allow CamelCasing you can stop using them in your class names, recognizability is more important than naming conventions.

## Scratch requirements

For recognizability class names must match the category name thats used inside of any scratch like builder, this ensures that when code is transfered from block based to Javascript based or vice versa any used functions are easy to find and recognizable.

# Installation.

Because one of the goals of this project is to make it easier for kids to switch from block based coding to regular coding, classes do not need to be initlialized by them, the installer automatically handles this for them and accesing code can be done by accesing the Lucy object like so: Lucy.<classname>.<function> aka Lucy.filepicker.select_file();