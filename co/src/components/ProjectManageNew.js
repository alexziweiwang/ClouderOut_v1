import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {fetchProjectListVM} from '../viewmodels/ProjectManagerViewModel';

export default function ProjectManageNew({cancelAction, showCancelButton}) {
    const navigate = useNavigate();

    const name = "/projectmanagenew";
    const username = "user002"; //TODO test

    const [addedNewProjName, setAddedNewProjName] = useState(""); //TODO testing
    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAddedAuthorInfo] = useState("");
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

      setAddedNewProjName(str);
    }
    
    function createNewProjectLocal() {
        if (addedNewProjName === "") {
          alert("Project Name can not be empty!");
          return;
        }
        createNewProjectToCloud();
  
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
        alert("Project Name already taken ...");
        //if already contains this name
        //don't navigate
        return;
      }
      
 
      //TODO: author name default: current username, then allow adding others
      

      const empty_game_data = {};
      const obj = {
        project_name: addedNewProjName,
        project_description: projDedscription,
        game_data: empty_game_data,
        author_info: addedAuthorInfo,
        type: "project",
        game_size_direction: "16:9(horizonal)"
      };
      //TODO add collection "chapters"
      console.log("Created project info: ");
      console.log(obj);

      let alertStr = "Project " + addedNewProjName + " Created!";
      alert(alertStr);


      clearForm();
      
      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

      //TODO call VM function here to pass the data
    }

    function changeProjDescription(event) {
      setProjDescription(event.target.value);
    }

    function changeAuthorInfo(event) {
      const str = event.target.value;
      setAddedAuthorInfo(event.target.value);
    }

    function changeGameScreenSize(event) {
      const input = event.target.value;
      if (event != null && event.target != null && event.target.value!= null) {
   
        if (input === "16:9(horizonal)") {
          //TODO pass into cloud: node info
          console.log("16:9(horizonal)");

        } else if (input === "16:9(vertical)") {
          //TODO pass into cloud: node info
          console.log("16:9(vertical)");

        } else if (input === "4:3(horizonal)") {
          //TODO pass into cloud: node info
          console.log("4:3(horizonal)");

        } else if (input === "4:3(vertical)") {
          //TODO pass into cloud: node info
          console.log("4:3(vertical)");
        } else {
          
          //TODO: show warning if not selected
          console.log("not selected!");
        }
      }
    }

    function clearForm() {
      setAddedNewProjName("");
      setProjDescription("");
      setAddedAuthorInfo("");
    }


    return (
    <div>    
   
   <button className="buttonRight80"
      onClick={()=>{
        clearForm();
      }}
   >Clear Form</button>
   <br></br><br></br>


        <div style={{"fontWeight": "normal"}}>
          {/* //TODO later: use table, etc. */}
  
          <div className="parallelFrame newProjForm">
            <table>
              <tbody>
                <tr>
                  <td>Project Name: </td>
                  <td>
                      <input 
                        className="newProjectInfoElement" 
                        type="text" 
                        value={addedNewProjName} 
                        onChange={(event)=>{changeProjNameInput(event)}}/>
                  </td>
                </tr>

                <tr>
                  <td>Project Description:</td>
                  <td>
                    <textarea 
                      className="newProjectInfoElement" 
                      rows={5} 
                      cols={36} 
                      value={projDedscription} 
                      onChange={(event)=>{changeProjDescription(event)}}
                    />


                  </td>
                </tr>

                <tr>
                  <td>Author Info:</td>
                  <td>
                    <textarea 
                      className="newProjectInfoElement" 
                      rows={2} 
                      cols={20} 
                      value={addedAuthorInfo} 
                      onChange={(event)=>{changeAuthorInfo(event)}}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
 
      
      
        </div>

        </div>

        <br></br>
       
        <button 
          onClick={()=>{createNewProjectLocal()}}>
        Create Project
        </button>

        {showCancelButton === true && 
        <button
          onClick={()=>{
            cancelAction();
          }}
        >Cancel</button>}

         <br></br>
        <br></br>

{/*
        <p className="plans">TODO: For authors, later do the "@"-like for link to the author space?</p>
        <br></br>

        <br></br>
        <p className="plans"> (Later: [Genre] can be the "tag"s? multiple selection or add new? **Implement Later**)</p>

        <br></br> <br></br>
        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br> TODO: design and construct new-set for each new project: layers, etc.
        </p> */}
{/* //TODO plans */}

  </div>
    );
}