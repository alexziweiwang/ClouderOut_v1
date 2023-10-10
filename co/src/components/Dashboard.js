import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    let name = "/dashboard";
    return (
  <div className="page">
    <Sidebar compName = {name}/>

    
    <div className="dashboard_content">

      <p className="plans"> This is ... *Dashboard Component* </p>

      <p className="plans"> TODO: plan -- if user want to do the setting/adjustment in this part of the screen? 
      <br></br> that is, keep the sidebar for them to jump back and forth, and content part for actual editing
      <br></br> plan: conditionally render the correct content here? according to the chosen tab on side bar ...?
      </p>
      
    </div>
 
  </div>
    );
}
