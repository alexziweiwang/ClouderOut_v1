import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

import Dashboard from './Dashboard';
import ProjectManagingPanel from './ProjectManagingPanel';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';



/*
Keeps the layout of sidebar + content formatted pages
*/
export default function MainFrame({}) {
    const navigate = useNavigate();

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }



    //combine sidebar and content pages accordingly
    //hashboard-phase: vertical side bar
    //game-making-phase: horizontal side bar

    const [currentCompoName, setCurrentCompoName] = useState("dashboard");

    const [authEmailName, setAuthEmailName] = useState("_");



    useEffect(() => {

        getAuthFirebase(
          {
            goToNotLoggedInPageFunc: goToNotLoggedInPage,
            sendOutEmailName: setAuthEmailName
          }
        );

    });



    //TODO: user logic: reflect clicked button on sidebar, change on the right-side content section
 
    //TODO: optional rendering of left-sidebar and right-content-section


    // combinations:
    //TODO 1. logged in dashboard page(dashboard) + sidebar

    //TODO 2. account page + sidebar

    //TODO 3. profile page + sidebar

    //TODO 4. project-managing + sidebar2

    //TODO 5. new project + sidebar2




    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true, state: { "uname": authEmailName } });
      }


      function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true, state: { "username": authEmailName } });
    }

    function goToDashboard() {
        setCurrentCompoName("dashboard");
    }

    function goToAccountPage() {
        navigate('/accountpage',  { replace: true, state: { "username": authEmailName } });
    }

    function goToProfilePage() {
        navigate('/profilepage',  { replace: true, state: { "username": authEmailName } });
    }

    function passInUsername() {
        return authEmailName; //TODO1030
    }
  







    return (
        <div>
            <div style={{"display": "flex"}}>
                <Sidebar
                        compName = {currentCompoName}
                        username={authEmailName}
                        getUsername={passInUsername}
                        goToProjectManagingPanel={goToProjectManagingPanel}
                        goToDashboard={goToDashboard}
                        goToAccountPage={goToAccountPage}
                        goToProfilePage={goToProfilePage}
                />

                <div style={{"backgroundColor": "pink"}}>
                {/* // dashboard / account / profile / project-managing / new-project */}

                    {currentCompoName === "dashboard" 
                    && 
                    <Dashboard
                         username={authEmailName}
                         getUsername={passInUsername}
                         goToProjectManagingPanel={goToProjectManagingPanel}
                    />}

{/* when going to proj-mgr-new and proj-mgr-panel, load project-list from cloud */}

                    {currentCompoName === "projectmanagingpanel"
                    &&
                    <ProjectManagingPanel
                    
                    
                    />
                    }

                </div>
            </div>




        </div>
    )
    
}