import { addNewNodeFolders, singleNodeGetFromCloud, singleNodeWriteToCloud } from '../models/NodeEditingModel_Firebase';


export async function singleNodeWriteToCloudVM({project, username, chapterKey, nodeKey, dataObj}) {
    await singleNodeWriteToCloud({project, username, chapterKey, nodeKey, dataObj});
}

export async function singleNodeGetFromCloudVM({project, username, chapterKey, nodeKey, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await singleNodeGetFromCloud({project, username, chapterKey, nodeKey});
    }
    
    return res;
}

export async function addNewNodeFoldersVM({project, username, nodeList, chapterKey, bkOption}) {

    if (bkOption === "firebase") {
        await addNewNodeFolders({project, username, nodeList, chapterKey});
    }

}
