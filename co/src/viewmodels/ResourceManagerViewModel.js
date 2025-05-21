import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename, fetchProjectResourceVarPairs, storeProjectResourceVarPairsToCloud, removeFromRmFileList } from "../models/ResourceManagerModel_Firebase";

const backendFlag = "firebase"; //TODO6000

export async function submitFileVM({file, uname, filename, bkOption}) {
    if (filename === "" || filename === undefined) {
        return;
    }
       
    if (bkOption === "firebase") {
                                        console.log("step1. submitFileVM ::: ", filename); //TODO test
        await submitFile({file, uname, filename});
    }



}

export async function getRmFileListVM({uname, bkOption}) {
    let arr = [];

    if (bkOption === "firebase") {
        arr = await getRmFileList({uname});
    }

    return arr;
}

export async function addToRmFileListVM({uname, filetitle, fileUrl, fileType, bkOption}) {

    if (bkOption === "firebase") {
        await addToRmFileList({uname, filetitle, fileUrl, fileType});
    }
}

export async function removeFromRmFileListVM({uname, filetitle, bkOption})  {

    if (bkOption === "firebase") {
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