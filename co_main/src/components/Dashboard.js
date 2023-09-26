import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

function gotoGameMaker() {
  navigate('/gameediting', { replace: true });
}

const Dashboard = () => (
  <div className={styles.Dashboard}>
    this is: Dashboard Component !
    <button className={styles.Buttons} onClick={gotoGameMaker}>go to GameMaker</button>

  </div>
);

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
