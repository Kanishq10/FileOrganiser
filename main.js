#!/usr/bin/env node
//for making it global👆 
const fs=require("fs")
const path=require("path")

//import others elements
let organiser=require("./commands/organise")
let helper=require("./commands/help")
let tree=require("./commands/tree")
//getting input from console
let input=process.argv.slice(2);  // The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.
// console.log(input);

//node main.js help
//node main.js organise "pathname"
//node main.js tree "pathname"
let command=input[0];
switch (command) {
    case "organise":
        organiser.organiseKey(input[1]);
        break;
    case "tree":
        tree.treeKey(input[1]);
        break;
    case "help":
        helper.helpKey();
        break;
    default:
        console.log("Plese provide us the command🤷")
        break;
}