import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename, fetchProjectResourcePairs } from "../models/ResourceManagerModel";

export function submitFileVM({file, uname}) {
    console.log("submitFile VM :::"); //TODO test

    const url = submitFile({file, uname});
    return url;
}

export async function getRmFileListVM({uname}) {
    const arr = getRmFileList({uname});
    return arr;
}

export async function addToRmFileListVM({uname, filetitle, fileUrl, fileType}) {
    addToRmFileList({uname, filetitle, fileUrl, fileType});
}

export async function fetchUrlByFilenameVM({fullFilename}) {
    const url = await submitFile({fullFilename});
    return url;
}

export async function fetchProjectResourcePairsVM({userName, projectName}) {
    return fetchProjectResourcePairs({userName, projectName});
}