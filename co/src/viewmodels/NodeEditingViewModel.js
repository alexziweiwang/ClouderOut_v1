import { convSingleNodeUpdateToCloud, addNewNodeFolders, convNodeBothPartsFromCloud } from '../models/NodeEditingModel';

export async function convSingleNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj, uiDataObj}) {
    return await convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj});
}

export async function convNodeBothPartsFromCloudVM({project, username, chapterKey, nodeKey}) {
    return await convNodeBothPartsFromCloud({project, username, chapterKey, nodeKey});
}

export async function addNewNodeFoldersVM({project, username, nodeList, chapterKey}) {
    await addNewNodeFolders({project, username, nodeList, chapterKey});
}
