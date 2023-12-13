import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTrashCan } from "react-icons/gi";
import { getProjectGameDataVM, updateGameDataVM } from '../viewmodels/GameDataViewModel';
import GameDataManager from './GameDataManager';

export default function NodeManager({currState}) {

// TODO testing, temp ----------------------------------------
  const [test_new_node_depth, set_test_new_node_depth] = useState(5);

  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", depth: 1, inGroupPosition:0, nextNodes:[1], spltCondt: [], display: true, nodeType:"Conversation"},
    { nodeName: "plot2",depth: 2, inGroupPosition:0, nextNodes:[2, 3], spltCondt: ["c1", "c2"], display: true, nodeType:"Conversation"},
    { nodeName: "option x", depth: 3, inGroupPosition:0, nextNodes:[4], spltCondt: [], display: true, nodeType:"Conversation"},
    { nodeName: "option y", depth: 3, inGroupPosition:1, nextNodes:[4], spltCondt: [], display: true, nodeType:"Card Game"},
    { nodeName: "end node", depth: 4, inGroupPosition:0, nextNodes:[], spltCondt: [], display: true, nodeType:"Conversation"},
  ]); //TODO testing data

  const [nodeData3, setNodeData3] = useState([
    { nodeName: "plot1", depth: 1, nextElem:["plot2"], spltCondt: [], display: true, nodeType:"Conversation"},
    { nodeName: "plot2", depth: 2, nextElem:["s0"], spltCondt: [], display: true, nodeType:"Conversation"},
    { nodeName: "s0", depth: 3, nextElem:["option x", "option y"], spltCondt: ["c1", "c2"], display: true, nodeType:"[Splitter]"},
    { nodeName: "option x", depth: 4, nextElem:["end node"], spltCondt: [], display: true, nodeType:"Conversation"},
    { nodeName: "option y", depth: 4, nextElem:["end node"], spltCondt: [], display: true, nodeType:"Card Game"},
    { nodeName: "end node", depth: 5, nextElem:[], spltCondt: [], display: true, nodeType:"Conversation"},
  ]); //TODO testing data

// TODO testing, temp ----------------------------------------

   /* variable area */
   const navigate = useNavigate();
   const name = "/gamemaker";
   const [clickedNode, setClickedNode] = useState("");
   const [createNewNodeName, setCreateNewNodeName] = useState('');
   const [createNewNodeGameType, setCreateNewNodeGameType] = useState("");
   const [fromNodeName, setFromNodeName] = useState("");
   const [deletingNodeName, setDeletingNodeName] = useState("");
   const [isLinkNode, setIsLinkNode] = useState(true);
   const [toNodeName, setToNodeName] = useState("");
   const [needCloudGameData, setNeedCloudGameData] = useState(true);

   const [nodeToRevert, setToRevert] = useState("");
   const [gameDataLocal, setGameDataLocal] = useState({});

   const [logicSplitter_gameDataVar1, setLsGdataVar1] = useState("");
   const [logicSplitter_gameDataVar2, setLsGdataVar2] = useState("");
   const [logicSplitter_nextNode, setLsNextNode] = useState("");
   const [logicSplitterVar2IsGData, setLsV2IsGData] = useState(true);

   const [currNodeSplittedNum, setCurrNodeSplitterNum] = useState(0);

   const [displayRevertArea, setDisplayRevertArea] = useState(false);
   
   const [addedGameScreenSize, setAddedGameScreenSize] = useState("");
   const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
   const [displayGameDataButton, setDisplayGameDataButton] = useState(true);

   const [nextNodeList, setNextNodeList] = useState([]);
   const [nextCondtList, setNextCondtList] = useState([]);
 
   const x_base = 1, y_base = 1, y_dist=50;
   const node_width = 190, node_height = 70;

 
  function handleNodeClick(name) {
    //TODO: update to local data: update previously-clicked node's most recent logic-splitter count ("currNodeSplittedNum")
    console.log("clicked node = " + name); //TODO
    if (name === "" || name !== clickedNode) {
      setClickedNode(name);
    } else { //clicked on the same node
      setClickedNode("");
    }

    const tempNextList = nodeData.filter(item => (name === item.nodeName)).nextNodes;
    const tempNextCondtList = nodeData.filter(item => (name === item.nodeName)).spltCondt;

    console.log("nodeData: ", nodeData);
    console.log("handle node clicked..."); //TODO test
    console.log("tempNextList: ", tempNextList); //TODO test
    console.log("tempNextCondtList", tempNextCondtList); //TODO test

    // setNextNodeList(tempNextList);
    // setNextCondtList(tempNextCondtList);

  }

  function enterNodeEditor() {
    let currNode = nodeData.find(node => node.nodeName === clickedNode);
    let currNodeType = currNode.nodeType;
    console.log(currNodeType);
    if (currNodeType === "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNode } });
    } else if (currNodeType === "Conversation") {
      navigate('/conversationnode', { replace: true, state: { clickedNode } });
    }
        //TODO later add conditions for board game and tower defense
  }

  function updateGDataToCloud(gameDataLatest) {
    const currUser = "user002"; //TODO test

    let project = "";
    if (currState != null) {
      if (currState.selected_project_name !== null && currState.selected_project_name!== undefined) {
        project  = currState.selected_project_name;
        if (project.trim() === "") {
          return;
        }
        updateGameDataVM({projectName: project, uname: currUser, gameData: gameDataLatest});
      }
    }
  }

  function addNewNode() { //TODO *** refactor: for new data-structure and depth plan
    const nodeDataTemp = nodeData;

    if (createNewNodeGameType === "") {
      console.log("Game type is required.") //TODO
      return;
    }
  
    if (createNewNodeName.length > 0) {
      //TODO later: check if node name duplicate in cloud-db
      //TODO now searching in temp "nodeData" testing data
      const found = nodeData.some((item) => item.nodeName === createNewNodeName);
      if (found) {
        console.log("Invalid node name: duplicate")
      } else {
        console.log("create-node submitted:" + createNewNodeName + ", " + createNewNodeGameType); // TODO temp
        
        //TODO calculate in-grou-position by filtering the same depth

        const newDataItem = { 
          nodeName: `${createNewNodeName}`, 
          depth: test_new_node_depth,
          inGroupPosition:0,
          nextNodes:[],  
          display: true, 
          nodeType:`${createNewNodeGameType}`}; //TODO temp

        nodeDataTemp.push(newDataItem); //TODO temp
        setNodeData(nodeDataTemp); //TODO later: update to cloud db
        set_test_new_node_depth(test_new_node_depth+1); //TODO test
        setCreateNewNodeName("");
        setCreateNewNodeGameType("");
        //TODO reset the look of dropdown list here
      }

    } else {
      console.log("Invalid node name: empty"); //TODO temp
    }
  }

  function addNewNodeGameType(event) {
    setCreateNewNodeGameType(event.target.value); //TODO later update to cloud db
    console.log("changed selection of new game type : " + event.target.value);
  }

  function addConnectionToNode(event) {
    setToNodeName(event.target.value); //TODO later update to cloud db
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

    setNodeData(nodeDataTemp);
    setToRevert("");
  }


  function addLinkBetweenNodes() { //TODO *** refactor: for new data-structure and depth plan
    const sourceNodeName = clickedNode;
    const nodeDataTemp = nodeData;
    let fromNodeIndex = -1, toNodeIndex = -1;
    let i = 0;
    //TODO idea: a node actually CAN link to itself, if there is "loop-like" occasion needed, but it would need game-data update eventually

    if (sourceNodeName === "" && toNodeName === "") {
      console.log("Sourec Node and Destination Node are required."); //TODO test
      return;
    }

    if (sourceNodeName === "") {
      console.log("Source Node is required."); //TODO test 
      return;
    }

    if (toNodeName === "") {
      console.log("Destination Node is required."); //TODO test 
      return;
    }

    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName === sourceNodeName) {
        fromNodeIndex = i;
      }
      if (nodeDataTemp[i].nodeName === toNodeName) {
        toNodeIndex = i;
      }
    }
    if (fromNodeIndex !== -1 && toNodeIndex !== -1) {
      if (nodeDataTemp[fromNodeIndex].nextNodes.includes(toNodeIndex)) {
        console.log("Warning: the two nodes are already linked"); //TODO test
      } else {
        nodeDataTemp[fromNodeIndex].nextNodes.push(toNodeIndex);
        setNodeData(nodeDataTemp); //TODO later: update to cloud db
        console.log("Added link !!! from " + nodeData[fromNodeIndex].nodeName + " to " + nodeData[toNodeIndex].nodeName + "!!!!!!!"); //TODO test 
        setFromNodeName("");
        setToNodeName("");
      }
    } 
  }

  function deleteLinkBetweenNodes() { //TODO *** refactor: for new data-structure and depth plan
    const sourceNodeName = clickedNode;

    const nodeDataTemp = nodeData;
    let fromNodeIndex = -1, toNodeIndex = -1;
    let i = 0;

    if (sourceNodeName === "" && toNodeName === "") {
      console.log("Sourec Node and Destination Node are required."); //TODO test
      return;
    }

    if (sourceNodeName === "") {
      console.log("Source Node is required."); //TODO test 
      return;
    }

    if (toNodeName === "") {
      console.log("Destination Node is required."); //TODO test 
      return;
    }
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName === sourceNodeName) {
        fromNodeIndex = i;
      }
      if (nodeDataTemp[i].nodeName === toNodeName) {
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
        
        setNodeData(nodeDataTemp); //TODO later: update to cloud db
        console.log("Removed link from " + nodeData[fromNodeIndex].nodeName + " to " + nodeData[toNodeIndex].nodeName + "......"); //TODO test 
        console.log(nodeData[fromNodeIndex]); //TODO
        setFromNodeName("");
        setToNodeName("");
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

    setNodeData(nodeDataTemp);
    setDeletingNodeName("");
  }

  function changeNextToNode() {
    setIsLinkNode(true);
  }

  function changeNextToSplitter() {
    setIsLinkNode(false);
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
      } else if (input === "v800_450") {
        //TODO pass into cloud: node info
        console.log("v800_450");

      } else if (input === "h600_800") {
        //TODO pass into cloud: node info
        console.log("h600_800");

      } else if (input === "v800_600") {
        //TODO pass into cloud: node info
        console.log("v800_600");
      } else {
        
        //TODO: show warning if not selected
        console.log("not selected!");
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

    const currUser = "user002"; //TODO test

    let project = "";

    if (currState != null) {
      if (currState.selected_project_name !== null && currState.selected_project_name!== undefined) {
        
        console.log("!!! This is for project: ", currState.selected_project_name);
        project  = currState.selected_project_name;
        console.log("checking2 on project ... [", project, "]");
        if (project.trim() === "") {
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
    } else {
        console.log("currState is null"); //TODO test
    }
  }


    return (     

        <div className="setting_area"> Node Management
        {displayGameDataWindow && <GameDataManager isDisplay={displayGameDataWindow} handleGdmCancel={handleGameDataManagerCancel} gameData={gameDataLocal} resetNeedCloudData={markNextNeedCloudGameData} fetchFromCloud={fetchGameDataFromCloud} updateGameDataToCloud={updateGDataToCloud}/>}

        <p className="plans"> TODO: link-arrows adjustment and improvement: better shaping, for different directions, etc.
            <br></br>
            <br></br> [source node] might attach a [logic-splitter], logic-splitter connect to 'multiple next-nodes' with 'conditional pair'
            <br></br> inside logic-splitter: add logic for decision, game-data checking and updating, each branch's condition and desintation-node
            <br></br> logic splitter's input: source node, branch pair (condition, destination-node)
            <br></br> this design is also better for auto-drawing of paths and node positions (for mulriple branchs' situation)

            <br></br> TODO: conversion of logic-condition? to consider

            <br></br> idea: logic organizer depends heavily on the game-data specified by author.
            <br></br> the game maker should provide entry for CRUD operations on game-data, in inside-node layer
            <br></br> frontend aspect, game-data manager is needed (CRUD); backend aspect, game-data's data structure on cloud is needed
            <br></br> for game-data, in the node-managing layer, it can only display/check, and only inside node can it alter game-data value via logic-organzer related system
            <br></br> [ ** first, implement and test simple logical conditions, then improve to combos (with parenthesis) ]
        
        </p> 

        <div>New Node
        <br></br>
        <label>Node Name: </label>
        <input 
          className="setting_item"
          type="text" value={createNewNodeName} 
          // onBlur={e => {console.log(e.target.value);}      //TODO now not in use}
          onChange={e => {setCreateNewNodeName(e.target.value)}}  
        />
        <select className="setting_item" onChange={addNewNodeGameType} value={createNewNodeGameType}>
          <option value="" key=""> -- Select Node's Game Type -- </option>
          <option value="Card Game" key="Card Game">Card Game</option>
          <option value="Board Game" key="Board Game">Board Game</option>
          <option value="Tower Defense" key="Tower Defense">Tower Defense</option>
          <option value="Conversation" key="Conversation">Conversation</option>
        </select>
        <label>Screen Size:</label>
        <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
              <option value="" key=""> ----- Select Size and Direction ----- </option>
              <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
              <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
              <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
              <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
            </select>
    
        <button 
          className="setting_item"
          onClick={addNewNode}>
            Create
        </button>
        </div>
        
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nodes_viewer"
            viewBox="10 -10 2000 300"
          >
    
          {Object.keys(nodeData).map((nodeIndex, index) => {
            // const { node_width, node_height } = nodeData[nodeIndex];
            const x_val = nodeData[index].depth * 240 + x_base;
            //TODO calculate in-group-position by same-depth
            const y_val = y_base + (node_height+y_dist) * nodeData[index].inGroupPosition;

            

            return (
              
              <g key={nodeIndex}>
                {nodeData[nodeIndex].nextNodes.map((nextNodeIndex, nextIndex) => {
                  
                  const next_x_val = nodeData[nextNodeIndex].depth * 240 + x_base;
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
    
    
          {clickedNode !== "" && 
        <div>
        <button 
          className="setting_item"
          onClick={enterNodeEditor}>
            Edit Content of [{clickedNode}]
        </button>
    
        <button 
          className="setting_item"
          onClick={()=>{
            console.log("Deleting this node...", clickedNode); 
            handleDeleteNodeWithParam(clickedNode);
            setClickedNode("");
          }}>
            Delete [{clickedNode}]
        </button>
        
        </div>
        }
    
        
          <br></br>
    
    
        {(clickedNode !== "") && 
        <>
        <p className="plans">TODO: display current setup for this node, such as next node, conditions, etc.
          <br></br> - if there is already a next-node or logic splitter, show the editing layout; otherwise show append-new layout.
          <br></br> - for node-link editing: later adding links should be done by attach-new, and deleting links should be done by deleting-next; no direct control about links?
        </p> 
        <br></br>       
        <p className="plans">
            New Design Idea: *Each* node contains 1 logic splitter by default
            <br></br>Next node condition is "true"(always) by default
            <br></br>user can add 0 to many next-nodes with conditions(always by default)
            <br></br>each node maintains a [list] of (next-node) and a [list] of (condition) (1-to-1 mapping by index)
            <br></br>Limitation: cannot have multiple "always-true" path

        </p>

        <p className="sectionHeader">***Edit Node-Links***</p>
        
        <br></br>
        <label>From Node [{clickedNode}] </label>
        <label> to Node </label>
        <select onChange={addConnectionToNode} value={toNodeName}>
            <option value="" key=""> -- Select Destination Node -- </option> 
        {nodeData.map((nextIndex, index) => {
          if (nodeData[index].display === false) {
            return "false";
          }
          return (
            <option value={nodeData[index].nodeName} key={nodeData[index].nodeName}>{nodeData[index].nodeName}</option>
          );
        })}
        </select>
        <br></br>
        <button 
          className="setting_item"
          onClick={addLinkBetweenNodes}>
            Add connection
        </button>
        <button 
          className="setting_item"
          onClick={deleteLinkBetweenNodes}>
            Delete connection
        </button>
    
            

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div>

        <p className="sectionHeader">***Next-Element***</p>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Next Node</th>
                    <th>Condition</th>
                </tr>
            </thead>
 
            <tbody>

            {nextNodeList.map((item, index) => {
                    return (<tr>
                        <td>{item}</td>
                        <td>{nextCondtList[index]}</td>
                    </tr>);
                })}


            </tbody>
        </table>
        </div>

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

        <input type="radio" name="node" value={isLinkNode} onChange={changeNextToNode} checked={isLinkNode}/>An existing Node
    
    {/* //TODO: change later */}
        {isLinkNode && <> 
          <p className="plans">TODO improve later
          <br></br>Design: can specify initial size & direction here
          </p>
    
        <br></br>
            <p className="plans">
                [a list of existing nodes]
            </p>
        </>
        }
        {!isLinkNode && <p>----------------------------------------------------</p>}
        </div>
    
        <div>
        <input type="radio" name="logic_splitter" value={isLinkNode} checked={!isLinkNode} onChange={changeNextToSplitter}/>A Logic Splitter
    
    {/* //TODO: change later */}
        {!isLinkNode && 
        <>
        <p className="plans">TODO improve later</p>
    
          
        <br></br>
      
        <p className="plans">
          Current idea on logic-splitter:
          <br></br>fill in information
          <br></br>(source node is already selected)
          <br></br>an array of pairs [(condition, next-node),(condition, next-node), ...]
          <br></br>for condition: *important* analyze and design comparison or check generalization
          <br></br>would use game-data here. two sides of the condition might be one variable vs one value, or one variable vs on variable, etc.
          <br></br>on node path, display brief text of condition?
        </p>
    
        <p className="plans">**important!! for each node, it should keep track of it's number of conditional-consequence for its logic-splitter</p>
        <p className="plans"> display current node's logic-splitter count and 1 more empty form when creating a new pair! </p>
    
    
        <div className="areaBlue">
        <button onClick={fetchGameDataFromCloud}>Load Game Data </button>
        {displayGameDataButton && <button onClick={displayGameDataFunc}> Game data Manager </button>}
        {!displayGameDataButton && <label> Opening Game Data Manager... </label>}

        <br></br>
        <label> Variable 1: </label>

        <select>
          {Object.keys(gameDataLocal).map((currKey) => {
              const keyStr = gameDataLocal[currKey]["name"] + "1";
              return (
              <option value={logicSplitter_gameDataVar1} key={keyStr}>{currKey}</option>
              );
          })}
        </select>
        <br></br>
    
        <label>Comparison: </label>
        <select>
              <option key="" value="-"> -- Operator -- </option>
              <option key="larger" value="larger"> larger than </option>
              <option key="smaller" value="smaller"> smaller than </option>
              <option key="equal" value="equal"> equal to </option>
              <option key="largerequal" value="largerequal"> larger than or euqal to </option>
              <option key="smallerequal" value="smallerequal"> smaller than or equal to</option>
        </select>
        <br></br>
        <label> Variable 2: </label>
        <br></br>
        <input type="radio" value={logicSplitterVar2IsGData} checked={logicSplitterVar2IsGData} onChange={changeLsVar2ToGameData}/> Game Data Item: 
        <select>
          {Object.keys(gameDataLocal).map((key) => {
              return (
              <option value={logicSplitter_gameDataVar2} key={gameDataLocal[key]["name"]}>{key}</option>
              );
              })}
        </select>
        <br></br>
        <input type="radio" value={logicSplitterVar2IsGData} checked={!logicSplitterVar2IsGData} onChange={changeLsVar2ToValue}/> Value:
        <input></input>
        <br></br>
        <label> Next Node: </label>
        
        <br></br><label>Name: </label>
        <input></input>
        <br></br><label>Type: </label>
        
            <select className="setting_item" onChange={addNewNodeGameType} value={createNewNodeGameType}>
                <option value="" key=""> -- Select Node's Game Type -- </option>
                <option value="Card Game" key="Card Game">Card Game</option>
                <option value="Board Game" key="Board Game">Board Game</option>
                <option value="Tower Defense" key="Tower Defense">Tower Defense</option>
                <option value="Conversation" key="Conversation">Conversation</option>
            </select>
        <br></br><label>Screen Size:</label>
        <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
            <option value="" key=""> ----- Select Size and Direction ----- </option>
            <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
            <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
            <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
            <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
        </select>
        <br></br>
        <button onClick={()=>{console.log("TODO: add a pair of conditional consequence in logic splitter");setCurrNodeSplitterNum(currNodeSplittedNum + 1);}}> Add </button>
        </div>
        </>}
        {isLinkNode && <p>----------------------------------------------------</p>}
    
        </div>
        
        
        
        <div>
      
        </div>
        </>
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
    
        <p className="plans"> TODO: consider "reverted node" overlap problem if later created new nodes around 
        <br></br> for reverted node, it keeps the original content, but relationship needs rebuidling?
        <br></br> (that is, there can be "pending nodes" that are reverted node to add?)
        <br></br> idea1: when user append a node, can from scratch, or use "reverted node"?
        <br></br> idea2: for a revert node, provide available places to insert
        <br></br> - overall, won't let the reverted node to float without connection
        
        </p>
    
        </div>
    
    
        <button 
          className="setting_item"
          onClick={() => console.log("saving settings of nodes...")}>
            Save To My Project
        </button>
    
        </div>
    

    );
}