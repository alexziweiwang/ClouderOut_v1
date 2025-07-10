import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import ProjectManagingPanel from './ProjectManagingPanel';
import AccountPage from './AccountPage';
import ProfilePage from './ProfilePage';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';

import { getProfileInfoVM, updateProfileInfoVM } from '../viewmodels/AccountViewModel';

import { makeDeletionLists_vm, makeReversionLists_vm } from '../viewmodels/PrepAc_ProjectOperation';


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

//TODO area of saved info for this panel!!!

    const [projList, setProjList] = useState(undefined); 
    const [trashedProjList, setTrashedProjList] = useState(undefined);
    const [profileObj, setProfileObj] = useState(undefined);

    //combine sidebar and content pages accordingly
    //hashboard-phase: vertical side bar
    //game-making-phase: horizontal side bar

    const [currentCompoName, setCurrentCompoName] = useState("dashboard");

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {




        if (authEmailName !== "_" && firstTimeEnter === true) {
                                        console.log("\n\n\nPanel1_UserMgr FIRST ENTER.\n\n\n");

          
            if (
                projList === undefined 
                || trashedProjList === undefined 
                || profileObj === undefined
            ) { // condition of init-status of var...

                loadProjectListFromCloud();
                fetchProfileFromCloud();
               
                
                  //if (resBool === true) { //TODO30
                  //      setFirstTimeEnter(false);
                  //}
                setFirstTimeEnter(false);
            }   

            
        }


        if (authEmailName === "_") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
              );
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
                                console.log("going to dashboard!");
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
            mode: onlineMode,
            //TODO99999
          } });
  
    }

    function passInUsername() {
        return authEmailName; //TODO1030
    }
  


    async function fetchProfileFromCloud() {
        if (authEmailName === "_") {
                                                    console.log("Not getting profile -- not logged in");
            return;
        }
        let profile = await getProfileInfoVM({uname: authEmailName, bkOption: backendOption});

                                                    console.log("page: ", profile); //TODO test

        //TODO set-state for profile-intro
        setProfileObj(profile);
        return profile;
    }

    function passInProfile() {

        return profileObj;
    }

    async function writeProfile(obj) {
        if (authEmailName === "_") {
                                                    console.log("Not writing profile -- not logged in");
            return;
        }

        await updateProfileInfoVM({
            uname: authEmailName, 
            infoObj: obj, 
            bkOption: backendOption
        })
    }

    async function triggerFetchProjListOuter() {
        if(authEmailName === "_") {
            return undefined;
        }
        
        return await fetchProjectListVM(
            {currUser: authEmailName,
             bkOption: backendOption 
            }
        );

    }


    async function loadProjectListFromCloud() { //TODO22
        console.log("fetching project list from cloud")

        if(authEmailName === "_") {
            return undefined;
        }
        
        const groupList = await fetchProjectListVM(
          {currUser: authEmailName,
           bkOption: backendOption 
          }
        );
                              console.log("load_ProjectList_FromCloud, group-list for ", authEmailName , " = ", groupList);
        
  
        if (groupList !== undefined && groupList.length !== 0) {

            let pureTrashedProjList = groupList.trashed;
            if (pureTrashedProjList !== undefined) {
                pureTrashedProjList = pureTrashedProjList.filter(
                    (name) => name !== "placeholder123456789___###___###___##"
                )

            }

            setProjList(groupList.untrashed);
            setTrashedProjList(groupList.trashed);
        }

        return groupList;
    }

    async function revertProjectOuter(selectedTrashedProj) {
        await revertProjectVM(
            {
              projectToRevert: selectedTrashedProj, 
              currUser: authEmailName,
              bkOption: backendOption
        });

                                    // projList, setProjList
                                    // trashedProjList, setTrashedProjList
                
        makeDeletionLists_vm(
            projList, 
            trashedProjList, 
            setTrashedProjList, 
            setProjList, 
            selectedTrashedProj
        );
     

    //TODO30
    }

    async function deleteProjectOuter(selectedDeletedProj) {
        await deleteProjectVM( 
          { 
            projectToDelete: selectedDeletedProj, 
            currUser: authEmailName,
            bkOption: backendOption
          }
        );

                              // projList, setProjList
                              // trashedProjList, setTrashedProjList
         
        makeReversionLists_vm(        
            projList, 
            trashedProjList, 
            setTrashedProjList, 
            setProjList, 
            selectedDeletedProj
        );
  
        //TODO30 operate on projList and trashedProjList
    }  

    function passInValidProjectList() {
        return projList;
        
    }

    function passInTrashedProjectList() {
        return trashedProjList;
        
    }

    function receiveImportedProjFromSubCompo(projContent) {
        //TODO setup "imported-project-obj-provided" here !!

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

                <div 
                    style={{
                        "backgroundColor": "pink",
                    }}>
                {/* // dashboard / account / profile / project-managing / new-project */}

                    <div
                        style={{
                            "display": currentCompoName === "dashboard" ? "flex" : "none"
                        }}
                    > 
                        <ProjectManagingPanel
                            goToGameMaker={goToGameMakerOuter}

                            getUsername={passInUsername}

                            revertProjectOuter={revertProjectOuter}
                            deleteProjectOuter={deleteProjectOuter}
                            parseFromFile_vm={parseFromFile_vm}

                            getValidProjList={passInValidProjectList}
                            getTrashedProjList={passInTrashedProjectList}
                            triggerFetchProjList={triggerFetchProjListOuter}

                            sendOutImportedProject={receiveImportedProjFromSubCompo}
                        />
                    </div>
                    

{/* when going to proj-mgr-new and proj-mgr-panel, load project-list from cloud */}

                   
                    <div
                      style={{
                          "display": currentCompoName === "accountpage" ? "flex" : "none"
                      }}
                    > 
                        <AccountPage
                            goToNotLoggedInPage={goToNotLoggedInPage}

                            getUsername={passInUsername}
                        />
                    </div>

                    <div
                      style={{
                          "display": currentCompoName === "profilepage" ? "flex" : "none"
                      }}
                    > 
                        <ProfilePage
                            getProfile={passInProfile}
                            writeProfile={writeProfile}

                            getUsername={passInUsername}
                        />
                    </div>

                </div>
            </div>




        </div>
    )
    
}