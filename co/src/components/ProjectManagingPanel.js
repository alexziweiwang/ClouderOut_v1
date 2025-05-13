import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { GiTrashCan } from "react-icons/gi";
import ProjectManageNew from './ProjectManageNew';
import langDictionary from './_textDictionary';

//TODO700 feature: latest edited project ... (create or save)


//TODO20 cloud-func
import { fetchProjectListVM, revertProjectVM, deleteProjectVM } from '../viewmodels/ProjectManagerViewModel';
//TODO115 collection of cloud-related

//TODO1010 username by auth
//TODO1050 did replace with the auth-email-name
import { convertEmailAddr, getAuthFirebase } from '../authtools/firebaseAuthOperations';



export default function ProjectManagerPanel() {

    let languageCodeTextOption = 'en';

    const compoPathName = "/projectmanagingpanel";

    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.uname;
    } 
    
    const navigate = useNavigate();

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const gameMakerButtonText = textDictItem.gameMakerButtonText !== undefined ?
        textDictItem.gameMakerButtonText
        : textDictItemDefault.gameMakerButtonText;
    
    const revertProjectButtonText = textDictItem.revertProjectButtonText !== undefined ?
        textDictItem.revertProjectButtonText
        : textDictItemDefault.revertProjectButtonText;
    
    const trashedProjectSelectListDefaultText = textDictItem.trashedProjectSelectListDefaultText !== undefined ? 
        textDictItem.trashedProjectSelectListDefaultText
        : textDictItemDefault.trashedProjectSelectListDefaultText;
    





    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); 
    const [trashedProjList, setTrashedProjList] = useState(false);
    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");
    const [isDisplayAsk, setDisplayAsk] = useState(false);
    const [showTrashArea, setShowTrashArea] = useState(false);

    const [currentProjectAction, setCurrentProjectAction] = useState("selectProject"); //"createProject", "selectProject", "revertProject"



    const [authRawEmail, setAuthRawEmail] = useState("_");
    const [authEmailString, setAuthEmailString] = useState("_");
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
  



      getAuthFirebase(
        {
          goToNotLoggedInPageFunc: goToNotLoggedInPage,
          sendOutEmailName: receiveChangeOfAuthRawEmail

        }
      );
        
      console.log("project managing panel page --\t\tauthEmamilName is [", authRawEmail, "]");


    }, [firstTimeEnter]);

    async function receiveChangeOfAuthRawEmail(emailAddrRaw) {
    
      setAuthRawEmail(emailAddrRaw);

      let emailStringTemp = convertEmailAddr(emailAddrRaw);
      setAuthEmailString(emailStringTemp);

      if (emailStringTemp === "_") {
        console.log("empty username(email-string)");
        return;

      } else {
        await loadProjectListFromCloud(emailStringTemp);
      }  
  
    }
  

    function goToNotLoggedInPage() {
      navigate('/notloggedin', { replace: true });

    }

    function goToGameMaker() {
      if (selected_project_name === "") {
        return;
      }

      navigate('/editorcontainer', { 
        replace: true, 
        state: { 
          selected_project_name: selected_project_name, 
          username: authRawEmail 
        
        } });

    }

    async function loadProjectListFromCloud(emailAddr) {
     
        const groupList = await fetchProjectListVM(emailAddr);
      
        console.log("load_ProjectList_FromCloud, group-list for ", emailAddr , " = ", groupList);
  
  
        if (groupList === undefined || groupList.length === 0) {
          setProjList([]);
          setTrashedProjList([]);
        } else {
          setProjList(groupList.untrashed);
          setTrashedProjList(groupList.trashed);
        }
      



    }

    function handleProjectSelectionChange(event) {
      setProjectName(event.target.value);
    }

    function handleProjectGridClicked(project) {
      if (project === selected_project_name) {
        setProjectName("");
      } else {
        setProjectName(project);
      }
    }


    function handleTrashedProjectSelectionChange(event) {
      setSelectedTrashedProj(event.target.value);
    }

    async function revertTrashedProject() {
      await revertProjectVM(
        {
          projectToRevert: selectedTrashedProj, 
          currUser: authEmailString
        });

      setSelectedTrashedProj("");
      loadProjectListFromCloud(authEmailString);
    }

    function handleDeleteProject() {
      let response = window.confirm("Are you sure to delete this project? (it can be revert from trash-area)?");
        if (response === true) {
          deleteProject();
        }  
    }

    async function deleteProject() {
      await deleteProjectVM( 
        { 
          projectToDelete: selected_project_name, 
          currUser: authEmailString
        }
      );
      
      setProjectName("");
      loadProjectListFromCloud(authEmailString);
    }

    function notUsing() {
      return "";
    }

    function triggerCreationSubmit() {
      loadProjectListFromCloud(authEmailString);
      setCurrentProjectAction("selectProject");
    }

    function passInEmailUsername() {
      return authEmailString; //TODO1030
    }

    let name = "/projectmanagingpanel";
    
    
    return (
    <div style={{"display": "flex"}}>    
      <Sidebar 
      compName = {name}
      username={username}
      getUsername={passInEmailUsername}      
      />

      <div className="dashboard_content">
  
        <div 
          className={currentProjectAction === "createProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        >
            <div 
              className="titleBar"
              style={{"display": "flex", "justifyContent": "start", "padding": "10px", "cursor": "pointer"}}
              onClick={()=>{  
                if (currentProjectAction !== "createProject") {
                  setCurrentProjectAction("createProject");
                } else {
                  setCurrentProjectAction("");
                }
              }}
            >
                <label className="cursor_pointer">Create a New Project ...</label>
            </div>

            <div 
              style={{
                "display": currentProjectAction === "createProject" ? "flex" : "none",
                "transition": "all 0.2s ease-out"
              }}
            
            >
              <ProjectManageNew
                cancelAction={notUsing}
                showCancelButton={false}
                isPart={true}
                triggerCreationSubmit={triggerCreationSubmit}
                username={authEmailString}
              />
            </div>

        </div>

        <div 
          className={currentProjectAction === "selectProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        >
        <div>
        <div  style={{"display": "flex", "justifyContent": "start", "padding": "10px"}}
              onClick={()=>{  
                if (currentProjectAction !== "selectProject") {
                  setCurrentProjectAction("selectProject");
                } else {
                  setCurrentProjectAction("");
                }
              }}
              className="titleBar"
        >
          <label className="cursor_pointer">Select an Ongoing Project ...</label>
        </div>


        {projList && 
        <div className="parallelFrame"  
          style={{
              "marginTop": "20px", 
              "justifyContent": "center", 
              "alignItems": "center", 
              "display": currentProjectAction === "selectProject" ? "flex" : "none",
              "transition": "all 0.2s ease-out",
              "marginLeft": "25px",
              "paddingRight": "25px",

          }}>
          
          
          <div className="projectGrid">
            {projList.map((item, index) => {
              return (
                <div className= {(selected_project_name === item) ? "projectGridItemSelected" : "projectGridItem"}
                    key={projList[index]} 
                    value={item} 
                    onClick={()=>{handleProjectGridClicked(item);}}>
                          <label style={{"fontWeight": "normal"}}>{item}</label>
                          <br></br>
                          <br></br>
                          <br></br>

                          {(selected_project_name === item) && 
                          <div style={{"display": "flex", "justifyContent": "start", "alignContent": "end"}}>
                            <button className="elemPosLeftBottom" onClick={()=>{handleDeleteProject();}}>
                              <GiTrashCan/>
                            </button>
                          </div>}

                </div>
              );
            })} 
    
          </div>




          {<div style={{"width": "500px"}}>
              <button 
                className="button testEntire" 
                style={{"display": selected_project_name === "" ? "none" : "flex"}}
                onClick={()=>{goToGameMaker();}}> 
                {gameMakerButtonText} 
              </button>
          </div>}

        </div>
        }</div>
        
        
        </div>


          <div 
            className={currentProjectAction === "revertProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
          >   
            <div
                className="titleBar"
                onClick={()=>{  
                    if (currentProjectAction !== "revertProject") {
                        setCurrentProjectAction("revertProject");
                    } else {
                        setCurrentProjectAction("");
                    }
                }}
            >
              <label 
                className="cursor_pointer"
                style={{"justifyContent": "start", "display": "flex", "padding": "10px"}}
              >Revert a Deleted Project ...</label>
            </div>

        
            
              {<div className="trashedProjectArea" 
              
              
                style={{
                    "transition": "all 0.2 ease-out", 
                    "display": currentProjectAction === "revertProject" ? "flex" : "none",
                    "justifyContent": "start", 
                }}>

                  {trashedProjList.length == 0 && <div>
                      <label>No deleted project.</label>
                  </div>}                

                  {trashedProjList.length > 0 && 
                    <><select className="dropdownList" value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
                      <option value="" key="">-- {trashedProjectSelectListDefaultText} --</option>
                      {
                        trashedProjList.map((item, index) => {
                          return (
                            <option value={trashedProjList[index].project_name} key={trashedProjList[index]}> {trashedProjList[index]}</option>
                          );
                        })
                      }
                    </select>
                  

                  <button onClick={()=>{
                    revertTrashedProject();
                    
                  }}>{revertProjectButtonText}</button></>}


                  
              </div>
              }
        </div>
    </div>
    

  </div>
    );
}
