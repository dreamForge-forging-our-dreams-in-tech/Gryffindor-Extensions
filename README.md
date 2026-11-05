# Lucy

A Github repository where il lbe hosting my own programming syntax, scratch extension that are compatible with js and follow the Lucy syntax rules.

## Licensing

This repo uses the apache 2.0 license and everyone is free to fork this repo and use its code but are required to credit the official developer: dreamForge.

## Documentation

Each extension their documentation can be found in the extension its designated folder.

## Installation

Extensions can be installed by uplaoding the extension_installer.js file into turbowarp, this file handles the loading and updating of any installed extensions so that you can keep building your projects without rebuilding them when a newer version releases.

Alternatively you cna install the master installer, which isntalls all available resources, this is recommended to be isntalled for IDEs because isntalling extensions sseperately also means you need to manually configure and isntall all required binaries.

## IDE installation

if you want to use scratch extensions inside of a IDE then add below script to run the isntaller.

        import 'https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/main_installer.js';

        try {
            await window.scratchRuntimeReady;
        } catch (error) {
            console.error('Scratch runtime setup failed:', error);
            throw error;
        }

## Compatability

The extension inside of the turbowarp_gryffindor_only folder are only compatible with those programms while anything outside of that folder is also compatible with regular js and IDE's

As of current testing all extensions are compatible with this system to be used in regular IDE's however be aware that functions read values from the args object, if you have a function that only expects one vlaue then your users are fine entering that vlaue in the (), other wise they have to reconstruct the JSON

e.g.

single value:
test.console('hello');

multi vlaue:
test.console({TYPE:'log', MESSAGE:'test'})

## Syntax

The documentation for the syntax of lucy can be found in its own md file.

## Other extensions

Other extension for Ui design can be found at: <https://github.com/dreamForge-forging-our-dreams-in-tech/Pichai-UX-V2>
