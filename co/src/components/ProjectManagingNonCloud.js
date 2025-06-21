import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { userLogOutVM } from '../viewmodels/_UserFirebaseAuthViewModel';

import { fetchProjectListVM, createProjectVM } from '../viewmodels/ProjectManagerViewModel';

import { projectNavUiTemplate, gdt1Template, epp2Template, epa3Template, ess4Template, shp5Template } from './_dataStructure_DefaultObjects';

import { parseFromFile_vm } from '../viewmodels/PrepAc_ProjectFileInOut';
import { prepareForNewProject_vm } from '../viewmodels/PrepAc_Creations';

//projectNonCloud
export default function ProjectManagingOffline() {

    const navigate = useNavigate();

    const modeName = "offline_half"; //can use online-link for resource, but not using cloud-resource(databse or storage)


    const [projectIdInput, setProjectIdInput] = useState("my_project");

    const [isCreateNewProject, setIsCreateNewProject] = useState(true);

    const [projectObj, setProjectObj] = useState(-1);


    function goToGameMaker(projectNameTemp, isNewProject) {
        if (projectNameTemp === "") {
          return;
        }

        userLogOutVM();

        
        let projectContent = projectObj;

        if (isNewProject === true) {
            //TODO use default new-project-data...

            projectContent = createNewProjectObj_local(projectNameTemp);

            setProjectObj(projectContent);

        } else {
            //TODO use imported parsed file !

            projectContent = projectObj;


        }

        
        console.log("non-cloud-navigating to ... game-maker, mode  = ", modeName, "... project-obj = ", projectContent);

        
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: projectNameTemp, 
            mode: modeName,
            projectFile: projectContent
          } });
  
    }


    async function createNewProjectObj_local(projectNameProvided) {
        let projListTemp = [];
        let autherInfo = "author";
        let descrp = "";

        let projectObject = prepareForNewProject_vm(
            projListTemp, 
            projectNameProvided, 
            epp2Template, 
            epa3Template, 
            projectNavUiTemplate, 
            autherInfo,
            descrp,
            projectNameProvided,
        )


        return projectObject;
    }

    function parseFromFile() {


        //TODO
    }


    return (
    <div  style={{"display": "flex", "justifyContent": "center", "alignItem": "center"}}>


        <div>
   
                <button 
                    className={isCreateNewProject === true ? "topBarTabSelected" : "topBarTab"}
                    onClick={()=>{
                        setIsCreateNewProject(true);
                    }}   
                    
                    >New Project</button>
            
          
                <button 
                    className={isCreateNewProject === false ? "topBarTabSelected" : "topBarTab"}
                    onClick={()=>{
                        setIsCreateNewProject(false);
                    }}                  
                >Import Project File</button>



                
            {isCreateNewProject === true && <div>
                    <br></br><br></br><br></br>
                    <label>Project ID: </label>
                    <input
                        value={projectIdInput}
                        onChange={(event)=>{
                            setProjectIdInput(event.target.value);
                        }}
                    ></input>

                    <br></br><br></br>
                    <button
                        onClick={()=>{
                            goToGameMaker(projectIdInput, true);
                        }}
                    >Create Project</button>
                </div>}


                {isCreateNewProject === false && <div>
                    <br></br><br></br><br></br>

                    <input 
                        type="file"
                        accept=".txt"  
                        onChange={(event)=>{
                            let fileContent = event.target.files[0];
                            if (fileContent) {
                                parseFromFile_vm(fileContent, setProjectObj);
                            }

                        }}  
                    ></input>

                                                                <br></br>
                                                                <button
                                                                    onClick={()=>{
                                                                        console.log(projectObj);

                                                                    }}
                                                                
                                                                >Print (test)</button>

                    <br></br><br></br>

                    <button
                        onClick={()=>{

                            console.log(projectObj);

                            // goToGameMaker(projectIdInput, false);

                        }}
                    >Edit Project</button>
                </div>}


        </div>


    </div>
    )

}