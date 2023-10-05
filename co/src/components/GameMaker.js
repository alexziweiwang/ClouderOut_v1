import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function GameMaker() {
  // TODO testing
  const nodeData = [
    { nodeName: "plot1", width:100, height:40, rx:5, x:100, y:-10, nextNodes:[1] },
    { nodeName: "plot2", width:100, height:40, rx:5, x:160, y:-10, nextNodes:[2, 3] },
    { nodeName: "option x", width:100, height:40, rx:5, x:220, y:-10, nextNodes:[4] },
    { nodeName: "option y", width:100, height:40, rx:5, x:280, y:-10, nextNodes:[4] },
    { nodeName: "end node", width:100, height:40, rx:5, x:280, y:-10, nextNodes:[] },
  ]; 

  function handleNodeClick(name) {
    console.log("node = " + name); //TODO
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
      <button className="button" onClick={goToDashboard}>Return to Dashboard </button>
      <button className="button" onClick={goToProjectManagingPanel}>Return to Project Managing Panel </button>
    </div>

    <p className="plans">
      TODO: Entry: Create New Node
      <br></br> - node name 
      <br></br> - node type (game type)
      <br></br> - inserting place -- basically updating these pre-nodes' "next node" pointer to this new node
      <br></br> (fill in and see viewer's change, confirm to update cloud db)
    </p>
    <div className="setting_area"> Create a New Node
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
      onClick={e => {console.log("create-node submitted:" + val)}}>
        Create
    </button>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="nodes_viewer"
        viewBox="10 -10 2000 2000"
      >

      {Object.keys(nodeData).map((nodeIndex, index) => {
        const { width, height } = nodeData[nodeIndex];
        const x_val = 100 + index * (width + 30);
        const y_val = 2;
        nodeData[index].x = x_val;
        nodeData[index].y = y_val;
        
        return (
          <g key={nodeIndex}>
            <rect
              x={x_val}
              y={y_val}
              width={width}
              height={height}
              fill="#b2efe0"
              stroke="#b2b2b2"
              onClick={() => handleNodeClick(nodeData[nodeIndex].nodeName)}
            />
            <text x={x_val + 5} y={y_val + 20} fill="#323232">
              {nodeData[nodeIndex].nodeName}
            </text>
            {nodeData[nodeIndex].nextNodes.map((nextNodeIndex, nextIndex) => {
              console.log("nextNode: " + nextNodeIndex);
              return (
                <line
                  key={`line_${nodeIndex}_${nextIndex}`}
                  x1={x_val + width}
                  y1={y_val + height / 2}
                  x2={nodeData[nextNodeIndex].x}
                  y2={nodeData[nextNodeIndex].y}
                  stroke="green"
                  strokeWidth="2"
                />
              );
            })}

          </g>
        );
      })}

      </svg>


    </div>

    <p className="plans">
          CONSIDERING solution of "linked list looks": nodes and arrows
          <br></br>TODO use SVG
    </p>
    
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

    <p className="plans">
      -------------- Tasks TODO -------------- 
      <br></br> 1. visualization and setting of graph of nodes
      <br></br> 2. solution of logic organizer for nodes
    </p>


    {/* <p className="plans">Temp: </p> */}
      {/* this can be selected in the future: as a child class of node */}
    {/* <button className="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
