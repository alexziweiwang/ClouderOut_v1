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

    const [isSelectedFile, setIsSelectedFile] = useState(false);


    const [selectedFileName, setSelectedFileName] = useState(-1);
    const [selectedFileContent, setSelectedFileContent] = useState(-1);

    const [projectObj, setProjectObj] = useState(-1);

    const [isConfirmed, setIsConfirmed] = useState(false);


    function goToGameMaker(projectNameTemp, isNewProject) {
        if (projectNameTemp === "") {
          return;
        }

        userLogOutVM();

        
        let projectContent = projectObj;

        if (isNewProject === true) {
            // use default new-project-data

            projectContent = createNewProjectObj_local(projectNameTemp);
            setProjectObj(projectContent);

        } else {

            // use the imported parsed file
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

                    {isSelectedFile === false && <>
                    <input 
                        type="file"
                        accept=".txt"  
                        onChange={(event)=>{

                            setIsSelectedFile(true);

                            let fileContent = event.target.files[0];
                            setSelectedFileContent(fileContent);

                            setSelectedFileName(fileContent.name);

                            setIsConfirmed(false);
                        }}

                    ></input>

                    <br></br>
                    </>}

                    {isSelectedFile === true && <label>File Name: {selectedFileName}</label>}

                    


                    <br></br>
                    

                    {(isSelectedFile === true && selectedFileContent !== -1 && isConfirmed === false) 
                    &&
                    <button
                        onClick={()=>{
                            setIsConfirmed(true);
                            parseFromFile_vm(selectedFileContent, setProjectObj);
                            

                        }}
                    >Confirm</button>}

                    {isSelectedFile === true && <button
                        onClick={()=>{
                            setIsSelectedFile(false);

                        }}
                    >Reselect</button>}


                    {isConfirmed === true && 
                    <>
                        <br></br><br></br>


                                                                <br></br>
                                                                <button
                                                                    onClick={()=>{
                                                                        console.log("printing the obj ... \n", projectObj);

                                                                    }}
                                                                
                                                                >Print (test)</button>

                        <br></br><br></br>

                        <button
                            onClick={()=>{
                                
                                console.log("going to edit this project ... \n", projectObj);

                                // goToGameMaker(projectIdInput, false);

                            }}
                        >Edit Project</button>

                    </>}
                </div>}


        </div>


    </div>
    )

}