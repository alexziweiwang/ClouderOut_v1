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

    <p className="plans">This is GameMaker Component!!
      <br></br> Here, the user can do the following:
      <br></br> 1.arrange chapters
      <br></br> 2.arrange sequences/individual levels
      <br></br> 3.edit piece/screen/move of a sequence/level [piece/screen editing-panel]
    </p>

    <p className="plans">
      Plan about "sequence": this is a minimum playable unit. 
      <br></br>It can be one round of game (card/board/fort offense/fort defense games, or a linear sequence of pieces/screens for conversation)  
      <br></br>It (usually) carries some input and produces some output (such as game-round result, for game-data changes)
    </p>

    
    <button class="button" onClick={goToPieceScreenEditingPanel}>Go to PieceScreenEditingPanel</button>


  </div>
    );
}
