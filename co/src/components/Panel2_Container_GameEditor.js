import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


import langDictionary from './_textDictionary';
import uiLangMap from './uiLangMap';


//level(-1)

import GameMaker from './GameMaker';
import ConversationNodeEditingPanel from './ConversationNodeEditingPanel';
import CardGameNodeEditingPanel from './CardGameNodeEditingPanel';

import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import Modal_EmuManager from './Modal_EmuManager';


import { checkProjectMetaData_vm } from '../viewmodels/PrepAc_ProjectFileInOut';

  import { 
    getProjectGameDataDesignVM, 
  } from '../viewmodels/GameDataViewModel';
  import { 
    updateProjectUILangVM, 
    fetchProjectUILangVM, 
    updateProjectNavigationSettingsVM, 
    fetchProjectNavigationSettingsVM,
  } from '../viewmodels/ProjectManagerViewModel';
  import { 
    fetchChapterNodeMappingVM, 
    updateChapterNodesToCloudDataVM, 
    fetchAllChapterListVM, 
    updateChapterListToCloudVM, 
  
  
    addNewOneChapterFolderVM 
  } from '../viewmodels/ChapterInfoViewModel';
  
  import { addNewNodeFoldersVM } from '../viewmodels/NodeEditingViewModel';
  
  import { fetchEmuData1GdtVM, updateAllSetsVM } from '../viewmodels/EmuManagingViewModel';
  
  import { prepare1Gdt_vm, prepare2Epp_vm, prepare3Epa_vm } from '../viewmodels/PrepAc_EmuData';
  import { prepareForNewChapterMapping_vm, triggerCreatedNewNode_vm } from '../viewmodels/PrepAc_Creations';
  import { updateChapterNodeMappingsToCloud_vm } from '../viewmodels/UpdtAc_UpdateData';
  
  import { downloadProjectAllInOne_vm } from '../viewmodels/PrepAc_ProjectFileInOut';
  
  import { 
    fetchNodeDataEachChapterVM, 
  } from '../viewmodels/NodeDataInPlayViewModel';
  //TODO112: fetch node-contents here, and send into Viewer_Entire and its sub-component [GameScreen_AllNodeTypeContainer]
  
  import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM, removeFromRmFileListVM } from '../viewmodels/ResourceManagerViewModel';
  import { fetchProjectResourceVarPairsVM, storeProjectResourceVarPairsToCloudVM } from '../viewmodels/ResourceManagerViewModel';











export default function Panel2_Container_GameEditor() {


//TODO put modals here
//TODO put editor-switching here

//TODO screen-size-string improve formatting

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
    let projectContentProvided = "default-node-state provided-project-content";
    
    let backendOption = "firease";
    if (state.mode !== "online_cloud") {
                    //TODO
    } 


    /* display option for this large container: which editor is displayed for user */
    const [focusingEditor, setFocusingEditor] = useState("gameMaker");
    const [currentChapter, setCurrentChapter] = useState("");
    const [currentNode, setCurrentNode] = useState("");
    const [currentScreenSz, setCurrentScreenSz] = useState("4:3(horizonal)");

    /* 
    entire project-object, important
    meta-data (managed by game-maker)
    node-content (managed by node-editor based on each node's: by chapter-key and node-key) */
    const [projectMetaData, setProjectMetaData] = useState(-1); //TODO99
    const [projectAllNodeContent, setProjectAllNodeContent] = useState(-1); //TODO99


    /* display flags for modals: resource-manager, game-data-manager, emu-data-manager */
    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);
    const [isDisplayEmBool, setDisplayEmBool] = useState(false); 
    //TODO99999 modal panels in panel2, display or not



    // --- metadata's keys ---
    // metadataObj["game_data"]
    // metadataObj["resource_visual"]
    // metadataObj["resource_audio"]
    // metadataObj["project_ui_language"]
    // metadataObj["navigation_settings"]
    // metadataObj["chapter_list"]
    // metadataObj["chapter_node_mapping"]




    /* testing-emu-data, for test-viewing and emu-manager */
    const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({});   //TODO important for holder-in-practice
    const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
        "playername": "playerA",
        "itemStatus": [{}, {}, {}]
    });












    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
      projectContentProvided = state.providedImptProj;                                                         //   projectContentProvided = state.
                              console.log("container... \n mode = ", state.mode, "\n state = ", state);

    }

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];
  
    const resourceManagerButtonText = textDictItem.resourceManagerButtonText !== undefined ?
            textDictItem.resourceManagerButtonText
            : textDictItemDefault.resourceManagerButtonText;
  
    const gameDataManagerButtonText = textDictItem.gameDataManagerButtonText !== undefined ?
            textDictItem.gameDataManagerButtonText
            : textDictItemDefault.gameDataManagerButtonText;

    const emuManagerText = textDictItem.emuManagerText !== undefined ?
            textDictItem.emuManagerText
            : textDictItemDefault.emuManagerText;    

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }


    


    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        window.onbeforeunload = () => {
            
            return "show message";
        }

        console.log("panel2 (render once) - mode = ", state.mode);



        if (state === null && state.mode === "online_cloud") {
                                    console.log("!!! not logged in - going to -login_page......");
            goToNotLoggedInPage();
        }

        if (state === undefined) {
            goToNotLoggedInPage();
        }

                                                // if (authEmailName !== "_" && firstTimeEnter === true) {


                                                                        //TODO
                                                                        // if : condition of init-status of var...
                                                                        // setFirstTimeEnter(false);

                                            
                                                // }

        if (state.mode !== "online_cloud" && firstTimeEnter === true) {
            if (projectMetaData === -1 || projectAllNodeContent === -1) {
                loadEverythingFromLocalProjFile();
                setFirstTimeEnter(false);
            }
        } else if (state.mode === "online_cloud" && firstTimeEnter === true) {
            //TODO fetch from cloud...
            
            //load meta-data from cloud
                //TODO99999
            //prepare for project-content map, and fetch when user reached that chapter?
                //TODO99999



        }



        if (authEmailName === "_" && state.mode === "online_cloud") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
            );
        }

        console.log("\n\n\n\n\n\npanel2 state = ", state);

    });

    function switchEditor(infoObj) {
        //TODO99999
        if (infoObj === undefined) {
            return;
        }

        //TODO compare project name
            // infoObj["projectName"] 

        //TODO compare username
            // infoObj["username"]

        //TODO check editorMode - mode name
            // infoObj["editorMode"]


        //TODO details for this node
            // infoObj["screenSizeStr"] 
            // infoObj["uiLang"] 
            // infoObj["chapterKey"]
            // infoObj["clickedNodeKey"]   
  
        setCurrentChapter(infoObj["chapterKey"]);
        setCurrentNode(infoObj["clickedNodeKey"]);
        setCurrentScreenSz(infoObj["screenSizeStr"]);

        //

        switch (infoObj["nodeType"]){
        
                case "Conversation":
                    setFocusingEditor("Conversation");
                    break;
                case "CardGame":
                    setFocusingEditor("CardGame");

                    break;
              
                default:
                    console.log();
        }


    }

    async function fetchUILangFromCLoud() {

        let ans = await fetchProjectUILangVM({
          projectName: state.projectName, 
          currUser: authEmailName,
          bkOption: backendOption //TODO999
        });
    
        setLanguageCodeTextOption(ans);
        return ans;
    }

    function loadEverythingFromLocalProjFile() {
                                                console.log("\t\t!!! func: load-EverythingFrom_LocalProjFile = ", state.projectFile);

        let projectFile = state.projectFile;
        let metaDataTemp = projectFile["meta_data"];
        let chapterContentTemp = projectFile["chapter_content"];
    
    
        if (metaDataTemp === undefined || chapterContentTemp === undefined) {
          return;
        }
    
        setProjectMetaData(metaDataTemp);
        setProjectAllNodeContent(chapterContentTemp);
        
    }

    function loadEverythingFromCloud() {
        let metaDataTemp = {}
        let chapterContentTemp = {};

        //TODO99999

            // --- metadata's keys ---
            // metadataObj["game_data"]
                //game-data-design-list

            // metadataObj["resource_visual"]
            // metadataObj["resource_audio"]

            // metadataObj["project_ui_language"]

            // metadataObj["navigation_settings"]
                //nav-settings-obj


            // metadataObj["chapter_list"]
                //chapter-list

            // metadataObj["chapter_node_mapping"]
                //node-mapping



        setProjectMetaData(metaDataTemp);
        setProjectAllNodeContent(chapterContentTemp);
        
    }

    async function fetchProjResourceVarPairLists(usernameTemp) {
        /* fetch from cloud db */
        //TODO99999   

        let obj = {};

        if (editorMode === "online_cloud") { //online-mode: source from cloud
            
                if (visualVarPairs === undefined || audioVarPairs === undefined) {

                    obj = await fetchProjectResourceVarPairsVM({
                        userName: usernameTemp, 
                        projectName: projName,
                        bkOption: backendOption
                    });                
                } else {
                    return;
                }


   
        } else { //offline-modes: source from outer layer
                obj = getLocalProjectDataRsrcMgr();
  
        }
   
        if (obj === undefined || obj === null) {
            return;
        }  
        
        
        if  (Object.keys(obj).length === 0) {
            setVisualVarPairs([]);
            setAudioVarPairs([]);

        } else{
                if (obj.visual !== undefined) {
                    setVisualVarPairs(obj.visual);
                } else {
                    setVisualVarPairs([]);
                }

                if (obj.audio !== undefined) {
                    setAudioVarPairs(obj.audio);
                } else {
                    setAudioVarPairs([]);
                }
        }


  
    }
    

    function goToGameMakerResetNodeFocus() {
        setFocusingEditor("gameMaker");
        setCurrentChapter("");
        setCurrentNode("");
  
    }

    function passInProjectMetaData() {
        return projectMetaData;
    }

    function passInProjecAllNodeContent() {
        return projectAllNodeContent;
    }

    function passInAuthEmailName() {
        return authEmailName;
    }

    function handleBannerGoBack() {
        // according to current focusing panel, go to different panels
        if (focusingEditor === "gameMaker") {
            if (state.mode === "online_cloud") {
                navigate('/mainpanel', { replace: true });

            } else {
                navigate('/projectNonCloud', { replace: true });

            }
        } else {
            // when inside node-editors
            goToGameMakerResetNodeFocus();

        }

    }

    function fetchUpdatedMetaDataFromSubCompo(obj) { // from game-maker
        if (obj !== undefined) {
            let checkRes = checkProjectMetaData_vm(obj);
            if (checkRes === true) {
                setProjectMetaData(obj);

            }
        }
    }

    function fetchUpdatedNodeContentFromSubCompo(addingNodeKey, oneNodeContent) {
        //TODO add this one-node into current content-obj, then check if valid to add

    }

    async function getUserConfigFromDataMgr1Gdt(gameDataDesignList) {
        let emuGdt1Temp = testPlayerGameDataTracker; //TODO999
      
        Object.keys(gameDataDesignList).map((currKey) => {
            if (currKey === "placeholder123456789___###___###___##") {
              return;
            }
    
            if (emuGdt1Temp[currKey] !== undefined) {
    
                if (emuGdt1Temp[currKey]["current_value"] === undefined) {
                    emuGdt1Temp[currKey]["current_value"] = 
                    gameDataDesignList[currKey]["default_value"] !== undefined ? 
                    gameDataDesignList[currKey]["default_value"] 
                        : 0;
                }
               
            } else { //emuGdt1Temp[currKey] is undefined
                emuGdt1Temp[currKey] = gameDataDesignList[currKey];
                emuGdt1Temp[currKey]["current_value"] = gameDataDesignList[currKey]["default_value"];
                
            }
    
    
        });
    
        setTestPlayerGameDataTracker(emuGdt1Temp);
    
        let resObj = {};
        resObj["gdt1"] = emuGdt1Temp;
        resObj["epp2"] = testPlayerProfile;
        resObj["epa3"] = testPlayerAccount;
        resObj["ess4"] = {"placeholder": "placerholder"};
        resObj["shp5"] = {"placeholder": "placerholder"};
    
        await updateAllSetsVM({
            projectName: projectName, 
            currUser: authEmailName, 
            dataObj: resObj,
            bkOption: backendOption //TODO999
        });
    
    }

    async function userChangeEditorUILang(val) {
    
        if (val.length === 0 || uiLangMap[val] === undefined) {
          return;
        }
    
        //TODO add to dictionary later
        let askStr = "Are you sure to change the editor language to: " + uiLangMap[val] + " ?";
    
    
        let resp = window.confirm(askStr);
        
        if (resp) {
          setLanguageCodeTextOption(val);
    
          await updateProjectUILangVM({
            projectName: projectName, 
            currUser: authEmailName, 
            selectedUILang: val,
            bkOption: backendOption //TODO999
          });
        }
    }
    

    function passInLocalProjectData_RsrcMgr() {

        //TODO return var-pairs
        //formatting of "fetchProjectResourceVarPairsVM"
    }

    function passInUiLanguageOption() {
        return languageCodeTextOption;
    }

    function notifyRmUpdated() {
        alert("TODO resource-manager should update");
    }
    

    // const [projectMetaData, setProjectMetaData] = useState(-1); //TODO99
    // const [projectAllNodeContent, setProjectAllNodeContent] = useState(-1); //TODO99

    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
    }

    function handleGameDataManagerCancel() {
        setDisplayGdmBool(false);
    }


    function updateGameDataDesignList(data) {
        //TODO999 update game-data-design-list
        setGameDataDesignList(data);
    }


return (<div style={{"backgroundColor": "#b5b2b0"}}>


{/* top banner area */}
<div className={state.mode === "online_cloud" ? "" : "colorInvert"}>
<div className="returning_buttons_cloud_mode">
      
      {<button 
          className="button2" 
          onClick={()=>{
              //chapterChangingOrExiting(); goToDashboard();
              handleBannerGoBack();
            }}>
             ←
        </button>}


      {state.mode === "online_cloud" && <div style={{"textAlign": "start"}}>
              <label>{projectName}</label>
              <br></br>
              <label>{authEmailName}</label>
              <br></br>
              <label>Cloud Mode</label>
      </div>}



      <div
        style={{"minWidth": "150px"}}
      >

      </div>


                <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
               

                    {authEmailName !== "" && 
                    <>
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                      setDisplayRmModal(true);
                        }}> 
                    {resourceManagerButtonText} </button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                       setDisplayGdmBool(true);
                        
                        }}>
                    {gameDataManagerButtonText}</button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                //       setDisplayEmBool(true);
                        }}>
                        {emuManagerText}
                    </button>
                    </>}
                

                        <div>
                            <label>Editor Language</label><br></br>
                            <select value={languageCodeTextOption}
                            onChange={(event)=>{
                             userChangeEditorUILang(event.target.value);
                        //TODO99999
                            }}
                            >
                            <option key="lang-Eng" value="en">English</option>
                            <option key="lang-chn" value="chn">简体中文</option> 
                            {/* //TODO16 */}
                            </select>
                        </div>

                </div>

    </div>
</div>
   
   
   
   
{/* editor area */}
    {(
    (authEmailName !== "_" && state.mode === "online_cloud") 
    || (state.mode !== "online_cloud")
    )
    && 
    <>
   

{/* Game-Maker for metadata */}
    {focusingEditor === "gameMaker"
    && <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        getProjectMetaData={passInProjectMetaData}
        switchEditor={switchEditor}
        getAuthEmailName={passInAuthEmailName}
        updateToOuter={fetchUpdatedMetaDataFromSubCompo}
        backendOption={backendOption}

        getUiLanguageOption={passInUiLanguageOption}
    />}



{/* Node Editors */}
<>
    {focusingEditor === "Conversation"
    &&
        <ConversationNodeEditingPanel

            clickedNodeKey={currentNode}
            projectName={state.selected_project_name}
            userName={authEmailName}
            screenSizeStr={currentScreenSz}
            chapterKey={currentChapter}
            editorMode={state.mode}
            
            editorUiLang={languageCodeTextOption} //TODO change
            getUiLanguageOption={passInUiLanguageOption} //TODO to add

        />


    }

    {/* //TODO card-node-editers, etc. */}

</>






    </>}







{/* modal floating window - manager area */}
<div>


          
          {isDisplayRmBool === true && <div>

              <Modal_ResourceManagingWindow 

                handleRmCancel={handleResourceManagerCancel} 
                editorMode={state.mode}

                triggerRmUpdate={notifyRmUpdated}  //?


                projName={state.selected_project_name}   
                username={authEmailName}

                backendOption={backendOption}

                getLocalProjectDataRsrcMgr={passInLocalProjectData_RsrcMgr}


                languageCodeTextOption={languageCodeTextOption} //TODO change
                getUiLanguageOption={passInUiLanguageOption} //TODO to add

              />
          
          </div>}


     
          {isDisplayGdmBool === true && <div>
       
              <Modal_GameDataManager 
                handleGdmCancel={handleGameDataManagerCancel} 

                backendOption={backendOption}

                projName={state.selected_project_name}   
                username={authEmailName}

                editorMode={state.mode}


                resetNeedCloudData={markNextNeedCloudGameData}  //?




                updateForEmuGdt1={getUserConfigFromDataMgr1Gdt}

                updateGameDataDesignListToOuterLayer={updateGameDataDesignList}

                getLocalProjectData_GameDataDesign={passInLocalProjectData_GameDataDesign}

                languageCodeTextOption={languageCodeTextOption} //TODO change
                getUiLanguageOption={passInUiLanguageOption} //TODO to add
              />

          </div>}



          {isDisplayEmBool === true && <div>

            {/* <Modal_EmuManager
              handleEmCancel={handleEmuManagerCancel}

              update1Gdt={getUserConfigFromEmuManager1Gdt}
              update2Epp={getUserConfigFromEmuManager2Epp}
              update3Epa={getUserConfigFromEmuManager3Epa}
              update4Ess={getUserConfigFromEmuManager4Ess}
              update5Shp={getUserConfigFromEmuManager5Shp}

              isForGameMaker={true}

              projName={projectName}  
              getUsername={passInAuthEmailName}

              getBackendOption={passInBackendOption}
              editorMode={editorMode}

              getLocalProjectDataEmu={passInLocalProjectData_Emu}

              getUILanguage={passInUiLanguageOption} //TODO keep this

            /> */}
          </div>}






</div>


</div>);










}



// "offline_half"
// "offline_full"
// "online_cloud"