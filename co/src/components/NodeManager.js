import * as React from 'react';
import moment from "moment";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTrashCan } from "react-icons/gi";
import { getChapterDataVM } from '../viewmodels/GameDataViewModel';

export default function NodeManager({projectName, currUser, 
  initialChapterKey, getNodeMapOfChapter, 
  getCurrChapterKey, getGridBlocks,
  initialNodeMap, initialGridBlock,
  updateNodeMapOfChapter, updateGridBlockOfChapter,
  displayGameDataPanel, getGameData, getGdmUpdatedSignal, resetGdmUpdateSignal,
  loadChapterInfoFromCaller,
}) {

    // console.log("Node Manager ?? "); //TODO testing
    // console.log(initialNodeMap); //TODO testing
    // console.log(initialGridBlock); //TODO testing
  
  const [chapterKey, setChapterKey] = useState(initialChapterKey);

  const [newGridActionCreate, setNewGridActionCreate] = useState(true);

  const [toRevertNodeKey, setToRevertNodeKey] = useState("");

  let languageCode = 0;
  let createText = ["Create"];
  let cancelText = ["Cancel"];
  let enterEditorText = ["Enter Editor"];
  let updateText = ["Update"];
  let confirmText = ["Confirm"];
  let detachLinkingText = ["Detach Linking"];
  let addNewConditionTargetText = ["Add a New Condition & Target"];
  let addConditionText = ["Add Condition"];
  let addAsNextNodeText = ["Add As Next-Node"];
  let deleteText = ["Delete"];
  let revertText = ["Revert"];
  let saveToMyProjectText = ["Save To My Project"];
  let nodeManageMentText = ["Node Management"];
  let listOfNodesText = ["List of nodes"];
  let nodeInfoText = ["Node Info"];
  let nodeOperationsText = ["Node Operations"];
  let targetNodesText = ["Target Nodes"];
  let nextNodeText = ["Next Node"];
  let resetText = ["Reset"];


//TODO important note: node data is operated in this component (and level).
//TODO node-data from and to cloud db: later the specific node-editing page might need screen-size fixing, this can be through cloud

  let nodeWidth = 152;
  let nodeHeight = 52;


  //TODO node data from cloud: fetch by username + project_name + chapter_key  
  const chStartName = "chapterStart-key";
  const chEndName = "chapterEnd-"+chapterKey;

  const [nodeRelationshipMap, setNodeRelationshipMap] = useState(initialNodeMap);
  const [gridBlocks, setGridBlocks] = useState(initialGridBlock); //stores node-keys

  const [renderCounter, setRenderCounter] = useState(0);
 
  //TODO functionality design:
  //TODO1 always create default "chapterStart" and "chapterEnd" node, named as "chapterStart-[chapterKey]" and "chapterEnd-[chapterKey]"


   /* variable area */
   const navigate = useNavigate();

   const [clickedNode, setClickedNode] = useState("");
   const [clickedNode2, setClickedNode2] = useState(-1); //TODO using for new data structure
   const [clickedNodeKey, setClickedNodeKey] = useState(""); //TODO using for new data structure
   const [selectedNextNode, setSelectedNextNode] = useState("-");
   const [lscElseSelected, setLscElseSelected] = useState("");
   const [lscCurrSelected, setLscCurrSelected] = useState("");


   const [createNewNodeName, setCreateNewNodeName] = useState('');
   const [createNewNodeGameType, setCreateNewNodeGameType] = useState("");
   const [createdNewNodeScreenSize, setCreatedNewNodeScreenSize] = useState("16:9(horizonal)");
   const [deletingNodeName, setDeletingNodeName] = useState("");
   const [isLinkNewNode, setIsLinkNewNode] = useState(false);
   const [needCloudGameData, setNeedCloudGameData] = useState(true);

   const [nodeToRevert, setToRevert] = useState("");
   const [gameDataLocal, setGameDataLocal] = useState({});

   const [logicSplitter_gameDataVar1, setLsGdataVar1] = useState("");
   const [logicSplitter_gameDataVar2, setLsGdataVar2] = useState("");
   const [logicSplitterVar2IsGData, setLsV2IsGData] = useState(true);
   const [var2NumCompare, setVar2NumCompare] = useState("");
   const [condtVar1Type, setCondtVar1Type] = useState("");
   const [var1StringEq, setVar1StringEq] = useState(true);
   const [var1BoolTrue, setVar1BoolTrue] = useState(true);
   const [currNodeSplittedNum, setCurrNodeSplitterNum] = useState(0);

   const [displayAddNewTargetCondt, setDisplayAddNewTargetCondt] = useState(false);

   const [displayRevertArea, setDisplayRevertArea] = useState(false);
   
   const [addedGameScreenSize, setAddedGameScreenSize] = useState("");

   const [displayGameDataButton, setDisplayGameDataButton] = useState(true);

   const [tempNewName, setTempNewName] = useState("");
   const [tempNewNote, setTempNewNote] = useState("");

   const [addNewNodeAreaDisplay, setAddNewNodeAreaDisplay] = useState(false);


  
   const [firstTimeEnter, setFirstTimeEnter] = useState(true);
   useEffect(() => {
      if (firstTimeEnter === true) {
          // let chapterData = getChapterDataFromCloud(chapter); //TODO: call in later stage
          //updateNodeDataActions(chapterData);
                  //    setNodeData(chapterData);
          // console.log("First enter node data: ");
          // console.log(nodeData);
    //      fetchGameDataFromCloud(); //TODO remove later

          console.log("\t\tFirst Enter - NodeManager: current user is ", currUser); //TODO testing
          
                                      // setNodeRelationshipMap(initialNodeMap);  //TODO remove later
                                      // setGridBlocks(initialGridBlock);  //TODO remove later

          setFirstTimeEnter(false);
      }
  
      // console.log("Node Manager ........."); //TODO testing
      // console.log(initialNodeMap); //TODO testing
      // console.log(initialGridBlock); //TODO testing
      // console.log("local ds:"); //TODO testing
      // console.log(nodeRelationshipMap); //TODO testing
      // console.log(gridBlocks); //TODO testing

      let gameDataTemp = getGameData();
      setGameDataLocal(gameDataTemp);
      let gameDataUpdatedSignal = getGdmUpdatedSignal();
      if (gameDataUpdatedSignal === true) {
        //TODO refresh...
        resetGdmUpdateSignal();
      }


      //TODO fetch this chapter's all node data
          let chapterKeyTemp = getCurrChapterKey();
          if (chapterKeyTemp !== chapterKey) {
            let tempMap = getNodeMapOfChapter();
          
            let gridTemp = getGridBlocks();
            //TODO draw gridBlocks of this chapter
          
            //TODO considerations of col & row, etc.   
                                            // console.log("::: getters...........");
                                            // console.log(tempMap); //TODO testing
                                            // console.log(gridTemp); //TODO testing
                                          
            setNodeRelationshipMap(tempMap);
            setGridBlocks(gridTemp);
            setChapterKey(chapterKeyTemp);
          }
    });

  async function getChapterDataFromCloud(chapter) {
    return await getChapterDataVM({projectName: projectName, uname: currUser, chapterName: chapter});
   
  }

  // function updateNodeDataActions(data) {
  //      setNodeData(data);
  //      //TODO calculate needed scale
  //      console.log("new node data:");
  //      console.log(data); //TODO test

  //      //TODO later: update to cloud db
  // }

  async function updateNodeRelationship() {
    //TODO update current node-data to cloud db
    //TODO cloud node-data design:
      //TODO each node is a collection
      //TODO each node-collection contains many documents
        //TODO for board-game/card-game node, each document is an element?
        //TODO for conversational node, each document is a piece?        

  }

  function enterNodeEditor2() {
    if (nodeRelationshipMap[clickedNodeKey] === undefined) {
      return;
    }

    let currNodeType = nodeRelationshipMap[clickedNodeKey].nodeType;
    let userName = currUser;

    let screenSizeStr = nodeRelationshipMap[clickedNodeKey].screenSize; //TODO5

    console.log("enter editor2:", clickedNodeKey, projectName, userName);
    if (currNodeType === "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNodeKey, projectName, userName, screenSizeStr } });
    } else if (currNodeType === "Conversation") {
      navigate('/conversationnode', { replace: true, state: { clickedNodeKey, projectName, userName, screenSizeStr } });
    }
        //TODO later add conditions for board game and tower defense
  }

  // function updateGDataToCloud(gameDataLatest) {

  //       let project = "";
  //       project  = projectName;
  //       if (project.trim() === "") {
  //         return;
  //       }
  //       updateGameDataVM({projectName: project, uname: currUser, gameData: gameDataLatest});
     
  // } //TODO remove later

  function addNewNode2() { //TODO for new data structure
    let tempNodeMap = nodeRelationshipMap;
    if (createNewNodeGameType === "") {
      console.log("Game type is required.") //TODO test
      return;
    }

    if (createNewNodeName.length > 0) {

      if (tempNodeMap[createNewNodeName] !== undefined || tempNodeMap[createNewNodeName] !== "") {
        console.log("2create-node submitted:" + createNewNodeName + ", " + createNewNodeGameType); // TODO temp

        //clickedNode2: ir * 10000 + ic;
        let clickedCol = clickedNode2 % 10000;
        let clickedRow = (clickedNode2 - clickedCol) / 10000;
        
        let newDataItem = {};

        if (createNewNodeGameType === "LogicSplitter") {
          newDataItem = { 
            nodeName: `${createNewNodeName}`, 
            nodeType:`${createNewNodeGameType}`,
            screenSize: createdNewNodeScreenSize,
            row: clickedRow,
            col: clickedCol,
            spltLogicPairs: [["else", "", "else"],],
            display: true,     
          }; //TODO temp
        } else {
          newDataItem = { 
            nodeName: `${createNewNodeName}`, 
            nodeType:`${createNewNodeGameType}`,
            screenSize: createdNewNodeScreenSize,
            row: clickedRow,
            col: clickedCol,
            nextNode: "",
            display: true,     
          }; //TODO temp
        }



        tempNodeMap[createNewNodeName] = newDataItem;
        setNodeRelationshipMap(tempNodeMap);

        let tempGrid = gridBlocks;
        gridBlocks[clickedRow][clickedCol] = createNewNodeName;
        setGridBlocks(tempGrid);
 
        // reset the creation layout
        setCreateNewNodeName("");
        setCreateNewNodeGameType("");
        setCreatedNewNodeScreenSize("4:3(horizonal)");
        setClickedNode2(-1);
      } else {
        console.log("2Invalid node name: duplicate"); //TODO test

      }
 
    } else {
      console.log("warning: invalid empty node name"); //TODO test
    }
  }


  function addNewNodeGameType(event) {
    setCreateNewNodeGameType(event.target.value); //TODO later update to cloud db
    console.log("changed selection of new game type : " + event.target.value);
  }


  function changeLsVar2ToGameData() {
    setLsV2IsGData(true);
  }

  function changeLsVar2ToValue() {
    setLsV2IsGData(false);
  }

  // async function displayGameDataFunc() { //TODO changed; remove later
  //   setDisplayGameDataButton(false);

  //   if (needCloudGameData === true) {
  //     await fetchGameDataFromCloud();
  //   } else {
  //     console.log("*from local* game-data: using existing data"); 
  //   }
  //   setDisplayGameDataWindow(!displayGameDataWindow);
  //   setDisplayGameDataButton(true);
  // }

  function changeGameScreenSize(event) {
    const input = event.target.value;
    if (event != null && event.target != null && event.target.value!= null) {
      
      if (input === "16:9(horizonal)"
      || input === "16:9(vertical)"
      || input === "4:3(horizonal)"
      ||input === "4:3(vertical)") {
        setSelectedGameScreenSize(event.target.value);
        //TODO pass into cloud: node info
      } else {
        console.log("not selected!");
        setAddedGameScreenSize("");
      }
            
    }
  }

  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }



  // async function fetchGameDataFromCloud() { //TODO3

  //       console.log("!!! This is for project: ", projectName);
  //       let project  = projectName;
  //       console.log("checking2 on project ... [", project, "]");
  //       if (project === undefined || project === null || project === "" || project.trim() === "") {
  //         return;
  //       }
  //       const isUpdated = true;
  //       const gdataTestResult = await getProjectGameDataVM({projectName: project, uname: currUser, mostUpdated: isUpdated});
     
  //       if (gdataTestResult === undefined) {
  //         console.log("Error: no game_data in this project...");
  //         return;
  //       }
  //       console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
  //       setGameDataLocal(gdataTestResult);
  // }

  function updateNodeToNewName2() {
    let tempNodeData = nodeRelationshipMap;

    if (tempNodeData[clickedNodeKey] === undefined) {
      return;
    }

    tempNodeData[clickedNodeKey].nodeName = tempNewName;
    setNodeRelationshipMap(tempNodeData);
  
    setTempNewName("");
  }

  function updateNodeWithNewNote() {
    let tempNodeData = nodeRelationshipMap;

    if (tempNodeData[clickedNodeKey] === undefined) {
      return;
    }

    tempNodeData[clickedNodeKey].notes = tempNewNote;
    setNodeRelationshipMap(tempNodeData);

    setTempNewNote("");
  }

  function deleteNode2() {
    let tempNodeMap = nodeRelationshipMap;
    let tempGridBlocks = gridBlocks;
    // now the node is tempNodeMap[clickedNodeKey]


    if (tempNodeMap[clickedNodeKey] === undefined) {
      return;
    }
    
    // mark this node to "not display"
    tempNodeMap[clickedNodeKey].display = false;

    // delete in grid-blocks
    let r =  tempNodeMap[clickedNodeKey].row;
    let c =  tempNodeMap[clickedNodeKey].col;
    tempGridBlocks[r][c] = "";


    // delete the parent-node's next-node
    Object.keys(tempNodeMap).map((nodeKey) => {
      if (tempNodeMap[nodeKey].nodeType === "LogicSplitter") {
        //traverse spltLogicPairs
        let arr = tempNodeMap[nodeKey].spltLogicPairs;
        let i = 0;
        let len = arr.length;
        let updatedArr = [];
        for(; i < len; i++) {
          let item = arr[i];
          if (item[1] !== clickedNodeKey) {
            //add to new array if not this to-be-deleted node
            updatedArr.push(item);
          }
        }
        tempNodeMap[nodeKey].spltLogicPairs = updatedArr;
       
      } else {
        let nextNodeName = tempNodeMap[nodeKey].nextNode;
        if (nextNodeName !== "" && nextNodeName === clickedNodeKey) {
          tempNodeMap[nodeKey].nextNode = "";
        }
        
      }
    
    });


    setNodeRelationshipMap(tempNodeMap);
    setGridBlocks(tempGridBlocks);

    //update both data structures to outer layer
    updateNodeMapOfChapter(tempNodeMap);
    updateGridBlockOfChapter(tempGridBlocks);
  }



  function updateRenderCounter() {
    setRenderCounter((renderCounter+1) % 100);
  }

  function updateTableCondt() {
    let pairsArr = nodeRelationshipMap[clickedNodeKey].spltLogicPairs;
    if (pairsArr === undefined) {
      return;
    }
    let len = pairsArr.length;
    

      if (len === 0) {
        let pairItem = ["else", lscElseSelected, "else"];
        pairsArr.push(pairItem);
      } else {
        pairsArr[0][1] = lscElseSelected; // update the first element's target node
      }
 

    //TODO update for grid-node-visualization
                        
    let tempNodeRelMap = nodeRelationshipMap;
    tempNodeRelMap[clickedNodeKey].spltLogicPairs = pairsArr;
    setNodeRelationshipMap(tempNodeRelMap);

  }

  function deleteFromCondtTable(index) {
    //nodeRelationshipMap[clickedNodeKey].spltLogicPairs
    let tempPairs = [];
    let i = 0;
    let len = nodeRelationshipMap[clickedNodeKey].spltLogicPairs.length;
    for (; i < len; i++) {
      if (i !== index) {
        tempPairs.push(nodeRelationshipMap[clickedNodeKey].spltLogicPairs[i]);
      }
    }

    let tempNodeRelMap = nodeRelationshipMap;
    tempNodeRelMap[clickedNodeKey].spltLogicPairs = tempPairs;
    setNodeRelationshipMap(tempNodeRelMap);

    updateRenderCounter();
  }

  function highlightGridByKey(keyName) {
    let num = -1;
    let i = 0, j = 0;
    for(; i < gridBlocks.length; i++) {
      j = 0;
      for (; j < gridBlocks[0].length; j++) {
        if (gridBlocks[i][j] == keyName) {
          num = i * 10000 + j;
        }
      }
    }
    return num;
  }

    return (      
        <div style={{"overflow": "scroll", "width": "100%"}}>

        {chapterKey!== "" && <div className="setting_area"> 
      

        {/* //TODO testing panel area */}
        <div style={{"backgroundColor": "orange"}}>
            <label>Chapter Key: {chapterKey}</label>
            <button>Test this chapter</button>
            <label>{nodeManageMentText[languageCode]}</label>

            <button onClick={()=>{
              let chapterNodeMapTemp = loadChapterInfoFromCaller();
              setNodeRelationshipMap(chapterNodeMapTemp);
            }}> TESTing: Fetch chapter data </button>


        </div>


<div style={{"display": "flex"}}> 
          <div style={{
            "height": "350px", 
            "marginRight": "20px",
          
          }}>

                {listOfNodesText[languageCode]}:<br></br>
          
            <ul style={{"width": "320px", "marginLeft": "-25px"}}>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {

                      let item = nodeRelationshipMap[currKey];
                      let liKey = "li" + currKey;
                      let crdCal = highlightGridByKey(currKey);

                      return (<li 
                          key={liKey} 
                          className={(clickedNode2 === crdCal) ? "clickableListItem2Clicked": "clickableListItem2"}
                          style={{"marginBottom": "3px"}}
                          onClick={()=>{
                            
                            if (clickedNode2 === crdCal) {
                              setClickedNode2(-1); //cancel if already clicked on this node
                            } else {
                              setClickedNode2(crdCal);

                              // crdCal = ir * 10000 + ic;
                              let ic = crdCal % 10000;
                              let ir = (crdCal-ic) / 10000;
                              let content = gridBlocks[ir][ic]; 
                              setClickedNodeKey(content);
                            } 
                          }}
                        >
                          {currKey}: {item["nodeName"]}
                        </li>);

                  })}
            </ul>
          </div>  

          {<div style={{
            "overflow": "scroll", 
            "width": "1250px", 
            "position": "relative"}}>
                                  TEST: visualization of node-grids grv marker

{/* link-drawing */}

                                                                                      {/* //TODO1 first part */}
 {gridBlocks.map((rowItem, ir) => {
    let rowKeyStr = "linking" + ir;
    
    return (<div key={rowKeyStr} style={{"position": "absolute"}}>
         {rowItem.map((col,ic) => {
             let currNodeKey = gridBlocks[ir][ic];
            

            if (currNodeKey !== "" 
              && nodeRelationshipMap[currNodeKey] !== undefined 
              && nodeRelationshipMap[currNodeKey].nodeType !== "LogicSplitter") {
      
      
                // case1: not logic-splitter
              let sourceRightLineVStart = 3 + 1 + (nodeHeight / 2) + (nodeHeight + 10) * (ir);
              let sourceRightLineHStart = (10 + nodeWidth + 10 + 2) * (ic + 1);
              let sourceRightLineHEnd = sourceRightLineHStart + 10;
              let extraHorizontalStart  = 0;

              let destLeftLineVStart = 0;
              let destLeftLineHStart = 0;
              
              let betweenNodeVerticalUnit = nodeHeight + 10;
              let betweenNodesVerticalLink = 0;

              let betweenNodeHorizontalUnit = nodeWidth + 22;
              let betweenNodesHorizontalLink = 0;

              let unitDiffVert = 0;
              let unitDiffHori = 0;

              let nextNodeKey = "";

              let hasNextNode = false;
              let srcNodeHigher = true; 
              let srcNodeAtLeft= true; 
 
              if (currNodeKey !== "" && nodeRelationshipMap[currNodeKey] !== undefined) {
                //such a node exists
                if(nodeRelationshipMap[currNodeKey].nodeType !== "LogicSplitter" 
                && nodeRelationshipMap[currNodeKey].nextNode !== "" 
                && nodeRelationshipMap[currNodeKey].nextNode !== "-") {
                  // not logic-splitter & has next-node
                  hasNextNode = true;
                  nextNodeKey = nodeRelationshipMap[currNodeKey].nextNode;


if (nodeRelationshipMap[nextNodeKey] === undefined || nodeRelationshipMap[nextNodeKey] === "") {
  console.log("invalid nodeRelationshipMap[nextNodeKey]: ", nodeRelationshipMap[nextNodeKey]);
  console.log("from node...", currNodeKey);
  console.log("to node...", nextNodeKey);

  return;
}
                  let nextR = nodeRelationshipMap[nextNodeKey].row;
                  let nextC = nodeRelationshipMap[nextNodeKey].col;

                  destLeftLineVStart = 3 + 1 + (nodeHeight / 2) + (nodeHeight + 10) * (nextR);
                  destLeftLineHStart = 10 + (10 + nodeWidth + 10 + 2) * (nextC);
                  extraHorizontalStart  = (10 + nodeWidth + 10 + 2) * (ir + 1);

                  unitDiffVert = nextR - ir;
                  if (unitDiffVert > 0) {
                    srcNodeHigher = false;
                  } else if (unitDiffVert < 0) {
                    unitDiffVert = unitDiffVert * -1;
                  }
                  betweenNodesVerticalLink = unitDiffVert * betweenNodeVerticalUnit + 1;

                  unitDiffHori = nextC - ic;
                  if (unitDiffHori <= 0) { //source-node at right, dest-node at left
                    betweenNodesHorizontalLink = ((unitDiffHori * (-1))+1) * betweenNodeHorizontalUnit;
                    srcNodeAtLeft = false;
                  } else {
                    betweenNodesHorizontalLink = unitDiffHori * betweenNodeHorizontalUnit - betweenNodeHorizontalUnit;
                  }
                }
              }
              let keyStr = "linking" + +ic+ "=" + currNodeKey;


{/* links between nodes */}
             return (
                <div key={keyStr}>
                {currNodeKey !== "" && <div>

                      {hasNextNode && <div 
                        style={{
                          "position": "absolute",
                          "top": `${sourceRightLineVStart}px`, 
                          "left": `${sourceRightLineHStart}px`, 
                          "height": `1px`, 
                          "width": `10px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}
                        >       
                      </div>}
                   
                      {hasNextNode && <div 
                        style={{
                          "position": "absolute",
                          "top": `${destLeftLineVStart}px`, 
                          "left": `${destLeftLineHStart}px`, 
                          "height": `1px`, 
                          "width": `10px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}
                        >       
                      </div>}

                      {hasNextNode && <div 
                        style={{
                          "position": "absolute",
                          "top": (srcNodeHigher === false ? `${sourceRightLineVStart}px` : `${destLeftLineVStart}px`), 
                          "left": `${sourceRightLineHStart+10}px`, 
                          "height": `${betweenNodesVerticalLink}px`, 
                          "width": `1px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}
                        >     
                      </div>}

                      {(hasNextNode && unitDiffHori > 0) && <div 
                        style={{
                          "position": "absolute",
                          "top": (srcNodeAtLeft === false ? `${sourceRightLineVStart}px` : `${destLeftLineVStart}px`), 
                          "left": (srcNodeAtLeft === false ? `${sourceRightLineHStart}px` : `${sourceRightLineHEnd}px`), 
                          "height": `1px`, 
                          "width": `${betweenNodesHorizontalLink}px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}
                        >
                      </div>}

                      {(hasNextNode === true && (unitDiffHori <= 0) && (srcNodeAtLeft === false)) && <div
                        style={{
                          "position": "absolute",
                          "top": `${destLeftLineVStart}px`, 
                          "left": `${destLeftLineHStart}px`, 
                          "height": `1px`, 
                          "width": `${betweenNodesHorizontalLink}px`, 
                          "backgroundColor": "blue",
                          "borderRadius": `0px`}}                              
                        >
                        </div>}
                        {(hasNextNode === true && (unitDiffHori <= 0) && (srcNodeAtLeft === false)) && <div
                        style={{
                          "position": "absolute",
                          "top": `${destLeftLineVStart-10}px`, 
                          "left": `${destLeftLineHStart}px`, 
                          "height": `10px`, 
                          "width": `1px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}                              
                        >
                        </div>}                                
                        {(hasNextNode === true && (unitDiffHori <= 0) && (srcNodeAtLeft === false)) && <div
                        style={{
                          "position": "absolute",
                          "top": `${destLeftLineVStart-10}px`, 
                          "left": `${destLeftLineHStart}px`, 
                          "height": `1px`, 
                          "width": `10px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}                              
                        >
                        </div>}

                        {(hasNextNode === true && unitDiffVert === 0  && srcNodeAtLeft === false)
                        && <div
                        style={{
                          "position": "absolute",
                          "top": `${sourceRightLineVStart}px`, 
                          "left": `${sourceRightLineHStart+10}px`, 
                          "height": `10px`, 
                          "width": `1px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}                                     
                        ></div>}
                       {(hasNextNode === true && unitDiffVert === 0 && srcNodeAtLeft === false)
                       && <div
                        style={{
                          "position": "absolute",
                          "top": `${sourceRightLineVStart+10}px`, 
                          "left": `${sourceRightLineHStart}px`, 
                          "height": `1px`, 
                          "width": `10px`, 
                          "backgroundColor": "#000000",
                          "borderRadius": `0px`}}                                  
                        ></div>}


                </div>}
                </div>);

            } else if (currNodeKey !== "" 
              && nodeRelationshipMap[currNodeKey] !== undefined
              && nodeRelationshipMap[currNodeKey].nodeType === "LogicSplitter"){
           
           
           
              //case2: is logic-splitter
              let lscNodeList = nodeRelationshipMap[currNodeKey].spltLogicPairs;


//TODO working area

            }


          })} 
            </div>);
    })

}




                                                                                  {/* //TODO1 second part */}
 <div>
{gridBlocks.map((rowItem, ir) => {
   let rowKeyStr = "grid" + ir;
    return (<div key={rowKeyStr} className="parallelFrame gridRow">
          {rowItem.map((col,ic) => {
            let content = gridBlocks[ir][ic];
  
            let crd = ir * 10000 + ic;
            let keyStr = "grid" + +ic+ "=" + content;
            return (
              <div key={keyStr} className="parallelFrame gridNodeGroup">
                <div 
                      style={{"width": `${nodeWidth}px`, "height": `${nodeHeight}px`}}
                      className={
                        crd === clickedNode2 ? "gridNodeClicked" : (content === "" ? "gridNodeEmpty" : "gridNodeOccupied")}
                        
                      onClick={()=>{       
                 
                        if (crd === clickedNode2) { //cancel if already clicked
                          setClickedNode2(-1);
                        } else {//setup clicked node
                          setClickedNode2(crd);
                        }       
                  
                        if (clickedNode2 !== "" && content === "") {//get clicked & grid not empty
                          setAddNewNodeAreaDisplay(true);
                        }

                        if (clickedNode2 !== "" && clickedNode2 == crd) {//get clicked & was clicked last time: cancel
                          setAddNewNodeAreaDisplay(false);
                        }

                        if (clickedNode2 !== "" && content !== "") {// clicked on a non-empty grid
                          setAddNewNodeAreaDisplay(false);
                        }

                        setClickedNodeKey(content);
                  
                    }}
                      >
                        {content !== "" && nodeRelationshipMap[content] !== undefined
                        && 
                          <label className="cursor_pointer">{nodeRelationshipMap[content].nodeName}</label>}
                        {(content === "" && crd !== clickedNode2) && <label className="cursor_pointer" style={{"color": "#eee8ec"}}>+<br></br>Add New Node</label>}
                        {(content === "" && crd === clickedNode2) && <label className="cursor_pointer" > Adding ... </label>}
                      
                </div>

                <div></div>
       
              </div>)
          })}
    


            </div>);
    })

}
</div>


</div>}

     
  

</div>
   
          {addNewNodeAreaDisplay && 
          <>
          <input type="radio" value={newGridActionCreate} checked={newGridActionCreate}
            onChange={()=>{
              setNewGridActionCreate(true);
            }}
          ></input><label className="cursor_pointer" onClick={()=>{
            setNewGridActionCreate(true);
          }}>Add A New Node</label>
          {newGridActionCreate && <div className="section">
               
              <label>Node Unique-ID-Name and Title: </label>
              <input 
                className="setting_item"
                type="text" value={createNewNodeName} 
                onChange={e => {setCreateNewNodeName(e.target.value)}}  
              />
              <br></br>
              <label>Node Game Type: </label>
              <select className="setting_item" onChange={(event)=>{addNewNodeGameType(event);}} value={createNewNodeGameType}>
                <option value="" key=""> -- Select Node's Game Type -- </option>
                {/* <option value="Card Game" key="Card Game">Card Game</option>
                <option value="Board Game" key="Board Game">Board Game</option>
                <option value="Tower Defense" key="Tower Defense">Tower Defense</option> */} // TODO temp
                <option value="LogicSplitter" key="LogicSplitter">*Logic Splitter</option>
                <option value="Conversation" key="Conversation">Conversation</option>
              </select>
              <br></br>
              {createNewNodeGameType !== "LogicSplitter" && <><label>Screen Size: </label>
              <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
                    <option value="" key=""> ----- Select Size and Direction ----- </option>
                    {/* <option value="16:9(horizonal)" key="node-mgr-16:9(horizonal)"> 16:9 (horizontal) </option>
                    <option value="16:9(vertical)" key="node-mgr-16:9(vertical)"> 16:9 (vertical) </option> */}
                    {/* <option value="4:3(vertical)" key="node-mgr-4:3(vertical)"> 4:3 (vertical) </option> */} // TODO temp
                    <option value="4:3(horizonal)" key="node-mgr-4:3(horizonal)"> 4:3 (horizontal) </option>
                  </select>
              <br></br></>}
              <button 
                className="setting_item buttonRight"
                onClick={()=>{
                                                       //    addNewNode(); //TODO remove later
                  addNewNode2();
                  setClickedNodeKey("");
                  setAddNewNodeAreaDisplay(false);
                  }}>
                  {createText[languageCode]}
              </button>
              <button
                onClick={()=>{
                  setAddNewNodeAreaDisplay(false);
                  setClickedNode2(-1);}}
              >{cancelText[languageCode]}</button>
            
            </div>
          } 
            
          <br></br>
          <input type="radio" value={newGridActionCreate} checked={!newGridActionCreate}
            onChange={()=>{
              setNewGridActionCreate(false);
            }}></input><label className="cursor_pointer" onClick={()=>{
              setNewGridActionCreate(false);
            }}>Revert a deleted Node</label>
          {!newGridActionCreate && <div className="section">
                  <select value={toRevertNodeKey} onChange={(event)=>{
                    setToRevertNodeKey(event.target.value);
                  }}>
                    <option>-- Select a deleted node --</option>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {
                    if (nodeRelationshipMap[currKey].display === false) {
                      let keyStr = "revertOption" + currKey
                      return (<option value={currKey} key={keyStr}>
                        {nodeRelationshipMap[currKey].nodeName}
                      </option>)
                    }
                  })}
                  </select>
                  
                  <button onClick={()=>{
                    let askStr = "Are you sure to revert node" + "" + "?";
                    let response = window.confirm(askStr);
                    if (response) {
                      // update gridBlocks on this grid
                      // update node-map for this node's row and col info, and display info
                      let crd = clickedNode2;
                      let ic = crd % 10000;
                      let ir = (crd-ic) / 10000;
                      
                      let nodeMapTemp = nodeRelationshipMap;
                      nodeMapTemp[toRevertNodeKey].row = ir;
                      nodeMapTemp[toRevertNodeKey].col= ic;
                      nodeMapTemp[toRevertNodeKey].display = true;

                      let gridBlocksTemp = gridBlocks;
                      gridBlocksTemp[ir][ic] = toRevertNodeKey;

                      setNodeRelationshipMap(nodeMapTemp);
                      setGridBlocks(gridBlocksTemp);

                      updateNodeMapOfChapter(nodeMapTemp);
                      updateGridBlockOfChapter(gridBlocksTemp);

                      setClickedNode2(-1);

                    }
                  }}>{revertText[languageCode]}</button>
          </div>
          }
          </>
            }






        <div>


        </div>

     

                
        {(clickedNode2 !== -1 && clickedNodeKey !== "") && <div>


<div style={{"display": "flex"}}>
    <div style={{"width": "900px"}}> 
    {/* node-info-area */}
        
                  
<div style={{"display": "flex"}}> 

              <div style={{"flex": "1"}}>
                
                              <p className="sectionHeader"> {nodeInfoText[languageCode]} </p>

                                  <label>Node Unique-ID-Name: </label>
                                    <div className="indentOne">
                                      {clickedNodeKey}
                                  </div>

                                  <label>Node Title: </label>
                                  <div className="indentOne">                      
                                    <label>{nodeRelationshipMap[clickedNodeKey].nodeName}</label>
                                  </div>

                                  <label>Node Type: </label>
                                  <div className="indentOne">
                                    <label>{nodeRelationshipMap[clickedNodeKey].nodeType}</label>
                                  </div>

                                  <label>Notes: </label>
                                  <div className="indentOne">
                                    <label>{(nodeRelationshipMap[clickedNodeKey].notes !== undefined && nodeRelationshipMap[clickedNodeKey].notes.length > 0) ? nodeRelationshipMap[clickedNodeKey].notes : "(Empty Note)"}</label>
                                  </div>
                                
                                {nodeRelationshipMap[clickedNodeKey] !== undefined 
                                && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" 
                                && <>
                                  <label>Screen Size: </label>
                                  <div className="indentOne">
                                    <label>{nodeRelationshipMap[clickedNodeKey].screenSize}</label>
                                  </div>
                                </>}
                         

                          <p className="sectionHeader"> {nodeOperationsText[languageCode]} </p>
                  

                      <div>
                          <label>Change Node Title: </label>
                          <div className="indentOne">
                            <input onChange={(event) =>{setTempNewName(event.target.value);}} value={tempNewName}></input>
                            <br></br><button onClick={()=>{updateNodeToNewName2();}}>{updateText[languageCode]}</button>
                          </div>
                          <label>Change Node Notes: </label>
                          <div className="indentOne">
                            <input onChange={(event) =>{setTempNewNote(event.target.value);}} value={tempNewNote}></input>
                            <br></br>
                            <button onClick={()=>{setTempNewNote("");}}>{cancelText[languageCode]}</button>
                            <button onClick={()=>{updateNodeWithNewNote();}}>{updateText[languageCode]}</button>
                          </div>
                          <br></br>
                          <br></br>
                          <label>Delete Node: </label>
                          <div className="indentOne">
                              <button onClick={()=>{
                                let askStr = "Are you sure to remove this Node [" + nodeRelationshipMap[clickedNodeKey].nodeName + "] ?";
                                let response = window.confirm(askStr);
                                if (response) {
                                  deleteNode2();
                                  setClickedNodeKey("");
                                  setClickedNode2(-1);
                                }
                              }}>Delete</button>
                          </div>
                      </div>
               
              </div>   




{/* Next-Node setting section */}
    <div style={{"flex": "1", "marginLeft": "20px"}}>


              {nodeRelationshipMap[clickedNodeKey] !== undefined
              && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" && <div>
                <p className="sectionHeader"> 
                {nextNodeText[languageCode]} </p>
                {(nodeRelationshipMap[clickedNodeKey].nextNode !== "" 
                  && nodeRelationshipMap[clickedNodeKey].nextNode !== "-") && <>
                    Next Node Name: <label>{nodeRelationshipMap[clickedNodeKey].nextNode}</label><br></br>
                  </>}
              
                <label>Update: </label>
                <select onChange={(event)=>{
                    setSelectedNextNode(event.target.value);
                }}
                  value={selectedNextNode}
                >
                  <option key="defaultNextNodeEmpty" value="-">-- Select the next-node --</option>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {
                    
                            let item = nodeRelationshipMap[currKey];
                            if (item === undefined) {
                              return;
                            }
                            
                            let opKey = "opnextnode-" + currKey;
                            return (
                              <option key={opKey} value={currKey}>{item["nodeName"]}</option>
                            );
                        })}
                </select>
                <button onClick={()=>{
                    if (selectedNextNode !== "-") {
                      let tempMap = nodeRelationshipMap;
                      tempMap[clickedNodeKey].nextNode = selectedNextNode;
                      setNodeRelationshipMap(tempMap);
                      setSelectedNextNode("-");
                      updateRenderCounter();
                    }
                }}>{confirmText[languageCode]}</button>
                <br></br><button
                  onClick={()=>{

                    let tempMap2 = nodeRelationshipMap;
                    if (tempMap2[clickedNodeKey] === undefined) {
                      return;
                    }

                    let confirmStr = 
                      "Are you sure to detach the linking between " 
                      + tempMap2[clickedNodeKey].nodeName + " and " 
                      + tempMap2[clickedNodeKey].nextNode + " ?";

                    let resp = window.confirm(confirmStr);
                    if (resp) {
                      tempMap2[clickedNodeKey].nextNode = "-";
                      setNodeRelationshipMap(tempMap2);
                      updateRenderCounter();
                    }
                    
                  }}
                >{detachLinkingText[languageCode]}</button>
              </div>}


              {nodeRelationshipMap[clickedNodeKey] !== undefined
              && nodeRelationshipMap[clickedNodeKey].nodeType === "LogicSplitter" && <div>
                <p className="sectionHeader"> {targetNodesText[languageCode]} </p>
                  Path-deciding
                  <br></br>
                  <table>
                    <thead>
                      <tr>
                        <th style={{"minWidth": "450px"}}>Condition</th>
                        <th>Target Node</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      
                      
                      {nodeRelationshipMap[clickedNodeKey].spltLogicPairs
                      .map((item, index) => {       
                          if (item[0] === "else") {
                            return;
                          }
                          let keyStr = "tableLogicSplitter" + item[1];
                          return (
                          <tr key={keyStr}>
                              <td>{item[2]}</td>
                              <td>{item[1]}</td>
                              <td>
                                <GiTrashCan onClick={()=>{
                                    deleteFromCondtTable(index);
                                  }}  
                                    className="iconButtonSmall"/>
                              </td>
                          
                          </tr>
                          );
                        
                      })}
                      <tr>
                        <td>(All other cases / "Else")</td>
                        <td>
                          {nodeRelationshipMap[clickedNodeKey].spltLogicPairs.length > 0 
                            && 
                            <label>{nodeRelationshipMap[clickedNodeKey].spltLogicPairs[0][1]}</label>}
                      
                        </td>
                        <td>
                            <select 
                                value={lscElseSelected} 
                                onChange={(event)=>{
                                  setLscElseSelected(event.target.value);
                                }}>
                                <option key="lscElse" value="-">-- Select --</option>
                                {Object.keys(nodeRelationshipMap).map((currKey) => {                  
                                    let item = nodeRelationshipMap[currKey];
                                    if (item === undefined) {
                                      return;
                                    }
                                    let lscElseKey = "lscSettingElse" + currKey;
                                    return (
                                <option 
                                  key={lscElseKey}
                                  value={currKey}
                                  >{currKey}: {item["nodeName"]}</option>);
                                })}          
                            </select>
                          <button 
                            onClick={()=>{
                              updateTableCondt();
                              setLscElseSelected("");
                            }}
                          >{updateText[languageCode]}</button>

                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button onClick={()=>{
                    setDisplayAddNewTargetCondt(!displayAddNewTargetCondt);
                  }}>{addNewConditionTargetText[languageCode]}</button>
                  {displayAddNewTargetCondt && <div>

                    <div className="areaFrame">
                      <label>If</label><br></br>
                      
                      <div>
                          <label> Variable 1: </label>
                          
                          <select 
                                onChange={(event)=>{
                                  setLsGdataVar1(event.target.value);
                                  setCondtVar1Type(gameDataLocal[event.target.value]["data_type"]);
                                  console.log("var1 selected type = ", gameDataLocal[event.target.value]["data_type"]);
                                }} 
                                value={logicSplitter_gameDataVar1}>
                              
                              <option value="" key="">--Game Data--</option>
                              {Object.keys(gameDataLocal).map((currKey) => {

                                  return (
                                  <option value={currKey} key={gameDataLocal[currKey]["name"]}>{currKey}</option>
                                  );
                              })}
                          </select>
                          {displayGameDataButton && <button onClick={()=>{displayGameDataPanel()}}> + </button>}
                      </div>

                      <div>
                          <label>Comparison: </label>
                          
                          {(condtVar1Type === "number") && 
                            <select onChange={(event)=>{setVar2NumCompare(event.target.value);}}>
                                <option key="" value="-"> -- Operator -- </option>
                                <option key="larger" value="larger"> larger than </option>
                                <option key="smaller" value="smaller"> smaller than </option>
                                <option key="equal" value="equal"> equals to </option>
                                <option key="largerequal" value="largerequal"> larger than or equals to </option>
                                <option key="smallerequal" value="smallerequal"> smaller than or equals to </option>
                            </select>}
                      </div>
                    <div> 
                        {(condtVar1Type === "number") && <div>
                          <label> Variable 2: </label>
                          <br></br>

                          <input type="radio" value={logicSplitterVar2IsGData} checked={logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToGameData();setLsGdataVar2("");}}/> Game Data Item: 
                          
                          <select onChange={(event)=>{
                              let selectedV2 = event.target.value;

                              let selectedV2Type = gameDataLocal[selectedV2]["data_type"];

                              if (selectedV2Type !== "number") {
                                alert("Please select a number type data item.");
                              } else {
                                setLsGdataVar2(selectedV2);
                              }
                              
                            }} value={logicSplitter_gameDataVar2}>
                                  <option value="" key="">--Game Data--</option>
                                  
                            {Object.keys(gameDataLocal).map((key) => {
                              return (
                                    <option value={gameDataLocal[key]["name"]} key={gameDataLocal[key]["name"]}>{key}</option>
                                );
                              })}
                          </select>
                        {displayGameDataButton && <button onClick={()=>{displayGameDataPanel()}}> + </button>}

                        <br></br>
                        <input type="radio" value={logicSplitterVar2IsGData} checked={!logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToValue();setLsGdataVar2("");}}/> Value:
                            <input type="number" min="-100000000" max="100000000" step="1" value={logicSplitter_gameDataVar2} onChange={(event)=>{setLsGdataVar2(event.target.value);}}></input>    
                        </div>}

                        {(condtVar1Type === "string") && <div>          
                          <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(true);}} checked={var1StringEq}></input>
                          <label> Is </label>
                          <input value={logicSplitter_gameDataVar2} onChange={(event)=>{
                            setLsGdataVar2(event.target.value);
                          }}></input>
                        <br></br>                         
                        <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(false);}} checked={!var1StringEq}></input>
                          <label> Is Not </label>
                          <input value={logicSplitter_gameDataVar2} onChange={(event)=>{
                            setLsGdataVar2(event.target.value);
                          }}></input>       
                        
                        </div>}

                        {(condtVar1Type === "boolean") && <div>
                  
                        <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(true);console.log("going to set: Var1-boolean-true");}} checked={var1BoolTrue}></input>
                          <label> Is True</label>
                        <br></br>                   
                        <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(false);console.log("going to set: Var1-boolean-false");}} checked={!var1BoolTrue}></input>
                          <label> Is False</label>  
                        </div>}

                </div>

                <br></br>
                    Target Node:
                    <select value={lscCurrSelected}
                      onChange={(event)=>{
                        setLscCurrSelected(event.target.value);
                      }}>
                      <option key="lscCurrDefault" value="">-- Select --</option>
                              {Object.keys(nodeRelationshipMap).map((currKey) => {                  
                                  let item = nodeRelationshipMap[currKey];
                                  if (item === undefined) {
                                    return;
                                  }
                                  let lscCurrKey = "lscSettingCurr" + currKey;
                                  return (<option 
                                    key={lscCurrKey}
                                    value={currKey}
                                    >{currKey}: {item["nodeName"]}
                                    </option>);
                      })} 
                    </select>


                    <br></br><br></br>
                    <button onClick={()=>{
                        if (lscCurrSelected === undefined || lscCurrSelected === "") {
                          alert("Please choose a target node.");
                          return;
                        }

                      let stmtStr = "type[" + condtVar1Type + "]^" + logicSplitter_gameDataVar1 + "^";
                      let displayStr = "[" + logicSplitter_gameDataVar1 + "](type: " + condtVar1Type + ") \n ";
                      if (condtVar1Type === "number") {
                        if (var2NumCompare === "") {
                          alert("Please select the comparison");
                          return;
                        }
                        if (logicSplitterVar2IsGData === true) {
                          stmtStr = stmtStr + var2NumCompare + "(gameData)^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + var2NumCompare + " - \n" + "[" + logicSplitter_gameDataVar2 + "]";
                        } else {
                          stmtStr = stmtStr + var2NumCompare + "(pureValue)^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + var2NumCompare + "- \n(value) " + logicSplitter_gameDataVar2;

                        }
                      } else if (condtVar1Type === "boolean") {
                        if (var1BoolTrue === true) {
                          stmtStr = stmtStr + "isTrue";
                          displayStr = displayStr + "- \nis true";
                        } else {
                          stmtStr = stmtStr + "isFalse";
                          displayStr = displayStr + "- \nis false";
                        }
                      } else if (condtVar1Type === "string"){
                        if (var1StringEq === true) {
                          stmtStr = stmtStr + "equalsTo^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + "- \nequals to " + logicSplitter_gameDataVar2;
                        } else {
                          stmtStr = stmtStr + "notEqualTo^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + "- \nnot equals to " + logicSplitter_gameDataVar2;

                        }
                      }

                      setLsGdataVar1("");
                      setLsGdataVar2("");
                      setVar2NumCompare("");
                      setCondtVar1Type("");
                      setVar1StringEq(true);
                      setVar1BoolTrue(true);
                      setLsV2IsGData(true);
                      setLscCurrSelected("");
      console.log("statement: ", stmtStr); // TODO test
                    
                      let currStmtArr = [stmtStr, lscCurrSelected, displayStr];

                      let tempLogicPairs = nodeRelationshipMap[clickedNodeKey].spltLogicPairs;
                      tempLogicPairs.push(currStmtArr);

                      let tempNodeRelMap = nodeRelationshipMap;
                      tempNodeRelMap[clickedNodeKey].spltLogicPairs = tempLogicPairs;
                      setNodeRelationshipMap(tempNodeRelMap);

      console.log("new node-rel-map = ", tempNodeRelMap); //TODO test
                      
                      setDisplayAddNewTargetCondt(false);
                    }}>{addConditionText[languageCode]}</button>

                          </div>




                  </div>}

              </div>}

    </div>

</div>


    {/* node-info-area ends */}
    </div> 

    <div style={{"marginLeft": "20px"}}>
      direction area

{(clickedNode2 !== -1 
          && nodeRelationshipMap[clickedNodeKey] !== undefined
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterStart*"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterEnd*") && 
 <div>
            <button 
              className="setting_item"
              onClick={()=>{enterNodeEditor2();}}>
                {enterEditorText[languageCode]}
            </button>
        
        
  </div>}


<div>
{clickedNode2 !== -1 && <div className="parallelFrame">
          <div>
            <button
              onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row;
              let targetC = node.col-1;
              if (targetC >= 0 && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                setGridBlocks(tempGrid);

                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].col = targetC;
                setNodeRelationshipMap(tempMap);
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);
              }
            }}>←</button>
          </div>
          <div>
            <div className="centered"><button
            onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row-1;
              let targetC = node.col;

              if (targetR >= 0 && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                setGridBlocks(tempGrid);

                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].row = targetR;
                setNodeRelationshipMap(tempMap);
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);
              }
            }}>↑</button></div>
            <div><button
                onClick={()=>{
                let node = nodeRelationshipMap[clickedNodeKey];
                let targetR = node.row+1;
                let targetC = node.col;
                let len = gridBlocks.length;

                if (targetR < len && gridBlocks[targetR][targetC] === "") {
                  let tempGrid = gridBlocks;
                  tempGrid[node.row][node.col] = "";
                  tempGrid[targetR][targetC] = clickedNodeKey;
                  setGridBlocks(tempGrid);

                  let tempMap = nodeRelationshipMap;
                  tempMap[clickedNodeKey].row = targetR;
                  setNodeRelationshipMap(tempMap);
                  let crd = targetR * 10000 + targetC;
                  setClickedNode2(crd);
                }
            }}>↓</button></div>
          </div>
          <div style={{"alignItems": "end"}}>
            <button
              onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row;
              let targetC = node.col+1;
              let len = gridBlocks[0].length;

              if (targetC < len && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                setGridBlocks(tempGrid);

                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].col = targetC;
                setNodeRelationshipMap(tempMap);
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);
              }
            }}>→</button>            
          </div>

</div>}


        </div>


    </div>
</div>
          </div>}








          <p className="plans">TODO: 
              <br></br>user can also add column or row for new grids 
              <br></br>TODO: consider adjustment of node-place
              <br></br>other settings (next-node condition, etc.) are the same 
          -------------------------------------------------------------
          
          </p>


          {/* {(clickedNode !== "") && 
        <div>
        <button 
          className="setting_item"
          onClick={enterNodeEditor}>
            Enter Editor for [{clickedNode}]
        </button>
    
      
        </div>
        } */} 
    
   
      

      <br></br><br></br><br></br><br></br><br></br>
        <div className="trashNodeArea">
       
    


<p className="plans"> TODO:
            <br></br>
  
            <br></br> idea: logic organizer depends heavily on the game-data specified by author.
            <br></br> the game maker should provide entry for CRUD operations on game-data, in inside-node layer
            <br></br> frontend aspect, game-data manager is needed (CRUD); backend aspect, game-data's data structure on cloud is needed
            <br></br> for game-data, in the node-managing layer, it can only display/check, and only inside node can it alter game-data value via logic-organzer related system
            <br></br> [ ** first, implement and test simple logical conditions, then improve to combos (with parenthesis) ]
        
        </p> 
    
      
    
        </div>
    
    
        <button 
          className="setting_item"
          onClick={() => console.log("saving settings of nodes...")}>
            {saveToMyProjectText[languageCode]}
        </button>
    
        </div>
        }

        {chapterKey === "" && <div>Please Select or Setup Chapters in the Chapter Management Area (at left)...</div>}
     

      </div>
    );
}







//TODO for one LSC, nodeRelationshipMap[clickedNodeKey].spltLogicPairs stores needed data for links and path-decising instructions.
//TODO for functionality of LSC, consider tracking component
//TODO consider data structure parsing for node-tracking when viewing/gameplaying

/* example
nodeRelationshipMap[clickedNodeKey].spltLogicPairs


  0:  ['else', '', 'else']
  1:  ['type[boolean]^true1^isFalse', 'node2', '[true1](type: boolean) \n - \nis false']
  2:  ['type[number]^number7^smaller(pureValue)^2', 'a', '[number7](type: number) \n smaller- \n(value) 2']

*/