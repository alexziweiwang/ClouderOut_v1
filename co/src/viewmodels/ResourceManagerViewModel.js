import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename, fetchProjectResourceVarPairs, updateProjectResourceVarPairs } from "../models/ResourceManagerModel";

export async function submitFileVM({file, uname, filename}) {
    if (filename === "" || filename === undefined) {
        return;
    } else {
        console.log("step1. submitFileVM ::: ", filename); //TODO test
        await submitFile({file, uname, filename});
    }
}

export async function getRmFileListVM({uname}) {
    const arr = getRmFileList({uname});
    return arr;
}

export async function addToRmFileListVM({uname, filetitle, fileUrl, fileType}) {
    addToRmFileList({uname, filetitle, fileUrl, fileType});
}

export async function fetchUrlByFilenameVM({fullFilename}) {
    return await fetchUrlByFilename({fullFilename});
}

export async function fetchProjectResourceVarPairsVM({userName, projectName}) {
    return await fetchProjectResourceVarPairs({userName, projectName});
}

export async function updateProjectResourceVarPairsVM({userName, projectName, obj}) {
    await updateProjectResourceVarPairs({userName, projectName, obj})
}