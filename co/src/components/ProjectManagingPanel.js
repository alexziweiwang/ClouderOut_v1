import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM, revertProjectVM, deleteProjectVM} from '../viewmodels/ProjectManagerViewModel';
import { GiTrashCan } from "react-icons/gi";


export default function ProjectManagerPanel() {
    const username = "user002"; //TODO test
    const navigate = useNavigate();

    const languageCode = 0;
    const goToGameMakerButtonText = ["Go To GameMaker!"];
    const revertProjectButtonText = ["Revert this project"];
    const trashAreaLabel = ["Trash Area of Project(s):"];
    const trashedProjectSelectListDefaultText = ["Project Name"];

    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); 
    const [trashedProjList, setTrashedProjList] = useState(false);
    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");
    const [isDisplayAsk, setDisplayAsk] = useState(false);

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

      navigate('/gamemaker', { replace: true, state: { selected_project_name, username } });
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
    <>    
      <Sidebar compName = {name}/>

    <>

        <br></br>
        
        <div className="projSelectionArea">
        {projList && 
        <div>


        <br></br>
        <div className="projectGrid">
          {projList.map((item, index) => {
            return (
              <div className= {(selected_project_name === item) ? "projectGridItemSelected" : "projectGridItem"}
                  key={projList[index]} 
                  value={item} 
                  onClick={()=>{handleProjectGridClicked(item);}}>
              {item}
              <br></br>
              <br></br>
              <br></br>

              {(selected_project_name === item) && 
              <button className="buttonLeftBottom" onClick={()=>{handleDeleteProject();}}>
                <GiTrashCan/>
              </button>}

              </div>
            );
          })} 
   
        </div>

        </div>
        }
        </div>

        <br></br>
        <button className="button" onClick={()=>{goToGameMaker();}}> {goToGameMakerButtonText[languageCode]} </button>
   
        <br></br><br></br><br></br>

        <div className="trashedProjectArea">
        <label>{trashAreaLabel[languageCode]}</label>
        <br></br>

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
   
    </>
    

  </>
    );
}
