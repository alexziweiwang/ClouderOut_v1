import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function ProjectManageNew() {
    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setNewProjName] = useState(""); //TODO testing
    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAuthorInfo] = useState("");
    const [addedGameScreenSize, setAddedGameScreenSize] = useState("");

    function projectManagePanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function changeProjNameInput(event) {
      const str = event.target.value;
      //TODO also: check project names that already exists, fetch list from cloud
      if (str == "") {
        return;
      }
      setNewProjName(str);
    }
    
    function createNewProjectEdit() {
        console.log("adding a new project: " + addedNewProjName);
        if (addedNewProjName == "") {
          return;
        }
        createNewProjectToCloud();
        navigate('/gamemaker', { replace: true, state: { addedNewProjName } });

    }

        
    function createNewProjectReturn() {
      console.log("adding a new project: " + addedNewProjName);
      if (addedNewProjName == "") {
        return;
      }
      createNewProjectToCloud();
      navigate('/projectmanagingpanel', { replace: true });
    }

    /* Create and setup the default set for a new project */
    function createNewProjectToCloud() {
      // TODO gather list:
      // project name: addedNewProjName
      // project description: projDedscription
      // game-data map: empty {}
      // author-info field: addedAuthorInfo
      // field: type = "project"
      // field: game-size-direction
      // chapter directory: collection "chapters"
      // game node directory: default in chapter-management (at least one defualt node in ecah chapter)
      //            genre field (later)
      const empty_game_data = {};
      const obj = {
        project_name: addedNewProjName,
        project_description: projDedscription,
        game_data: empty_game_data,
        author_info: addedAuthorInfo,
        type: "project",
        game_size_direction: "h450_800"
      };
      //TODO add collection "chapters"

      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

      //TODO call VM function here to pass the data
    }

    function changeProjDescription(event) {
      setProjDescription(event.target.value);
    }

    function changeAuthorInfo(event) {
      const str = event.target.value;
      //TODO check author info, can't be empty (?)
      if (str == "") {
        return;
      }

      setAuthorInfo(event.target.value);
    }

    function changeGameScreenSize(event) {
      const input = event.target.value;
      if (event != null && event.target != null && event.target.value!= null) {
        if (input == "h450_800") {
          //TODO pass into cloud: project info
          console.log("h450_800");
        } else if (input == "v800_450") {
          //TODO pass into cloud: project info
          console.log("v800_450");

        } else if (input == "h600_800") {
          //TODO pass into cloud: project info
          console.log("h600_800");

        } else if (input == "v800_600") {
          //TODO pass into cloud: project info
          console.log("v800_600");
        } else {
          
          //TODO: show warning if not selected
          console.log("not selected!");
        }
      }
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
        <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
          <option value="" key=""> ----- Select Size and Direction ----- </option>
          <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
          <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
          <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
          <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>

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