import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename, fetchProjectResourceVarPairs, storeProjectResourceVarPairsToCloud, removeFromRmFileList } from "../models/ResourceManagerModel_Firebase";

const backendFlag = "firebase"; //TODO6000

export async function submitFileVM({file, uname, filename}) {
    if (filename === "" || filename === undefined) {
        return;
    }
    
 //TODO5000 bk-imp
   
    if (backendFlag === "firebase") {
                                        console.log("step1. submitFileVM ::: ", filename); //TODO test
        await submitFile({file, uname, filename});
    }



}

export async function getRmFileListVM({uname}) {
    let arr = [];
//TODO5000 bk-imp

    if (backendFlag === "firebase") {
        arr = await getRmFileList({uname});
    }

    return arr;
}

export async function addToRmFileListVM({uname, filetitle, fileUrl, fileType}) {
    //TODO5000 bk-imp

    if (backendFlag === "firebase") {
        await addToRmFileList({uname, filetitle, fileUrl, fileType});
    }
}

export async function removeFromRmFileListVM({uname, filetitle})  {
    //TODO5000 bk-imp

    if (backendFlag === "firebase") {
        await removeFromRmFileList({uname, filetitle});
    }
}

export async function fetchUrlByFilenameVM({fullFilename}) {
    let res = {};
//TODO5000 bk-imp

    if (backendFlag === "firebase") {
        res = await fetchUrlByFilename({fullFilename});
    }

    return res;
}

export async function fetchProjectResourceVarPairsVM({userName, projectName}) {
    let res = {}; 
    //TODO5000 bk-imp

    if (backendFlag === "firebase") {
        res = await fetchProjectResourceVarPairs({userName, projectName});
    }
    
    return res;
}

export async function storeProjectResourceVarPairsToCloudVM({userName, projectName, obj}) {
    //TODO5000 bk-imp

    if (backendFlag === "firebase") {
        await storeProjectResourceVarPairsToCloud({userName, projectName, obj})
    }
}