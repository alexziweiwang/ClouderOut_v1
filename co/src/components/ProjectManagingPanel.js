import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import {fetchProjectListVM} from '../viewmodels/ProjectManagerViewModel';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState("");
    const [projList, setProjList] = useState(false); //TODO pull the list from cloud-db

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true, state: { selected_project_name } });
    }

    async function loadProjectListFromCloud() {
      const projectList = await fetchProjectListVM();
      setProjList(projectList);    
      console.log("project list: ", projectList); //TODO test
    }

    function handleProjectSelectionChange(event) {
      setProjectName(event.target.value);
      console.log("currently chose: ", event.target.value);
    }
    
    let name = "/projectmanagingpanel";
    return (
    <>    
      <Sidebar compName = {name}/>

    <>

        <button onClick={loadProjectListFromCloud}> Load Projects </button>
        <br></br>
        
        <div className="projSelectionArea">
          <p className="plans"> later: make icon-like or list-like selfmade project-selector for the user to select </p>
        {projList && <select value={selected_project_name} onChange={handleProjectSelectionChange}>
          <option value="" key=""> -- Project Name --</option>

        {projList.map((itemIndex, index) => {
          return (
          <option value={projList[index].project_name} key={projList[index]}>{projList[index]}</option>
          );
        })} 
   
        </select>}
        </div>
        
        <p className="plans"> TODO: add "trash can area" for proejcts
          <br></br> design: each project's field: add "trashed": true/false
          <br></br> on cloud: testing data updated with "trashed" field
        </p>


        <br></br>
        <button className="button" onClick={goToGameMaker}> Go To GameMaker! </button>
   

        <p className="plans">This is ProjectManagerPanel Component!!
          <br></br>Here, the user can create new projects, or select specific projects to edit.
        </p>
   
    </>
    

  </>
    );
}
