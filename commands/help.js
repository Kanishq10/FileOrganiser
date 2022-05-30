function helpfn(){// for string fomatting we use ``
    console.log(`
    node main.js help
    node main.js organise "pathdir"
    node main.js tree "pathdir"
    `);
}

//for exporting to other function
module.exports={
    helpKey:helpfn
}