import { convSingleNodeUpdateToCloud, convNodeFetchFromCloud, addNewNodeFolders, convNodeAllDetailsFromCloud } from '../models/NodeEditingModel';

export async function convSingleNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj, uiDataObj}) {
    return await convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj});
}

export async function convNodeFetchFromCloudVM({project, username, chapterKey, nodeKey}) {
    return await convNodeFetchFromCloud({project, username, chapterKey, nodeKey});
}

export async function addNewNodeFoldersVM({project, username, nodeList, chapterKey}) {
    await addNewNodeFolders({project, username, nodeList, chapterKey});
}

export async function convNodeAllDetailsFromCloudVM({project, username, chapterKey, nodeKey}) {
    return await convNodeAllDetailsFromCloud({project, username, chapterKey, nodeKey});
}