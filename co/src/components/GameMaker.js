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
      <br></br> add node name 
      <br></br> add parent node
      <br></br> (fill in and see viewer's change)
    </p>

    <p className="plans">
      TODO: Entry: Arrange Node order(including Node-editing)
    </p>
    <p className="plans">
      drag-and-drop? for pointers and orders between nodes... 
      <br></br>visualization and operation panel: *viewer and setter*
    </p>
    <p className="plans">
      TODO: logic organizer: let users to decide node connection rules
    </p>

    <p className="plans">
      Tasks TODO: 1. visualization and setting of graph of nodes
      <br></br> 2. solution of logic organizer for nodes
    </p>

      {/* this can be selected in the future: as a child class of node */}
    {/* <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
