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
    }

    return (
    <>    
    <Sidebar compName = {name}/>

    <>

        This is project new page
        <br></br>

        <input 
          type="text" value={addedNewProjName} 
          onChange={e => {setNewProjName(e.target.value)}
        }  
        />
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