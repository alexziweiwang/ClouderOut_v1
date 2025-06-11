import { emptyConvNodeSinglePieceTemplate, emptyConvNodeUiAllTemplate } from '../components/_dataStructure_DefaultObjects';


export async function prepareForNewChapterMapping_vm (newKey, chapterNodeMapAll, setChapterNodeMapAll, setNodeMapUpdatedSignal, convertNodeMapToGridBlocks, setGridBlocksAll, setGridBlocksUpdatedSignal, updateChapterNodeMappingsToCloud) {
    //update all-node-map

    let nodeMapTemp = chapterNodeMapAll;
    let chapterStartKeyStr = "chapterStart";
    let chapterStartTitleStr = "Chapter Start"

    let chapterEndKeyStr = "chapterEnd";
    let chapterEndTitleStr = "Chapter End";

    let obj = {};
    obj[chapterStartKeyStr] = {
      nodeName: chapterStartTitleStr, 
      row: 2, 
      col: 0, 
      nextNode:"", 
      display: true, 
      nodeType:"*chapterStart*", 
      screenSize:"4:3(horizonal)"
    };
    obj[chapterEndKeyStr] = {
      nodeName: chapterEndTitleStr, 
      row: 2, 
      col: 5, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"4:3(horizonal)"
    };
    nodeMapTemp[newKey] = obj;

    setChapterNodeMapAll(nodeMapTemp);
    setNodeMapUpdatedSignal(true);

    //add all-grid-block with conversion of node-map to node-grid
    let gridAllTemp = convertNodeMapToGridBlocks(nodeMapTemp);
    setGridBlocksAll(gridAllTemp);

    setGridBlocksUpdatedSignal(true);

    //update to cloud
    await updateChapterNodeMappingsToCloud(nodeMapTemp); 


}


export async function triggerCreatedNewNode_vm (
    newNodeKey, chapterKeyTemp, nodeTypeTemp, setCreateNodeFolderSignal,
    createdNewNodeWaitlist,
    setCreatedNewNodeWaitlist,
    setCreatedNewNodeWaitListPending
) {
    
    setCreateNodeFolderSignal(true);

    let newNodeList = createdNewNodeWaitlist;
    let infoObj = {
      "nodeKey": newNodeKey,
      "chapKey": chapterKeyTemp,
      "nodeType": nodeTypeTemp,
    }


    let nodeObj = {};

    if (nodeTypeTemp === "Conversation") {
      let convNodeArr = [];
      
      const contentItem = {};
      Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
        contentItem[currKey] = emptyConvNodeSinglePieceTemplate[currKey];
      });

      convNodeArr.push(contentItem);

      console.log("new conv-node created!!", contentItem, "\n" ,convNodeArr);
      
      nodeObj["nodeContent"] = convNodeArr;


      const uiItem = {};
      Object.keys(emptyConvNodeUiAllTemplate).map((currKey) => {
          let insideObj = emptyConvNodeUiAllTemplate[currKey]; //read

          let insideWrite = {};

          Object.keys(insideObj).map((insideKey)=>{
              insideWrite[insideKey] = insideObj[insideKey];
          })

          uiItem[currKey] = insideWrite;
      });      
      nodeObj["nodeUISettings"] = uiItem;

    }

    infoObj["detailObj"] = nodeObj;


    newNodeList.push(infoObj);
    setCreatedNewNodeWaitlist(newNodeList); // append this node into node-adding-list ...
    setCreatedNewNodeWaitListPending(true);

  }
