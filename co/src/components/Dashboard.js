import * as React from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProjectManageNew from './ProjectManageNew';
import langDictionary from './_textDictionary';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    let name = "/dashboard";
    const uname = "user002";
    const navigate = useNavigate();

    let languageCodeTextOption = 'en';
    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const myProjectsButtonText = textDictItem.myProjectsButtonText !== undefined ?
          textDictItem.myProjectsButtonText
          : textDictItemDefault.myProjectsButtonText;
    
    const newProjectButtonText = textDictItem.newProjectButtonText !== undefined ?
          textDictItem.newProjectButtonText
          : textDictItemDefault.newProjectButtonText;
    

    const [showNewProjCreationPage, setShowNewProjCreationPage] = useState(false);

    function goToProjectManagingPanel() {
      navigate('/projectmanagingpanel', { replace: true, state: { uname } });
    }

    function projectManageNew() {
      // navigate('/projectmanagenew', { replace: true, state: { uname } }); //TODO remove later
      setShowNewProjCreationPage(true);
    }

    function returnToDashboard() {
      setShowNewProjCreationPage(false);
    }

    return (
  <div className="page">
    {!showNewProjCreationPage && <Sidebar compName={name} username={uname}/>}

    
    {!showNewProjCreationPage && <div className="dashboard_content">
     <div>

       
     </div>
      {/* <p className="plans"> This is ... *Dashboard Component* for {uname}</p>

      <p className="plans">TODO: responsibility of this page: 
        <br></br>User Authentication: only logged-in user can see this page with their own info only
      </p> */}
      <br></br><br></br><br></br>
      
      <div className="parallelFrame" style={{"marginLeft": "15px"}}>
        <div className="dashboard_grid" style={{"marginRight": "20px"}}
          onClick={()=>{projectManageNew()}}
        >
          {newProjectButtonText}
        </div>

        <div className="dashboard_grid" style={{"marginRight": "20px"}}
          onClick={()=>{goToProjectManagingPanel()}}
        >
          {myProjectsButtonText}
        </div>

        <div className="dashboard_grid" style={{"marginRight": "20px"}}>
          Tutorial
        </div> 
      </div>
      
    </div>
    }


    {showNewProjCreationPage && 
      <ProjectManageNew
          cancelAction={returnToDashboard}
          showCancelButton={true}
          isPart={false}
          triggerCreationSubmit={returnToDashboard}
      />
}
  </div>
    );
}
