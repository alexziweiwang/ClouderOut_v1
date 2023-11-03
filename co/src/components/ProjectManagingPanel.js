import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import {fetchProjectListVM} from '../viewmodels/ProjectManagerViewModel';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState(['unnamed_project']);
    const [testProj, setTestProj] = useState(false); //TODO pull the list from cloud-db
    let projectList = [];

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true, state: { selected_project_name } });
    }

    async function loadProjectList() {
      projectList = await fetchProjectListVM();
      setTestProj(projectList);    
      console.log("project list: ", projectList); //TODO test
    }
    
    let name = "/projectmanagingpanel";
    return (
    <>    
      <Sidebar compName = {name}/>

    <>

        <button onClick={loadProjectList}> Load Projects </button>
        <br></br>
        <p className="plans">TODO: later handle the update of new-porject (name and directory), local data and cloud data updating design, etc.</p>
        
        {testProj && <select onChange={() => {console.log("changed selected item...");}}>
        {testProj.map((itemIndex, index) => {
          return (
          <option value="${testProj[index].project_name}" key={testProj[index]}>{testProj[index]}</option>
          );
        })} 
   
        </select>}
   
        <p className="plans">Later: connect to cloud db and provide all project names to get selected by the user, or create new project</p>
        //TODO when use choose an exisiting project, do setProjectName to update the selection of project
        <button className="button" onClick={goToGameMaker}> Go To GameMaker! </button>
   

        <p className="plans">This is ProjectManagerPanel Component!!
          <br></br>Here, the user can create new projects, or select specific projects to edit.
          <br></br>flow: create or continue? if create, then create and complete or start with game-maker? 
        </p>
   
    </>
    

  </>
    );
}
