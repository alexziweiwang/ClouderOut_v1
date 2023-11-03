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
    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAuthorInfo] = useState("");

    function projectManagePanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function changeProjNameInput(event) {
      setNewProjName(event.target.value);
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

    function changeProjDescription(event) {
      setProjDescription(event.target.value);
    }

    function changeAuthorInfo(event) {
      setAuthorInfo(event.target.value);
    }


    return (
    <>    
    <Sidebar compName = {name}/>

    <>

        <br></br>
        <div>
        <label className="newProjectInfoElement">Project Name: </label>
        <input className="newProjectInfoElement" type="text" value={addedNewProjName} onChange={changeProjNameInput}/>

        <br></br>
        <label className="newProjectInfoElement"></label>Project Description: 
        <textarea className="newProjectInfoElement" rows={5} cols={36} value={projDedscription} onChange={changeProjDescription}></textarea>
        <br></br>
        <label className="newProjectInfoElement">Author Info: </label>
        <textarea className="newProjectInfoElement" rows={2} cols={20} value={addedAuthorInfo} onChange={changeAuthorInfo}></textarea>

        <p className="plans">TODO: For authors, later do the "@"-like for link to the author space?</p>
        <br></br>


        <p className="plans"> TODO: add screen-size setting here (with warning of unchangeble after creation)</p>
        <label className="newProjectInfoElement">Screen Size and Direction:</label>
        <select>
          <option value="" key=""> ----- Select Size and Direction ----- </option>
          <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
          <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>

        </select>

        <br></br>
        <p className="plans"> (Later: [Genre] can be the "tag"s? multiple selection or add new? **Implement Later**)</p>

        </div>

 <br></br> <br></br>
        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br> TODO: design and construct new-set for each new project: layers, etc.
        </p>

        <br></br>

        <button 
          onClick={createNewProjectEdit}>
        Create & Start Editing!
        </button>

        <br></br>
        <br></br>
        <br></br>

        <button 
          onClick={createNewProjectReturn}>
        Create & Close
        </button>

    </>
    

  </>
    );
}