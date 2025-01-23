import { fetchNodeData } from '../NodeDataInPlayModel';


export async function fetchNodeDataVM({projectName, uname, nodeKey}) {

    await fetchNodeData({projectName, uname, chapterKey, nodeKey});

}