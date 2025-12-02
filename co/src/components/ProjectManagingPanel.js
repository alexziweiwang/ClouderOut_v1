import React from 'react';
import { useState, useEffect } from 'react';
import { GiTrashCan } from "react-icons/gi";
import ProjectManageNew from './ProjectManageNew';
import langDictionary from './_textDictionary';

//TODO700 feature: latest edited project ... (create or save)
import { makeDeletionLists_vm, makeReversionLists_vm } from '../viewmodels/PrepAc_ProjectOperation';
import { placeholderNameDefault } from './_dataStructure_DefaultObjects';
import { downloadProjectEntireFromCloudVM } from '../viewmodels/PrepAc_ProjectFileInOut';
import { fromList1ToList2 } from '../viewmodels/PrepAc_Conversion';


export default function ProjectManagingPanel(
  {
    goToGameMaker,
    getUsername,
    backendOption,

    revertProjectOuter, 
    markTrashProjectOuter,
    removeProjectPermanentlyOuter,
    parseFromFile_vm,


    getBothLists,

    getProjectListMap,

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



    const [usingProjList, setUsingProjList] = useState(-1);                     //important !!!!!!
    const [trashedProjList, setTrashedProjList] = useState(-1);       //important !!!!!!



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

      if (authEmailName !== "_") {
          
        if (
          usingProjList === -1 || trashedProjList === -1
        ) { // condition of init-status of var...
    
          fetchProjectListMapFromOuter(); 
    
        }
      }


      let unameTemp = getUsername();
      if (unameTemp !== "_") {
          setAuthEmailName(unameTemp);
      }

                                  console.log("pmp - proj-lists = \nulist=", usingProjList, "\n\tt-list=", trashedProjList);

    });

    function fetchProjectListMapFromOuter() {
      let entire = getProjectListMap();
      if (entire === -1) {
                  console.log("from panel1 - proj-list-map not ready");
        return false;
      }
 
      handleProjListMappingSetup(entire);

                  console.log("\t\t fetched : ", entire);

      return true;

    }


    function handleProjListMappingSetup(obj) {
                            console.log("proj-list-map changed!!!");

        let usingList = [];
        let trashedList = [];

        Object.keys(obj).map((currKey)=>{
          let val = obj[currKey];
          if (val === false) { // not trashed
            usingList.push(currKey);
          } else {
            trashedList.push(currKey);
          }
        });
                          console.log("using-list = ", usingList, "\n\ttrashed-list = ", trashedList);

        setUsingProjList(usingList);
        setTrashedProjList(trashedList);

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

    async function handleMarkTrashProject() {
      let response = window.confirm("Are you sure to delete this project? (it can be reverted from the area below)?");
        if (response === true) {
          await markTrashProject();
        }  
    }

    async function markTrashProject() {
       
      setSelectedProjectName("");

      fromList1ToList2({
        list1: usingProjList, 
        list2: trashedProjList, 
        item: selected_project_name, 
        saveList1Func: setUsingProjList, 
        saveList2Func: setTrashedProjList
      });

      await markTrashProjectOuter(selected_project_name); 
    }


    async function revertTrashedProject() {
      setSelectedTrashedProj("");

      fromList1ToList2({
        list1: trashedProjList, 
        list2: usingProjList, 
        item: selectedTrashedProj, 
        saveList1Func: setTrashedProjList, 
        saveList2Func: setUsingProjList
      });

      await revertProjectOuter(selectedTrashedProj);

    }


    function notUsing() {
      return "";
    }

    function triggerCreationSubmit(newProjectKeyName) {
      let usingListTemp = usingProjList;
      usingListTemp.push(newProjectKeyName);
      setUsingProjList(usingListTemp);

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

    async function finalStepPermanentlyRemove() {
      let askStrConf = "Project file downloaded. Continue to remove [" + selectedTrashedProj + "] from cloud?";
            
      let ansConf = window.confirm(askStrConf);
      if (ansConf) {
        await removeProjectPermanentlyOuter(selectedTrashedProj);
        setSelectedTrashedProj("");

        //remove from t-list!
        let tList = trashedProjList.filter(e => e !== selectedTrashedProj);
        setTrashedProjList(tList);
        
      }
    }



    async function handlePermanentlyRemove() {

      let askStr = "Are you sure to permanently remove this project [" + selectedTrashedProj + "]?";
      let ans = window.confirm(askStr);
      if (ans) {
    //TODO123

        //provide a download file of this project
        await downloadProjectEntireFromCloudVM(selectedTrashedProj, authEmailName, backendOption, finalStepPermanentlyRemove);


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
                projList={usingProjList}
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

          {(usingProjList !== undefined && usingProjList.length > 0) &&
          <div className="projectGrid" style={{"height": "210px", "overflow": "scroll"}}>
                Projects on Cloud
                <br></br>

            {usingProjList.map((item, index) => {
              return (
                <div className= {(selected_project_name === item) ? "projectGridItemSelected" : "projectGridItem"}
                    key={usingProjList[index]} 
                    value={item} 
                    onClick={()=>{handleProjectGridClicked(item);}}>
                          <label style={{"fontWeight": "normal"}}>{item}</label>
                          <br></br>
                          <br></br>
                          <br></br>

                          {(selected_project_name === item) && 
                          <div style={{"display": "flex", "justifyContent": "start", "alignContent": "end"}}>
                            <button className="elemPosLeftBottom" onClick={()=>{handleMarkTrashProject();}}>
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
