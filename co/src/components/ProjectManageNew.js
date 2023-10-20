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
    
    function createNewProjectEdit() {
        console.log("adding a new project: " + addedNewProjName);
        //TODO update to actual db: add this new project
        navigate('/gamemaker', { replace: true, state: { addedNewProjName } });

    }

        
    function createNewProjectReturn() {
      console.log("adding a new project: " + addedNewProjName);
      //TODO update to actual db: add this new project
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
        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br>(including resource managing?)
          <br></br>(user can use materials cross-projects to avoid repeat upload?
        </p>


        <br></br>

        <button 
          onClick={createNewProjectEdit}>
        Create and Start Editing
        </button>

        <br></br>
        <br></br>
        <br></br>

        <button 
          onClick={createNewProjectReturn}>
        Create and Return
        </button>

        <br></br>

        <br></br>
        <button className="setting_item" onClick={projectManagePanel}> Cancel </button>

    </>
    

  </>
    );
}