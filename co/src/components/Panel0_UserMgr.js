import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

import Dashboard from './Dashboard';
import ProjectManagingPanel from './ProjectManagingPanel';
import AccountPage from './AccountPage';


import { getAuthFirebase } from '../authtools/firebaseAuthOperations';



/*
Keeps the layout of sidebar + content formatted pages
*/
export default function Panel0_UserMgr({}) {
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

    function goToDashboard() {
        setCurrentCompoName("dashboard");
    }

    function goToAccountPage() {
        setCurrentCompoName("accountpage");
    }

    function goToProfilePage() {
        setCurrentCompoName("profilepage");
    }

    function goToGameMaker(selected_project_name, modeName) {
        if (selected_project_name === "") {
          return;
        }
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: selected_project_name, 
            mode: modeName
          } });
  
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
                        goToDashboard={goToDashboard}
                        goToDashboard={goToDashboard}
                        goToAccountPage={goToAccountPage}
                        goToProfilePage={goToProfilePage}
                />

                <div style={{"backgroundColor": "pink"}}>
                {/* // dashboard / account / profile / project-managing / new-project */}

                    {currentCompoName === "dashboard" 
                    && 
                    <ProjectManagingPanel
                        goToNotLoggedInPage={goToNotLoggedInPage}
                        goToGameMaker={goToGameMaker}
                    />
                    }

{/* when going to proj-mgr-new and proj-mgr-panel, load project-list from cloud */}

                    {currentCompoName === "accountpage"
                    &&
                    <AccountPage
                        goToNotLoggedInPage={goToNotLoggedInPage}
                    />

                    }

                </div>
            </div>




        </div>
    )
    
}