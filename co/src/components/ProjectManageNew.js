import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function ProjectManageNew() {
    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setNewProjName] = useState(['New Project']); //TODO testing


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

        <label>Project Name: </label>
        <input></input>
        <br></br>
        <label></label>Project Description:
        <textarea></textarea>
        <br></br>
        <label></label>Author Info:
        <input></input>
        <br></br>
        <label></label>Genre:
        <input></input>
        

        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br> TODO: design and construct new-set for each new project: layers, etc.
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