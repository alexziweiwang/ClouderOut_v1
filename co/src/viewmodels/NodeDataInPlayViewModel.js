import { fetchNodeDataEachNode, fetchNodeDataEachChapter } from '../models/NodeDataInPlayModel_Firebase';



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
