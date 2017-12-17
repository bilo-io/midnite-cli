#!/usr/bin/env node

const asciify = require('asciify')
const colors = require('colors')
const fs = require('file-system')
const program = require('commander')
const [, , ...args] = process.argv;

const reactFiles = require('./blueprints/react/index.js')

docsMenu = () => {
    const menu = `
    cpt | component)` + `       create a react component`.yellow + `
    ctn | container)` + `       create a react/redux container`.yellow + `
    hoc | highOrdCpt)` + `      create a react higher order component`.yellow + `
    rdc | reducer) ` + `        create a redux reducer`.yellow + `
    act | action)` + `          create a redux action`.yellow

    asciify('midnite-cli', (err, res) => {
        console.log(res.cyan, menu)
    });
}

createFile = (path, name, meta, indexed=true) => {
    console.log(`creating: ${path}/${name}`.cyan)
    fs.mkdir(path, () => {
        console.log(`copying:   ./blueprints/${meta.lib}/${meta.name}`.blue)
        fs.copyFile(`./blueprints/${meta.lib}/${meta.name}`,`${path}/${indexed ? `${name}/index` : name }.js`, () => {
            console.log(`[+] ./${path}/${name}.js`.green)
        })
        // fs.readFile(`./blueprints/${meta.lib}/${meta.name}`, (err, response) => {
        //     if (err) {
        //         return console.log(`an error occured reading '${meta.lib}/${meta.name}'`.red )
        //     }
        //     console.log(response.green)
        //     // let file = response.replace(meta.var, name);    
        //     // console.log(`${file}`.green)

        //     fs.writeFile(`./${path}/${name}.js`, file, () => {
        //         console.log(`[+] ./${path}/${name}.js`.green)
        //     })
        // })
    })
}

initProject = (projectName) => {
    fs.mkdir(`./${projectName}`, () => {
        fs.mkdir(`./${projectName}/src`, () => {
            fs.mkdir(`./${projectName}/src/components`, () => console.log('[+] src/components'.green))
            fs.mkdir(`./${projectName}/src/containers`, () => console.log('[+] src/containers'.green))
            fs.mkdir(`./${projectName}/src/actions`, () => console.log('[+] src/actions'.green))
            fs.mkdir(`./${projectName}/src/reducers`, () => console.log('[+] src/reducers'.green))
        })
    })
}

cliCommands = (args) => {
    command = args[0]
    nameVar = args[1]
    switch (command) {
        case '-i':
        case 'init':
            initProject(nameVar)    
            break;
        case 'act':
        case 'action':
            createFile('./src/actions', nameVar, { lib: 'react', name: 'action.js', var: 'myAction'} ) 
            break;
        case 'cpt':
        case 'component':
            createFile('./src/components', nameVar, { lib: 'react', name: 'component.js', var: 'MyComponent'} )
            break;
        case 'ctn':
        case 'container':
            createFile('./src/containers', nameVar, { lib: 'react', name: 'container.js', var: 'MyComponent'} )
            break;
        case 'hoc':
            createFile('./src/hoc', nameVar, { lib: 'react', name: 'hoc.js', var: 'higherOrderComponent'} )
            break;
        case 'rdc':
        case 'reducer':
            createFile('./source/hoc', nameVar, { lib: 'react', name: 'hoc.js', var: 'higherOrderComponent'} )
            break;
        default:
            docsMenu()
            break;
    }
}

cliCommands(args)