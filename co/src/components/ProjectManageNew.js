import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//TODO1090 cloud-db related

import { 
    projectNavUiTemplate, 
    gdt1Template, 
    epp2Template, 
    epa3Template, 
    ess4Template, 
    shp5Template 
} from './_dataStructure_DefaultObjects';

import { createNewProjectToCloud_vm } from '../viewmodels/PrepAc_Creations';
import { replaceSpaceForNames } from '../viewmodels/PrepAc_Conversion';
//TODO115 collection of cloud-related


export default function ProjectManageNew({
    cancelAction, 
    showCancelButton, 
    isPart, 
    triggerCreationSubmit, 
    username,
    projList

  }) {
    const [backendOption, setBackendOption] = useState("firebase"); 
    //default to use firebase for account folder?


    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setAddedNewProjName] = useState(""); //TODO testing
    const [addedNewProjKey, setAddedNewProjKey] = useState(""); //TODO testing

    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAddedAuthorInfo] = useState("");
    const [addedGameScreenSize, setAddedGameScreenSize] = useState("");
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {

      if (username !== "_" && firstTimeEnter === true) {

        setFirstTimeEnter(false);
      }
    });

    function triggerCreationNew_local() {
      triggerCreationSubmit(addedNewProjKey);
    }

   

    function changeProjNameInput(event) {
      const str = event.target.value;
//TODO change project-key as well

      setAddedNewProjName(str);
    }
    
    async function createNewProjectLocal() {
        if (addedNewProjName.trim() === "") { // if only contains white space, etc.
          alert("Project Name can not be empty!");
          return;
        }
        await createNewProjectToCloud();
  
    }

 

    /* Create and setup the default set for a new project */
    async function createNewProjectToCloud() {
      await createNewProjectToCloud_vm(
          projList, 
          addedNewProjKey, 
          epp2Template, 
          epa3Template, 
          projectNavUiTemplate, 
          addedAuthorInfo,
          projDedscription,
        
          username,
          backendOption,
        
          triggerCreationNew_local,
          clearForm,
        
          addedNewProjName,
      );

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
      setAddedNewProjKey("");
    }


    return (
    <div className={!isPart ? "someGrey" : ""} style={{"width": "100%"}}>    
   
    <button
        style={{"marginTop": "20px", "marginRight": "-200px"}}
        onClick={()=>{
          clearForm();
        }}
    >Clear Form</button>


   <br></br><br></br>


        <div style={{"fontWeight": "normal"}}>
          {/* //TODO later: use table, etc. */}
  
          <div className="parallelFrame newProjForm">
            <table 
              style={{"width": "820px"}}
              className="noBorder">
              <tbody>
              
                <tr style={{"width": "500px"}}>
                  <td className="noBorder" style={{"width": "160px"}}>Project Name: </td>
                  <td className="noBorder">
                      <input 
                        className="newProjectInfoElement" 
                        type="text" 
                        value={addedNewProjName} 
                        onChange={(event)=>{
                          changeProjNameInput(event);
                          let val = event.target.value;
                          let str = replaceSpaceForNames(val);

                          setAddedNewProjKey(str);

                          }}/>
                        <label> (Changeable)</label>

                  </td>
                </tr>
                <tr>
                  <td className="noBorder">Project Unique ID: </td>
                  <td className="noBorder">
                      <input 
                        className="newProjectInfoElement" 
                        type="text" 
                        value={addedNewProjKey} 
                        onChange={(event)=>{
                          let val = event.target.value;
                          let str = replaceSpaceForNames(val);

                          setAddedNewProjKey(str);

                        }}
                        onFocus={()=>{
                          //TODO 
                          let val = addedNewProjName;
                          let str = replaceSpaceForNames(val);

                          setAddedNewProjKey(str);
                        }}
                        />
                        <label> (Can NOT change later)</label>
                  </td>
                </tr>
                <tr>
                  <td className="noBorder">Project Description:</td>
                  <td className="noBorder">
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
                  <td className="noBorder">Author Info:</td>
                  <td className="noBorder">
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