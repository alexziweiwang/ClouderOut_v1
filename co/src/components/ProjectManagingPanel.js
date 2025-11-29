import React from 'react';
import { useState, useEffect } from 'react';
import { GiTrashCan } from "react-icons/gi";
import ProjectManageNew from './ProjectManageNew';
import langDictionary from './_textDictionary';

//TODO700 feature: latest edited project ... (create or save)
import { makeDeletionLists_vm, makeReversionLists_vm } from '../viewmodels/PrepAc_ProjectOperation';
import { placeholderNameDefault } from './_dataStructure_DefaultObjects';


export default function ProjectManagingPanel(
  {
    goToGameMaker,
    getUsername,

    revertProjectOuter, 
    markTrashProjectOuter,
    parseFromFile_vm,

    getValidProjList,
    getTrashedProjList,

    sendOutImportedProject,

  }
) {

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

      if (authEmailName !== "_" && firstTimeEnter === true) {

        if (
          projList === undefined 
          || trashedProjList === undefined
        ) { // condition of init-status of var...
    
          let resBool = fetchListsFromOuter(); 
          if (resBool === true) { //TODO99999
            setFirstTimeEnter(false);
          }
        }
      }


      let unameTemp = getUsername();
      if (unameTemp !== "_") {
          setAuthEmailName(unameTemp);
      }

                                  console.log("pmp - proj-list = ", projList);
                                  console.log("pmp - trashed-proj-list = ", trashedProjList);

    });

    function fetchListsFromOuter() {
      let validList = getValidProjList();
      let trashedList = getTrashedProjList();

                        console.log("\t\tproj-mgr-panel ... valid-list = ", validList);
                        console.log("\t\tproj-mgr-panel ... trashed-list = ", trashedList);

      if (validList !== undefined && trashedList !== undefined) {
        setProjList(validList);
        setTrashedProjList(trashedList);

        return true;
      } else {
        return false;
      }
    }

    
    function updateBothListsLocal(obj) {
      if (obj !== undefined && obj.untrashed !== undefined && obj.trahsed !== undefined) {
        setProjList(obj.untrashed);
        setTrashedProjList(obj.trashed);
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
      await revertProjectOuter(selectedTrashedProj);
      setSelectedTrashedProj("");



      //TODO30
      makeReversionLists_vm(
        projList, 
        trashedProjList, 
        setTrashedProjList, 
        setProjList, 
        selectedTrashedProj
      );
      
    }

    async function handlemarkTrashProject() {
      let response = window.confirm("Are you sure to delete this project? (it can be reverted from the area below)?");
        if (response === true) {
          await markTrashProject();
        }  
    }

    async function markTrashProject() {
      await markTrashProjectOuter(selected_project_name); 
       
      setSelectedProjectName("");

      //TODO30
      makeDeletionLists_vm(
        projList, 
        trashedProjList, 
        setTrashedProjList, 
        setProjList, 
        selected_project_name
    );

    }

    function notUsing() {
      return "";
    }

    function triggerCreationSubmit(newProjectKeyName) {

      let validListTemp = projList;
      validListTemp.push(newProjectKeyName);
      
      let updatedObj = {
        "untrashed": validListTemp,
        "trashed": trashedProjList
      };
      //add this newly created obj into both lists
      updateBothListsLocal(updatedObj);

      setCurrentProjectAction("selectProject");
    }

    function passInEmailUsername() {
      return authEmailName; //TODO1030
    }

    function handleImportedFile() {
        let res = parseFromFile_vm(selectedFileContent, setProjectObj, setParseFeedback);
        if (res === true) {
          setImptOkSignal("Project File accepted.");
          
          sendOutImportedProject(selectedFileContent);
        } else {
          setImptOkSignal("");

          sendOutImportedProject(undefined);

        }
    }

    function resetFileSelection() {
      setSelectedFileContent(undefined);
      setSelectedFileName("");
      setImptProjectNameInput("");

    }



    function handlePermanentlyRemove() {
      //remove this 

      //TODO ask
      let askStr = "Are you sure to permanently remove this project [" + selectedTrashedProj + "]?";
      let ans = window.confirm(askStr);
      if (ans) {
        //TODO

        //remove this proejct from trashed-list
        //TODO notify outer layer (panel1) for new trashed-list
        //TODO setTrashedProjList() // for local

        //provide a download file of this project

        // selectedTrashedProj
      }
    } 




//selectedFileContent
//selectedFileName
//imptProjectNameInput
//impProjQualityCheckOk 


    
    return (<>

 <div style={{"display": "flex"}}>    


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
                projList={projList}
              />
            </div>

        </div>



{/* "selectProject" Section */}
        <div 
          className={currentProjectAction === "selectProject" ? "projSelectionArea projManageSectionSelected" : "projSelectionArea projManageSection"}
        >
        <div>

         
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
        </div>


        {true && 
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

          {(projList !== undefined && projList.length > 0) &&
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
                            <button className="elemPosLeftBottom" onClick={()=>{handlemarkTrashProject();}}>
                              <GiTrashCan/>
                            </button>
                          </div>}

                </div>
              );
            })} 
    
          </div>
          }



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
              >Deleted Project ...</label>
            </div>

        
            
              {<div className="trashedProjectArea" 
              
              
                style={{
                    "transition": "all 0.2 ease-out", 
                    "display": currentProjectAction === "revertProject" ? "flex" : "none",
                    "justifyContent": "start", 
                }}>

                  {(trashedProjList !== undefined && trashedProjList.length == 0) && <div>
                      <label>No deleted project.</label>
                  </div>}                

                  {(trashedProjList !== undefined && trashedProjList.length > 0) && 
                    <><select className="dropdownList" value={selectedTrashedProj} onChange={handleTrashedProjectSelectionChange}>
                      <option value="" key="">-- {trashedProjectSelectListDefaultText} --</option>
                      {
                        trashedProjList.map((item, index) => {
                          if (item === placeholderNameDefault) {
                            return;
                          }
                          return (
                            <option value={trashedProjList[index].project_name} key={trashedProjList[index]}> {trashedProjList[index]}</option>
                          );
                        })
                      }
                    </select>
                  
                  
                  {selectedTrashedProj !== "" &&
                  <>
                  <button onClick={()=>{
                    revertTrashedProject();
                    
                  }}>{revertProjectButtonText}</button>
                  
                  
                  
                  <button 
                  className="warningButton"
                  onClick={()=>{
                    handlePermanentlyRemove();
                  }}
                  >Permanently Remove
                  </button></>}
                  
                  </>}


                  
              </div>
              }
        </div>
    </div>
    

  </div>
    
            
</>            
    );
}
