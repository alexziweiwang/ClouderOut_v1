import { 
    uploadFileToCloud, 
    fetchRmFileList, 
    changeRmFileList,
    addToRmFileList, 
    fetchUrlByFilename, 
    fetchProjectResourceVarPairs, 
    storeProjectResourceVarPairsToCloud, 
    removeFromRmFileList 
} from "../models/ResourceManagerModel_Firebase";

export async function uploadFileToCloudVM({file, uname, filename, bkOption}) {
    if (filename === "" || filename === undefined) {
        return;
    }
       
    if (bkOption === "firebase") {
                                        console.log("step1. uploadFileToCloud-VM ::: ", filename); //TODO test
        await uploadFileToCloud({file, uname, filename});
    }



}

export async function fetchRmFileListVM({uname, bkOption}) {
    let arr = [];

    if (bkOption === "firebase") {
        arr = await fetchRmFileList({uname});
    }

    return arr;
}

export async function changeRmFileListVM({uname, fileList, bkOption}) {
    if (bkOption === "firebase") {
        await changeRmFileList({uname, fileList});
    }

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

export async function fetchUrlByFilenameVM({fullFilename, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchUrlByFilename({fullFilename});
    }

    return res;
}

export async function fetchProjectResourceVarPairsVM({userName, projectName, bkOption}) {
    alert("should remove this func!");
}

export async function storeProjectResourceVarPairsToCloudVM({userName, projectName, obj, bkOption}) {

    if (bkOption === "firebase") {
        await storeProjectResourceVarPairsToCloud({userName, projectName, obj})
    }
}