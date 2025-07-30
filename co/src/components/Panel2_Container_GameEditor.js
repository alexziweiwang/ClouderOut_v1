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

import Viewer_Entire from './Viewer_Entire';


import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import Modal_EmuManager from './Modal_EmuManager';

import { downloadObjectAsFile } from '../viewmodels/PrepAc_ProjectFileInOut';

import { checkProjectMetaData_vm } from '../viewmodels/PrepAc_ProjectFileInOut';

  import { 
    getProjectGameDataDesignVM, 
  } from '../viewmodels/GameDataViewModel';

  import { 

   
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
  
  

  import { 
    fetchAllNodes2VM
  } from '../viewmodels/NodeDataInPlayViewModel';
  //TODO112: fetch node-contents here, and send into Viewer_Entire and its sub-component [GameScreen_AllNodeTypeContainer]
  

//keep this
import { storeProjectResourceVarPairsToCloudVM } from '../viewmodels/ResourceManagerViewModel';


  import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM, removeFromRmFileListVM } from '../viewmodels/ResourceManagerViewModel';




  //TODO ------------------------- new vm and model funcs for optimizations
import { fetchProjectAllMetadataVM, updateProjectMetadataSingleFieldVM } from '../viewmodels/ProjectMetadataViewModel'; //TODO60







export default function Panel2_Container_GameEditor() {


//TODO put modals here
//TODO put editor-switching here

//TODO screen-size-string improve formatting

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
    let projectContentProvided = "default-node-state provided-project-content";
    
    let backendOption = "firebase";


    const [isPrepFinished, setPrepFinished] = useState(false);


    /* display option for this large container: which editor is displayed for user */
    const [focusingEditor, setFocusingEditor] = useState("gameMaker");
    const [currentChapter, setCurrentChapter] = useState("");
    const [currentNode, setCurrentNode] = useState("");
    const [currentScreenSz, setCurrentScreenSz] = useState("4:3(horizonal)");

    /* 
    entire project-object, ! important
    meta-data (managed by game-maker)
    node-content (managed by node-editor based on each node's: by chapter-key and node-key) */
    const [projectMetaData, setProjectMetaData] = useState(-1); //TODO99
    const [projectAllNodeContent, setProjectAllNodeContent] = useState(-1); //TODO99


    /* display flags for modals: resource-manager, game-data-manager, emu-data-manager */
    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);
    const [isDisplayEmBool, setDisplayEmBool] = useState(false); 

    const [isDisplayEntireGameViewer, setDisplayEntireGameViewer] = useState(false);


                                        //TODO metadata99
    // --- metadata's keys ---
    // metadataObj["game_data"]
    const [gameDataDesignList, setGameDataDesignList] = useState(undefined);

    // metadataObj["ui_language"]
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');
    // metadataObj["nav_ui_settings"]
    const [currentProjectNav, setCurrentProjectNav] = useState({});

    // metadataObj["chapterList"]
    const [chapterList, setChapterList] = useState([]);
    const [chapterListRaw, setChapterListRaw] = useState([]);


    // metadataObj["chapterNodeMapping"]
    const [chapterNodeMapAll, setChapterNodeMapAll] = useState(-1);


    //emu-data-sets
    //TODO99999
    //init here, prepare for emu-manager, and test-viewing

 


    /* testing-emu-data, for test-viewing and emu-manager */
    const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({});   //TODO important for holder-in-practice
    const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
        "playername": "playerA",
        "itemStatus": [{}, {}, {}]
    });
    
    const [testShopProducts, setTestShopProducts] = useState({});
    const [testPlayerPurchaseStatus, setTestPlayerPurchaseStatus] = useState({});
  











    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
      projectContentProvided = state.providedImptProj;                                                         //   projectContentProvided = state.
                       //       console.log("init-container-panel2... \n mode = ", state.mode, "\n state = ", state);

    }

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
        if (state === undefined || state === null) {
            navigate('/mainpanel', { replace: true });
    
        } 

        window.onbeforeunload = () => {
            
            return "show message";
        }

                                                        console.log("panel2 (render once) - mode = ", state.mode, 
                                                            "... isPrepFinished = ", isPrepFinished, 
                                                            "\n focusing on: ", focusingEditor, 
                                                            "\n username = ", authEmailName,
                                                            "\n\t metadata = ", projectMetaData,
                                                            "\n\t all-node-content = ", projectAllNodeContent);



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

        if (state.mode !== "online_cloud") {
            if (projectMetaData === -1 || projectAllNodeContent === -1) {
                loadEverythingFromLocalProjFile();
            }
        } else if (state.mode === "online_cloud") {
            //TODO fetch from cloud...
          
            //prepare for project-content map, and fetch when user reached that chapter?
                //TODO99999
            if (authEmailName !== "_") {
          
                if ((projectMetaData === -1 || projectAllNodeContent === -1)) {
                    loadEverythingFromCloud();
                }
   
            }



        }



        if (authEmailName === "_" && state.mode === "online_cloud") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
            );
        } else if (state.mode !== "online_cloud") {
            setAuthEmailName("localUser###");
        }

    //    console.log("\n\n\n\n\n\npanel2 state = ", state);

    });

    function switchEditor(visitInfoObj) {
        let keyStr = generateNodeLongKeyString_vm({
            chapterKey: visitInfoObj["chapterKey"], 
            nodeKey: visitInfoObj["nodeKey"]
        });
        //TODO30
        
        

        if (projectAllNodeContent === undefined || projectAllNodeContent[keyStr] === undefined
                || projectAllNodeContent[keyStr] === null  
                || projectAllNodeContent[keyStr].nodeContent === undefined
                || projectAllNodeContent[keyStr].nodeUISettings === undefined            
       
    
            //TODO20
            ) {
      

            console.log("projectAllNodeContent not ready: undefined");
            return;
        }

        // object format: 
        // {      
        //     "nodeType": "",
        //     "nodeKey": clickedNodeKey, 
        //     "projectName": projectName, 
        //     "username": userName, 
        //     "screenSizeStr": screenSizeStr, 
        //     "uiLang": uiLang, 
        //     "chapterKey": chapterKey,
        //     "editorMode": editorMode,
        //     "nodeType": currNodeType
        // }
        //TODO99999
        if (visitInfoObj === undefined) {
            return;
        }

        //TODO compare project name
            // visitInfoObj["projectName"] 

        //TODO compare username
            // visitInfoObj["username"]

        //TODO check editorMode - mode name
            // visitInfoObj["editorMode"]


        //TODO details for this node
            // visitInfoObj["screenSizeStr"] 
            // visitInfoObj["uiLang"] 
            // visitInfoObj["chapterKey"]
            // visitInfoObj["clickedNodeKey"]  
            
        //TODO check if this node exists in the ds !!!


  
        setCurrentChapter(visitInfoObj["chapterKey"]);
        setCurrentNode(visitInfoObj["clickedNodeKey"]);
        setCurrentScreenSz(visitInfoObj["screenSizeStr"]);

        console.log("node-data-obj = ", projectAllNodeContent);
        

        switch (visitInfoObj["nodeType"]){
        
                case "Conversation":
                    setFocusingEditor("Conversation");
                    break;
                case "Card Game":
                    setFocusingEditor("CardGame");
                    break;
              
                default:
                    console.log("default in switch-editor");
        }

    }

    function loadEverythingFromLocalProjFile() {
                                                console.log("\t\t!!! func: load-EverythingFrom_LocalProjFile = ", state.projectFile);

        let projectFile = state.projectFile;
        let metadataTemp = projectFile["meta_data"];
        let chapterContentTemp = projectFile["chapter_content"];
    
    
        if (metadataTemp === undefined || chapterContentTemp === undefined) {
          return;
        }
    
        let res = checkProjectMetaData_vm(metadataTemp);
        if (res === true) {
            setProjectMetaData(metadataTemp);
            //TODO99999 setup visual-var-pair and audio-var-pair maps

            setProjectAllNodeContent(chapterContentTemp);
        } else {
            alert("Data for this project file is broken.");

        }

        
    }

    async function loadEverythingFromCloud() {
                        console.log("load everything from cloud (At panel2): ", authEmailName, "...", state.selected_project_name);

        if (authEmailName === "_" || state.selected_project_name === undefined) {
                    
            return;
        }

        await loadMetadataFromCloud()
        .then(async()=>{
            await loadProjectAllNodeContentFromCloud();
        })
        .then(()=>{
                        console.log("metadata-prep finished!");
            setPrepFinished(true);
        });
        
       

 
    }

    async function loadMetadataFromCloud() {
        await fetchProjectAllMetadataVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName,
            bkOption: backendOption
        }).then((metadataTemp)=>{

                                        console.log("panel2-everything from cloud: metadata = ", metadataTemp); 
        
            if (metadataTemp !== undefined) {
                let res = checkProjectMetaData_vm(metadataTemp);
                if (res === true) {

                    setProjectMetaData(metadataTemp);

                    //TODO99999 setup local hook vars

                    // --- metadata's keys ---
                    // metadataObj["game_data"]
                    setGameDataDesignList(metadataTemp["game_data"]);

                    // metadataObj["proj_resource_visual"]
                    // metadataObj["proj_resource_audio"]

                    // metadataObj["ui_language"]
                    setLanguageCodeTextOption(metadataTemp["ui_language"]);

                    // metadataObj["nav_ui_settings"]
                    setCurrentProjectNav(metadataTemp["nav_ui_settings"]);

                    // metadataObj["chapterList"]
                    setChapterListRaw(metadataTemp["chapterList"]);    
                            //TODO setChapterList() based on this    

                    // metadataObj["chapterNodeMapping"]
                    setChapterNodeMapAll(metadataTemp["chapterNodeMapping"]);

                    //!important
                    setProjectMetaData(metadataTemp);

                } else {
                    alert("Data for this project file is broken.");
                }
            }



        })


   

        //TODO99999

                        //example obj(for metadata): 
                                // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"
                                // sizeDirection:  "h450_800"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"

    }

    async function loadProjectAllNodeContentFromCloud() {
        await fetchAllNodes2VM({
            projectName: state.selected_project_name, 
            uname: authEmailName
        }).then((chapterContentTemp)=>{

                        console.log("panel2-everything from cloud: all-node-contents = ", chapterContentTemp); 

            
            setProjectAllNodeContent(chapterContentTemp);

        }); 
        //TODO99999 fetch from cloud --- path: user-projects-<project key>-folder
     
    }

    function updateLargeMetadataObjForChanges() {
        // based on local hooks, update the "projectMetadata" large-object here for the version-control...?
        
            //local hooks:
        //gameDataDesignList
        //languageCodeTextOption
        //currentProjectNav
        //chapterList
        //chapterNodeMapAll
        //visualVarPairs
        //audioVarPairs


         // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"
                                // sizeDirection:  "h450_800"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"

    }

    async function updateSingleFieldToCloud(fieldName, contentValue) { //TODO100
        await updateProjectMetadataSingleFieldVM({
            projectName: state.selected_project_name,
            currUser: authEmailName, 
            fieldName: fieldName, 
            contentValue: contentValue, 
            bkOption: backendOption
        });
    }

    async function updateVarPairToCloud_p2Layer(varPairToCloud) {
        if (state.mode === "online_cloud") {

            await storeProjectResourceVarPairsToCloudVM({
                userName: authEmailName, 
                projectName: state.selected_project_name, 
                obj: varPairToCloud,
                bkOption: backendOption //TODO999
            });
        }
    }
    

    function goToGameMakerResetNodeFocus() {
        setFocusingEditor("gameMaker");
        setCurrentChapter("");
        setCurrentNode("");
  
    }



    async function startViewerEntireTest() {
            
        let modeName = state.mode;
    
        //TODO when all emu-set-data ready - display the entire-view window
            
            // await prepare1Gdt_vm(
            //   authEmailName, 
            //   state.selected_project_name, 
            //   backendOption, 
            //   setTestPlayerGameDataTracker, 
            //   getUserConfigFromEmuManager1Gdt, 
            //   modeName
            // ).then(async()=>{
            //   await prepare2Epp_vm(
            //     authEmailName, 
            //     state.selected_project_name, 
            //     backendOption, 
            //     setTestPlayerProfile,
            //     getUserConfigFromEmuManager2Epp,
            //     modeName
            //   )
            // }).then(async()=>{
            //   await prepare3Epa_vm(
            //     authEmailName, 
            //     state.selected_project_name, 
            //     backendOption,  
            //     setTestPlayerAccount, 
            //     getUserConfigFromEmuManager3Epa, 
            //     modeName
            //   )
            // })
            // .then(()=>{
            //     console.log("\n\n\n\n\n\n\n\n\n\n\n\nopening viewer_entire window...");
                
            //     setDisplayEntireGameViewer(true);
            //   }
            // ); 
    
        
    
    
    }
      function getUserConfigFromEmuManager1Gdt(data1) {
    //update data1 to be the new Game-Data-Tracker
    //TODO  //recreate emu data object
    setTestPlayerGameDataTracker(data1);
  }

  function getUserConfigFromEmuManager2Epp(data2) {
    //update data2 to be the new Emu-Player-Profile
    //TODO  //recreate emu data object

    setTestPlayerProfile(data2);
  }

  function getUserConfigFromEmuManager3Epa(data3) {
    //update data3 to be the new Emu Player Account
    //TODO  //recreate emu data object

    setTestPlayerAccount(data3);
  }

  function getUserConfigFromEmuManager4Ess(data4) {
    //TODO update data4 to be the new Emu SL slots
    //TODO  //recreate emu data object
    
    //TODO temp: not using
  }

  function getUserConfigFromEmuManager5Shp(data5) {
    //TODO update data5 to be emu-shop-product-list data
    //TODO  //recreate emu data object

    let obj5 = data5;
                              //console.log("game-maker recevied 5 shp = " , data5);
    if (obj5 === undefined) {
      return;
    }

    let shopStock = obj5["shopStock"];
    let playerPurchase = obj5["playerPurchaseStatus"];

    if (shopStock === undefined || playerPurchase === undefined) {
      return;
    }
                              // console.log("game-maker recevied 5 shp - stock = " , shopStock);
                              // console.log("game-maker recevied 5 shp - player-purchase = " , playerPurchase);

    setTestShopProducts(shopStock);
    setTestPlayerPurchaseStatus(playerPurchase);
    
  }  



    function passInProjectMetaData(source) {
        if ((state.mode === "online_cloud" && authEmailName !== "_") || authEmailName === "localUser###") {
       
                                console.log("passing in panel2 - metadata = (requested by ", source ,")", projectMetaData);
            return projectMetaData;
        }

    }

    function passInProjecAllNodeContent() {
        return projectAllNodeContent;
    }

    function passInProjecCurrNodeObject(nodeKeyTemp) {
        console.log("...passIn:ProjecCurrNodeObject", nodeKeyTemp, "...", projectAllNodeContent, "\n", projectAllNodeContent[nodeKeyTemp]);

        if (nodeKeyTemp === undefined || projectAllNodeContent === undefined || projectAllNodeContent[nodeKeyTemp] === undefined) {
            goToGameMakerResetNodeFocus();
            alert("Unable to go to editor for node [", nodeKeyTemp, "] !");
            return;
        }

        let nodeObject = projectAllNodeContent[nodeKeyTemp];

        return nodeObject;
    }

    function receiveUpdateForCurrNodeObject(nodeKeyTemp, nodeObjectUpdated) {
        let allNodeTemp = projectAllNodeContent;
        allNodeTemp[nodeKeyTemp] = nodeObjectUpdated;
        setProjectAllNodeContent(allNodeTemp);
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

    function fetchUpdatedMetaDataFromSubCompo(obj) { // from game-maker //!important
        if (obj !== undefined) {
            let checkRes = checkProjectMetaData_vm(obj);
            if (checkRes === true) {
                setProjectMetaData(obj);

            }
        }
    }

    function fetchUpdatedNodeContentFromSubCompo(addingNodeKey, oneNodeContent) { //!important
        //TODO add this one-node into current content-obj, then check if valid to add

    }

    async function getUserConfigFromDataMgr1Gdt(gameDataDesignList) {
        //when game-data-design-list updates, the emu-data prepares with its default value

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
    
                                                    // await updateAllSetsVM({
                                                    //     projectName: state.selected_project_name, 
                                                    //     currUser: authEmailName, 
                                                    //     dataObj: resObj,
                                                    //     bkOption: backendOption
                                                    // });

        await updateProjectMetadataSingleFieldVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName, 
            fieldName: "emu4sets", 
            contentValue: resObj, 
            bkOption: backendOption 
        });

//TODO300
    
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
          setProjectMetaData({...projectMetaData,
                "ui_language": val
          });
  
                                                //   await updateProjectUILangVM({
                                                //     projectName: state.selected_project_name, 
                                                //     currUser: authEmailName, 
                                                //     selectedUILang: val,
                                                //     bkOption: backendOption //TODO999
                                                //   });
console.log("ui-langauge changed to: ", val);

          await updateProjectMetadataSingleFieldVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName, 
            fieldName: "ui_language", 
            contentValue: val, 
            bkOption: backendOption 
          })


        }
    }
    

    function passInLocalProjectData_RsrcMgr() {

        //TODO return var-pairs
        //formatting of "fetchProjectResourceVarPairsVM"
    }

    function passInUiLanguageOption() {
        return languageCodeTextOption;
    }

    function passInProjectResourceVarPairs() {
//TODO20
        let visualVarPairs = projectMetaData["proj_resource_visual"];
        let audioVarPairs = projectMetaData["proj_resource_audio]"]; 


        let obj = {
            "visual": visualVarPairs !== undefined ? visualVarPairs : {},
            "audio": audioVarPairs !== undefined ? audioVarPairs : {}
        }

                                console.log("panel2-passInProjectResourceVarPairs = ", obj);

        return obj;
        
    }

    function passInGameDataDesignList() {
        if (projectMetaData === undefined || projectMetaData["game_data"] === undefined) {
            return -1;

        } else {
            return projectMetaData["game_data"];

        }

    }

    function passInTestPlayerGameDataTracker() {
        return testPlayerGameDataTracker;
    }

    function passInTestPlayerProfile() {
        return testPlayerProfile;
    }

    function passInTestPlayerAccount() {
        return testPlayerAccount;
    }

    function passInTestPlayerSLRecords() {
        return testPlayerSLRecords;
    }

    function passInTestShopProducts() {
        return testShopProducts;
    }

    function passInTestPlayerPurchaseStatus() {
        return testPlayerPurchaseStatus;
    }

    function notifyRmUpdated() {
      //  alert("TODO resource-manager should update");
    }
    

    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
    }

    function handleGameDataManagerCancel() {
        setDisplayGdmBool(false);
    }


    // function updateGameDataDesignList(data) {
    //     //TODO999 update game-data-design-list
    //     setGameDataDesignList(data);
    // }

    function triggerCreatedNewNode_panel2(nodeKey, nodeChapter, nodeObject) {
        // add this node's content into the project-all-node-content ds





    }

    function passInCurrNodeEntire(chapterKeyTemp, nodeKeyTemp) {
        let keyStr =  generateNodeLongKeyString_vm({
            chapterKey: chapterKeyTemp, 
            nodeKey:nodeKeyTemp
        });
        //TODO30


        if (projectAllNodeContent === undefined || projectAllNodeContent[keyStr] === undefined
            || projectAllNodeContent[keyStr] === null  
            || projectAllNodeContent[keyStr].nodeContent === undefined
            || projectAllNodeContent[keyStr].nodeUISettings === undefined            
            ) {
            return -1;
        } else {
            return projectAllNodeContent[keyStr];
        }

    }

    function passInCurrChapAllNodes(chapterKeyName) {

    }

    function downloadAllInOne() {
        let largeObj = {
            "meta_data": projectMetaData,
            "chapter_content": projectAllNodeContent
        };
      let filename = "project#" + state.selected_project_name +  "#by#" + authEmailName + "_";

      downloadObjectAsFile(largeObj, filename);

    }


    function triggerChapterWalk(chapterKeyName, chapterTitleName) { //important for viewing //from sub-compo
        // as a container outside of viewer-entire, here it uses cloud functions and ds-container for all-chapters' data



        // --- update displayed info ---
        // setCurrTestingNodeKey("chapterStart"); //TODO add later
        // setCurrTestingNodeType("*chapterStart*"); //TODO add later
        // setCurrTestingChapterKey(chapterKeyName); //TODO add later
        // setCurrTestingChapterTitle(chapterTitleName); //TODO add later

        let allChaptersContents = {}; //TODO add later!! all nodes


        // --- data-fetching as outer-layer container of viewer-entire ---

        let chapterContentTemp = {}; //TODO add later!! all nodes

        if (allChaptersContents[chapterKeyName] === undefined
        || allChaptersContents[chapterKeyName] === null
        ) {

            alert("chapter-walk: need to fetch from cloud?");

                                        //allChaptersContents, setAllChaptersContents
        }

        //setCurrChapterContent(chapterContentTemp); //TODO add later

        return chapterContentTemp;
  }



return (
<div>


{(state !== undefined && state !== null)
&&
<div style={{"backgroundColor": "#b5b2b0"}}
    className={state.mode === "online_cloud" ? "" : "colorInvert"}
>

{(state !== undefined
&&
    ((state.mode === "online_cloud" && authEmailName !== "_" && isPrepFinished === true)
        || authEmailName === "localUser###"
    )
)
   &&
<>


{/* top banner area */}
<div>
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
            <button
                onClick={()=>{
                    //fetchcurrChapterContentFromCloud();
                    //TODO700: fetch the very first chapter's data?

                    startViewerEntireTest();
                    
                }}
                className="button testEntire"
                >Test ▶︎ </button>       


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
    (state.mode === "online_cloud" && authEmailName !== "_") 
    || (authEmailName === "localUser###")
    )
    && 
    <>
   

{/* Game-Maker for metadata */}
    {(focusingEditor === "gameMaker" && isPrepFinished === true)
    && 
    
    <>
    <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        getProjectMetaData={passInProjectMetaData}

        switchEditor={switchEditor}
        getAuthEmailName={passInAuthEmailName}
        updateToOuter={fetchUpdatedMetaDataFromSubCompo}
        backendOption={backendOption}

        getUiLangOption={passInUiLanguageOption}
        getProjectResourceVarPairs={passInProjectResourceVarPairs}

        getTestPlayerGameDataTracker={passInTestPlayerGameDataTracker}
        getTestPlayerProfile={passInTestPlayerProfile}
        getTestPlayerAccount={passInTestPlayerAccount}
        getTestPlayerSLRecords={passInTestPlayerSLRecords}
        getTestShopProducts={passInTestShopProducts}
        getTestPlayerPurchaseStatus={passInTestPlayerPurchaseStatus}

        triggerCreatedNewNode_panel2={triggerCreatedNewNode_panel2}


    />
    </>}



{/* Node Editors */}
<>
    {focusingEditor === "Conversation"
    &&
        <ConversationNodeEditingPanel
            
            getUiLanguageOption={passInUiLanguageOption}
            getProjectResourceVarPairs={passInProjectResourceVarPairs}
            getGameDataDesignList={passInGameDataDesignList}
            gerCurrNodeEntire={passInCurrNodeEntire}

            clickedNodeKey={currentNode}
            projectName={state.selected_project_name}
            userName={authEmailName}
            screenSizeStr={currentScreenSz}
            chapterKey={currentChapter}
            editorMode={state.mode}
            
            editorUiLang={languageCodeTextOption} //TODO change
            backToGameMaker={goToGameMakerResetNodeFocus}

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

                updateVarPairToCloud_p2Layer={updateVarPairToCloud_p2Layer}
                getProjectResourceVarPairs={passInProjectResourceVarPairs}

              />
          
          </div>}


     
          {isDisplayGdmBool === true && <div>
       
              {/* <Modal_GameDataManager 
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
              /> */}

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



{/* test-viewing floating window */}
<div>
            
    {isDisplayEntireGameViewer === true 
    &&
    <div>

        {/* <Viewer_Entire

            initialNavObj={currentProjectNav}

            initialChapterList={chapterList}
            initialCurrChapterAllNodeMapping={chapterNodeMapAll}

            initialPlayerGameDataTracker={testPlayerGameDataTracker}
            initialPlayerProfile={testPlayerProfile}
            initialPlayerAccountSettings={testPlayerAccount}
        
            initialPlayerSlRecords={testPlayerSLRecords}

            uiLangOption={languageCodeTextOption}

            username={authEmailName}
            projectname={projectName}
            getUsername={passInAuthEmailName}

            initialShopItemInfo={testShopProducts}
            initialPlayerPurchaseInfo={testPlayerPurchaseStatus}

            triggerNodeWalk={triggerNodeWalk} //update things to this layer
            triggerChapterWalk={triggerChapterWalk} //update things to this layer
            triggerUpdateCurrentStanding={triggerUpdateCurrentStanding} //update things to this layer

            visualMap={visualMap}
            audioMap={audioMap}
            mutedViewOption={mutedViewOption}

            getCurrChapterContent={passInCurrChapterContent}

            backendOption={backendOption}

        /> */}

        {/* also :  <Panel_GameDataTest

                note: for test-viewing: keep these: for the [status table]
                currTestingPageStatus("Main Page");
                currTestingChapterKey("");
                currTestingChapterTitle("");
                currTestingNodeKey("");
                currTestingNodeType("");
        */}

    </div>}

</div>


</>}
</div>}
</div>

);










}



// "offline_half"
// "offline_full"
// "online_cloud"