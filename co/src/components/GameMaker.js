import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';


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







  // TODO testing
  const x_base = 100, y_base = 2;
  const node_width = 100, node_height = 40;
  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", x:x_base, y:y_base + 30, nextNodes:[1] },
    { nodeName: "plot2", x:x_base+120, y:y_base + 30, nextNodes:[2, 3] },
    { nodeName: "option x", x:x_base+240, y:y_base, nextNodes:[4] },
    { nodeName: "option y", x:x_base+240, y:y_base + 60, nextNodes:[4] },
    { nodeName: "end node", x:x_base+360, y:y_base + 30, nextNodes:[] },
  ]); 

  // TODO think of dynamic calculation for visualization
  // if even number of branch-nodes, then calculate mid-point y-value in mid line
  // if odd number of branch-nodes, then the same y with mid-node

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
        const newDataItem = { nodeName: `${val}`, x:580, y:30, nextNodes:[]  }; //TODO temp
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
      <button className="button" onClick={goToDashboard}>Return to Dashboard </button>
      <button className="button" onClick={goToProjectManagingPanel}>Return to Project Managing Panel </button>
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

    <p className="plans">
      TODO: Entry: Create New Node
      <br></br> - node name 
      <br></br> - node type (game type)
      <br></br> - inserting place -- basically updating these pre-nodes' "next node" pointer to this new node
      <br></br> (fill in and see viewer's change, confirm to update cloud db)
    </p>
    <div className="setting_area"> Node Management
    <p className="plans"> TODO : dynamic operation panel : create new or edit existing nodes </p>
    
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
              console.log("Drawing nodes!!!"); //TODO temp
              console.log(nodeData); //TODO temp

              return (
                <line
                  key={`line_${nodeIndex}_${nextIndex}`}
                  x1={x_val + node_width}
                  y1={y_val + node_height / 2}
                  x2={nodeData[nextNodeIndex].x}
                  y2={nodeData[nextNodeIndex].y + node_height / 2}
                  stroke="green"
                  strokeWidth="2"
                />
              );
            })}
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
            <text x={x_val + 5} y={y_val + 20} fill="#323232">
              {nodeData[nodeIndex].nodeName}
            </text>
          </g>
        );
      })}

      </svg>


    </div>


    {/* <p className="plans">Temp: </p> */}
      {/* this can be selected in the future: as a child class of node */}
    {/* <button className="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
