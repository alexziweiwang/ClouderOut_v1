import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function GameMaker() {
    const navigate = useNavigate();
    const [val, setValue] = useState('Node Name');


    function onInputTextChange(event) {
      setValue({value: event.target.value});
    }

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
    <input type="text" value={val} onChange={e => {setValue(e.target.value); console.log(val)}} />

    <br></br>
    <select>
      <option value="cardg">Card Game</option>
      <option value="boardg">Board Game</option>
      <option value="fortdefenseg">Tower Defense</option>
      <option value="conversation">Conversation</option>
    </select>


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
