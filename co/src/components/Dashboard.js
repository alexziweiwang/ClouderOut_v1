import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';

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
    <Sidebar/>

    
    <div className="dashboard_content">

      <p className="plans"> This is ... *Dashboard Component*
      <br></br>Here, the user can edit their profile, setup account settings, or go to projects.
      </p>

      <p> TODO: plan -- if user want to do the setting/adjustment in this part of the screen? 
      <br></br> that is, keep the sidebar for them to jump back and forth, and content part for actual editing
      <br></br> plan: conditionally render the correct content here? according to the chosen tab on side bar ...?
      </p>
      
      <button class="button" onClick={goToProjectManagingPanel}> Go To Project Managing Panel </button>
    </div>
 
  </div>
    );
}
