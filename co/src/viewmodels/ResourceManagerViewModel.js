import { submitFile, getRmFileList, addToRmFileList, fetchUrlByFilename } from "../models/ResourceManagerModel";

export function submitFileVM({file, uname}) {
    console.log("submitFile VM :::"); //TODO test

    submitFile({file, uname});
}

export async function getRmFileListVM({uname}) {
    const arr = getRmFileList({uname});
    return arr;
}

export async function addToRmFileListVM({uname, filetitle}) {
    addToRmFileList({uname, filetitle});
}

export async function fetchUrlByFilenameVM({fullFilename}) {
    const url = await fetchUrlByFilename({fullFilename});
    return url;
}