import { fetchNodeData } from '../models/NodeDataInPlayModel';


export async function fetchNodeDataVM({projectName, uname, chapterKey, nodeKey}) {

    await fetchNodeData({projectName, uname, chapterKey, nodeKey});

}