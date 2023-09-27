import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function GameMaker() {
    const navigate = useNavigate();

    function goToGameMaker() {
        navigate('/dashboard', { replace: true });
    }

    function goToProjectManagingPanel() {
      navigate('/projectmanagingpanel', { replace: true });
  }
    
    return (
  <div>
    <button class="button" onClick={goToGameMaker}>Return to Dashboard </button>
    <button class="button" onClick={goToProjectManagingPanel}>Return to Project Managing Panel </button>

    <p className="plans">This is GameMaker Component!!</p>
    
  </div>
    );
}
