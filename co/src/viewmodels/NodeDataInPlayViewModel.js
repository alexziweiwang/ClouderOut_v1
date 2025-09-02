import { fetchNodeDataEachNode, fetchNodeDataEachChapter, 
    fetchAllNodes2,
    fetchNodeByChapter2,
    fetchNodeByNodeKey2
} from '../models/NodeDataInPlayModel_Firebase';


export async function fetchAllNodes2VM({projectName, uname, bkOption}) {
    if (bkOption === "firebase") {
        return await fetchAllNodes2({projectName, uname});
    } else {
        return -2;
    }
}

export async function fetchNodeByChapter2VM({projectName, uname, chapterKey, bkOption}) {
    if (bkOption === "firebase") {
        return await fetchNodeByChapter2({projectName, uname, chapterKey});
    } else {
        return -2;
    }
}

export async function fetchNodeByNodeKey2VM({projectName, uname, chapterKey, nodeKey, bkOption}) {
    if (bkOption === "firebase") {
        return await fetchNodeByNodeKey2({projectName, uname, chapterKey, nodeKey});
    } else {
        return -2;
    }
}