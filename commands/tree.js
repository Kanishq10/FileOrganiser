const fs=require("fs")
const path=require("path")
function treefn(pathname){
    if(pathname=="current"){
        pathname=__dirname;
        console.log(pathname);
    }
    if(pathname==undefined || fs.existsSync(pathname)==false){
        // console.log("Please provide a path");
        treefnhelper("",process.cwd());                           //return the current working directory of node.js
        return;
    }
    else{
        treefnhelper("",pathname);
    }
}

function treefnhelper(indentation,dirpath){
    if(fs.lstatSync(dirpath).isFile()){
        let fname=path.basename(dirpath);
        console.log(indentation+"├───",fname);
    }
    else{
        let dname=path.basename(dirpath);
        console.log(indentation+"└───",dname);
        let childs=fs.readdirSync(dirpath);
        for(let i=0;i<childs.length;i++){
            let childpath=path.join(dirpath,childs[i]);
            treefnhelper(indentation+"\t",childpath);
        }
    }
}

module.exports={
    treeKey:treefn
}