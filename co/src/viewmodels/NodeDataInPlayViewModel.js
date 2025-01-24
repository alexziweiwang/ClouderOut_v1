import { fetchNodeDataEachNode } from '../models/NodeDataInPlayModel';


export async function fetchNodeDataEachNodeVM({projectName, uname, chapterKey, nodeKey}) {

    return await fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey});
}