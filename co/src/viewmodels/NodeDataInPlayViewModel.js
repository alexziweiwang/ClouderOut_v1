import { fetchNodeDataEachNode, fetchNodeDataEachChapter } from '../models/NodeDataInPlayModel';


export async function fetchNodeDataEachNodeVM({projectName, uname, chapterKey, nodeKey}) {
    return await fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey});
}


export async function fetchNodeDataEachChapterVM({projectName, uname, chapterKey}) {
    return await fetchNodeDataEachChapter({projectName, uname, chapterKey});
}