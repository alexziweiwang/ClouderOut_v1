import * as React from 'react';
import { useState } from 'react';
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
  console.log(state.addedNewProjName);

  const name = "/gamemaker";
  // TODO testing
  const x_base = 120, y_base = 52;
  const node_width = 190, node_height = 70;
  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", x:x_base, y:y_base + 30, nextNodes:[1], display: true},
    { nodeName: "plot2", x:x_base+node_width+20, y:y_base + 30, nextNodes:[2, 3], display: true},
    { nodeName: "option x", x:x_base+node_width*2+40, y:y_base, nextNodes:[4], display: true},
    { nodeName: "option y", x:x_base+node_width*2+40, y:y_base + 90, nextNodes:[4], display: true},
    { nodeName: "end node", x:x_base+node_width*3+60, y:y_base + 40, nextNodes:[], display: true},
  ]); 
  const [modeCreateNewNode, setModeToCreateNewNode] = useState(true);

  function handleNodeClick(name) {
    console.log("node = " + name); //TODO
  }

  function addNewNode() {
    const nodeDataTemp = nodeData;
    if (val.length > 0) {
      //TODO check if node name duplicate
      const found = nodeData.some((item) => item.nodeName === val);
      if (found) {
        console.log("Invalid node name: duplicate")
      } else {
        console.log("create-node submitted:" + val); // TODO temp
        const newDataItem = { nodeName: `${val}`, x:x_base+node_width*4+20, y:30, nextNodes:[], display: true}; //TODO temp
        nodeDataTemp.push(newDataItem);
        setNodeData(nodeDataTemp);
        setValue("");
      }

    } else {
      console.log("Invalid node name: empty"); //TODO temp
    }
  }

  const navigate = useNavigate();
  const [val, setValue] = useState('');

  function goToDashboard() {
    navigate('/dashboard', { replace: true });
  }

  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }

  function goToPieceScreenEditingPanel() {
    navigate('/piecepanel', { replace: true});
  }
    
    return (
  <div>

    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
    </div>

    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and double-click
      <br></br>hover a node would show the starting wording/desciption of this node
      <br></br>double-click a node would pop an intro window? for options?
    </p>

    <p className="plans">
      TODO: logic organizer: let users to fill node-connection-rules *important*
      <br></br>carry game data to the decision node
      <br></br>with the "formula" the user created by custom logic organizer, update "next node" assignment of this "decision node"?
    </p>

    <div className="setting_area"> Node Management
    <p className="plans"> TODO : dynamic operation panel : create new or edit existing nodes or delete nodes (put into trash area)</p>
    <p className="plans"> TODO: better ways for UX on node relationship operations: inserting nodes, add links, deleting links, deleting nodes</p>
    <p className="plans"> TODO               think of ways to organize node layers/positions with insertion considered</p>
    <p className="plans"> TODO: link-arrows adjustment and improvement: different directions, etc.</p>


    <br></br>
    {/* modeCreateNewNode, setModeToCreateNewNode */}
    <div> 
    Create New Node
    <br></br>
    <input 
      className="setting_item"
      type="text" value={val} 
      // onBlur={e => {console.log(e.target.value);}      //TODO now not in use}
      onChange={e => {setValue(e.target.value)}}  
    />
    <br></br>
    <select className="setting_item">
      
      <option value="cardg">Card Game</option>
      <option value="boardg">Board Game</option>
      <option value="fortdefenseg">Tower Defense</option>
      <option value="conversation">Conversation</option>
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
    <label>current node </label>
    <select>
    {nodeData.map((nextIndex, index) => {
      return (
        <option value="${nodeData[index].nodeName}" key={index}>{nodeData[index].nodeName}</option>
      );
    })}
    </select>
    <br></br>
    <label>next node</label>
    <select multiple={true}>
    {nodeData.map((nextIndex, index) => {
      return (
        <option value="${nodeData[index].nodeName}" key={nodeData[index].nodeName}>{nodeData[index].nodeName}</option>
      );
    })}
    </select>
    <br></br>
    <button 
      className="setting_item"
      onClick={() => console.log("add connection")}>
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








    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="nodes_viewer"
        viewBox="10 -10 2000 2000"
      >

      {Object.keys(nodeData).map((nodeIndex, index) => {
        // const { node_width, node_height } = nodeData[nodeIndex];
        const x_val = nodeData[index].x
        const y_val = nodeData[index].y
        
        return (
          <g key={nodeIndex}>
            {nodeData[nodeIndex].nextNodes.map((nextNodeIndex, nextIndex) => {
              // console.log("!   ");
              // console.log(nodeData[nodeIndex]);
              // console.log("this is " + nodeData[nodeIndex].nodeName + " and it's connecting to ");
              // console.log(nodeData[nextNodeIndex]);
              // console.log("   ");      //TODO remove later (after all tests completed)
              
              if (nodeData[nodeIndex].display == false || nodeData[nextNodeIndex].display == false) {
                return;
              } 
              
              let point_string = 
                (nodeData[nextNodeIndex].x-15) + "," + (y_val + node_height / 2 - 10) + " " + 
                (nodeData[nextNodeIndex].x-15) + "," + (y_val + node_height / 2 + 10) + " " + 
                nodeData[nextNodeIndex].x + "," + (nodeData[nextNodeIndex].y + node_height / 2);
              return (
                <>
                <line
                  key={`line_${nodeIndex}_${nextIndex}`}
                  x1={x_val + node_width}
                  y1={y_val + node_height / 2}
                  x2={nodeData[nextNodeIndex].x}
                  y2={nodeData[nextNodeIndex].y + node_height / 2}
                  stroke="green"
                  strokeWidth="2"
                />
                <polygon 
                  points={point_string}
                  style={{fill: "green"}}
                />
                {/* //TODO: other direction-arrows */}
                </>

              );
            })}
            {nodeData[nodeIndex].display && 
            <rect
              className="game_node_vis"
              x={x_val}
              y={y_val}
              width={node_width}
              height={node_height}
              fill="#b2efe0"
              stroke="#b2b2b2"
              onClick={() => handleNodeClick(nodeData[nodeIndex].nodeName)}
            />
            }
            {nodeData[nodeIndex].display && 
            <text x={x_val + 5} y={y_val + 20} fill="#323232">
              {nodeData[nodeIndex].nodeName}
            </text>
            }
          </g>
        );
      })}

      </svg>

      <button 
      className="setting_item"
      onClick={() => console.log("saving settings of nodes...")}>
        Save To My Project
    </button>

    </div>


    {/* <p className="plans">Temp: </p> */}
      {/* this can be selected in the future: as a child class of node */}
    {/* <button className="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
