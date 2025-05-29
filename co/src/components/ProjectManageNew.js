import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//TODO1090 cloud-db related
import { fetchProjectListVM, createProjectVM } from '../viewmodels/ProjectManagerViewModel';


import { projectNavUiTemplate, gdt1Template, epp2Template, epa3Template, ess4Template, shp5Template } from './_dataStructure_DefaultObjects';

//TODO115 collection of cloud-related


export default function ProjectManageNew({cancelAction, showCancelButton, isPart, triggerCreationSubmit, username}) {
    const backendOption = "firebase"; 
    //default to use firebase for account folder?


    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setAddedNewProjName] = useState(""); //TODO testing
    const [addedNewProjKey, setAddedNewProjKey] = useState(""); //TODO testing

    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAddedAuthorInfo] = useState("");
    const [addedGameScreenSize, setAddedGameScreenSize] = useState("");
    const [projList, setProjList] = useState([]); 
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
      if (firstTimeEnter === true) {
        loadProjectListFromCloud();
        setFirstTimeEnter(false);
      }
    });

    async function loadProjectListFromCloud() {
  
      const groupList = await fetchProjectListVM(
        {currUser: username,
         bkOption: backendOption
        }
        );
      if (groupList === undefined || groupList.length === 0) {
        setProjList([]);
      } else {
        setProjList(groupList.untrashed);
      }
    }

    function changeProjNameInput(event) {
      const str = event.target.value;
//TODO change project-key as well

      setAddedNewProjName(str);
    }
    
    async function createNewProjectLocal() {
        if (addedNewProjName === "") { //TODO1000 if only contains white space, etc.
          alert("Project Name can not be empty!");
          return;
        }
        await createNewProjectToCloud();
  
    }

 

    /* Create and setup the default set for a new project */
    async function createNewProjectToCloud() {
      // TODO gather list:
      /* project name: addedNewProjName
      project description: projDedscription
      game-data map: empty {}
      author-info field: addedAuthorInfo
      field: type = "project"
      chapter directory: collection "chapters"
      game node directory: default in chapter-management (at least one default node in ecah chapter)
                 genre field (later) */
      
    
      const result = projList.filter((name) => name === addedNewProjKey);
      if (result.length > 0) {
        console.log("warning: duplicate name");
        alert("Project Name already taken ...");
        //if already contains this name
        //don't navigate
        return;
      }
      
 
      //TODO: author name default: current user-name, then allow adding others
      
      const projTitle = ""; //TODO100
      const empty_game_data = {};
      const empty_rm_audio = [];
      const empty_rm_visual = [];
      const empty_chapter_list = {0: ["chapter_placeholder","chapter_placeholder","chapter_placeholder","chapter_placeholder"]};

      const empty_chapter_node_mapping = {
        "placeholder": {}
      };
      const empty_node_ui_plan = {};

      const empty_emu_4sets = {
        "gdt1": {},
        "epp2": {},
        "epa3": {},
        "ess4": {},
        "shp5": {}
      };
      Object.keys(gdt1Template).map((currKey) => {
        empty_emu_4sets["gdt1"][currKey] = gdt1Template[currKey];
      })

      Object.keys(epp2Template).map((currKey) => {
        empty_emu_4sets["epp2"][currKey] = epp2Template[currKey];
      })

      Object.keys(epa3Template).map((currKey) => {
        empty_emu_4sets["epa3"][currKey] = epa3Template[currKey];
      })
      


      let empty_nav_ui_settings = {};
      Object.keys(projectNavUiTemplate).map((currKey) => {
        empty_nav_ui_settings[currKey] = projectNavUiTemplate[currKey];
      }); //TODO900 default
      

      const default_size_direction = "h450_800"; //TODO900 default
      const default_ui_language = "en";


      const projectObj = {
        chapterList: empty_chapter_list,
        chapterNodeMapping: empty_chapter_node_mapping,
        convNodeUiPlanMap: empty_node_ui_plan,
        emu4sets: empty_emu_4sets,
        project_name: addedNewProjName,
        game_data: empty_game_data,
        nav_ui_settings: empty_nav_ui_settings,
        proj_resource_audio: empty_rm_audio,
        proj_resource_visual: empty_rm_visual,
        sizeDirection: default_size_direction,
        type: "project",
        trashed: false,
        ui_language: default_ui_language,

        author_info: addedAuthorInfo,
        project_description: projDedscription,
        project_title: addedNewProjName

      };

      //TODO900 emu-data-sets
//TODO900 screen size

                                          console.log("Created project info: "); //TODO testing
                                          console.log(projectObj); //TODO testing

      let alertStr = "Project " + addedNewProjName + " Created!";
      alert(alertStr);

      await createProjectVM(
        {
          currUser: username, 
          projectName: addedNewProjKey, 
          projectObj: projectObj,
          bkOption: backendOption
        }
      );
      triggerCreationSubmit();
  
      clearForm();
      
      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

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
                          let str = val.replaceAll(" ", "-");

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
                          let str = val.replaceAll(" ", "-");

                          setAddedNewProjKey(str);

                        }}
                        onFocus={()=>{
                          //TODO 
                          let val = addedNewProjName;
                          let str = val.replaceAll(" ", "-");

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