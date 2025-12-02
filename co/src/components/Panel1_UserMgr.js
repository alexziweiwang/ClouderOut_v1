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
import { fetchProjectListVM, revertProjectVM, markTrashProjectVM, removeProjectPermanentlyVM } from '../viewmodels/ProjectManagerViewModel';
//TODO1090 collection of cloud-related


import { parseFromFile_vm } from '../viewmodels/PrepAc_ProjectFileInOut';
import { placeholderNameDefault } from './_dataStructure_DefaultObjects';


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
    const onlineMode = "online_cloud"; // this is settled -- because entering from panel_1

    const navigate = useNavigate();

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }

    const [backendOption, setBackendOption] = useState("firebase"); //firebase / local?

//TODO area of saved info for this panel!!!

    const [projListMap, setProjListMap] = useState(-1);


    const [profileObj, setProfileObj] = useState(undefined);

    const [providedImportedProject, setProvidedImportedProject] = useState(undefined);

    //combine sidebar and content pages accordingly
    //hashboard-phase: vertical side bar
    //game-making-phase: horizontal side bar

    const [currentCompoName, setCurrentCompoName] = useState("dashboard");

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        window.onbeforeunload = () => {
            
            return "show message";
        }


        if (authEmailName !== "_" && firstTimeEnter === true) {
                                        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
                                        console.log("\n\n\nPanel1_UserMgr FIRST ENTER.\n\n\n");

             
            if (
                projListMap === -1 
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

                    console.log("panel1 : projListMap = ", projListMap);

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

        let importedProjFileContent = "-1";
        if (onlineMode !== "online_cloud") { //non-cloud mode -- using the imported-project-file-content
            importedProjFileContent = providedImportedProject;
        } 
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            "selected_project_name": selected_project_name, 
            "mode": onlineMode,
            "providedImptProj": importedProjFileContent,
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

    function setBothProjListFunc(obj) {
                console.log("\t\t!!! setting up proj-list-mapping ", obj);

        setProjListMap(obj);
    }
 
    async function triggerFetchProjListOuter() {
        if(authEmailName === "_") {
            return undefined;
        }
        
        return await fetchProjectListVM(
            {currUser: authEmailName,
             bkOption: backendOption,
             setValueFunc: setBothProjListFunc
            }
        );

    }


    async function loadProjectListFromCloud() { //TODO
        console.log("fetching project list from cloud")

        if(authEmailName === "_") {
            return undefined;
        }
        
        await fetchProjectListVM(
          {currUser: authEmailName,
           bkOption: backendOption,
           setValueFunc: setBothProjListFunc
          }
        );

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
                
                            // let bothList = makeDeletionLists_vm(
                            //     projListMixed["using"],
                            //     projListMixed["trashed"],


                            //     selectedTrashedProj
                            // );

                            // setProjListMixed(bothList);
     

    //TODO123 local proj-list-labelling setprojlistmap
    }

    async function markTrashProjectOuter(selectedMarkedTrashProj) {
        await markTrashProjectVM( 
          { 
            projectToMarkTrash: selectedMarkedTrashProj, 
            currUser: authEmailName,
            bkOption: backendOption
          }
        );

                              // projList, setProjList
                              // trashedProjList, setTrashedProjList
         
                                        // let bothList = makeReversionLists_vm(        
                                        //     projListMixed["using"],
                                        //     projListMixed["trashed"],
                                        //     selectedMarkedTrashProj
                                        // );
                                        // setProjListMixed(bothList);
                                
                                        // //TODO30 operate on projList and trashedProjList

            //TODO123 local proj-list-labelling setprojlistmap

    }  

    async function removeProjectPermanentlyOuter(selectedProj) {
//TODO123
        //remove .. 

                    //TODO123 local proj-list-labelling

                            // let tList = {};
                            // Object.keys(projListMixed["using"]).map((currKey)=>{
                            //     let val = projListMixed["using"][currKey];
                            //     if (val !== selectedProj) {
                            //         tList[currKey] = projListMixed["using"][currKey];
                            //     }
                            // });
       // setTrashedProjList(tList);
       //TODO setProjListMixed(combined-list);

//todo123 setprojlistmap


        await removeProjectPermanentlyVM({
            projectToRemove: selectedProj, 
            currUser: authEmailName,
            bkOption: backendOption
        })


    }

    function passInProjectListMapping() {
        return projListMap;
    }

    function receiveImportedProjFromSubCompo(projContent) {
        setProvidedImportedProject(projContent);

    }

    return (
        <div>
        {authEmailName !== "_"
        && 
        <>
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
                            backendOption={backendOption}

                            revertProjectOuter={revertProjectOuter}
                            markTrashProjectOuter={markTrashProjectOuter}
                            removeProjectPermanentlyOuter={removeProjectPermanentlyOuter}
                            parseFromFile_vm={parseFromFile_vm}

                            getProjectListMap={passInProjectListMapping}
                            
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



        </>}
        </div>
    )
    
}