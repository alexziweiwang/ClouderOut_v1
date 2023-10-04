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
    </p>
    <p className="plans">
      TODO: Entry: Arrange Nodes (including Node-editing)
    </p>
    <p className="plans">
      drag-and-drop? for pointers and orders between nodes...
    </p>
    <p className="plans">
      TODO: logic organizer: let users to decide node connection rules
    </p>

    <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button>

  </div>
    );
}
