import { submitFile, getRmFileList} from "../models/ResourceManagerModel";

export function submitFileVM({file, uname}) {
    console.log("submitFile VM :::"); //TODO test

    submitFile({file, uname});
}

export async function getRmFileListVM({uname}) {
    const arr = getRmFileList({uname});
    return arr;
}