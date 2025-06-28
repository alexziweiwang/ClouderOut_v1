import { convSingleNodeUpdateToCloud, addNewNodeFolders, convNodeBothPartsFromCloud } from '../models/NodeEditingModel_Firebase';


export async function convSingleNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj, uiDataObj, bkOption, nodeType}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj, nodeType});
    }

    return res;
}

export async function convNodeBothPartsFromCloudVM({project, username, chapterKey, nodeKey, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await convNodeBothPartsFromCloud({project, username, chapterKey, nodeKey});
    }
    
    return res;
}

export async function addNewNodeFoldersVM({project, username, nodeList, chapterKey, bkOption}) {

    if (bkOption === "firebase") {
        await addNewNodeFolders({project, username, nodeList, chapterKey});
    }

}
