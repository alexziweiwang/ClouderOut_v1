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
          (concept of "node group"? when needing to merge some tree-like order into one and continue, group them by node-group for a linear continuation
      <br></br>   default: everything in one node-group
      <br></br>   when there are branches, and needing to merge later, separate trees from later continuing process, by using nodegroup0 + nodegroup1)
    </p>

    <p className="plans">
      TODO: node graph visulization
      <br></br> clickable for brief info, edit options, and trash options
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
      Tasks TODO: 
      <br></br> 1. visualization and setting of graph of nodes
      <br></br> 2. solution of logic organizer for nodes
    </p>

      {/* this can be selected in the future: as a child class of node */}
    {/* <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button> */}

  </div>
    );
}
