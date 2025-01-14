import { convNodeUpdateToCloud, convNodeFetchFromCloud } from '../models/NodeEditingModel';

export async function convNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj}) {
    return await convNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj});
}

export async function convNodeFetchFromCloudVM({project, username, chapterKey, nodeKey}) {
    return await convNodeFetchFromCloud({project, username, chapterKey, nodeKey});
}