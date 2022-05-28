const fs=require("fs")
const path=require("path")

let types={
    Document:["txt"],
    Pictures:['png','jpg','img','jpeg'],
    Audio:['mp3'],
    Video:['mp4','mkv'],
    Application:['exe','apk'],
    PDf_Document:['pdf'],
    Archives:['rar','zip']
};

//getting input from console
let input=process.argv.slice(2);  // The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.
// console.log(input);

//node main.js help
//node main.js organise "pathname"
//node main.js tree "pathname"
let command=input[0];
switch (command) {
    case "organise":
        organisefn(input[1]);
        break;
    case "tree":
        treefn(input[1]);
        break;
    case "help":
        helpfn();
        break;
    default:
        console.log("Plese provide us the command🤷")
        break;
}

function helpfn(){// for string fomatting we use ``
    console.log(`
    node main.js help
    node main.js organise "pathdir"
    node main.js tree "pathdir"
    `);
}

function organisefn(pathname){
    if(pathname=="current"){
        pathname=__dirname;
        console.log(pathname);
    }
    else{
        //making folders to organise data 
        let dest;
        if(pathname==undefined){
            pathname=process.cwd();
        }
        dest=path.join(pathname,"organised_Folder");
        if(fs.existsSync(dest)==false){
            fs.mkdirSync(dest);
        }
        // if(!fs.existsSync(path.join(dest,"Pictures"))){
        //     fs.mkdirSync(path.join(dest,"Pictures"));
        // }
        // if(!fs.existsSync(path.join(dest,"Audios"))){
        //     fs.mkdirSync(path.join(dest,"Audios"));
        // }
        // if(!fs.existsSync(path.join(dest,"Documents"))){
        //     fs.mkdirSync(path.join(dest,"Documents"));
        // }
        // if(fs.existsSync(path.join(dest,"Video"))==false){
        //     fs.mkdirSync(path.join(dest,"Video"));
        // }
        // if(fs.existsSync(path.join(dest,"Others"))==false){
        //     fs.mkdirSync(path.join(dest,"Others"));
        // }
        organiserhelper(pathname,dest);
    }
}

function organiserhelper(src,dest){
    let childFiles=fs.readdirSync(src);
    console.log(childFiles);
    for(let i=0;i<childFiles.length;i++){
        let childAddress=path.join(src,childFiles[i]);
        if(fs.lstatSync(childAddress).isFile()){                               //bug fixed😁😁
            let category=childCategory(childFiles[i]);    
            // console.log(category);
            sendFiles(dest,childAddress,category);
        }
    }
}

function childCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    // console.log(ext);
    // compare it with keys in types
    for(keys in types){
        let cytypearr=types[keys];
        for(let i=0;i<cytypearr.length;i++){
            if(ext==cytypearr[i]){
                return keys;
            }
        }
    }
    return "others";
}

function sendFiles(dest,srcpath,category){
    let destination=path.join(dest,category);
    if(!fs.existsSync(destination)){
        fs.mkdirSync(destination);
    }
    let filename=path.basename(srcpath);
    let destfile=path.join(destination,filename)
    fs.copyFileSync(srcpath,destfile);
    console.log(filename," copying to ",destination);
    // fs.unlinkSync(srcpath);     //use carefully as it will delete the files from source folder
}

// --------------------------------------------------------------------------------------------------------------------------------
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