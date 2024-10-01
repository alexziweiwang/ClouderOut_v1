import * as React from 'react';
import Sidebar from './Sidebar';
import { useNavigate} from 'react-router-dom';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    let name = "/dashboard";
    const uname = "user002";
    const navigate = useNavigate();

    const languageCode = 0;
    const myProjectsButtonText = ["My Projects"];
    const newProjectButtonText = ["New Project"];


    function goToProjectManagingPanel() {
      navigate('/projectmanagingpanel', { replace: true, state: { uname } });
    }

    function projectManageNew() {
      navigate('/projectmanagenew', { replace: true, state: { uname } });
    }
    return (
  <div className="page">
    <Sidebar compName={name} username={uname}/>

    
    <div className="dashboard_content">
     <div>

       
     </div>
      <p className="plans"> This is ... *Dashboard Component* for {uname}</p>

      <p className="plans">TODO: responsibility of this page: 
        <br></br>User Authentication: only logged-in user can see this page with their own info only
      </p>
      
      <div className="parallelFrame" style={{"marginLeft": "15px"}}>
        <div className="dashboard_grid" style={{"marginRight": "20px"}}
          onClick={()=>{projectManageNew()}}
        >
          {newProjectButtonText[languageCode]}
        </div>

        <div className="dashboard_grid" style={{"marginRight": "20px"}}
          onClick={()=>{goToProjectManagingPanel()}}
        >
          {myProjectsButtonText[languageCode]}
        </div>

        <div className="dashboard_grid" style={{"marginRight": "20px"}}>
          Tutorial
        </div> 
      </div>
      
    </div>
 
  </div>
    );
}
