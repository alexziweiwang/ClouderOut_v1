import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM} from '../viewmodels/ProjectManagerViewModel';

export default function ProjectManageNew() {
    const navigate = useNavigate();

    const name = "/projectmanagenew";
    const username = "user002"; //TODO test

    const [addedNewProjName, setNewProjName] = useState(""); //TODO testing
    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAuthorInfo] = useState("");
    const [addedGameScreenSize, setAddedGameScreenSize] = useState("");
    const [projList, setProjList] = useState(false); 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
      if (firstTimeEnter === true) {
        loadProjectListFromCloud();
        setFirstTimeEnter(false);
      }
    });

    async function loadProjectListFromCloud() {
      const groupList = await fetchProjectListVM(username); 
      setProjList(groupList.untrashed);
    }

    function changeProjNameInput(event) {
      const str = event.target.value;

      setNewProjName(str);
    }
    
    function createNewProjectEdit() {
        console.log("adding a new project: " + addedNewProjName);
        if (addedNewProjName === "") {
          return;
        }
        createNewProjectToCloud();
        const selected_project_name = addedNewProjName;
    //    navigate('/gamemaker', { replace: true, state: { selected_project_name, username } });

    }

        
    function createNewProjectReturn() {
      console.log("adding a new project: " + addedNewProjName);
      if (addedNewProjName === "") {
        return;
      }
      createNewProjectToCloud();
      //navigate('/projectmanagingpanel', { replace: true });
    }

    /* Create and setup the default set for a new project */
    function createNewProjectToCloud() {
      // TODO gather list:
      /* project name: addedNewProjName
      project description: projDedscription
      game-data map: empty {}
      author-info field: addedAuthorInfo
      field: type = "project"
      chapter directory: collection "chapters"
      game node directory: default in chapter-management (at least one defualt node in ecah chapter)
                 genre field (later) */
      
    
      const result = projList.filter((name) => name === addedNewProjName);
      if (result.length > 0) {
        console.log("warning: duplicate name");
        //if already contains this name
        //don't navigate
        return;
      }
      
      // if (addedAuthorInfo.length === 0) {
      //   console.log("warning: author info can't be empty");
      //   //don't navigate
      //   return;
      // }
      //TODO: author name default: current username, then allow adding others
      

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
      console.log("Created project info: ");
      console.log(obj);
      
      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

      //TODO call VM function here to pass the data
    }

    function changeProjDescription(event) {
      setProjDescription(event.target.value);
    }

    function changeAuthorInfo(event) {
      const str = event.target.value;
      setAuthorInfo(event.target.value);
    }

    function changeGameScreenSize(event) {
      const input = event.target.value;
      if (event != null && event.target != null && event.target.value!= null) {
        if (input === "h450_800") {
          //TODO pass into cloud: node info
          console.log("h450_800");
        } else if (input === "v800_450") {
          //TODO pass into cloud: node info
          console.log("v800_450");

        } else if (input === "h600_800") {
          //TODO pass into cloud: node info
          console.log("h600_800");

        } else if (input === "v800_600") {
          //TODO pass into cloud: node info
          console.log("v800_600");
        } else {
          
          //TODO: show warning if not selected
          console.log("not selected!");
        }
      }
    }


    return (
    <div>    
   
 
        <div style={{"fontWeight": "normal"}}>
        <label>Create a new project: </label>
            <br></br>
          <div className="parallelFrame newProjForm">
 
           <div className="newProjLineName">
            <label className="newProjectInfoElement">Project Name: </label>
            <br></br>
            <label className="newProjectInfoElement"></label>Project Description: 
            <br></br><br></br><br></br><br></br><br></br>
            <label className="newProjectInfoElement">Author Info: </label>
          </div>
          <div className="newProjLineContent">
            <input className="newProjectInfoElement" type="text" value={addedNewProjName} onChange={changeProjNameInput}/>
            <br></br>
            <textarea className="newProjectInfoElement" rows={5} cols={36} value={projDedscription} onChange={changeProjDescription}></textarea>
            <br></br>
            <textarea className="newProjectInfoElement" rows={2} cols={20} value={addedAuthorInfo} onChange={changeAuthorInfo}></textarea>

          </div>
        </div>

        </div>

        <br></br>
        <div className="parallelFrame">
        <button 
          onClick={()=>{createNewProjectReturn()}}>
        Create & Close
        </button>

        <button 
          className="buttonRight"
          onClick={()=>{createNewProjectEdit()}}>
        Create & Start Editing!
        </button>

        </div>


        <br></br>
        <br></br>

        <p className="plans">TODO: For authors, later do the "@"-like for link to the author space?</p>
        <br></br>

        <br></br>
        <p className="plans"> (Later: [Genre] can be the "tag"s? multiple selection or add new? **Implement Later**)</p>

        <br></br> <br></br>
        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br> TODO: design and construct new-set for each new project: layers, etc.
        </p>


  </div>
    );
}