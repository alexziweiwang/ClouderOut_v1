import React from 'react';
import { useState, useEffect } from 'react';
import { GiTrashCan } from "react-icons/gi";
import ProjectManageNew from './ProjectManageNew';
import langDictionary from './_textDictionary';

//TODO700 feature: latest edited project ... (create or save)


export default function ProjectManagingPanel(
  {
    goToGameMaker,
    getUsername,
    fetchProjectListVM, 
    revertProjectVM, 
    deleteProjectVM,
    parseFromFile_vm,

    getValidProjList,
    getTrashedProjList

  }
) {
    const [backendOption, setBackendOption] = useState("firebase"); 
    //default to use firebase for account folder?
    
    let languageCodeTextOption = 'en';

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const gameMakerButtonText = textDictItem.gameMakerButtonText !== undefined ?
        textDictItem.gameMakerButtonText
        : textDictItemDefault.gameMakerButtonText;
    
    const revertProjectButtonText = textDictItem.revertProjectButtonText !== undefined ?
        textDictItem.revertProjectButtonText
        : textDictItemDefault.revertProjectButtonText;
    
    const trashedProjectSelectListDefaultText = textDictItem.trashedProjectSelectListDefaultText !== undefined ? 
        textDictItem.trashedProjectSelectListDefaultText
        : textDictItemDefault.trashedProjectSelectListDefaultText;
    





    const [selected_project_name, setSelectedProjectName] = useState("");     //important !!!!!!

    const [projList, setProjList] = useState(undefined);                     //important !!!!!!
    const [trashedProjList, setTrashedProjList] = useState(undefined);       //important !!!!!!


    const [selectedTrashedProj, setSelectedTrashedProj] = useState("");
    const [isDisplayAsk, setDisplayAsk] = useState(false);
    const [showTrashArea, setShowTrashArea] = useState(false);

    const [currentProjectAction, setCurrentProjectAction] = useState("selectProject"); //"createProject", "selectProject", "revertProject"


    const [selectedFileContent, setSelectedFileContent] = useState(undefined);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [imptProjectNameInput, setImptProjectNameInput] = useState("");
    const [impProjQualityCheckOk, setImptProjQualityCheckOk] = useState(false);
    const [projectObj, setProjectObj] = useState(undefined);

    const [imptOkSignal, setImptOkSignal] = useState("");
    const [parsedFeedback, setParseFeedback] = useState("");

    const [confirmedFileAdding, setConfirmedFileAdding] = useState(false);

    const [authEmailName, setAuthEmailName] = useState("_");
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

      if (projList === undefined || trashedProjList === undefined) {
  
        fetchListsFromOuter();
      }
      // let uname = getUsername();
      // if (uname !== "_") {

      //   if (firstTimeEnter === true) {

      //       let validList = getValidProjList();
      //       let trashedList = getTrashedProjList();
      //       if (validList !== undefined && trashedList !== undefined) {
      //         setProjList(validList);
      //         setTrashedProjList(trashedList);
      //       }
            
      //       setFirstTimeEnter(false);
      //       setAuthEmailName(uname);
      //   }
      // }

                                 //     console.log("project managing panel page --\t\tauthEmamilName is [", uname, "]");

                                      console.log("mgr-panel, imported-obj = ", projectObj);
                                      

    });

    function fetchListsFromOuter() {
      let validList = getValidProjList();
      let trashedList = getTrashedProjList();
      console.log("\t\tproj-mgr-panel ... valid-list = ", validList);
      console.log("\t\tproj-mgr-panel ... trashed-list = ", trashedList);

      if (validList !== undefined && trashedList !== undefined) {
        setProjList(validList);
        setTrashedProjList(trashedList);
      }
    }



    function handleProjectSelectionChange(event) {
      setSelectedProjectName(event.target.value);
    }

    function handleProjectGridClicked(project) {
      if (project === selected_project_name) {
        setSelectedProjectName("");
      } else {
        setSelectedProjectName(project);
      }
    }


    function handleTrashedProjectSelectionChange(event) {
      setSelectedTrashedProj(event.target.value);
    }

    async function revertTrashedProject() {
      await revertProjectVM(
        {
          projectToRevert: selectedTrashedProj, 
          currUser: authEmailName,
          bkOption: backendOption
        });

      setSelectedTrashedProj("");
      fetchListsFromOuter();
    }

    function handleDeleteProject() {
      let response = window.confirm("Are you sure to delete this project? (it can be revert from trash-area)?");
        if (response === true) {
          deleteProject();
        }  
    }

    async function deleteProject() {
      await deleteProjectVM( 
        { 
          projectToDelete: selected_project_name, 
          currUser: authEmailName,
          bkOption: backendOption
        }
      );
      
      setSelectedProjectName("");
      fetchListsFromOuter();
    }

    function notUsing() {
      return "";
    }

    function triggerCreationSubmit() {
      fetchListsFromOuter();
      setCurrentProjectAction("selectProject");
    }

    function passInEmailUsername() {
      return authEmailName; //TODO1030
    }

    function handleImportedFile() {
        let res = parseFromFile_vm(selectedFileContent, setProjectObj, setParseFeedback);
        if (res === true) {
          setImptOkSignal("Project File accepted.");
        } else {
          setImptOkSignal("");
        }
    }

    function resetFileSelection() {
      setSelectedFileContent(undefined);
      setSelectedFileName("");
      setImptProjectNameInput("");

    }

    let name = "/projectmanagingpanel";







//selectedFileContent
//selectedFileName
//imptProjectNameInput
//impProjQualityCheckOk 


    
    return (<>

{true && <div style={{"display": "flex"}}>    


      <div className="dashboard_content">
  


{/* "createProject" Section   */}

        <div 
          className={currentProjectAction === "createProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        >
            <div 
              className="titleBar"
              style={{"display": "flex", "justifyContent": "start", "padding": "10px", "cursor": "pointer"}}
              onClick={()=>{  
                if (currentProjectAction !== "createProject") {
                  setCurrentProjectAction("createProject");
                } else {
                  setCurrentProjectAction("");
                }
              }}
            >
                <label className="cursor_pointer">Create a New Project ...</label>
            </div>

            <div 
              style={{
                "display": currentProjectAction === "createProject" ? "flex" : "none",
                "transition": "all 0.2s ease-out"
              }}
            
            >
              <ProjectManageNew
                cancelAction={notUsing}
                showCancelButton={false}
                isPart={true}
                triggerCreationSubmit={triggerCreationSubmit}
                username={authEmailName}
              />
            </div>

        </div>



{/* "selectProject" Section */}
        <div 
          className={currentProjectAction === "selectProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        >
        <div>

        {(projList && projList.length > 0) && 
        <div  style={{"display": "flex", "justifyContent": "start", "padding": "10px"}}
              onClick={()=>{  
                if (currentProjectAction !== "selectProject") {
                  setCurrentProjectAction("selectProject");
                } else {
                  setCurrentProjectAction("");
                }
              }}
              className="titleBar"
        >
          <label className="cursor_pointer">Select an Ongoing Project ...</label>
        </div>}


        {(projList && projList.length > 0) && 
        <div className="parallelFrame"  
          style={{
              "marginTop": "20px", 
              "justifyContent": "start", 
              "alignItems": "center", 
              "display": currentProjectAction === "selectProject" ? "flex" : "none",
              "transition": "all 0.2s ease-out",
              "marginLeft": "25px",
              "paddingRight": "25px",

          }}>

          
          <div className="projectGrid" style={{"height": "210px", "overflow": "scroll"}}>
                Projects on Cloud
                <br></br>

            {projList.map((item, index) => {
              return (
                <div className= {(selected_project_name === item) ? "projectGridItemSelected" : "projectGridItem"}
                    key={projList[index]} 
                    value={item} 
                    onClick={()=>{handleProjectGridClicked(item);}}>
                          <label style={{"fontWeight": "normal"}}>{item}</label>
                          <br></br>
                          <br></br>
                          <br></br>

                          {(selected_project_name === item) && 
                          <div style={{"display": "flex", "justifyContent": "start", "alignContent": "end"}}>
                            <button className="elemPosLeftBottom" onClick={()=>{handleDeleteProject();}}>
                              <GiTrashCan/>
                            </button>
                          </div>}

                </div>
              );
            })} 
    
          </div>




          {<div style={{
            "width": selected_project_name === "" ?  "20px" :"200px",
            "display": "flex",
            "justifyContent": "center",
            
          }}>
              {selected_project_name !== "" 
              &&
              <div>
                <button 
                  className="button testEntire" 
                  onClick={()=>{
                    goToGameMaker(selected_project_name);
                  }}> 
                  {gameMakerButtonText} 
                </button>

                <br></br>

                <button
                  onClick={()=>{
                    setSelectedProjectName("");
                  }}
                
                >
                  cancel</button>
              </div>}
          </div>}


          {selected_project_name === "" && 
          <div 
            className="projectGrid" 
            style={{
              "height": "210px", 
            }}>

            Import Project From File

           
            {confirmedFileAdding === false 
                  && <>
                <br></br><br></br>
                 <input 
                        type="file"
                        accept=".txt"  
                        onChange={(event)=>{
                            if (event.target.files !== undefined) {
                              setProjectObj(undefined);

                              let fileContent = event.target.files[0];
                              setSelectedFileContent(fileContent);
                              setSelectedFileName(fileContent.name);
                              
                              setImptProjectNameInput("");

                                        console.log("selected file...", fileContent);
                              
                            }
                        }}

                  ></input>

       
                  <br></br>

                  <label style={{"fontWeight": "normal"}}>
                    Project Name: </label>      
                  
                  <input
                    value={imptProjectNameInput}
                    onChange={(event)=>{

                        setImptProjectNameInput(event.target.value);
                        
                    }}                  
                  ></input>


             
                  <br></br><br></br>
                  <button
                    onClick={()=>{
                      if (selectedFileContent === undefined) {
                        alert("Please select a project file");
                      } else if (imptProjectNameInput.length === 0) {
                        alert("Please enter project name");
                      } else {
                        handleImportedFile();
                        setConfirmedFileAdding(true);
                      }
                      
 
                    }}
                  >Confirm Import</button>
                  </>}

                
                  {confirmedFileAdding === true
                  && <div>
                  <br></br>
                  <label style={{"fontWeight": "normal"}}>
                    {selectedFileName}
                  </label>
                  <br></br>

                  <label>{parsedFeedback}</label>
                  <br></br>

                    <button
                      onClick={()=>{
                        resetFileSelection();
                        setConfirmedFileAdding(false);

                      }}
                    >
                      select another file
                    </button>

                  </div>}

            <div>
              
              
            </div>  
          </div>}

        </div>
        }</div>
        



        
        </div>





{/* "revertProject" Section */}
          <div 
            className={currentProjectAction === "revertProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
          >   
            <div
                className="titleBar"
                onClick={()=>{  
                    if (currentProjectAction !== "revertProject") {
                        setCurrentProjectAction("revertProject");
                    } else {
                        setCurrentProjectAction("");
                    }
                }}
            >
              <label 
                className="cursor_pointer"
                style={{"justifyContent": "start", "display": "flex", "padding": "10px"}}
              >Revert a Deleted Project ...</label>
            </div>

        
            
              {<div className="trashedProjectArea" 
              
              
                style={{
                    "transition": "all 0.2 ease-out", 
                    "display": currentProjectAction === "revertProject" ? "flex" : "none",
                    "justifyContent": "start", 
                }}>

                  {trashedProjList.length == 0 && <div>
                      <label>No deleted project.</label>
                  </div>}                

                  {trashedProjList.length > 0 && 
                    <><select className="dropdownList" value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
                      <option value="" key="">-- {trashedProjectSelectListDefaultText} --</option>
                      {
                        trashedProjList.map((item, index) => {
                          return (
                            <option value={trashedProjList[index].project_name} key={trashedProjList[index]}> {trashedProjList[index]}</option>
                          );
                        })
                      }
                    </select>
                  

                  <button onClick={()=>{
                    revertTrashedProject();
                    
                  }}>{revertProjectButtonText}</button></>}


                  
              </div>
              }
        </div>
    </div>
    

  </div>
    
            }
</>            
    );
}
