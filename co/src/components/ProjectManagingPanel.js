import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM, revertProjectVM, deleteProjectVM} from '../viewmodels/ProjectManagerViewModel';
import { GiTrashCan } from "react-icons/gi";


export default function ProjectManagerPanel() {
    const username = "user002"; //TODO test
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    const [trashedProjList, setTrashedProjList] = useState(false);
    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");
    const [isDisplayAsk, setDisplayAsk] = useState(false);

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
      //TODO add warning
      //setDisplayAsk(!isDisplayAsk);
      // if yes: deleteProject();
      // if cancel: close window

           
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
              <button className="buttonLeftBottom" onClick={handleDeleteProject}>
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
        <button className="button" onClick={goToGameMaker}> Go To GameMaker! </button>
   
        <br></br><br></br><br></br>

        <div className="trashedProjectArea">
        <label>Trashed Project(s):</label>
        <br></br>

        {trashedProjList && 
          <select className="dropdownList" value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
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
   
    </>
    

  </>
    );
}
