import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';


export default function GameMaker() {

/* // TODO game-maker task list
1. add "chapter management"
2. logic organizer for game-node-relationship
3. preview and test for node play-flow (progress: 35%)
4. testing data for some nodes on cloud-db
*/


/* // TODO game-node visualization task list, dont items removed
1. switching between "new node" and "edit node"
3. for "edit node", allow edition of several properties
4. optimization of paths: non-overlapping, line to path
5. optimization of paths: arrow looking
6. draggable nodes? (optional)
7. optimization on node positions when generated
8. adjust svg size, zoom/scrollbar options
9. game node brief info display and options (hover and click)
10. change data design for "layer" for auto-node arrangement: map-like (k,v) for (layer, [node1, node2, node3, ...]); for node's that came from multiple sources with different depths, consider later
depth & inGroupPosition should be the outer part of a node?
that is, when doing CRUD on nodes, change this tracking-data-structure as well.

*/


  const {state} = useLocation();

  if (state != null) { //TODO testing
    if (state.addedNewProjName != null) {
      console.log(state.addedNewProjName);
    }
  }


  // TODO testing, temp
  const [test_new_node_depth, set_test_new_node_depth] = useState(5);

  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", depth: 1, inGroupPosition:0, nextNodes:[1], display: true, nodeType:"Conversation"},
    { nodeName: "plot2",depth: 2, inGroupPosition:0, nextNodes:[2, 3], display: true, nodeType:"Conversation"},
    { nodeName: "option x", depth: 3, inGroupPosition:0, nextNodes:[4], display: true, nodeType:"Conversation"},
    { nodeName: "option y", depth: 3, inGroupPosition:1, nextNodes:[4], display: true, nodeType:"Card Game"},
    { nodeName: "end node", depth: 4, inGroupPosition:0, nextNodes:[], display: true, nodeType:"Conversation"},
  ]); //TODO testing data


   /* variable area */
   const navigate = useNavigate();
   const name = "/gamemaker";
   const [modeCreateNewNode, setModeToCreateNewNode] = useState(false);
   const [clickedNode, setClickedNode] = useState("");
   const [createNewNodeName, setCreateNewNodeName] = useState('');
   const [createNewNodeGameType, setCreateNewNodeGameType] = useState("");
   const [fromNodeName, setFromNodeName] = useState("");
   const [toNodeName, setToNodeName] = useState("");
   const [deletingNodeName, setDeletingNodeName] = useState("");

   const x_base = 1, y_base = 1;
   const node_width = 190, node_height = 70;

  console.log("This is game-maker component -- render once."); //TODO

  function handleNodeClick(name) {
    console.log("node = " + name); //TODO
    setClickedNode(name);
    // TODO refactor: display option of [Edit Conetnt], [Add next node], [Add logic splitter], [Delete this node]
  }

  function enterNodeEditor() {
    let currNode = nodeData.find(node => node.nodeName === clickedNode);
    let currNodeType = currNode.nodeType;
    console.log(currNodeType);
    if (currNodeType == "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNode } });
    } else if (currNodeType == "Conversation") {
      navigate('/conversationnode', { replace: true, state: { clickedNode } });
    }
        //TODO later add conditions for board game and tower defense
  }

  function addNewNode() {
    const nodeDataTemp = nodeData;

    if (createNewNodeGameType == "") {
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
    setModeToCreateNewNode(false);
  }

  function addNewNodeGameType(event) {
    setCreateNewNodeGameType(event.target.value); //TODO later update to cloud db
    console.log("changed selection of new game type : " + event.target.value);
  }

  function addConnectionFromNode(event) {
    setFromNodeName(event.target.value); //TODO later update to cloud db
  }

  function addConnectionToNode(event) {
    setToNodeName(event.target.value); //TODO later update to cloud db
  }

  function addLinkBetweenNodes() {
    const nodeDataTemp = nodeData;
    let fromNodeIndex = -1, toNodeIndex = -1;
    let i = 0;
    //TODO idea: a node actually CAN link to itself, if there is "loop-like" occasion needed, but it would need game-data update eventually

    if (fromNodeName == "" && toNodeName == "") {
      console.log("Sourec Node and Destination Node are required."); //TODO test
      return;
    }

    if (fromNodeName == "") {
      console.log("Source Node is required."); //TODO test 
      return;
    }

    if (toNodeName == "") {
      console.log("Destination Node is required."); //TODO test 
      return;
    }

    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName == fromNodeName) {
        fromNodeIndex = i;
      }
      if (nodeDataTemp[i].nodeName == toNodeName) {
        toNodeIndex = i;
      }
    }
    if (fromNodeIndex != -1 && toNodeIndex != -1) {
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

  function deleteLinkBetweenNodes() {
    const nodeDataTemp = nodeData;
    let fromNodeIndex = -1, toNodeIndex = -1;
    let i = 0;

    if (fromNodeName == "" && toNodeName == "") {
      console.log("Sourec Node and Destination Node are required."); //TODO test
      return;
    }

    if (fromNodeName == "") {
      console.log("Source Node is required."); //TODO test 
      return;
    }

    if (toNodeName == "") {
      console.log("Destination Node is required."); //TODO test 
      return;
    }
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName == fromNodeName) {
        fromNodeIndex = i;
      }
      if (nodeDataTemp[i].nodeName == toNodeName) {
        toNodeIndex = i;
      }
    }
    if (fromNodeIndex != -1 && toNodeIndex != -1) {
      if (!nodeDataTemp[fromNodeIndex].nextNodes.includes(toNodeIndex)) {
        console.log("Warning: the two nodes are not linked ..."); //TODO test
      } else {

        let j =0;
        let newArr = [];
        for (; j < nodeDataTemp[fromNodeIndex].nextNodes.length; j++) {
          if (nodeDataTemp[fromNodeIndex].nextNodes[j] != toNodeIndex) {
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

  function selectDeletingNode(event) {
    setDeletingNodeName(event.target.value); //TODO later update to cloud db
    console.log("selecting in list: deleting? ");
    console.log(event.target.value);
  }

  function handleDeleteNodeWithParam(nodeToDelete){
    let i = 0;
    const nodeDataTemp = nodeData;
    let deletedNodeIndex = 0;
    for (; i < nodeDataTemp.length; i++) {
      if (nodeDataTemp[i].nodeName == nodeToDelete) {
        nodeDataTemp[i].display = false;
        deletedNodeIndex = i;
      }
    }

    i = 0;
    for (; i < nodeDataTemp.length; i++) {
      //if nextNodes contains "deletedNodeIndex", remove it
      if (nodeDataTemp[i].nextNodes.includes(deletedNodeIndex)) {
        let j = 0;
        let newArr = [];
        for (; j < nodeDataTemp[i].nextNodes.length; j++) {
          if (nodeDataTemp[i].nextNodes[j] != deletedNodeIndex) {
            newArr.push(nodeDataTemp[i].nextNodes[j]);
          }
        }
        nodeDataTemp[i].nextNodes = newArr;
      }

      //also remove all nodes in "deletedNodeIndex"'s node
      if (i == deletedNodeIndex) {
        nodeDataTemp[deletedNodeIndex].nextNodes = [];
      }

    }

    setNodeData(nodeDataTemp);
    setDeletingNodeName("");
  }

  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }

  return (
  <div>

    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
    </div>

    <p className="plans"> Game Maker page 
    <br></br>this is the place to edit for a specific game </p>
   
    <p className="plans"> TODO: game-flow controller:
     <br></br> in charge of where the game flow goes, including using logic organizer to decide on branches, progress, etc. 
     <br></br>
     <br></br> [source node] connect to [logic-splitter], logic-splitter connect to 'multiple next-nodes'
     <br></br> inside logic-splitter: add logic for decision, game-data checking and updating, each branch's condition and next-node
     <br></br> logic splitter's input: source node, branch pair (condition, next-node)
     <br></br> later: for each node, they would not have an array of single/multiple "next-nodes", but either one next-node, or a logic-splitter instead??
     <br></br> this design is also better for auto-drawing of paths and node positions (for mulriple branchs' situation)
     </p>

    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and click
      <br></br>hover a node would show the starting wording/desciption of this node
    </p>



    <div className="setting_area"> Node Management
    <p className="plans"> TODO: link-arrows adjustment and improvement: better shaping, for different directions, etc.</p>
    <p className="plans"> TODO: better ways for UX on node relationship operations: inserting nodes, add links, deleting links, deleting nodes (functionality ok, need UI & UX improvement)
    <br></br> - when clicking on a node? display option of [Edit Conetnt], [Add next node], [Add logic splitter], [Delete this node]
    <br></br> - can link be deleted by user? 
    <br></br>1. when deleting the next node, the link get deleted together; 2. when changing next-node, just edit the source-node's info; 3. avoid "unreachable" node by not allowing deleting links?
    </p>

    <p className="plans"> TODO: node positions: in-group-position and depth, etc.; auto/dynamic adjustment after adding or removing nodes </p>
    <p className="plans"> TODO: "undo" and "redo" features: so far, can have "trash area" for nodes and logic splitters, and allow "revert" of deletions? 
    <br></br>Since added items (node/link) can be deleted easily but deleted items are harder to revert</p>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="nodes_viewer"
        viewBox="10 -10 2000 300"
      >

      {Object.keys(nodeData).map((nodeIndex, index) => {
        // const { node_width, node_height } = nodeData[nodeIndex];
        const x_val = nodeData[index].depth * 240 + x_base 
        const y_val = y_base + (node_height+30) * nodeData[index].inGroupPosition
         
        return (
          
          <g key={nodeIndex}>
            {nodeData[nodeIndex].nextNodes.map((nextNodeIndex, nextIndex) => {
              
              const next_x_val = nodeData[nextNodeIndex].depth * 240 + x_base 
              const next_y_val = y_base + (node_height+30) * nodeData[nextNodeIndex].inGroupPosition
               
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
            {nodeData[nodeIndex].display == true && 
            <rect
              key={nodeData[nodeIndex].nodeName}
              className="game_node_vis"
              x={x_val}
              y={y_val}
              width={node_width}
              height={node_height}
              fill="#b2efe0"
              stroke="#b2b2b2"
              onClick={() => {handleNodeClick(nodeData[nodeIndex].nodeName);}}
            />
            }
            {nodeData[nodeIndex].display == true && 
            <text x={x_val + 5} y={y_val + 20} fill="#323232" key={`text_${nodeIndex}`}>
              {nodeData[nodeIndex].nodeName}
            </text>
            }
          </g>
        );
      })}

      </svg>


      {clickedNode != "" && 
    <div>
    <button 
      className="setting_item"
      onClick={enterNodeEditor}>
        Edit Content of [{clickedNode}]
    </button>

    <button 
      className="setting_item"
      onClick={()=>{setModeToCreateNewNode(!modeCreateNewNode);}}>
        Node Relationship
    </button>
    
    <button 
      className="setting_item"
      onClick={()=>{
        console.log("Deleting this node...", clickedNode); 
        handleDeleteNodeWithParam(clickedNode);
        setClickedNode("");
      }}>
        Delete
    </button>
    
    </div>
    }

    
      <br></br>


    {modeCreateNewNode && 
    <>

    <div>
      Link to a New Node
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

    <button 
      className="setting_item"
      onClick={addNewNode}>
        Create
    </button>
    </div>

    <div>
    Link to a Logic Splitter
    <br></br>
    <button 
      className="setting_item"
      onClick={()=>{console.log("Adding Logic Splitter...", clickedNode)}}>
        Add Logic Splitter
    </button>

    </div>
    
    
    
    <div>
    <br></br>
    Edit Existing Node
    <br></br>
    <label>From Node [{clickedNode}] </label>
 {/* //TODO change "fromNode" to "clickedNode" */}
    <label> to Node </label>
    <select onChange={addConnectionToNode} value={toNodeName}>
    <option value="" key=""> -- Select Destination Node -- </option> 
    {nodeData.map((nextIndex, index) => {
      if (nodeData[index].display == false) {
        return;
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

    </div>
    </>
  }
    


    <button 
      className="setting_item"
      onClick={() => console.log("saving settings of nodes...")}>
        Save To My Project
    </button>

    </div>

  </div>
    );
}
