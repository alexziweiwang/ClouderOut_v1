import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();


    function goToDashboard() {
      navigate('/dashboard', { replace: true });
    }
  
    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }
    
    return (
  <div>    
    <div>

        <div class="returning_buttons"><button class="button" onClick={goToDashboard}>Return to Dashboard </button></div>
        <p className="plans">This is ProjectManagerPanel Component!!
          <br></br>Here, the user can create new projects, or select specific projects to edit.
          <br></br>flow: create or continue? if create, then create and complete or start with game-maker? 
        </p>
       
        <button class="button" onClick={goToGameMaker}> Go To GameMaker! </button>
    </div>
    

  </div>
    );
}
