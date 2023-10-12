import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function AccountPage() {
    const navigate = useNavigate();

    let name = "/accountpage";

    function returnToDashboard() {
        navigate("/dashboard", { replace: true });
    }

    return (
  <div className="page">
    <Sidebar compName = {name}/>

    <div className="dashboard_content">

      <p className="plans"> This is Account Page!  </p>

      <button className="button" onClick={returnToDashboard}> back to dashboard </button>
      
    </div>
 
  </div>
    );
}
