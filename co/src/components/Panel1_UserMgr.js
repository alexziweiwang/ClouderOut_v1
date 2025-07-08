import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import ProjectManagingPanel from './ProjectManagingPanel';
import AccountPage from './AccountPage';
import ProfilePage from './ProfilePage';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';

import { getProfileInfoVM, updateProfileInfoVM } from '../viewmodels/AccountViewModel';


//TODO1090 cloud-db related
import { fetchProjectListVM, revertProjectVM, deleteProjectVM } from '../viewmodels/ProjectManagerViewModel';
//TODO1090 collection of cloud-related


import { parseFromFile_vm } from '../viewmodels/PrepAc_ProjectFileInOut';


/*
Related sub-compo:

    Sidebar
    ProjectManageNew (inner of proj-mgr-panel)
    ProjectManagingPanel
    AccountPage
    ProfilePage
*/



/*
Keeps the layout of sidebar + content formatted pages
*/
export default function Panel1_UserMgr({}) {
    const onlineMode = "online_cloud"; // this is settled because entering from panel_1

    const navigate = useNavigate();

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }

    const [backendOption, setBackendOption] = useState("firebase"); //firebase / local?


    const [projList, setProjList] = useState(undefined); 
    const [trashedProjList, setTrashedProjList] = useState(undefined);


    //combine sidebar and content pages accordingly
    //hashboard-phase: vertical side bar
    //game-making-phase: horizontal side bar

    const [currentCompoName, setCurrentCompoName] = useState("dashboard");

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (authEmailName === "_") {
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
              );
        } else {
            if (projList === undefined || trashedProjList === undefined) {
                loadProjectListFromCloudOuter(authEmailName);
            }
        }


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

    function goToGameMakerOuter(selected_project_name) {
        if (selected_project_name === "") {
          return;
        }
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: selected_project_name, 
            mode: onlineMode
          } });
  
    }

    function passInUsername() {
        return authEmailName; //TODO1030
    }
  


    async function getProfile() {
        if (authEmailName === "_") {
                                                    console.log("Not getting profile -- no state");
            return;
        }
        let profile = await getProfileInfoVM({uname: authEmailName, bkOption: backendOption});
                                                    console.log("page: ", profile); //TODO test

        return profile;
    }


    async function loadProjectListFromCloudOuter(usernameTemp) { //TODO22
     
        const groupList = await fetchProjectListVM(
          {currUser: usernameTemp,
           bkOption: backendOption 
          }
        );
      
                              console.log("load_ProjectList_FromCloud, group-list for ", usernameTemp , " = ", groupList);
  
  
        if (groupList !== undefined && groupList.length !== 0) {
          setProjList(groupList.untrashed);
          setTrashedProjList(groupList.trashed);
        }

    }

    function passInValidProjectList() {
        return projList;
    }

    function passInTrashedProjectList() {
        return trashedProjList;
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

                        goToNotLoggedInPage={goToNotLoggedInPage}

                />

                <div style={{"backgroundColor": "pink"}}>
                {/* // dashboard / account / profile / project-managing / new-project */}

                    {currentCompoName === "dashboard" 
                    && 
                    <ProjectManagingPanel
                        goToGameMaker={goToGameMakerOuter}

                        getUsername={passInUsername}

                        fetchProjectListVM={fetchProjectListVM} 
                        revertProjectVM={revertProjectVM}
                        deleteProjectVM={deleteProjectVM}
                        parseFromFile_vm={parseFromFile_vm}

                        loadProjectListFromCloud={loadProjectListFromCloudOuter}
                        getValidProjList={passInValidProjectList}
                        getTrashedProjList={passInTrashedProjectList}

                    />
                    }

{/* when going to proj-mgr-new and proj-mgr-panel, load project-list from cloud */}

                    {currentCompoName === "accountpage"
                    &&
                    <AccountPage
                        goToNotLoggedInPage={goToNotLoggedInPage}

                        getUsername={passInUsername}
                    />

                    }

                    {currentCompoName === "profilepage"
                    &&
                    <ProfilePage
                        goToNotLoggedInPage={goToNotLoggedInPage}
                        getProfile={getProfile}

                        getUsername={passInUsername}

                    />

                    }

                </div>
            </div>




        </div>
    )
    
}