import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
import db from '../googleCloudConnetions';

export default function GameMaker() {

/* // TODO game-maker task list
1. add "chapter management"
2. logic organizer for game-node-relationship
3. preview and test for node play-flow
*/


/* // TODO game-node visualization task list
1. switching between "new node" and "edit node"
2. for "new node", selection of previous node (where does it start)
3. for "edit node", allow edition of several properties
4. optimization of paths: non-overlapping, line to path
5. optimization of paths: arrow looking
6. draggable nodes? (optional)
7. optimization on node positions when generated
8. adjust svg size, zoom/scrollbar options
9. game node brief info display and options (hover and click)
*/


  const {state} = useLocation();

  if (state != null) {
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
   const [modeCreateNewNode, setModeToCreateNewNode] = useState(true);
   const [selectedNode, setSelectedNode] = useState("");
   const [createNewNodeName, setCreateNewNodeName] = useState('');
   const [createNewNodeGameType, setCreateNewNodeGameType] = useState("");
   const [fromNodeName, setFromNodeName] = useState("");
   const [toNodeName, setToNodeName] = useState("");
   const x_base = 1, y_base = 1;
   const node_width = 190, node_height = 70;

  function handleNodeClick(name) {
    console.log("node = " + name); //TODO
    setSelectedNode(name);
  }

  function enterNodeEditor() {
    let currNode = nodeData.find(node => node.nodeName === selectedNode);
    let currNodeType = currNode.nodeType;
    console.log(currNodeType);
    if (currNodeType == "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { selectedNode } });
    } else if (currNodeType == "Conversation") {
      navigate('/conversationnode', { replace: true, state: { selectedNode } });
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

  function deleteLink() {
    //TODO check if 2 nodes has link, and then remove the link by updating info in nodeData
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

    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and click
      <br></br>hover a node would show the starting wording/desciption of this node
    </p>



    <div className="setting_area"> Node Management
    <p className="plans"> TODO : dynamic operation panel : create new or edit existing nodes or delete nodes (put into trash area)</p>
    <p className="plans"> TODO: better ways for UX on node relationship operations: inserting nodes, add links, deleting links, deleting nodes</p>
    <p className="plans"> TODO               think of ways to organize node depth/positions with insertion considered</p>
    <p className="plans"> TODO: link-arrows adjustment and improvement: different directions, etc.</p>

    {selectedNode != "" && <button 
      className="setting_item"
      onClick={enterNodeEditor}>
        Edit {selectedNode} in Editor
    </button>}
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

              if (nodeData[nodeIndex].display == false || nodeData[nextNodeIndex].display == false) {
                return;
              } 
              
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
                />

              );
            })}
            {nodeData[nodeIndex].display && 
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
            {nodeData[nodeIndex].display && 
            <text x={x_val + 5} y={y_val + 20} fill="#323232" key={`text_${nodeIndex}`}>
              {nodeData[nodeIndex].nodeName}
            </text>
            }
          </g>
        );
      })}

      </svg>

    
      <br></br>
    {/* modeCreateNewNode, setModeToCreateNewNode */}
    <div> 
    Create New Node
    <br></br>
    <input 
      className="setting_item"
      type="text" value={createNewNodeName} 
      // onBlur={e => {console.log(e.target.value);}      //TODO now not in use}
      onChange={e => {setCreateNewNodeName(e.target.value)}}  
    />
    <br></br>
    <select className="setting_item" onChange={addNewNodeGameType} value={createNewNodeGameType}>
      <option value="" key=""> -- Select Node's Game Type -- </option>
      <option value="Card Game" key="Card Game">Card Game</option>
      <option value="Board Game" key="Board Game">Board Game</option>
      <option value="Tower Defense" key="Tower Defense">Tower Defense</option>
      <option value="Conversation" key="Conversation">Conversation</option>
    </select>
    <br></br>

    <button 
      className="setting_item"
      onClick={addNewNode}>
        Create
    </button>
    </div>
    
    <div>
    <br></br>
    Edit Existing Node
    <br></br>
    <label>From Node </label>
 
    <select onChange={addConnectionFromNode} value={fromNodeName}>
    <option value="" key=""> -- Select Source Node -- </option> 
    {
    nodeData.map((nextIndex, index) => {
      return (
        <option value={nodeData[index].nodeName} key={index}>{nodeData[index].nodeName}</option>
      );
    })}
    </select>
    <label> to Node </label>
    <select onChange={addConnectionToNode} value={toNodeName}>
    <option value="" key=""> -- Select Destination Node -- </option> 
    {nodeData.map((nextIndex, index) => {
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
      onClick={() => console.log("delete connection !")}>
        Delete connection
    </button>

    </div>
    
    <div>
    <br></br>
    Put Node into Trash Area
    <br></br>
    <select>
    {nodeData.map((nextIndex, index) => {
      const keyStr = nodeData[index].nodeName+index
      return (
        <option value="${nodeData[index].nodeName}" key={keyStr}>{nodeData[index].nodeName}</option>
      );
    })}
    </select>
    <br></br>
    <button 
      className="setting_item"
      onClick={() => {
        console.log("delete node...!!!")
        
        }}>
        Delete Node
    </button>
    </div>

{/* //TODO read and use the selected values */}

<p className="plans">
                *** resource management consideration: along the entire project, the user should be able to add, remove, and use some resource they upload
                <br></br>- the presentation/preview should consider fewer re-render on these resource
                <br></br>- in the game node editing process, the user should work closely with the resource manager for specifying the resource
                <br></br> for example, something like a "resource pool/stock" should be always available for actions
                <br></br>- for all game-node editing, rsrc-mgmt should be available; later for node visualization, it might be good UX if also support some mini pic on the node's looking
            </p>


      <button 
      className="setting_item"
      onClick={() => console.log("saving settings of nodes...")}>
        Save To My Project
    </button>

    </div>

  </div>
    );
}
