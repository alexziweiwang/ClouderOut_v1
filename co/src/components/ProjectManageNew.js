import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function ProjectManageNew() {
    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setNewProjName] = useState(['New Project Name']);


    function projectManagePanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }
    
    function createNewProject() {
        console.log("adding a new project: " + addedNewProjName);
        //TODO update to actual db: add this new project
        //TODO ask the user if continue to edit that project, or go back to project-management page
        navigate('/projectmanagingpanel', { replace: true });
    }

    return (
    <>    
    <Sidebar compName = {name}/>

    <>

        <br></br>

        <input 
          type="text" value={addedNewProjName} 
          onChange={e => {setNewProjName(e.target.value)}
        }  
        />

        <p className="plans">
            creating a new project:
            <br></br>- project name
            <br></br>- project description
            <br></br>- project info - author(s) //future feature
            <br></br>- project tag(s) //future feature
        </p>
        <button 
          onClick={createNewProject}>
        Create Project
        </button>

        <br></br>
        <button className="setting_item" onClick={projectManagePanel}> Cancel </button>

    </>
    

  </>
    );
}