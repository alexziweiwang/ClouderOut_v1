import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename, fetchProjectResourcePairs, updateProjectResourcePairs } from "../models/ResourceManagerModel";

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

export async function fetchProjectResourcePairsVM({userName, projectName}) {
    return await fetchProjectResourcePairs({userName, projectName});
}

export async function updateProjectResourcePairsVM({userName, projectName, obj}) {
    await updateProjectResourcePairs({userName, projectName, obj})
}