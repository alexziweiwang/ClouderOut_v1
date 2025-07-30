import { fetchNodeDataEachNode, fetchNodeDataEachChapter, fetchAllNodes2 } from '../models/NodeDataInPlayModel_Firebase';



export async function fetchNodeDataEachNodeVM({projectName, uname, chapterKey, nodeKey, bkOption}) {
    let data = {};

    if (bkOption === "firebase") {
        data = await fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey});
    }

    return data;
}


export async function fetchNodeDataEachChapterVM({projectName, uname, chapterKey, bkOption}) {
    let data = {};

    if (bkOption === "firebase") {
        data = await fetchNodeDataEachChapter({projectName, uname, chapterKey});
    }
    
    return data;
}

export async function fetchAllNodes2VM({projectName, uname}) {
    return await fetchAllNodes2({projectName, uname});
}