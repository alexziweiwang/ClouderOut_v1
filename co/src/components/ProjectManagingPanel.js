import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM, revertProjectVM, deleteProjectVM} from '../viewmodels/ProjectManagerViewModel';

export default function ProjectManagerPanel() {
    const username = "user002"; //TODO test
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    const [trashedProjList, setTrashedProjList] = useState(false);
    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");

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

      navigate('/gamemaker', { replace: true, state: { selected_project_name } });
    }

    async function loadProjectListFromCloud() {
      const groupList = await fetchProjectListVM(username); 

      setProjList(groupList.untrashed);
      setTrashedProjList(groupList.trashed);
    }

    function handleProjectSelectionChange(event) {
      setProjectName(event.target.value);
    }

    function handleTrashedProjectSelectionChange(event) {
      setSelectedTrashedProj(event.target.value);
    }

    async function revertTrashedProject() {
      await revertProjectVM(selectedTrashedProj);
      setSelectedTrashedProj("");
      loadProjectListFromCloud();
    }

    async function deleteProject() {
      await deleteProjectVM(selected_project_name);
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
          <p className="plans"> later: make icon-like or list-like selfmade project-selector for the user to select </p>
        {projList && 
        <div>
        <select value={selected_project_name} onChange={handleProjectSelectionChange}>
          <option value="" key=""> -- Project Name --</option>

        {projList.map((itemIndex, index) => {
          return (
          <option value={projList[index].project_name} key={projList[index]}>{projList[index]}</option>
          );
        })} 
   
        </select>
        </div>
        }
        </div>


        <br></br>
        <button className="button" onClick={goToGameMaker}> Go To GameMaker! </button>
        <button onClick={deleteProject}>Delete</button>
   
        <br></br><br></br><br></br>

        <div>
        <label>Trashed Project(s):</label>
        <br></br>
        {trashedProjList && 
          <select value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
            <option value="" key=""> -- Project Name --</option>
            {
              trashedProjList.map((item, index) => {
                return (
                  <option value={trashedProjList[index].project_name} key={trashedProjList[index]}> {trashedProjList[index]}</option>
                );
              })
            }
          </select>
          
        }

        <button onClick={revertTrashedProject}>Revert this project</button>
        </div>

        <p className="plans">This is ProjectManagerPanel Component!!
          <br></br>Here, the user can create new projects, or select specific projects to edit.
        </p>
   
    </>
    

  </>
    );
}
