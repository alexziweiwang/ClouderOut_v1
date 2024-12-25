import { convNodeUpdateToCloud, convNodeFetchFromCloud } from '../models/NodeEditingModel';

export async function convNodeUpdateToCloudVM({project, username, chapterKey, nodeKey, dataObj}) {
    await convNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj});
}

export async function convNodeFetchFromCloudVM({project, username, chapterKey, nodeKey}) {
    await convNodeFetchFromCloud({project, username, chapterKey, nodeKey});
}