import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameMaker.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
const navigate = useNavigate();

function backToDashBoard() {
  navigate('/dashboard', { replace: true });
}

const GameMaker = () => (

  <div className={styles.GameMaker}>  {/* main div */}
  
  
      <button className={styles.Buttons} onClick={backToDashBoard}>return</button>

    <p>This is inside GameMaker Component</p>
    <p>TODO: later here is with the editing layout for users to adjust the game content</p>
   


  </div>
);

GameMaker.propTypes = {};

GameMaker.defaultProps = {};

export default GameMaker;
