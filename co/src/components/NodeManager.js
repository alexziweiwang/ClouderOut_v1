import * as React from 'react';
import moment from "moment";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTrashCan } from "react-icons/gi";
import { getProjectGameDataVM, updateGameDataVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';
import GameDataManager from './GameDataManager';

export default function NodeManager({projectName, currUser, chapterKey}) {

//TODO important note: node data is operated in this component (and level).
//TODO node-data from and to cloud db: later the specific node-editing page might need screen-size fixing, this can be through cloud

  let nodeWidth = 152;
  let nodeHeight = 52;


// TODO testing, temp ----------------------------------------

  const [test_new_node_depth, set_test_new_node_depth] = useState(5);

  // TODO testing, temp ----------------------------------------
  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", depth: 1, inGroupPosition:0, nextNodes:[1], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "plot2", depth: 2, inGroupPosition:0, nextNodes:[2, 3], spltCondt: ["c1", "c2"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option x", depth: 3, inGroupPosition:0, nextNodes:[4], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option y", depth: 3, inGroupPosition:1, nextNodes:[4], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Card Game", screenSize: "h450_800"},
    { nodeName: "end node", depth: 4, inGroupPosition:0, nextNodes:[], spltCondt: [], display: true, nodeType:"Conversation", screenSize: "h450_800"},
  ]); //TODO testing data

  //TODO node data from cloud: fetch by username + project_name + chapter_key  
  const chStartName = "chapterStart";
  const chEndName = "chapterEnd-"+chapterKey;

  const [nodeRelationshipMap, setNodeRelationshipMap] = useState({
    "chapterStart": {nodeName: "chapterStart", row: 2, col: 0, prevNodes:[], nextNode:"node1", display: true, nodeType:"*chapterStart*", screenSize:"h600_800"},
    "node1": {nodeName: "node1", row: 2, col: 1, prevNodes:[], nextNode:"", display: true, nodeType:"Conversation", screenSize:"h600_800"},
    "node2": {nodeName: "node2", row: 4, col: 3, prevNodes:[], nextNode:"", display: true, nodeType:"Conversation", screenSize:"h600_800"},
    "lsc1": {nodeName: "lsc001", row: 4, col: 0, prevNode:[], spltLogicPairs: [["else", "", "else"],], display: true, nodeType:"LogicSplitter"}
  }); //TODO new data-design
  const [renderCounter, setRenderCounter] = useState(0);
  // "plot1": {nodeName: "plot1", row: 3, col: 2, prevNodes: [chStartName], nextNode: "", display: true, nodeType:"Conversation", screenSize: "h600_800"},
  // "plot2": {nodeName: "plot2",row: 3, col:3, prevNodes: ["plot1"], nextNode: "", display: true, nodeType:"Conversation", screenSize: "h600_800"},
  // "option x": {nodeName: "option x", row: 1, prevNodes: ["plot2"], nextNode: "", display: true, nodeType:"Conversation", screenSize: "h600_800"},
  // "option y": {nodeName: "option y", row: 4, prevNodes: ["plot2"], nextNode: "", display: true, nodeType:"Card Game", screenSize: "h600_800"},
  // "end node": {nodeName: "end node", row: 3, col:5, prevNodes: ["option x", "option y"], nextNode: "", display: true, nodeType:"Conversation", screenSize: "h600_800"},
  // chEndName: {nodeName: chEndName, prevNodes: ["end node"], nextNode: "", display:true, nodeType:"", screenSize:""}

  const [gridBlocks, setGridBlocks] = useState([
    ["","","","","","","","","",""], 
    ["","","","","","","","","",""],
    ["chapterStart","node1","","","","","","","",""], 
    ["","","","","","","","","",""],
    ["lsc1","","","node2","","","","","",""]
  ]); //stores node-keys

  //TODO note: for author/users, "nodeName(title)" is changable; the node-key should not be changed. on node-vis, it displays node-name
  //TODO depth of this node is (prev-node's depth + 1); if multiple prev-nodes? choose max prev-depth
  //TODO: node-visualization point: keep the max-length of "nextPairs", as the total height reference for svg drawing
  //TODO: calculation strategy for placing odd and even number of nodes in the same depth-level

  //TODO functionality design:
  //TODO always create default "chapterStart" and "chapterEnd" node, named as "chapterStart-[chapterKey]" and "chapterEnd-[chapterKey]"
  //TODO: use a "next-node-pointer" for each node: usually it is the next-one node, but if with multiple nodes,
  //TODO -- devide the next-node-pointer after entire node finished, then review all game-data, according to next-node-condition-pairs, change "next-node-pointer" value then go to "next-node-pointer"
  //TODO for some button that do direct-jump, change "next-node-pointer" as button-action, then next node points to the jump-target


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
   const [createdNewNodeScreenSize, setCreatedNewNodeScreenSize] = useState("h450_800");
   const [deletingNodeName, setDeletingNodeName] = useState("");
   const [isLinkNewNode, setIsLinkNewNode] = useState(false);
   const [needCloudGameData, setNeedCloudGameData] = useState(true);
   const [toNodeName, setToNodeName] = useState("");

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
   const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
   const [displayGameDataButton, setDisplayGameDataButton] = useState(true);

   const [nextNodeList, setNextNodeList] = useState([]);
   const [nextCondtList, setNextCondtList] = useState([]);

   const [tempNewName, setTempNewName] = useState("");
 
   const [addNewNodeAreaDisplay, setAddNewNodeAreaDisplay] = useState(false);

   const [isNextCondtDefault, setNextCondtIsDefault] = useState(true); //TODO remove later


   const x_base = 1, y_base = 1, y_dist=100, node_gap=480; //TODO remove later
   const node_width = 380, node_height = 120; //TODO remove later
   const [viewBoxStr, setViewBoxStr] = useState("10 -10 3200 700"); //TODO remove later


   const [firstTimeEnter, setFirstTimeEnter] = useState(true);
   useEffect(() => {
    if (firstTimeEnter === true) {
        let chapter = "chapter0"; //TODO test, later: fetch from user-input
        // let chapterData = getChapterDataFromCloud(chapter); //TODO: call in later stage
        //updateNodeDataActions(chapterData);
                //    setNodeData(chapterData);
        // console.log("First enter node data: ");
        // console.log(nodeData);
        fetchGameDataFromCloud();
        console.log("\t\tNodeManager: current user is ", currUser); //TODO testing

        setFirstTimeEnter(false);
    }
    });

  async function getChapterDataFromCloud(chapter) {
    return await getChapterDataVM({projectName: projectName, uname: currUser, chapterName: chapter});
   
  }

  function updateNodeDataActions(data) {
       setNodeData(data);
       //TODO calculate needed scale
       console.log("new node data:");
       console.log(data); //TODO test

       //TODO later: update to cloud db
  }

  async function updateNodeRelationship() {
    //TODO update current node-data to cloud db
    //TODO cloud node-data design:
      //TODO each node is a collection
      //TODO each node-collection contains many documents
        //TODO for board-game/card-game node, each document is an element?
        //TODO for conversational node, each document is a piece?        

  }

 
  function handleNodeClick(name) {
    console.log("clicked node = " + name); //TODO
    if (name === "" || name !== clickedNode) {
      setClickedNode(name);
    } else { //clicked on the same node
      setClickedNode("");
    }

    let tempNextList = nodeData
      .filter(item => (item.display === true && name === item.nodeName));

    tempNextList = tempNextList[0].nextNodes;

    let tempNextCondtList = nodeData
      .filter(item => (item.display === true && name === item.nodeName));

    tempNextCondtList = tempNextCondtList[0].spltCondt;

    console.log("nodeData: ", nodeData);
    console.log("handle node clicked..."); //TODO test
    console.log("tempNextList: ", tempNextList); //TODO test
    console.log("tempNextCondtList", tempNextCondtList); //TODO test

    setNextNodeList(tempNextList);
    setNextCondtList(tempNextCondtList);

  }

  function enterNodeEditor() {
    let currNode = nodeData.find(node => node.nodeName === clickedNode);
    let currNodeType = currNode.nodeType;
    let userName = currUser;

    
    if (currNodeType === "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNode, projectName, userName } });
    } else if (currNodeType === "Conversation") {
      navigate('/conversationnode', { replace: true, state: { clickedNode, projectName, userName } });
    }
        //TODO later add conditions for board game and tower defense
  }

  function enterNodeEditor2() {
    let currNodeType = nodeRelationshipMap[clickedNodeKey].nodeType;
    let userName = currUser;
    console.log("enter editor2:", clickedNodeKey, projectName, userName);
    if (currNodeType === "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNodeKey, projectName, userName } });
    } else if (currNodeType === "Conversation") {
      navigate('/conversationnode', { replace: true, state: { clickedNodeKey, projectName, userName } });
    }
        //TODO later add conditions for board game and tower defense
  }

  function updateGDataToCloud(gameDataLatest) {

        let project = "";
        project  = projectName;
        if (project.trim() === "") {
          return;
        }
        updateGameDataVM({projectName: project, uname: currUser, gameData: gameDataLatest});
     
  }

  function addNewNode2() { //TODO for new data structure
    let tempNodeMap = nodeRelationshipMap;
    if (createNewNodeGameType === "") {
      console.log("Game type is required.") //TODO test
      return;
    }

    if (createNewNodeName.length > 0) {
      const found = nodeData.some((item) => item.nodeName === createNewNodeName);
      if (tempNodeMap[createNewNodeName] !== undefined || tempNodeMap[createNewNodeName] !== "") {
        console.log("2create-node submitted:" + createNewNodeName + ", " + createNewNodeGameType); // TODO temp

// example:
// "plot1": {nodeName: "plot1", 
// row: 3, col: 2, 
// prevNodes: [chStartName], nextPairs:[["plot2", "Default: Always Reachable"]], 
// display: true, nodeType:"Conversation", screenSize: "h600_800"},
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
            prevNodes: [],
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
            prevNodes: [],
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
        setCreatedNewNodeScreenSize("h600_800");
        setClickedNode2(-1);
      } else {
        console.log("2Invalid node name: duplicate"); //TODO test

      }
 
    } else {
      console.log("warning: invalid empty node name"); //TODO test
    }
  }

  function addNewNode() { //TODO *** refactor: for new data-structure and depth plan
    
    const nodeDataTemp = nodeData;

    if (createNewNodeGameType === "") {
      console.log("Game type is required.") //TODO
      return;
    }
  
    if (createNewNodeName.length > 0) {
      //TODO later: check if node name duplicate in local node-data (fetched from cloud earlier)
      
      //TODO search in temp "nodeData"
      const found = nodeData.some((item) => item.nodeName === createNewNodeName);
      if (found) {
        console.log("Invalid node name: duplicate")
      } else {
        console.log("create-node submitted:" + createNewNodeName + ", " + createNewNodeGameType); // TODO temp
        
        //TODO calculate in-grou-position by filtering the same depth
// format:
//    { nodeName: "plot1", 
// depth: 1, 
// inGroupPosition:0, 
// nextNodes:[1], 
// spltCondt: ["Default: Always Reachable"], 
// display: true, 
// nodeType:"Conversation", 
// screenSize: "h450_800"},

        const newDataItem = { 
          nodeName: `${createNewNodeName}`, 
          depth: test_new_node_depth,
          inGroupPosition:0,
          nextNodes:[], 
          spltCondt:[], 
          display: true, 
          nodeType:`${createNewNodeGameType}`,
          screenSize: createdNewNodeScreenSize
        }; //TODO temp

        nodeDataTemp.push(newDataItem); //TODO temp
        
        updateNodeDataActions(nodeDataTemp);
        
        // reset the creation layout
        set_test_new_node_depth(test_new_node_depth+1); //TODO test
        setCreateNewNodeName("");
        setCreateNewNodeGameType("");

        if (nodeData.length > 5) { //TODO testing: update svg's size
          setViewBoxStr("10 -10 5200 700"); //TODO later calculate for precise size (current: 3200 to 5200)
          //TODO better scalling in viewing
          //TODO for different depth of the nodes, increase height of svg as well
        }
      }

    } else {
      console.log("Invalid node name: empty"); //TODO temp
    }
  }

  function addNewNodeGameType(event) {
    setCreateNewNodeGameType(event.target.value); //TODO later update to cloud db
    console.log("changed selection of new game type : " + event.target.value);
  }

  function addRevertingNode(event) {
    setToRevert(event.target.value); //TODO later update to cloud db
  }

  function revertSelectedNode() {
    let i = 0;
    const nodeDataTemp = nodeData;
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName === nodeToRevert) {
        nodeDataTemp[i].display = true;
      }
    }

    updateNodeDataActions(nodeDataTemp);
 
    setToRevert("");
  }

  function deleteLinkBetweenNodes(destNodeName) { //TODO *** refactor: for new data-structure and depth plan
    setToNodeName(destNodeName);
    const sourceNodeName = clickedNode;

    const nodeDataTemp = nodeData;
    let fromNodeIndex = -1, toNodeIndex = -1;
    let i = 0;

    if (sourceNodeName === "" && destNodeName === "") {
      console.log("Sourec Node and Destination Node are required."); //TODO test
      return;
    }

    if (sourceNodeName === "") {
      console.log("Source Node is required."); //TODO test 
      return;
    }

    if (destNodeName === "") {
      console.log("Destination Node is required."); //TODO test 
      return;
    }
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName === sourceNodeName) {
        fromNodeIndex = i;
      }
      if (nodeDataTemp[i].nodeName === destNodeName) {
        toNodeIndex = i;
      }
    }
    if (fromNodeIndex !== -1 && toNodeIndex !== -1) {
      if (!nodeDataTemp[fromNodeIndex].nextNodes.includes(toNodeIndex)) {
        console.log("Warning: the two nodes are not linked ..."); //TODO test
      } else {

        let j =0;
        let newArr = [];
        for (; j < nodeDataTemp[fromNodeIndex].nextNodes.length; j++) {
          if (nodeDataTemp[fromNodeIndex].nextNodes[j] !== toNodeIndex) {
            newArr.push(nodeDataTemp[fromNodeIndex].nextNodes[j]);
          }
        }
        nodeDataTemp[fromNodeIndex].nextNodes = newArr;
        
        console.log("Removed link from " + nodeData[fromNodeIndex].nodeName + " to " + nodeData[toNodeIndex].nodeName + "......"); //TODO test 
        console.log("nodeData[fromNodeIndex]", nodeData[fromNodeIndex]); //TODO
        console.log("nextList: ", nextNodeList); //TODO test
        console.log("nextCondtList", nextCondtList); //TODO test


        let tempCondtList = nextCondtList;
        let p = 0;
        for (; p < nextNodeList.length; p++) {
            if (nextNodeList[p] === toNodeIndex) {
                tempCondtList[p] = "(deleted)";
            }
        }
        tempCondtList = tempCondtList.filter(e => e !== "(deleted)");
        console.log("new condt list: ");
        console.log(tempCondtList);
        setNextCondtList(tempCondtList); 
        nodeDataTemp[fromNodeIndex].nextCondtList = tempCondtList;

        updateNodeDataActions(nodeDataTemp);

        setNextNodeList(newArr);
      }
    } 
  }

  function handleDeleteNodeWithParam(nodeToDelete){
    let i = 0;
    const nodeDataTemp = nodeData;
    let deletedNodeIndex = 0;
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName === nodeToDelete) {
        nodeDataTemp[i].display = false; // "undisplay" this deleted node
        deletedNodeIndex = i;
      }
    }

    i = 0;
    for (; i < nodeDataTemp.length; i++) {
      //if nextNodes contains "deletedNodeIndex", remove the link to the deleted-node
      if (nodeDataTemp[i].nextNodes.includes(deletedNodeIndex)) {
        let j = 0;
        let newArr = [];
        for (; j < nodeDataTemp[i].nextNodes.length; j++) {
          if (nodeDataTemp[i].nextNodes[j] !== deletedNodeIndex) {
            newArr.push(nodeDataTemp[i].nextNodes[j]);
          }
        }
        nodeDataTemp[i].nextNodes = newArr;
      }

      //also remove all nodes in "deletedNodeIndex"'s node
      if (i === deletedNodeIndex) {
        nodeDataTemp[deletedNodeIndex].nextNodes = [];
      }

    }
    updateNodeDataActions(nodeDataTemp);

    setDeletingNodeName("");
  }

  function changeNextToExistingNode() {
    setIsLinkNewNode(false);
  }

  function changeNextToNewNode() {
    setIsLinkNewNode(true);
  }

  function changeLsVar2ToGameData() {
    setLsV2IsGData(true);
  }

  function changeLsVar2ToValue() {
    setLsV2IsGData(false);
  }

  async function displayGameDataFunc() {
    setDisplayGameDataButton(false);

    if (needCloudGameData === true) {
      await fetchGameDataFromCloud();
    } else {
      console.log("*from local* game-data: using existing data"); 
    }
    setDisplayGameDataWindow(!displayGameDataWindow);
    setDisplayGameDataButton(true);
  }

  function changeGameScreenSize(event) {
    const input = event.target.value;
    if (event != null && event.target != null && event.target.value!= null) {
      if (input === "h450_800") {
        //TODO pass into cloud: node info
        console.log("h450_800");
        setAddedGameScreenSize(event.target.value);
      } else if (input === "v800_450") {
        //TODO pass into cloud: node info
        console.log("v800_450");
        setAddedGameScreenSize(event.target.value);
      } else if (input === "h600_800") {
        //TODO pass into cloud: node info
        console.log("h600_800");
        setAddedGameScreenSize(event.target.value);
      } else if (input === "v800_600") {
        //TODO pass into cloud: node info
        console.log("v800_600");
        setAddedGameScreenSize(event.target.value);
      } else {
        //TODO: show warning if not selected
        console.log("not selected!");
        setAddedGameScreenSize("");
      }
    }
  }

  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }

  function handleGameDataManagerCancel() {
    setDisplayGameDataWindow(!displayGameDataWindow);
  }

  async function fetchGameDataFromCloud() {

        console.log("!!! This is for project: ", projectName);
        let project  = projectName;
        console.log("checking2 on project ... [", project, "]");
        if (project === undefined || project === null || project === "" || project.trim() === "") {
          return;
        }
        const isUpdated = true;
        const gdataTestResult = await getProjectGameDataVM({projectName: project, uname: currUser, mostUpdated: isUpdated});
     
        if (gdataTestResult === undefined) {
          console.log("Error: no game_data in this project...");
          return;
        }
        console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
        setGameDataLocal(gdataTestResult);
  }

  function updateNodeToNewName() {
    /* tempNewName becomes clickNode's nodeName */
    let clickedIndex = 0;
    let tempNodeData = nodeData;

    for (; clickedIndex < nodeData.length; clickedIndex++) {
      if (tempNodeData[clickedIndex].nodeName === clickedNode) {
        tempNodeData[clickedIndex].nodeName = tempNewName;
      }
    }
    updateNodeDataActions(tempNodeData);

    setClickedNode(tempNewName);
    setTempNewName("");

  } 

  function updateNodeToNewName2() {
    let tempNodeData = nodeRelationshipMap;

    tempNodeData[clickedNodeKey].nodeName = tempNewName;
    setNodeRelationshipMap(tempNodeData);
  
    setTempNewName("");

  } 

  function updateCurrNodeNextNodeAlways(nextNodeName) {
    let tempMap = nodeRelationshipMap;
    tempMap[clickedNodeKey].nextNode = nextNodeName;
    setNodeRelationshipMap(tempMap);
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
        <div style={{"overflow": "scroll", "width": "1000px"}}>

        {chapterKey!== "" && <div className="setting_area"> 
        <label>Chapter Key: {chapterKey}</label><br></br>
        <label>Node Management</label>

        <button onClick={()=>{getChapterDataFromCloud(chapterKey);}}> temp: Fetch chapter data </button>

          <div style={{"height": "350px"}} className="orangeArea">List of nodes:<br></br>
            <ul style={{"width": "300px"}}>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {
               
                      let item = nodeRelationshipMap[currKey];
                      let liKey = "li" + currKey;
                      let crdCal = highlightGridByKey(currKey);

                      return (<li 
                          key={liKey} 
                          className={(clickedNode2 === crdCal) ? "clickableListItem2Clicked": "clickableListItem2"}
                          style={{"marginBottom": "3px"}}
                          onClick={()=>{
                            //highlight the clicked node in diagram
                            
                            
                            if (clickedNode2 === crdCal) {
                              setClickedNode2(-1); //cancel if already clicked on this node
                            } else {
                              setClickedNode2(crdCal);
                            } 
                          }}
                        >
                          {currKey}: {item["nodeName"]}
                        </li>);

                  })}
            </ul>
          </div>  

     
     
        {/* <div className="visArea visPanel" style={{"overflow": "scroll"}}>

          <svg
            height="100%"
            width="100%"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="nodes_viewer"
            viewBox={viewBoxStr}
          >
    
          {Object.keys(nodeData).map((nodeIndex, index) => {
            // const { node_width, node_height } = nodeData[nodeIndex];
            const x_val = nodeData[index].depth * node_gap + x_base;
            //TODO calculate in-group-position by same-depth
            const y_val = y_base + (node_height+y_dist) * nodeData[index].inGroupPosition;

            return (
              
              <g key={nodeIndex}>
                {nodeData[nodeIndex].nextNodes.map((nextNodeIndex, nextIndex) => {
                  
                  const next_x_val = nodeData[nextNodeIndex].depth * 480 + x_base;
                  //TODO calculate in-group-position by same-depth
                  const next_y_val = y_base + (node_height+y_dist) * nodeData[nextNodeIndex].inGroupPosition;
                   
                  let point_string = 
                    (next_x_val-15) + "," + (y_val + node_height / 2 - 10) + " " + 
                    (next_x_val-15) + "," + (y_val + node_height / 2 + 10) + " " + 
                    next_x_val + "," + (next_y_val + node_height / 2);
                    
                  return (
                    <line
                      key={`line_${nodeIndex}_${nextIndex}`}
                      x1={x_val + node_width}
                      y1={y_val + node_height / 2}
                      x2={next_x_val}
                      y2={next_y_val + node_height / 2}
                      stroke="green"
                      strokeWidth="2"
                      className="game_node_vis"
                    />
    
                  );
                })}
                {(nodeData[nodeIndex].display === true) && 
                <rect
                  key={nodeData[nodeIndex].nodeName}
                  className="game_node_vis"
                  x={x_val}
                  y={y_val}
                  width={node_width}
                  height={node_height}
                  fill="#d1e8e2"
                  stroke="#b2b2b2"
                  onClick={() => {handleNodeClick(nodeData[nodeIndex].nodeName);}}
                />}

                {(nodeData[nodeIndex].display === true ) && 
                <text x={x_val + 5} y={y_val + 20} fill="#323232" key={`text_${nodeIndex}`}>
                  {nodeData[nodeIndex].nodeName}
                </text>}
              </g>
            );
          })}    
          </svg>
    
        </div> */}

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
            }}>Left</button>
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
            }}>Up</button></div>
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
            }}>Down</button></div>
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
            }}>Right</button>            
          </div>

</div>}


        {<div style={{"overflow": "scroll", "width": "1250px", "position": "relative"}}>TODO: visualization of node-grids grv 

          {/* linking-drawing */}
          {gridBlocks.map((row, ir) => {
              let rowKeyStr = "linking" + ir;
              
              return (<div key={rowKeyStr} style={{"position": "absolute"}}>
                    {row.map((col,ic) => {
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
                        && nodeRelationshipMap[currNodeKey].nodeType === "LogicSplitter"){
                      //case2: is logic-splitter
                        let lscNodeList = nodeRelationshipMap[currNodeKey].spltLogicPairs;


//TODO working area

                      }

       
                    })}
                      </div>);
              })

          }

        <div>
          {gridBlocks.map((row, ir) => {
             let rowKeyStr = "grid" + ir;
              return (<div key={rowKeyStr} className="parallelFrame gridRow">
                    {row.map((col,ic) => {
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
                                  {content !== "" && 
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

          {addNewNodeAreaDisplay && <div className="section">
                
                <div className="cursor_pointer" onClick={()=>{setAddNewNodeAreaDisplay(!addNewNodeAreaDisplay);}}><label className="cursor_pointer">
                  Adding A New Node</label></div>
                {/* {!addNewNodeAreaDisplay && <div className="cursor_pointer" onClick={()=>{setAddNewNodeAreaDisplay(!addNewNodeAreaDisplay);}}><label className="cursor_pointer">
                  + Add A New Node</label></div>} */}

                <div>
              <label>Node Name: </label>
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
                    {/* <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                    <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option> */}
                    {/* <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option> */} // TODO temp
                    <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                  </select>
              <br></br></>}
              <button 
                className="setting_item buttonRight"
                onClick={()=>{
                  addNewNode();
                  addNewNode2();
                  setClickedNodeKey("");
                  setAddNewNodeAreaDisplay(false);
                  }}>
                  Create
              </button>
              <button
                onClick={()=>{
                  setAddNewNodeAreaDisplay(false);
                  setClickedNode2(-1);}}
              >Cancel</button>
              </div>
            </div>}

        <div>


        </div>

     
        {(clickedNode2 !== -1 
          && nodeRelationshipMap[clickedNodeKey] !== undefined
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterStart*"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterEnd*") && 
        <div>
        <button 
          className="setting_item"
          onClick={()=>{enterNodeEditor2();}}>
            Enter Editor
        </button>
    
      
        </div>
        }
                
        {(clickedNode2 !== -1 && clickedNodeKey !== "") && <div>

              <p className="sectionHeader">*** Node Info ***</p>
            <div>
              <label>Node Name: </label>
              <label>{nodeRelationshipMap[clickedNodeKey].nodeName}</label>
              <br></br>
              <label>Node Type: </label>
              <label>{nodeRelationshipMap[clickedNodeKey].nodeType}</label>
              <br></br>
            
            {nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" && <>
              <label>Screen Size: </label>
              <label>{nodeRelationshipMap[clickedNodeKey].screenSize}</label>
            </>}
            </div>

            <p className="sectionHeader">*** Node Settings ***</p>
        <div>
          <label>Rename Node: </label>
          <input onChange={(event) =>{setTempNewName(event.target.value);}} value={tempNewName}></input>
          <button onClick={()=>{updateNodeToNewName2();}}>Update</button>
        </div>   


  
        {/* {nodeRelationshipMap[clickedNodeKey].nodeType === "LogicSplitter" && <>
          <p className="sectionHeader">*** Next Nodes ***</p>
          <div>
                <table>
                    <thead>
                        <tr key="head">
                            <th>Next Node(s)</th>
                            <th>Condition</th>
                            <th>[Operation]</th>
                        </tr>
                    </thead>
                    <tbody>
                      TODO
                    </tbody>
                </table>
          </div>
        </>} */}

        {nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" && <>
          <p className="sectionHeader">*** Next Node ***</p>
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
          }}>Confirm</button>
          <br></br><button
            onClick={()=>{
              let tempMap2 = nodeRelationshipMap;
              tempMap2[clickedNodeKey].nextNode = "-";
              setNodeRelationshipMap(tempMap2);
              updateRenderCounter();
            }}
          >Detach Linking</button>
        </>}



        {nodeRelationshipMap[clickedNodeKey].nodeType === "LogicSplitter" && <>
          <p className="sectionHeader">*** Target Nodes ***</p>
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
                              let lscElseKey = "lscSettingElse" + currKey;
                              return (
                          <option key={lscElseKey}>{item["nodeName"]}</option>);
                          })}          
                      </select>
                    <button 
                      onClick={()=>{
                        updateTableCondt();
                        setLscElseSelected("");
                      }}
                    >Update</button>

                  </td>
                </tr>
              </tbody>
            </table>

            <button onClick={()=>{
              setDisplayAddNewTargetCondt(!displayAddNewTargetCondt);
            }}>Add a New Condition & Target</button>
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
                    {displayGameDataButton && <button onClick={()=>{displayGameDataFunc()}}> + </button>}
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
                  {displayGameDataButton && <button onClick={()=>{displayGameDataFunc()}}> + </button>}

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
                <option key="lscCurrDefault">-- Select --</option>
                        {Object.keys(nodeRelationshipMap).map((currKey) => {                  
                            let item = nodeRelationshipMap[currKey];
                            let lscCurrKey = "lscSettingCurr" + currKey;
                            return (<option key={lscCurrKey}>{item["nodeName"]}</option>);
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
              }}>Add Condition</button>

                    </div>

            </div>}

        </>}

          </div>}

          <p className="plans">TODO: 
              <br></br>user can also add column or row for new grids 
              <br></br>TODO: consider adjustment of node-place
              <br></br>other settings (next-node condition, etc.) are the same 
          -------------------------------------------------------------
          
          </p>


          {(clickedNode !== "") && 
        <div>
        <button 
          className="setting_item"
          onClick={enterNodeEditor}>
            Enter Editor for [{clickedNode}]
        </button>
    
      
        </div>
        }
    
          <br></br>    
      {  (clickedNode !== "") && 
        <div>    
        
        <div>
        {/* <p className="sectionHeader">*** Node Info ***</p>
        <div>
          <label>Node Name: </label>
          <label>{clickedNode}</label>
          <br></br>
          <label>Node Type: </label>
          <label>{nodeData.filter((e => (e.display === true && e.nodeName === clickedNode)))[0].nodeType}</label>
          <br></br>
          <label>Screen Size: </label>
          <label>{nodeData.filter(e => e.nodeName === clickedNode)[0].screenSize}</label>
        </div> */}

        {/* <p className="sectionHeader">*** Node Settings ***</p>
        <div>
          <label>Rename Node: </label>
          <input onChange={(event) =>{setTempNewName(event.target.value);}} value={tempNewName}></input>
          <button onClick={updateNodeToNewName}>Update</button>
        </div> */}

        {/* <p className="sectionHeader">*** Next Node(s) ***</p> */}
        {/* <div>
        <table>
            <thead>
                <tr key="head">
                    <th>Next Node(s)</th>
                    <th>Condition</th>
                    <th>[Operation]</th>
                </tr>
            </thead>
 
            <tbody>
            {nextNodeList.map((item, index) => {
                const nextNodeName = nodeData[item].nodeName;
                    
                return (<tr key={nextNodeList[index]}>
                        <td>{nextNodeName}</td>
                        <td>{nextCondtList[index]}</td>
                    <td>
                        <button onClick={()=>{
                            const tempPreToNode = toNodeName;
                            deleteLinkBetweenNodes(nextNodeName);
                            setToNodeName(tempPreToNode);
                        }}>Remove Connection</button>
                    </td>
                </tr>);
            })}

            </tbody>
        </table>
        </div>
         */}
        {/* {(nextCondtList.includes("Default: Always Reachable")) && 
            <div className="hint"> 
            ! There can be only one "always reachable" next-node. <br></br> Clear next-node table to add more nodes
            </div>}
        
        {(!nextCondtList.includes("Default: Always Reachable")) && <>
        <br></br>
        <label>Add a Next-Node: </label>
        <br></br>
        </>} */}

        {(!nextCondtList.includes("Default: Always Reachable")) && <div className={!isLinkNewNode ? "optionAreaSelected" : "optionArea"} onClick={changeNextToExistingNode}>
        <input type="radio" name="node" value={isLinkNewNode} onChange={changeNextToExistingNode} checked={!isLinkNewNode}/>An existing Node
        {!isLinkNewNode && <>
        <br></br>
        <div>
        <label>Node Name: </label>
        <select onChange={(event)=>{setToNodeName(event.target.value);console.log("Next-Node selected:", event.target.value);}} value={toNodeName}>
            <option value="" key="-"> -- Select Node Name --</option>
            {nodeData
                .map((item, index) => {

                    if (!nextNodeList.includes(index)) {
                        /* A node can link to itself or its parent(s) node, as it could be a potential design by the game-author */
                        let keyStr = "prevNextNodeOp" + item.nodeName;
                        return (<option value={keyStr} key={item.nodeName}>{item.nodeName}</option>);
                    }
                })}
        </select>
        </div>
    </>}        </div>}
        </div>
    
        {(!nextCondtList.includes("Default: Always Reachable")) && <div>
        {/* <div className={!isLinkNewNode ? "optionArea" : "optionAreaSelected"} onClick={changeNextToNewNode}>
        <input type="radio" name="brand_new_node" value={isLinkNewNode} checked={isLinkNewNode} onChange={changeNextToNewNode}/>
        A New Node */}
        {/* {isLinkNewNode && <> */}
        {/* <br></br>
        <label>Node Name: </label>
        <input 
          className="setting_item"
          type="text" 
          value={createNewNodeName} 
          onChange={e => {setCreateNewNodeName(e.target.value);}}  
        /> */}
        {/* <br></br>
        <label>Node Type:</label> */}
        {/* <select className="setting_item" onChange={addNewNodeGameType} value={createNewNodeGameType}>
          <option value="" key=""> -- Select Node's Game Type -- </option>
          <option value="Card Game" key="Card Game">Card Game</option>
          <option value="Board Game" key="Board Game">Board Game</option>
          <option value="Tower Defense" key="Tower Defense">Tower Defense</option>
          <option value="Conversation" key="Conversation">Conversation</option>
        </select> */}
        {/* <br></br>
        <label>Screen Size:</label>
        <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
              <option value="" key=""> ----- Select Size and Direction ----- </option>
              <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
              <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
              <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
              <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
            </select> */}
        
        {/* </>} */}
        {/* </div>
        <br></br> */}
  
        <div className="areaBlue">
            {/* <br></br>
         */}
        <div>
            {/* <label>Select a Condition to Reach this Node:</label>
            <br></br>
            
            {nextNodeList.length === 0 && <div className={!isNextCondtDefault ? "optionArea" : "optionAreaSelected"} onClick={()=>{setNextCondtIsDefault(true)}}>
                <input type="radio" name="isCondtDefault" value={isNextCondtDefault} checked={isNextCondtDefault} onChange={()=>{setNextCondtIsDefault(true);}}/>Default: Always Reachable
            </div>}

            {nextNodeList.length > 0 && <div className="optionArea">
              <div>
              ! If you want to set this node as "Default: Always Reachable", <br></br>delete connection(s) to other conditionally-reachable node(s).
              </div>
            </div>} */}

            <div className={isNextCondtDefault ? "optionArea" : "optionAreaSelected"} onClick={()=>{setNextCondtIsDefault(false);}}>
                {/* <div onClick={()=>{                        
                    if (needCloudGameData === true) {
                      fetchGameDataFromCloud();
                    }
                    setNeedCloudGameData(false);
                  }}
                  >
                  <input 
                    type="radio" 
                    name="isCondtCustom" 
                    value={isNextCondtDefault} 
                    checked={!isNextCondtDefault} 
                    onChange={()=>{
                        setNextCondtIsDefault(false);
                    }
                }/>Customized Condition             

                </div> */}


                {!isNextCondtDefault && <div>
                  {/* <p className="plans">TODO: add "else" option here (for with at least 1 existing next-nodes)
                    <br></br> Current Design: convey "else" into parser, and game-flow decided automatically there
                    <br></br> Logic sequence is the adding sequence (by author)
                  </p>



                  <label>Destination Node: {toNodeName}</label><br></br>
                  <label>Conditions: {nextNodeList.includes(toNodeName) ? nextCondtList[nextCondtList.length-1] : "(Not Added)"}</label>

                <br></br> */}
                {/* <button onClick={fetchGameDataFromCloud}>Load Game Data </button> */}
        
                <div className="areaFrame">
                {/* <label> Variable 1: </label>

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
          </select> */}
                {/* {displayGameDataButton && <button onClick={()=>{displayGameDataFunc()}}> + </button>}
    
                <label>Comparison: </label>
           */}
{/*           
{(condtVar1Type === "number") && <select onChange={(event)=>{setVar2NumCompare(event.target.value);}}>
              <option key="" value="-"> -- Operator -- </option>
              <option key="larger" value="larger"> larger than </option>
              <option key="smaller" value="smaller"> smaller than </option>
              <option key="equal" value="equal"> equals to </option>
              <option key="largerequal" value="largerequal"> larger than or equals to </option>
              <option key="smallerequal" value="smallerequal"> smaller than or equals to </option>
          </select>}
          */}
          <div>
{(condtVar1Type === "number") && <div>
                {/* <label> Variable 2: </label>
                <br></br> */}

                {/* <input type="radio" value={logicSplitterVar2IsGData} checked={logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToGameData();setLsGdataVar2("");}}/> Game Data Item:  */}

{/*                 
                <select onChange={(event)=>{setLsGdataVar2(event.target.value);}} value={logicSplitter_gameDataVar2}>
                        <option value="" key="">--Game Data--</option>

                  {Object.keys(gameDataLocal).map((key) => {
                    return (
                          <option value={gameDataLocal[key]["name"]} key={gameDataLocal[key]["name"]}>{key}</option>
                      );
                    })}
                </select> */}
              {/* {displayGameDataButton && <button onClick={()=>{displayGameDataFunc()}}> + </button>}

              <br></br>
              <input type="radio" value={logicSplitterVar2IsGData} checked={!logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToValue();setLsGdataVar2("");}}/> Value:
                  <input type="number" min="-100000000" max="100000000" step="1" value={logicSplitter_gameDataVar2} onChange={(event)=>{setLsGdataVar2(event.target.value);}}></input>    
           */}
          </div>}

          {(condtVar1Type === "string") && <div>          
            {/* <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(true);}} checked={var1StringEq}></input>
            <label> Is </label>
            <input></input>
          <br></br>                         
          <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(false);}} checked={!var1StringEq}></input>
            <label> Is Not </label>
            <input></input>          
           */}
          </div>}

          {(condtVar1Type === "boolean") && <div>
            
          {/* <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(true);console.log("going to set: Var1-boolean-true");}} checked={var1BoolTrue}></input>
            <label> Is True</label>
          <br></br>                   
          <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(false);console.log("going to set: Var1-boolean-false");}} checked={!var1BoolTrue}></input>
            <label> Is False</label>
           */}
          </div>}
          </div>
{/* 
              <br></br>
              <button onClick={()=>{console.log("logicSplitter_gameDataVar2: ", logicSplitter_gameDataVar2);}}>Add Condition</button> */}

                    </div>
            
            
              <br></br>

        </div>}

                

        </div>

        <button onClick={()=>{
            setCurrNodeSplitterNum(currNodeSplittedNum + 1);

            if (addedGameScreenSize !== "") {
              setCreatedNewNodeScreenSize(addedGameScreenSize);
            }
    
            let conditionContent = "Default: Always Reachable"; //default condition
            if (isNextCondtDefault == false) {
              /* Version1: single condition-string for path-splitting */
              /* condition-content: Variable 1 + comparison + Variable2 */

              // TODO: fetch var1, comp, var2

              if (condtVar1Type === "number") {
                //TODO comparing content is: car2NumCompare
                if (logicSplitterVar2IsGData) {
                  //TODO add string-wording for this case
                  // TODO fetch value of logicSplitter_gameDataVar2
  
                } else { //compared with value
                  //TODO add string-wording for this case
  
                }
              } else if (condtVar1Type === "string") {
                if (var1StringEq) {
                  //TODO add string-wording for this case
                  //TODO fetch the compared string-sample
  
                } else {
                  //TODO add string-wording for this case
  
                }
              } else if (condtVar1Type === "boolean") {
                if (var1BoolTrue) {
                  //TODO add string-wording for this case
  
                } else {
                  //TODO add string-wording for this case
  
                }
              }
            }
            
            /* Setup of next-node name */
            let nextNodeNameSetup = "";

            if (isLinkNewNode) {
            /*  If next-node is a new node, use the name of new-node */
              nextNodeNameSetup = createNewNodeName;
              //TODO create a new node first, with default info, etc.
              addNewNode(); //TODO improve for new ver. designs

            } else {
            /* If next-node is an existing node, use the name of selected item from select-list */
              nextNodeNameSetup = toNodeName;
            }
            console.log("next-node name: ", nextNodeNameSetup); //TODO test

            //TODO both case (new or existing node): add link and update curr-node's next-node info
                //TODO using name "nextNodeNameSetup", "conditionContent"

            /*Update the nextNodeList and condition-list for this clicked-node's data */
            
            let currNodeNextList = nodeData.filter(e => e.nodeName === clickedNode)[0];
            currNodeNextList = currNodeNextList.nextNodes;
            let nextIndex = 0;
            let j = 0;
            for (; j < nodeData.length; j++) {
              if (nodeData[j].nodeName === nextNodeNameSetup) {
                nextIndex = j;
              }
            }
            currNodeNextList.push(nextIndex); 
            let currNodeCondtList = nodeData.filter(e => e.nodeName === clickedNode)[0];
            currNodeCondtList = currNodeCondtList.spltCondt;
            currNodeCondtList.push(conditionContent);

            let nodeDataTemp = nodeData;
            let index = 0;
            for (; index < nodeDataTemp.length; index++) {
              if (nodeDataTemp[index].nodeName === clickedNode) {
                break;
              }
            }
            nodeDataTemp[index].nextNodes = currNodeNextList;
            nodeDataTemp[index].spltCondt = currNodeCondtList;


            updateNodeDataActions(nodeDataTemp);

            //TODO update both "nodeData[clickedNode].nextNodes" and "nodeData[clickedNode].spltCondt"
            //TODO add link between nodes 

            console.log("nodeDataTemp:: ");
            console.log(nodeDataTemp);


            // foramt: const obj = { nodeName: nextNodeNameSetup, depth: 1, inGroupPosition:0, nextNodes:[], spltCondt: [], display: true, nodeType: createNewNodeGameType};


        }}> Add As Next-Node</button>


        </div>
      
       </div>
           
        </div>
        }
        
        
        <div>

        <br></br>       
        <p className="plans">
            New Design Idea: *Each* node contains 1 logic splitter by default
            <br></br>Next node condition is "true"(always) by default
            <br></br>user can add 0 to many next-nodes with conditions(always by default)
            <br></br>each node maintains a [list] of (next-node) and a [list] of (condition) (1-to-1 mapping by index)
            <br></br>Limitation: cannot have multiple "always-true" path

        </p>

      
        </div>





        <p className="sectionHeader">*** Node Operation ***</p>


        <button 
          className="setting_item"
          onClick={()=>{
console.log("Deleting this node...", clickedNode);  //TODO testing
            handleDeleteNodeWithParam(clickedNode);

            /* rename this node to timeStamp+original_name */
            const timeStamp = moment().format("YYYYMM_DD_hhmmss");
console.log("delete timestamp(YYYYMM_DD_hhmmss): ", timeStamp); //TODO testing
            let i = 0;
            let tempNodeData = nodeData;
            for (; i < tempNodeData.length; i++) {
              if (tempNodeData[i].nodeName === clickedNode) {
                tempNodeData[i]["nodeName"] = timeStamp + "=" +clickedNode;
              }
            }

            updateNodeDataActions(tempNodeData);

            setClickedNode(""); /* reset clicked node's name */
          }}>
            Delete [{clickedNode}]
        </button>
        
    </div>
      }

      

      <br></br><br></br><br></br><br></br><br></br>
      <p className="plans"> revert options : later change into collapsable section with simple icon</p>
        <div className="trashNodeArea">
          {!displayRevertArea && 
            <GiTrashCan onClick={()=>{setDisplayRevertArea(!displayRevertArea)}}  className="iconButton"/>
          }
    
          {displayRevertArea && 
            <GiTrashCan onClick={()=>{setDisplayRevertArea(!displayRevertArea)}}  className="iconButtonOn"/>
          }
    
          {displayRevertArea &&
          <div>
          <br></br>
          <label> Select from deleted nodes: </label>
          <br></br>
          <select value={nodeToRevert} onChange={addRevertingNode}>
            <option value="" key=""> -- Deleted Nodes -- </option> 
            {nodeData.map((item, index) => {
              if (nodeData[index].display === true) {
                return "true";
              } 
          return (
            <option value={nodeData[index].nodeName} key={nodeData[index].nodeName}>{nodeData[index].nodeName}</option>
          );
        })}
        </select>
    
        <button onClick={revertSelectedNode}> Revert </button>
        </div>
        }


<p className="plans"> TODO: link-arrows adjustment and improvement: better shaping, for different directions, etc.
            <br></br>
  
            <br></br> idea: logic organizer depends heavily on the game-data specified by author.
            <br></br> the game maker should provide entry for CRUD operations on game-data, in inside-node layer
            <br></br> frontend aspect, game-data manager is needed (CRUD); backend aspect, game-data's data structure on cloud is needed
            <br></br> for game-data, in the node-managing layer, it can only display/check, and only inside node can it alter game-data value via logic-organzer related system
            <br></br> [ ** first, implement and test simple logical conditions, then improve to combos (with parenthesis) ]
        
        </p> 
    
        <p className="plans"> TODO: consider "reverted node" overlap problem if later created new nodes around 
        <br></br> for reverted node, it keeps the original content, but relationship needs rebuidling?
        <br></br> (that is, there can be "pending nodes" that are reverted node to add?)
        <br></br> idea1: when user append a node, can from scratch, or use "reverted node"?
        <br></br> idea2: for a revert node, provide available places to insert
        
        </p>
    
        </div>
    
    
        <button 
          className="setting_item"
          onClick={() => console.log("saving settings of nodes...")}>
            Save To My Project
        </button>
    
        </div>
        }

        {chapterKey === "" && <div>Please Select or Setup Chapters in the Chapter Management Area (at left)...</div>}
     
     
        {displayGameDataWindow && <GameDataManager 
          isDisplay={displayGameDataWindow} 
          handleGdmCancel={handleGameDataManagerCancel} 
          gameData={gameDataLocal} 
          resetNeedCloudData={markNextNeedCloudGameData} 
          fetchFromCloud={fetchGameDataFromCloud} 
          updateGameDataToCloud={updateGDataToCloud}
        />}

      </div>
    );
}