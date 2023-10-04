import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function GameMaker() {
    const navigate = useNavigate();

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
    <div class="returning_buttons">
      <button class="button" onClick={goToDashboard}>Return to Dashboard </button>
      <button class="button" onClick={goToProjectManagingPanel}>Return to Project Managing Panel </button>
    </div>

    <p className="plans">
      TODO: Entry: Create New Node
      <br></br> - node name 
      <br></br> - connection type: as a branch or merged next-one
      <br></br> - connection target: (some node name)
      <br></br> (fill in and see viewer's change, confirm to update cloud db)
    </p>

    <p className="plans">
          CONSIDERING solution of "child nodes merging and continue"
    </p>
    
    <p className="plans">
      design of interactable graph
      <br></br>visualization and operation panel: view, hover and double-click
      <br></br>hover a node would show the starting wording/desciption of this node
      <br></br>double-click a node would pop an intro window? for options?
    </p>

    <p className="plans">
      TODO: logic organizer: let users to decide node connection rules *important*
    </p>

    <p className="plans">
      Tasks TODO: 
      <br></br> 1. visualization and setting of graph of nodes
      <br></br> 2. solution of logic organizer for nodes
    </p>

      {/* this can be selected in the future: as a child class of node */}
    {/* <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
