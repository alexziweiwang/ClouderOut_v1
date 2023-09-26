import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameMaker.module.css';

const GameMaker = () => (
  <div className={styles.GameMaker}>
    This is GameMaker Component
    <p>TODO: later here is with the editing layout for users to adjust the game content</p>
  </div>
);

GameMaker.propTypes = {};

GameMaker.defaultProps = {};

export default GameMaker;
