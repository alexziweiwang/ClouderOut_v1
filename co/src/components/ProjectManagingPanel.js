import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState(['unnamed_project']);
    const [testProj, setTestProj] = useState([
      { project_name: "project001"},
      { project_name: "project002"},
      { project_name: "project003"},
    ]); //TODO pull the list from cloud-db
    const [addedNewProjName, setNewProjName] = useState(['New Project Name']);

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true, state: { selected_project_name } });
    }
    
    let name = "/projectmanagingpanel";
    return (
    <>    
      <Sidebar compName = {name}/>

    <>

  
        <br></br>
        
        <select onChange={() => {console.log("changed selected item...");}}>
        {testProj.map((itemIndex, index) => {
          return (
          <option value="${testProj[index].project_name}" key={testProj[index].project_name}>{testProj[index].project_name}</option>
          );
        })} 
   
        </select>
   
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
