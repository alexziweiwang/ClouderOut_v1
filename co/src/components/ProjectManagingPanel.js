import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM, revertProjectVM, deleteProjectVM} from '../viewmodels/ProjectManagerViewModel';
import { GiTrashCan } from "react-icons/gi";
import ProjectManageNew from './ProjectManageNew';

export default function ProjectManagerPanel() {
    const username = "user002"; //TODO test
    const navigate = useNavigate();

    const languageCode = 0;
    const goToGameMakerButtonText = ["Go To Game Maker!"];
    const revertProjectButtonText = ["Revert this project"];
    const trashAreaLabel = ["Trash Area of Project(s):"];
    const trashedProjectSelectListDefaultText = ["Project Name"];
    const manageDeletedProjectText = ["Manage Deleted Project"];

    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); 
    const [trashedProjList, setTrashedProjList] = useState(false);
    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");
    const [isDisplayAsk, setDisplayAsk] = useState(false);
    const [showTrashArea, setShowTrashArea] = useState(false);

    const [currentProjectAction, setCurrentProjectAction] = useState("selectProject"); //"createProject", "selectProject", "revertProject"

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
        loadProjectListFromCloud();

        setFirstTimeEnter(false);
      }
    }, [firstTimeEnter]);
  

    function goToGameMaker() {
      if (selected_project_name === "") {
        return;
      }

      navigate('/editorcontainer', { replace: true, state: { selected_project_name, username } });

    }

    async function loadProjectListFromCloud() {
      const groupList = await fetchProjectListVM(username); 

      setProjList(groupList.untrashed);
      setTrashedProjList(groupList.trashed);
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
      await revertProjectVM(selectedTrashedProj, username);
      setSelectedTrashedProj("");
      loadProjectListFromCloud();
    }

    function handleDeleteProject() {
      let response = window.confirm("Are you sure to delete this project? (it can be revert from trash-area)?");
        if (response === true) {
          deleteProject();
        }  
    }

    async function deleteProject() {
      await deleteProjectVM(selected_project_name, username);
      setProjectName("");
      loadProjectListFromCloud();
    }


    
    let name = "/projectmanagingpanel";
    return (
    <div style={{"display": "flex"}}>    
      <Sidebar compName = {name}/>

      <div className="backboardForAll">
  
        <div 
        className={currentProjectAction === "createProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        onClick={()=>{  
            setCurrentProjectAction("createProject");
          }}
        >
            <div style={{"display": "flex", "justifyContent": "start", "padding": "10px"}}>
                <label className="cursor_pointer">Create a New Project ...</label>
            </div>

            <div 
              style={{
                "display": currentProjectAction === "createProject" ? "flex" : "none",
                "transition": "all 0.2s ease-out"
              }}
            
            >
              <ProjectManageNew/>
            </div>

        </div>

        <div className={currentProjectAction === "selectProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
          onClick={()=>{
              setCurrentProjectAction("selectProject");
          }}
 
        >
        <div>
        <div style={{"display": "flex", "justifyContent": "start", "padding": "10px"}}>
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
                {goToGameMakerButtonText[languageCode]} 
              </button>
          </div>}

        </div>
        }</div>
        
        
        </div>


        <div 
        className={currentProjectAction === "revertProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        onClick={()=>{
            setCurrentProjectAction("revertProject");
          }}
        >
              <label 
                className="cursor_pointer"
                style={{"justifyContent": "start", "display": "flex", "padding": "10px"}}
              >Revert a Deleted Project ...</label>
     
              <div className="trashedProjectArea" 
              
              
                style={{
                    "transition": "all 0.2 ease-out", 
                    "display": currentProjectAction === "revertProject" ? "flex" : "none",
                    "justifyContent": "start", 
                }}>

                

                  {trashedProjList && 
                    <select className="dropdownList" value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
                      <option value="" key="">-- {trashedProjectSelectListDefaultText[languageCode]} --</option>
                      {
                        trashedProjList.map((item, index) => {
                          return (
                            <option value={trashedProjList[index].project_name} key={trashedProjList[index]}> {trashedProjList[index]}</option>
                          );
                        })
                      }
                    </select>
                  }

                  <button onClick={revertTrashedProject}>{revertProjectButtonText[languageCode]}</button>
                  
              </div>
        </div>
    </div>
    

  </div>
    );
}
