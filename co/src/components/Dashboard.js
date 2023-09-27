import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    const navigate = useNavigate();

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }
    
    return (
  <div>

    This is ... Dashboard Component
    <button onClick={goToProjectManagingPanel}> Go To Project Managing Panel </button>

  </div>
    );
}
