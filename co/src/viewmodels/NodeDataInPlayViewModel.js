import { fetchNodeDataEachNode, fetchNodeDataEachChapter, 
    fetchAllNodes2,
    fetchNodeDataEachChapter2
 } from '../models/NodeDataInPlayModel_Firebase';



export async function fetchNodeDataEachNodeVM({projectName, uname, chapterKey, nodeKey, bkOption}) {
    // let data = {};

    // if (bkOption === "firebase") {
    //     data = await fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey});
    // }

    // return data;
    alert("not using#");
}


export async function fetchNodeDataEachChapterVM({projectName, uname, chapterKey, bkOption}) {
    // let data = {};

    // if (bkOption === "firebase") {
    //     data = await fetchNodeDataEachChapter({projectName, uname, chapterKey});
    // }
    
    // return data;
    alert("not using#");

}

export async function fetchAllNodes2VM({projectName, uname}) {
    return await fetchAllNodes2({projectName, uname});
}

export async function fetchNodeDataEachChapter2VM({projectName, uname, chapterKey}) {
    return await fetchNodeDataEachChapter2({projectName, uname, chapterKey});
}