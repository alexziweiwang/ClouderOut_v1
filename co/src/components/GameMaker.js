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
    <button class="button" onClick={goToDashboard}>Return to Dashboard </button>
    <button class="button" onClick={goToProjectManagingPanel}>Return to Project Managing Panel </button>

    <p className="plans">This is GameMaker Component!!
      <br></br> Here, the user can do the following:
      <br></br> 1.arrange chapters
      <br></br> 2.arrange sequences/individual levels
      <br></br> 3.edit piece/screen/move of a sequence/level [piece/screen editing-panel]
    </p>
    
    <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button>


  </div>
    );
}
