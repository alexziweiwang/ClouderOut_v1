import { fetchNodeDataEachNode, fetchNodeDataEachChapter } from '../models/NodeDataInPlayModel_Firebase';

const backendFlag = "firebase"; //TODO6000


export async function fetchNodeDataEachNodeVM({projectName, uname, chapterKey, nodeKey}) {
    let data = {};

    if (backendFlag === "firebase") {
        data = await fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey});
    }

    return data;
}


export async function fetchNodeDataEachChapterVM({projectName, uname, chapterKey}) {
    let data = {};

    if (backendFlag === "firebase") {
        data = await fetchNodeDataEachChapter({projectName, uname, chapterKey});
    }
    
    return data;
}
