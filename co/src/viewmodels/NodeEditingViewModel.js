import { convSingleNodeUpdateToCloud, convNodeFetchFromCloud, addNewNodeFolders } from '../models/NodeEditingModel';

export async function convSingleNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj}) {
    return await convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj});
}

export async function convNodeFetchFromCloudVM({project, username, chapterKey, nodeKey}) {
    return await convNodeFetchFromCloud({project, username, chapterKey, nodeKey});
}

export async function addNewNodeFoldersVM({project, username, nodeKeyList, chapterKeyList}) {
    await addNewNodeFolders({project, username, nodeKeyList, chapterKeyList});
}