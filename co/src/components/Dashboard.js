import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    const navigate = useNavigate();

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }
    
    return (
  <div className="page">
    <div className="sidebar" > Welcom, user ___ ! </div>
    <div className="dashboard_content">
      <p className="plans"> This is ... Dashboard Component
      Here, the user can edit their profile, setup account settings, or go to projects.

      </p>
   
      <button class="button" onClick={goToProjectManagingPanel}> Go To Project Managing Panel </button>
    </div>
 
  </div>
    );
}
