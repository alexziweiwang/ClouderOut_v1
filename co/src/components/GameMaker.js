import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import Modal_EmuManager from './Modal_EmuManager';


import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';
import Viewer_Entire from './Viewer_Entire';
import Panel_GameDataTest from './Panel_GameDataTest';

//level0

//TODO1090 cloud-db related
import { 
  getProjectGameDataDesignVM, 
} from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
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

import { 
  fetchNodeDataEachNodeVM, 
  fetchNodeDataEachChapterVM, 
} from '../viewmodels/NodeDataInPlayViewModel';
//TODO112: fetch node-contents here, and send into Viewer_Entire and its sub-component [GameScreen_AllNodeTypeContainer]

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


import langDictionary from './_textDictionary';
import uiLangMap from './uiLangMap';

export default function GameMaker({projectName}) {


/**
used data structures:

GameDataDesign <map>
ProjectResourceVarPairs_audio  <map>   
ProjectResourceVarPairs_visual  <map>   
ProjectUILang <string>
NavigationSettings <map>

AllChapterList (used in chapter-manager) <map/2d_array>
ChapterNodeMapping (used in node-manager) <map>

Node-Data (multiple, content + ui_setting) [chapter_key, node_key]  <map of maps>

*/
  const [backendOption, setBackendOption] = useState("firebase"); //firebase / local?
//TODO2000 add "platform option"? add UI for choosing platform
  const [isBackendOptionCloud, setIsBackendOptionCloud] = useState(true);



  const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

  const [screenHeight, setScreenHeight] = useState(600);
  const [screenWidth, setScreenWidth] = useState(800); //TODO

  const [cloudDbConnOk, setCloudDbConnOk] = useState(true);

  let textDictItem = langDictionary[languageCodeTextOption];
  let textDictItemDefault = langDictionary["en"];

  const resourceManagerButtonText = textDictItem.resourceManagerButtonText !== undefined ?
        textDictItem.resourceManagerButtonText
        : textDictItemDefault.resourceManagerButtonText;

  const gameDataManagerButtonText = textDictItem.gameDataManagerButtonText !== undefined ?
        textDictItem.gameDataManagerButtonText
        : textDictItemDefault.gameDataManagerButtonText;
  
  const contentChaptersTabText = textDictItem.contentChaptersTabText !== undefined ?
        textDictItem.contentChaptersTabText
        : textDictItemDefault.contentChaptersTabText;
  
  const menuNavigationsTabText = textDictItem.menuNavigationsTabText !== undefined ?
        textDictItem.menuNavigationsTabText
        : textDictItemDefault.menuNavigationsTabText;

  const screenSizeForAllNavPageText = textDictItem.screenSizeForAllNavPageText !== undefined ?
        textDictItem.screenSizeForAllNavPageText
        : textDictItemDefault.screenSizeForAllNavPageText;

  const horizontalMarkText = textDictItem.horizontalMarkText !== undefined ?
        textDictItem.horizontalMarkText
        : textDictItemDefault.horizontalMarkText;

  const verticalMarkText = textDictItem.verticalMarkText !== undefined ?
        textDictItem.verticalMarkText
        : textDictItemDefault.verticalMarkText;

  const selectSizeDirectionText = textDictItem.selectSizeDirectionText !== undefined ?
        textDictItem.selectSizeDirectionText
        : textDictItemDefault.selectSizeDirectionText;

  const projectNameText = textDictItem.projectNameText !== undefined ?
        textDictItem.projectNameText
        : textDictItemDefault.projectNameText;


  const emuManagerText = textDictItem.emuManagerText !== undefined ?
        textDictItem.emuManagerText
        : textDictItemDefault.emuManagerText;
    
//TODO15

/* Important data structure in this level: Game-Maker
  -hook chapterList: array of all chapters' info: key, title, display-boolean)
    fetch from cloud when first entering Game-Maker
  -hook chapterNodeMapAll: relationship-map (key is chapter-key; value is each node's name, position, nextNode, display-boolean, etc.),
    fetch from cloud when first entering Game-Maker
    (for each node, if outside/not entering this node's editor, the specific content of this node would not be fetched from cloud?)
    important for both game-maker and game-viewer
    -hook gridBlocksAll: map (key is chapter-key; value is this chapter's node-visualization position matrix) 
    fetch from cloud when first entering Game-Maker
    for visualization on node-manager component; more for the game-maker (not game-viewer)
  -hook currentProjectNav: UI-settings for navigation-system of the [entire game]
  -chapter and node brief intro

*/

  const [renderCounter, setRenderCounter] = useState(0);


  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);


  const [gameDataTracker, setGameDataTracker] = useState({}); //used during test-play


  const [isDisplayEntireGameViewer, setDisplayEntireGameViewer] = useState(false);
  
  const [mutedViewOption, setMutedViewOption] = useState(false);




  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState("");

  //TODO6
  const [currTestingPageStatus, setCurrTestingPageStatus] = useState("Main Page");
  const [currTestingChapterKey, setCurrTestingChapterKey] = useState("");
  const [currTestingChapterTitle, setCurrTestingChapterTitle] = useState("");

  const [currTestingNodeKey, setCurrTestingNodeKey] = useState("");
  const [currTestingNodeType, setCurrTestingNodeType] = useState("");

  const [chapterList, setChapterList] = useState([]);

  const [isDisplayRmBool, setDisplayRmModal] = useState(false);
  const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);
  const [isDisplayEmBool, setDisplayEmBool] = useState(false);


  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");

  const [createNodeFolderSignal, setCreateNodeFolderSignal] = useState(false);
  const [createdNewNodeWaitlist, setCreatedNewNodeWaitlist] = useState([]);
  const [createdNewNodeWaitListPending, setCreatedNewNodeWaitListPending] = useState(false);

  const [visualMap, setVisualMap] = useState([]); 
  const [audioMap, setAudioMap] = useState([]);

  const [currChapterContent, setCurrChapterContent] = useState([]); //TODO200


    async function fetchProjResourceLists() {
      if (projectName === "default-no-state projectName") {
        return;
      }


      /* fetch from cloud db */
      //TODO500     
      const obj = await fetchProjectResourceVarPairsVM({
        userName: authEmailName, 
        projectName: projectName,
        bkOption: backendOption
      });
      
      if (obj === undefined) {
        return;
      }


      resetVisualMapFromList(obj.visual);
      resetAudioMapFromList(obj.audio);

      return obj;
    }


    function updateRenderCounter() {
      console.log("updateRenderCounter!");
      setRenderCounter((renderCounter+1) % 100);
    }

    function resetVisualMapFromList(visualList) {
        let tempMap = {};

        //TODO
        let len = visualList.length;
        let i = 0;
        tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
        tempMap[""] = '';
        while (i < len) {
            let item = visualList[i];
            tempMap[item["var"]] = item["url"];
            i++;
        }
                 //                       console.log("initialized visual map = ", tempMap); //TODO test

        setVisualMap(tempMap);
    }


    function resetAudioMapFromList(audioList) {
        let tempMap = {};

        //TODO
        let len = audioList.length;
        let i = 0;
        tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
        tempMap[""] = '';
        while (i < len) {
            let item = audioList[i];
            tempMap[item["var"]] = item["url"];
            i++;
        }

              //                          console.log("initialized audio map = ", tempMap); //TODO test
        

        setAudioMap(tempMap);
    }


//TODO ------------------------------------------------------ testing data area

  const [chapterNodeMapAll, setChapterNodeMapAll] = useState(undefined);
  const [gridBlocksAll, setGridBlocksAll] = useState(undefined); //stores node-keys

  const [nodeMapUpdatedSignal , setNodeMapUpdatedSignal] = useState(false);
  const [gridBlocksUpdatedSignal, setGridBlocksUpdatedSignal] = useState(false);

  //TODO501 node-ui template...


 // const [currentChapterNodeMap, setCurrentChapterNodeMap] = useState({});           //--- not used ---
 // const [gridBlocks, setGridBlocks] = useState([]); //stores node-keys              //--- not used ---






  const [isChapMgrCollapsed, setChapMgrCollapsed] = useState(false);
  const [nodeMgrDelSignal, setNodeMgrDelSignal] = useState(false);
  
//TODO23 update to and fetch from cloud for this project !!!
  const [currentProjectNav, setCurrentProjectNav] = useState({
    
  }); //TODO now: default initial values

  const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({});   //TODO important for holder-in-practice
  const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                       //TODO important for holder-in-practice
  const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                       //TODO important for holder-in-practice
  const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
      "playername": "playerA",
      "itemStatus": [{}, {}, {}]
  });

  const [isEmuMgrOpenedOnce, setIsEmuMgrOpenedOnce] = useState(false);
    
  const [testShopProducts, setTestShopProducts] = useState({});
  const [testPlayerPurchaseStatus, setTestPlayerPurchaseStatus] = useState({});

  const [allChaptersContents, setAllChaptersContents] = useState({});
                                                           //TODO important for holder-in-practice
//TODO ------------------------------------------------------ testing data area

    const [selectedGameDataPanelBetween2, setSelectedGameDataPanelBetween2] = useState(true);

  const [gameDataDesignList, setGameDataDesignList] = useState({});
  const [gameDataArray, setGameDataArray] = useState([]);

  const [offlineHalfMode, setOfflineHalfMode] = useState(true); //with account log-in and use links from external online-drive, not using the storage place
  const [offlineFullMode, setOfflineFullMode] = useState(false); //TODO6000

  function manuallyResetWithSampleData() {

  setChapterNodeMapAll({
    "chp-key1": {
  "chapterStart": {
      nodeName: "chapterStart1-title", 
      row: 2, 
      col: 0, 
      nextNode:"A1-key", 
      display: true, 
      nodeType:"*chapterStart*", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "A1-key": {
      nodeName: "A1-title", 
      row: 2, 
      col: 1, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "B1-key": {
      nodeName: "B1-title", 
      row: 4, 
      col: 3, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "C1-key": {
      nodeName: "C1-title", 
      row: 4, 
      col: 0, 
      spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],  
      display: true, 
      nodeType:"LogicSplitter",
      notes: "",
  },
  "D1-key": {
      nodeName: "D1-title", 
      row: 2, 
      col: 4, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "E1-key": {
      nodeName: "E1-title", 
      row: 2, 
      col: 5, 
      nextNode: "chapterEnd", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "chapterEnd": {
      nodeName: "chapterEnd1-title", 
      row: 4, 
      col: 6, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
},
"chp-key2": {
"chapterStart": {
    nodeName: "chapterStart2-title", 
    row: 2, 
    col: 0, 
    nextNode:"A2-key", 
    display: true, 
    nodeType:"*chapterStart*", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"A2-key": {
    nodeName: "A2-title", 
    row: 2, 
    col: 1, 
    nextNode:"", 
    display: true, 
    nodeType:"Conversation", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"B2-key": {
    nodeName: "B2-title", 
    row: 4, 
    col: 3, 
    nextNode:"", 
    display: true, 
    nodeType:"Conversation", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"C2-key": {
    nodeName: "C2-title", 
    row: 4, 
    col: 0, 
    spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],    //TODO refactor 
    display: true, 
    nodeType:"LogicSplitter",
    notes: "",
},
"D2-key": {
  nodeName: "D2-title", 
  row: 2, 
  col: 4, 
  nextNode: "", 
  display: true, 
  nodeType:"Conversation", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
"E2-key": {
  nodeName: "E2-title", 
  row: 2, 
  col: 5, 
  nextNode: "chapterEnd", 
  display: true, 
  nodeType:"Conversation", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
"chapterEnd": {
  nodeName: "chapterEnd2-title", 
  row: 4, 
  col: 6, 
  nextNode:"", 
  display: true, 
  nodeType:"*chapterEnd*", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
},
  });
  setGridBlocksAll({
    "chp-key1": 
    [
      ["","","","","","","","","",""], 
      ["","","","","","","","","",""],
      ["chapterStart","A1-key","","","D1-key","E1-key","","","",""], 
      ["","","","","","","","","",""],
      ["C1-key","","","B1-key","","","chapterEnd","","",""]
    ]
  ,
    "chp-key2": [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart","A2-key","","","D2-key","E2-key","","","",""], 
        ["","","","","","","","","",""],
        ["C2-key","","","B2-key","","","chapterEnd","","",""]
    ],  

  }); //stores node-keys


  }

  async function fetchGameDataFromCloud() { //TODO3

   // console.log("!!! This is for project: ", projectName);
    let project  = projectName;
  //  console.log("checking2 on project ... [", project, "]");
    if (project === undefined || project === null || project === "" || project.trim() === "") {
      return;
    }
    const isUpdated = true;
    
    
    const gdataTestResult = await getProjectGameDataDesignVM({
      projectName: project, 
      uname: authEmailName, 
      mostUpdated: isUpdated,
      bkOption: backendOption
    
    });
      
    if (gdataTestResult === undefined) {
      console.log("no game_data in this project...");
      let gdataTestResult = [];
      setGameDataDesignList(gdataTestResult);
    } else {
             console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
      setGameDataDesignList(gdataTestResult);      
    }
 

    return gdataTestResult;

  }

  const [needCloudGameData, setNeedCloudGameData] = useState(true);


  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }


  function passInGdmUpdatedSignal() {
    return gdmUpdatedSignal;
  }

  function resetGdmUpdateSignal() {
    setGdmUpdatedSignal(false);
  }

  function passInGameDataDesignList() {
    return gameDataDesignList;
  }

  function passInSelectedChapterInfo_Cloud() {
    //TODO fetch cloud-info !


    return chapterNodeMapAll[currChapterKey]; //temporary
  }


 
  const [authEmailName, setAuthEmailName] = useState("_");

  const [firstTimeSwitchTabNavPanel, setFirstTimeSwitchTabNavPanel] = useState(true);

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {


//TODO1030
        window.onbeforeunload = () => {
          return "show message";
        }
                  //               console.log("gridBlocksUpdatedSignal = ", gridBlocksUpdatedSignal);
                      
                      
                  //                console.log("curr chapter-key = ? ", currChapterKey, " data = ", chapterNodeMapAll[currChapterKey], "  from  ", chapterNodeMapAll);


        if (authEmailName === "_") {
          getAuthFirebase(
              {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
              
              }
          );
                          console.log("@@@gamek-maker --\t\tauthEmamilName", authEmailName);

        }
                    
            console.log("\t\t\tgame-maker rendered once.");

        if (authEmailName !== "_") {

            //TODO5000 check returned data from cloud-db
            if (gridBlocksAll === undefined || chapterNodeMapAll === undefined) {
              
              loadEverythingFromCloud();
            }

            if (gridBlocksAll !== undefined && chapterNodeMapAll !== undefined) {

              setCloudDbConnOk(true);
            }

            if (Object.keys(gameDataDesignList).length === 0) { //TODO999
                triggerRefreshFetchCloudData();
            }

            setOfflineHalfMode(false);
            setOfflineFullMode(false);

        } else { //auth-email-name is "_"

            setOfflineHalfMode(true);
//offlineHalfMode

        //TODO6000 offline mode prep
        //in this case, ask either log-in, or let the user work on the project offline
            
            //save: download current data-sets
            //import: upload and parse formatted file ...
            //resource-pair: half-offline: use online-drive link; full-offline: desktop with file path
        
        }

        if (firstTimeEnter === true) {


            console.log("!!! First Enter - GameMaker: ");//TODO testing

            //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
            
            

            setFirstTimeEnter(false);
        }


                                // if (secondTimeEnter === true) {
                                //   //This area is for any "reset" procedure...
                                //   //  usually for modals -- resource-manager, game-data-manager, 

                                //                     console.log("!!! Second Enter - GameMaker: ");//TODO testing
                                //     triggerRefreshFetchCloudData();

                                //     setSecondTimeEnter(false);
                                // }






        if (projectName === "default-no-state projectname") {
        //  alert("No project selected. Returning to project selection page...");
          pureNavigateToProjectManagingPanel();
        }

        // if (currChapterKey !== undefined && currChapterKey !== "") {
        //   setCurrentChapterNodeMap(chapterNodeMapAll[currChapterKey]);
        //   setGridBlocks(gridBlocksAll[currChapterKey]);
        // }

        if (currentProjectNav["screenSize"] === "16:9(horizonal)") {
          setScreenHeight(450);
        } else if (currentProjectNav["screenSize"] === "16:9(vertical)" 
          || currentProjectNav["screenSize"] === "4:3(vertical)") {
          setScreenHeight(800);
        } else if (currentProjectNav["screenSize"] === "4:3(horizonal)") {
          setScreenHeight(600);
        }


  });


  function goToNotLoggedInPage() {
    navigate('/notloggedin', { replace: true });

  }


  function firstSetupUILanguage() {
    return fetchUILangFromCLoud()
  }

  async function fetchUILangFromCLoud() {

    let ans = await fetchProjectUILangVM({
      projectName: projectName, 
      currUser: authEmailName,
      bkOption: backendOption
    });

    setLanguageCodeTextOption(ans);
    return ans;
  }

  function pureNavigateToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });

  }

  async function goToProjectManagingPanel() {
    if (cloudDbConnOk === false) {
      pureNavigateToProjectManagingPanel();
    } else {

      let saveOrNot = window.confirm("Save all changes and exit?");
      if (saveOrNot) {
            if (currChapterKey !== "") {
              await updateChapterNodeMappingsToCloud(chapterNodeMapAll); 
              await saveToCloudNewNodeList(createdNewNodeWaitlist);
            }
  
            pureNavigateToProjectManagingPanel();
      }
    }


  }



  function updateChapterNodeData() {
    // TODO fetch currChapterKey
    // TODO update nodeRelationshipMap by chapter title
    // TODO strategy: from cloud? local?
    // TODO consider data structure to store, balance efficiency and cloud traffic
  }

  function handleResourceManagerCancel() {
    setDisplayRmModal(false);
    
    //TODO3 fetch laterst data from cloud?
    setRmUpdatedSignal(true);

  }

  function handleResourceManagerSaveChanges() {
    console.log("modal save changes!");
    updateRenderCounter();
    //TODO update to cloud db
    setDisplayRmModal(false);
  }

  function handleGameDataManagerCancel() {
    updateRenderCounter();
    setDisplayGdmBool(false);

  }

  function handleEmuManagerCancel() {
    //triger re-render?
    updateRenderCounter();
    setDisplayEmBool(false);
  }  


  function handleGameDataManagerSaveChanges() {
    setDisplayGdmBool(false);

  }

  function updateLinkingNodeFunc(position, nodename, chapterkey) {
    //TODO either update "starting" or "ending" node of a chapter
  }

  // function fetchCurrChapterNodeList(chapterKey) {
  //   // with chapter key, return the node list from cloud(?)
  //   console.log("fetchCurrChapterNodeList - key is: ", chapterKey); //TODO
  //   if (chapterKey === -1) {
  //     setCurrChapterKey("");
  //   }
  
  //   //TODO when testing, use nodeMapAll...

  // }


  function updateCurrProjectNavObj(obj) {
    setCurrentProjectNav(obj);
    updateRenderCounter();
  }

  function passInNavObj() {
    return currentProjectNav;
  }
  
  function handleResourceManagerOpen() {
    setDisplayRmModal(true);
  }

  function handleGameDataManagerOpen() {
    setDisplayGdmBool(true);
  }

  function updateCurrPageName(name) {
    setCurrPageName(name);
  }

  function passInCurrSelectedPage() {
    return currPageName;
  }

  function triggerRefreshFetchCloudData() {
    fetchGameDataFromCloud();
    fetchProjResourceLists();
  }

  // function resetRmUpdatedSignal() {
  //   setRmUpdatedSignal(false);
  // } //TODO remove unused later

  // function passInRmUpdatedSignal() {
  //     let val = rmUpdatedSignal;
  //     return val;
  // } //TODO remove unused later

  function passInChapterList() {
    return chapterList;
  }

  const [developOnCloudData, setDevelopOnCloudData] = useState(false);

  function closeEntireGameViewer() {
    // reset all game-progress
    setCurrTestingPageStatus("Main Page");
    setCurrTestingChapterKey("");
    setCurrTestingChapterTitle("");
    setCurrTestingNodeKey("");
    setCurrTestingNodeType("");

    setDisplayEntireGameViewer(false);
  }

  function passInCurrentChapterNodeMap() {
    let nodeMap = currChapterKey !== "" ? chapterNodeMapAll[currChapterKey] : {};
    return nodeMap;
  }

  function passInCurrentChapterKey() {
    return currChapterKey;
  }

  function passInCurrentGridBlocks(givenChapterKey) {
                                  console.log("\t\tpassing-in grid, ", givenChapterKey);
                                  console.log("\t\t", gridBlocksAll);


    let grid = (givenChapterKey !== "" && gridBlocksAll[givenChapterKey] !== undefined) ? gridBlocksAll[givenChapterKey] : [];
                                  console.log("\t\tfinally passing in: ", grid);


    return grid;
  }


  async function prepareForNewChapterMapping(newKey) {
      await prepareForNewChapterMapping_vm (
          newKey, 
          chapterNodeMapAll, 
          setChapterNodeMapAll, 
          setNodeMapUpdatedSignal, 
          convertNodeMapToGridBlocks, 
          setGridBlocksAll, 
          setGridBlocksUpdatedSignal, 
          updateChapterNodeMappingsToCloud
      );
  }

  function passInScreenHeight() {
    return screenHeight;
  }

  function passInScreenWidth() {
    return screenWidth;
  }

  function updateNodeMapOfChapter(mapObj) {
    let nodeMapAllTemp = chapterNodeMapAll;
    nodeMapAllTemp[currChapterKey] = mapObj;
    setChapterNodeMapAll(nodeMapAllTemp);
    setNodeMapUpdatedSignal(true);
                        console.log("node-mapping updated.");
  }
  
  function updateGridBlockOfChapter(gridArr) {
    let gridBlocksAllTemp = gridBlocksAll;
    gridBlocksAllTemp[currChapterKey] = gridArr;

    setGridBlocksAll(gridBlocksAllTemp);
    setGridBlocksUpdatedSignal(true);
                        console.log("grid-blocks updated.");
  }

  async function chapterChangingOrExiting() {
                                          console.log("exiting chapter - ", currChapterKey);
        
      if (currChapterKey === "") {

                            console.log("no");
        return "no";
      }

     
      
      if (createNodeFolderSignal === true 
        || nodeMgrDelSignal === true
        || nodeMapUpdatedSignal === true
        || gridBlocksUpdatedSignal === true
      ) { 

          let answer = window.confirm("Save current chapter data to cloud?"); //ask if save to cloud?
          if (answer) {
              //by createdNewNodeWaitlist, update cloud-folders...

              await saveEverythingToCloud(); // will reset createNodeFolderSignal
              setNodeMgrDelSignal(false);
                             console.log("yes. wait-and-enter");
              return "wait-and-enter";

          } else {
              setNodeMapUpdatedSignal(false);
              setGridBlocksUpdatedSignal(false);

                              console.log("no");
              return "no";
          }

      } else {
                              console.log("immediate-enter");
        return "immediate-enter";

      }
      
      

  }


  //TODO21 refactor to VM
  async function saveToCloudNewNodeList(waitlist) {
//TODO600

    if (createdNewNodeWaitlist.length === 0) {
      return;
    }

    if (createNodeFolderSignal === true) {
          //by signal, add a new document at /"nodes"

                          console.log("updating to cloud: func-step1-node-folders node-waitlist = ", createdNewNodeWaitlist);
//TODO600
          await addNewNodeFoldersVM(
            { 
                project: projectName,
                username: authEmailName,
                nodeList: waitlist, 
                chapterKey: currChapterKey,
                bkOption: backendOption
            }
          );
          //TODO36

          setCreatedNewNodeWaitlist([]);
          setCreatedNewNodeWaitListPending(false);

          //reset create-node-signal to false here
          setCreateNodeFolderSignal(false);
    }

  }
 
  async function switchChosenChapterItem(chapterKey) {
 
                                            console.log("clicked on chapter-key: ", chapterKey); //TODO testing

        if (chapterKey !== "") {
          await chapterChangingOrExiting();
          setCurrChapterKey(chapterKey);

        }
  } 
  
  function updateChapterList(chapterData) { // game-maker local
    
    setChapterList(chapterData);
  }

  const [showGameDataPanel, setShowGameDataPanel] = useState(false);

  let modalStyleName = "";

  if (isDisplayEntireGameViewer === true) {
      modalStyleName = "displayBlock modalBackboard";
  } else {
      modalStyleName = "displayNone modalBackboard";
  }

  function notUsing() {
    //not doing anything
    console.log();
  }

  function notUsingReturnFalse() {
    return false;
  }

  function notUsingReturnTrue() {
    return true;
  }


  function viewerSourceGameDataUpdate() {
    return {"default": "impl for viewer_entire later"}; //TODO5 later
  }

  function passInPlayerGameDataTracker() {//used in panel-game-data
    return testPlayerGameDataTracker;
  }

  function passInPlayerProfile() { //used in Navigation-Setter 
    return testPlayerProfile;
  }

  function passInPlayerAccountInfo() {
    return testPlayerAccount;
  }

  function passInPlayerSlRecords() {
    return testPlayerSLRecords;
  }


                                                                                // function passInCurrentGameProgress() {
                                                                                //   let obj = {};
                                                                                //   obj["pageStatus"] = currTestingPageStatus;
                                                                                //   obj["chapterKey"] = currTestingChapterKey;
                                                                                //   obj["nodeKey"] = currTestingNodeKey;
                                                                                //   obj["nodeType"] = currTestingNodeType;

                                                                                //   return obj;
                                                                                // }

  function passInNodeType() {
    return currTestingNodeType;
  }

  function passInChapterKey() {
    return currTestingChapterKey;
  } 

  function passInNodeKey() {
    return currTestingNodeKey;
  }

  function passInPageName() {
    return currTestingPageStatus;
  }

  function passInChapterTitle() {
    return currTestingChapterTitle;
  }

  function triggerUpdateCurrentStanding(obj) { //fetch from sub-compo
    setCurrTestingPageStatus(obj["pageStatus"]);
    setCurrTestingChapterKey(obj["chapterKey"]);
    setCurrTestingNodeKey(obj["nodeKey"]);
    setCurrTestingNodeType(obj["nodeType"]);
    setCurrTestingChapterTitle(obj["chapterTitle"]);
  }

  



                    // function receiveUpdateOnPageStatus(pageName) {
                                                                              //fetch from sub-compo 
                                                                              //TODO important, needed in holder-in-practice 
                    //   setCurrTestingPageStatus(pageName);
                    // }

  function updatePlayerInfoSets(playerProfileData, userAccountData) {
    
    //TODO for testing only, update test-data here
    setTestPlayerProfile(playerProfileData);
    setTestPlayerAccount(userAccountData);

    //TODO: later, update non-emu data here

  }

  function passInPlayerInfoSets() {
    let obj = {};

    //TODO for testing only, pass-in test-data
    obj["playerProfile"] = testPlayerProfile;
    obj["userAccount"] = testPlayerAccount;


    //TODO: later, non-emu data, pass-in non-emu data

    return obj;
  }


  const emptyValue = {};


  function updateEmuPlayerProfile(data) {
    console.log("game-maker: updateEmuPlayerProfile = ", data); //TODO test
    setTestPlayerProfile(data);
  }

  function passInEmuPlayerInfo() {
    return testPlayerProfile;
  }

  function passInCurrentGameDataList() { // emu-data
  

    //TODO for new-emu-strategy

    // let objTemp = {}; //TODO too much rerendering
    // Object.keys(testPlayerGameDataTracker).map((currKey) => {
    //   let item = testPlayerGameDataTracker[currKey];
    //   let currVal = item["current_value"];
    //   let dataType = item["data_type"];
    //   let defaultVal = item["default_value"];
    //   let nameVal = item["name"];
      
    //   let objNewItem = {
    //       "current_value": currVal,
    //       "data_type": dataType,
    //       "default_value": defaultVal,
    //       "name": nameVal           
    //   }

    //   objTemp[nameVal] = objNewItem;

    // })  //TODO too much rerendering



    return testPlayerGameDataTracker;

  }

  function passInUILanguage() {
    return languageCodeTextOption;
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
        bkOption: backendOption
      });
    }
  }

  async function getUserConfigFromDataMgr1Gdt(gameDataDesignList) {
    let emuGdt1Temp = testPlayerGameDataTracker; //TODO999
  
    Object.keys(gameDataDesignList).map((currKey) => {
        if (currKey === "placeholder123456789___###___###___##") {
          return;
        }

        if (emuGdt1Temp[currKey]["current_value"] === undefined) {
          return;
        }

        if (emuGdt1Temp[currKey] === undefined) {
            emuGdt1Temp[currKey] = gameDataDesignList[currKey];
            emuGdt1Temp[currKey]["current_value"] = emuGdt1Temp[currKey]["default_value"];
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
        bkOption: backendOption
    });

  }

  function updateGameDataDesignList(data) {
    //TODO999 update game-data-design-list
    setGameDataDesignList(data);
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



  function openEmuManager() {
      setDisplayEmBool(true);

      setIsEmuMgrOpenedOnce(true);
  }

  function passInShopItemInfo() {
  //  console.log("game-maker shop product info", testShopProducts);
    return testShopProducts;
  }

  function passInPlayerPurchaseStatus() {
    return testPlayerPurchaseStatus; //TODO30
  }


  //TODO21 refactor to VM
  async function updateChapterNodeMappingsToCloud(nodeMap) {
    //TODO transfer gridBlocksAll into non-nested array
    //TODO send nodeMap
  //  if (nodeMapUpdatedSignal === true || gridBlocksUpdatedSignal === true) {

console.log("updating to cloud ... func-step2-all-node-mapping-grid", gridBlocksAll);
console.log("updating to cloud ... func-step2-all-node-mapping-nodemap", nodeMap);


        let i = 0;
        let len = 0;

        let gridMapTemp = {};

        Object.keys(gridBlocksAll).map((currKey) => {
          let currChapterGrid = gridBlocksAll[currKey]; // the 2d-array
          len = currChapterGrid.length;
          i = 0;
          let obj = {};
          while (i < len) {
            obj[i] = currChapterGrid[i];

            i++;
          }
          gridMapTemp[currKey] = obj;

        });

        await updateChapterNodesToCloudDataVM({
            projectName: projectName, 
            currUser: authEmailName,
            chapterNodeMappingObj: nodeMap,
            bkOption: backendOption
        });      
        setNodeMapUpdatedSignal(false);
        setGridBlocksUpdatedSignal(false);

   // }
    
    
    alert("All contents are updated.");

  }


  //TODO21 refactor to VM
  async function triggerCreatedNewNode(newNodeKey, chapterKeyTemp, nodeTypeTemp) {
    await triggerCreatedNewNode_vm (
      newNodeKey, 
      chapterKeyTemp, 
      nodeTypeTemp, 
      setCreateNodeFolderSignal,
      createdNewNodeWaitlist,
      setCreatedNewNodeWaitlist,
      setCreatedNewNodeWaitListPending
    );

  }



  async function triggerCreatedNewChapter(chapterInfo) {

    await addNewOneChapterFolderVM({
      project: projectName,
      username: authEmailName,
      chapterKey: chapterInfo[0],
      bkOption: backendOption
    });

  }

  function convertNodeMapToGridBlocks(nodeMapTemp) {
    
    // make grid-blocks from node-map

    let gridEntireTemp = [];

    // make conversion(format of stored grid blocks) of grid-blocks
    let j = 0;
    let gridTempMap = {};
    let gridTempArr = [];

                                                      // console.log("convertNodeMap-To-GridBlocks with ", nodeMapTemp);

    let rowMax = 0;
    let colMax = 0;

    Object.keys(nodeMapTemp).map((chapterKey) => {  
      rowMax = 0;
      colMax = 0; //reset for each chapter

      let currChapter = nodeMapTemp[chapterKey];
                                                    //    console.log("nodeMapTemp[chapterKey] = ", nodeMapTemp[chapterKey]);

      Object.keys(currChapter).map((nodeKeyTemp) => {  
        let currNode = currChapter[nodeKeyTemp];
                                                    //     console.log("\tcurrChapter[nodeKeyTemp] = ", currChapter[nodeKeyTemp]);
        let currRow = currNode["row"];
        if (currRow > rowMax) {
          rowMax = currRow;
        }
        let currCol = currNode["col"];
        if (currCol > colMax) {
          colMax = currCol;
        }
      });

      colMax = colMax + 5;
      rowMax = rowMax + 2;


      let w = 0;
      let q = 0;
      let maxGrid = [];
      for(; w < rowMax; w++) {
        let createdRow = [];
        for(q = 0; q < colMax; q++) {
          createdRow.push("");
        }
        maxGrid.push(createdRow);
      }

      Object.keys(currChapter).map((nodeKeyTemp) => {  
        let currNode = currChapter[nodeKeyTemp];
        let currRow = currNode["row"];
        let currCol = currNode["col"];
        if (currNode["display"] === true) { // only for undeleted nodes
                            //    console.log("r = ", currRow, " ... col = ", currCol, " ....... node = ", nodeKeyTemp);
      
          maxGrid[currRow][currCol] = nodeKeyTemp;
        }

      });
      gridEntireTemp[chapterKey] = maxGrid;


    });   
    


//rowMax, colMax
    //TODO draw grid with the height and width above
  

    //now maxGrid is an ideal empty grid to be filled

 


    //TODO add according to the nodeMapTemp's actual content for all node's positions


    return gridEntireTemp;
  }


  //TODO21 refactor to VM
  async function fetchChapterNodeMappingFromCloud() {

        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        



    let data = await fetchChapterNodeMappingVM({   
        projectName: projectName, 
        currUser: authEmailName,
        bkOption: backendOption
    });


    if (data === undefined || data === null || data.chapterNodeMapping === undefined) {
                                            console.log("!!! unable to fetch node-mapping");

        
            setCloudDbConnOk(false);

    } else {
            setCloudDbConnOk(true);
            let gridChapterMap = {};

            gridChapterMap = convertNodeMapToGridBlocks(data.chapterNodeMapping);
        
            setGridBlocksAll(gridChapterMap);            
            setChapterNodeMapAll(data.chapterNodeMapping);

                      //                 console.log("FromCloud !!! data.chapterNodeMapping = ", data.chapterNodeMapping);
                   //                    console.log("FromCloud !!! after conversion ... GridBlocks = ", gridChapterMap);

    }

  }

  function passInChapterNodeMapping() {
    return chapterNodeMapAll;
  }

  async function updateProjectNavigationSettingsToCloud() {

    await updateProjectNavigationSettingsVM({
      projectName: projectName, 
      currUser: authEmailName,
      dataObj: currentProjectNav,
      bkOption: backendOption
    });
    
  }

  async function fetchProjectNavigationSettingsFromCloud() {

console.log("fetching nav-settings ... ", projectName, " ... ", authEmailName);

    let data = await fetchProjectNavigationSettingsVM({
      projectName: projectName, 
      currUser: authEmailName,
      bkOption: backendOption
    })

                                                  // console.log("proj-nav-settings = ", data);
    setCurrentProjectNav(data);
  }


  //TODO21 refactor to VM
  async function saveChapterListToCloud(chapterListInfo) {



    //convert the nested array into map
    let chapterListMap = {};
    let i = 0;
    let len = chapterListInfo.length;
    while (i < len) {
      chapterListMap[i] = chapterListInfo[i];
      i++;
    }

 

    console.log("test func- saveChapterListToCloud()", chapterListMap);

    await updateChapterListToCloudVM(
      {
        projectName: projectName, 
        currUser: authEmailName,
        chapterListData: chapterListMap,
        bkOption: backendOption
      }
    )

  }


  //TODO21 refactor to VM
  async function fetchChapterListFromCloud() {
    if (authEmailName === "_") {
      console.log("not fetching-chapter-list:  user = ", authEmailName);
      return;
    }


    let listTemp = await fetchAllChapterListVM(
      {
        projectName: projectName, 
        currUser: authEmailName,
        bkOption: backendOption
      }      
    );

    if (listTemp === undefined || listTemp === null) {
              console.log("test func-fetchChapterList-FromCloud(): ...data is invalid");
      setChapterList([]);


                                          console.log("Flag: cloud-database connection problem"); //TODO900

      setCloudDbConnOk(false);
      return [];


    } else {

      setCloudDbConnOk(true);

      //convert map into nested array...
      let arrTemp = [];
      Object.keys(listTemp).map((chapterKey) => {   
        let currArr = [];
        listTemp[chapterKey].map((item, index) => {
          currArr.push(item);
        });
          
        arrTemp.push(currArr);
      })

      //TODO test
      console.log("test func-fetchChapterList-FromCloud(): ", arrTemp);

      setChapterList(arrTemp);

      return arrTemp;

    }


   

  }

  function passInVisualMap() {
    return visualMap;
  }

  function passInAudioMap() {
    return audioMap;
  }

  function triggerNodeMappingsChange(nodeMapThisChapter, gridBlocksThisChapter) {
    let gridAll = gridBlocksAll;
    gridAll[currChapterKey] = gridBlocksThisChapter;

    let nodeMapAll = chapterNodeMapAll;
    nodeMapAll[currChapterKey] = nodeMapThisChapter;

    setGridBlocksAll(gridAll);
    setChapterNodeMapAll(nodeMapAll);

    setNodeMapUpdatedSignal(true);
    setGridBlocksUpdatedSignal(true);

    return nodeMapAll;

  }



  function triggerNodeWalk(nodeKeyName, nodeTypeName) { //important for viewing //from sub-compo
    setCurrTestingNodeKey(nodeKeyName);
    setCurrTestingNodeType(nodeTypeName);
  }

  async function getCurrChpNodeDataFromCloud(givenChapterKey) {
    console.log("fetching for chapter [",givenChapterKey,"]"); 
//TODO900
      let chapterContentTemp = await fetchNodeDataEachChapterVM(
        {
          projectName: projectName, 
          uname: authEmailName, 
          chapterKey: givenChapterKey,
          bkOption: backendOption
        }
      );

      if (chapterContentTemp !== undefined) {

        return chapterContentTemp;
      } else {

        return {};
      }

  }

  async function triggerChapterWalk(chapterKeyName, chapterTitleName) { //important for viewing //from sub-compo
    // as a container outside of viewer-entire, here it uses cloud functions and ds-container for all-chapters' data



    // --- update displayed info ---
    setCurrTestingNodeKey("chapterStart");
    setCurrTestingNodeType("*chapterStart*");
    setCurrTestingChapterKey(chapterKeyName);
    setCurrTestingChapterTitle(chapterTitleName);




    // --- data-fetching as outer-layer container of viewer-entire ---

    let chapterContentTemp = {};

    if (allChaptersContents[chapterKeyName] === undefined
      || allChaptersContents[chapterKeyName] === null
    
      ) {//TODO LATER: also if map length zero

console.log("\t\t\t fetched from cloud ");


        //fetch content: use chapterKeyName, then update the following:
        chapterContentTemp = await getCurrChpNodeDataFromCloud(chapterKeyName);  
  
        let tempAllChpMap = allChaptersContents;
        tempAllChpMap[chapterKeyName] = chapterContentTemp
        setAllChaptersContents(tempAllChpMap);

                                      console.log("game-maker, \nupdated all-chapter-contents = ", tempAllChpMap);

                                      //allChaptersContents, setAllChaptersContents
    } else {
console.log("\t\t\t fetched from local ds ");

      chapterContentTemp = allChaptersContents[chapterKeyName];
    }

    setCurrChapterContent(chapterContentTemp);
    return chapterContentTemp;
  }


  //TODO21 refactor to vm
  function notifyRmUpdated(data) {
    console.log("rm updated... (game-maker) ",  data);
 //TODO100 update the visual+audio maps here?
      //rm-mapping-required: 
      // <NavigationSetter> [//TODO105 refactored, to test]

      // <NavigationPreview> *** non-dynamic resource-maps so far...


      let audioListTemp = data.audio;
      let visualListTemp = data.visual;

      resetVisualMapFromList(visualListTemp);
      resetAudioMapFromList(audioListTemp); 
  }

  function fromNodeMapToChapterNodeKeyDs() {
    //TODO200

    let chapNodeKeyDs = {};

    Object.keys(chapterNodeMapAll).map((chapKey) => {
      let nodeKeyMap = chapterNodeMapAll[chapKey];
      let nodeKeyArr = [];
      Object.keys(nodeKeyMap).map((nodeKey) => {
        nodeKeyArr.push(nodeKey);
      });

      chapNodeKeyDs[chapKey] = nodeKeyArr
    });

    console.log("\t\t\t chapNodeKeyDs = ", chapNodeKeyDs);
    return chapNodeKeyDs;
  }

//   async function fetchcurrChapterContentFromCloud() {
//     //TODO201 strategy: load chapter data for each chapter (optional)?


//     // console.log("...fetchcurrChapterContentFromCloud - chapterNodeMapAll = ", chapterNodeMapAll);


//     // let chapNodeKeyDs = fromNodeMapToChapterNodeKeyDs();
//     // console.log("...fetchcurrChapterContentFromCloud - chapNodeKeyDs = ", chapNodeKeyDs);


// //TODO700 important!





//     //TODO100
  
//   }

  function passInCurrChapterContent() {
    return currChapterContent;
  }

  function passInFalseBool() {
    return false;
  }

  function getChapMgrCollapsed(val) {
    //TODO201

    setChapMgrCollapsed(val);
  }

  function passInChapMgrCollapsed() {
    return isChapMgrCollapsed;
  }

  function passInCreatedNewNodeWaitListPending() {
    return createdNewNodeWaitListPending;
  }

  function loadEverythingFromCloud() {
                                                    console.log("~loading-everything-from-cloud");
    fetchProjectNavigationSettingsFromCloud();
    fetchChapterNodeMappingFromCloud();          
  }

  async function saveEverythingToCloud() { 

    await updateProjectNavigationSettingsToCloud();
    await updateChapterNodeMappingsToCloud(chapterNodeMapAll); 
    await saveToCloudNewNodeList(createdNewNodeWaitlist); 
  }

  function triggerNodeDeleted() {
    setNodeMgrDelSignal(true);
  }


  function passInAuthEmailName() {
    return authEmailName;
  }

  function passInOfflineModeName() {
    if (offlineHalfMode === true) {
        return "offline_half";
    } else if (offlineFullMode === true) {
        return "offline_full";
    } else {
        return "online_cloud";
    }
  }

  async function exportEachChapterNodesData(chapterKey) {

    let chapAllNodes = await getCurrChpNodeDataFromCloud(chapterKey);
    let fileContentTemp = JSON.stringify(chapAllNodes);

    let textFileAsBlob = new Blob([fileContentTemp], { type: 'text/plain' });

    let downloadLink = document.createElement('a');
    downloadLink.download = downloadLink.download = "project#" + projectName +  "#by#" + authEmailName + "_" + chapterKey;
    downloadLink.innerHTML = 'Download File';


    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(
            textFileAsBlob
        );
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click(); 
  }

  function fetchEntireProjectAllNodesDataFromCloud() {


    Object.keys(chapterNodeMapAll).map(async (chapKey) => {
      let chapterKeyHandled = chapKey.trim();

        if (chapterKeyHandled !== "chapter0" && chapterKeyHandled != "placeholder") {
        
        //TODO999 for each chapter ... get all of its node's data?
        exportEachChapterNodesData(chapterKeyHandled);
                 
        }
    });

 
  }

  function downloadEntireProjectFilePart1Meta() {

                                              // console.log("\n\n\ndownloaded project file: ");
                                              // console.log("");

                                              // console.log("game-data-design = ", gameDataDesignList); //TODO3000 update from emu_gameDataManager...
                                              // console.log("visual-map = ", visualMap);
                                              // console.log("audio-map = ", audioMap);
                                              // console.log("project-ui-lang  =", languageCodeTextOption);
                                              // console.log("nav-settings = ", currentProjectNav);

                                              // console.log("chapter-list = ", chapterList);
                                        //      console.log("chapter-node-mapping = ", chapterNodeMapAll);


    let projectObjPart1Meta = {
      "game_data": gameDataDesignList,
      "resource_visual": visualMap,
      "resource_audio": audioMap,
      "project_ui_language": languageCodeTextOption,
      "navigation_settings": currentProjectNav,
      "chapter_list": chapterList,
      "chapter_node_mapping": chapterNodeMapAll,
    };

    let fileContentTemp = JSON.stringify(projectObjPart1Meta);

    let textFileAsBlob = new Blob([fileContentTemp], { type: 'text/plain' });

    let downloadLink = document.createElement('a');
    downloadLink.download = "project#" + projectName +  "#by#" + authEmailName + "_settings";
    downloadLink.innerHTML = 'Download File';


    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(
            textFileAsBlob
        );
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click(); 

    //------------------------------------------------------------------------------

                                                    // GameDataDesign <map>
                                                    // ProjectResourceVarPairs_audio  <map>   
                                                    // ProjectResourceVarPairs_visual  <map>   
                                                    // ProjectUILang <string>
                                                    // NavigationSettings <map>
                                                    
                                                    // AllChapterList (used in chapter-manager) <map/2d_array>
                                                    // ChapterNodeMapping (used in node-manager) <map>
                                                    
                                                    // Node-Data (multiple, content + ui_setting) [chapter_key, node_key]  <map of maps>
                                                    
  }

  async function startViewerEntireTest() {
            
    let modeName = passInOfflineModeName();

    if (isEmuMgrOpenedOnce === false) {
        
        await prepare1Gdt_vm(
          authEmailName, 
          projectName, 
          backendOption, 
          setTestPlayerGameDataTracker, 
          getUserConfigFromEmuManager1Gdt, 
          modeName
        ).then(async()=>{
          await prepare2Epp_vm(
            authEmailName, 
            projectName, 
            backendOption, 
            setTestPlayerProfile,
            getUserConfigFromEmuManager2Epp,
            modeName
          )
        }).then(async()=>{
          await prepare3Epa_vm(
            authEmailName, 
            projectName, 
            backendOption,  
            setTestPlayerAccount, 
            getUserConfigFromEmuManager3Epa, 
            modeName
          )
        })
        .then(()=>{
            console.log("opening viewer_entire window...");
            
            setDisplayEntireGameViewer(true);
          }
        ); 

    }


  }


{/* //components
      
      1. editors - [ChapterManager> +  <NodeManager> 
      2. editors - [NavigationSetter> + <NavigationPreview>
      3. entire_view - [Viewer_Entire>
      4. modal_resource_manager - [Modal_ResourceManagingWindow>
      5. modal_game_data_manager - [Modal_GameDataManager >
      6. modal_emu_manager - [Modal_EmuManager>
*/}   
//TODO90 page content
  return (
  <div className="textNoSelect">


{cloudDbConnOk === false &&

<>
      <div className="returning_buttons">
            
        <button className="button2" onClick={()=>{chapterChangingOrExiting(); goToProjectManagingPanel(); }}> ← </button>

        <div style={{"width": "200px",  "textAlign": "left", "padding": "5px", "marginTop": "10px"}}>
          <label>{projectNameText}: {projectName}</label>
          {/* <br></br> */}

        </div>    

      </div>


      <div> Unable to connect to database for user: [{authEmailName}] </div>

</>

}


{(cloudDbConnOk === true && authEmailName !== "_" && gridBlocksAll !== undefined && chapterNodeMapAll !== undefined) 

&& <>
<div>
    
    <div className="returning_buttons">
      
      <button className="button2" onClick={()=>{chapterChangingOrExiting(); goToProjectManagingPanel(); }}> ← </button>
 


      <div
        style={{"minWidth": "150px"}}
      >
        <button
          onClick={()=>{
            //fetchcurrChapterContentFromCloud();
            //TODO700: fetch the very first chapter's data?

            startViewerEntireTest();
            
          }}
          className="button testEntire"
        >Test ▶︎ </button>
      </div>

      <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
        
        {authEmailName !== "" && 
        <>
          <button className="rmTab" onClick={()=>{setDisplayRmModal(true);}}> 
            {resourceManagerButtonText} </button>
          
          <button className="rmTab" onClick={()=>{setDisplayGdmBool(true);}}>
            {gameDataManagerButtonText}</button>
          
          <button className="rmTab" onClick={()=>{setDisplayEmBool(true);}}>
            {emuManagerText}
          </button>
        </>}
      

            <div>
                <label>Editor Language</label><br></br>
                <select value={languageCodeTextOption}
                  onChange={(event)=>{
                    userChangeEditorUILang(event.target.value);
                  }}
                >
                  <option key="lang-Eng" value="en">English</option>
                  <option key="lang-chn" value="chn">简体中文</option> 
                  {/* //TODO16 */}
                </select>
            </div>

      </div>

    </div>


    {/*//TODO TESTING */}
                    {/* <div>
                      <input type="checkbox" value={developOnCloudData} checked={developOnCloudData}
                        onChange={()=>{
                          setDevelopOnCloudData(!developOnCloudData);
                        }}
                      ></input><label>TEST toggle: Use Cloud Data</label>
                      <label>Status: {developOnCloudData === true ? "true" : "false"}</label>
                        <button
                          style={{"backgroundColor": "pink"}}
                          onClick={()=>{manuallyResetWithSampleData();}}
                        >reset ds for chapters&nodes</button>
                    </div> */}
    {/*//TODO TESTING */}




    <div>
      <button onClick={()=>{
        let ans = window.confirm("Are you sure to load from cloud and cover the project on local?");
        if (ans) {
          loadEverythingFromCloud();
        }

      }}
      >Load From Cloud</button>

      <button onClick={()=>{
        let ans = window.confirm("Are you sure to save and cover the project on cloud?");
        if (ans) {
          saveEverythingToCloud();
        }

      }}
      >Save To Cloud</button>

      <button>Import from File</button>

      <button
        onClick={()=>{
          downloadEntireProjectFilePart1Meta();
          fetchEntireProjectAllNodesDataFromCloud();
        }}
      >Download Project File</button>

      <button className={showChapterMaker ? "tabBarGMSelected" : "tabBarGM"} onClick={()=>{
        setShowChapterMaker(true);
        }}>
          {contentChaptersTabText}</button>
      <button className={showChapterMaker? "tabBarGM" : "tabBarGMSelected"} onClick={()=>{
        setShowChapterMaker(false);
        if (firstTimeSwitchTabNavPanel === true) {
          fetchProjectNavigationSettingsFromCloud();
          setFirstTimeSwitchTabNavPanel(false);
        }
        }}>
          {menuNavigationsTabText}</button>
    
    
    </div>
    


{/* chapter-and-node setting tab */}
    {showChapterMaker && <div className="parallelFrame sectionArea">

        {!isDisplayRmBool && 
        <ChapterManager 

          initialChapterData={chapterList} 
          getChapterDataInfo={passInChapterList}
          
          chosenChapter={currChapterKey} 
          updateChosenChapterItem={switchChosenChapterItem} 
          
          updateChapterData={updateChapterList} 
          prepareForNewChapterMapping={prepareForNewChapterMapping}
       
          updateLinkingNode={updateLinkingNodeFunc}
          
          getUILanguage={passInUILanguage}

          updateChapterListToCloud={saveChapterListToCloud}
          fetchChapterListFromCloud={fetchChapterListFromCloud}
          triggerCreatedNewChapter={triggerCreatedNewChapter}
          sendOutIsCollapsed={getChapMgrCollapsed}
          
        />}

        {currChapterKey !== "" && 
        <NodeManager 
          currUser={authEmailName}  //TODO
          projectName={projectName} 
          initialChapterKey={currChapterKey}
          getNodeMapOfChapter={passInCurrentChapterNodeMap}
          getCurrChapterKey={passInCurrentChapterKey}
          getGridBlocks={passInCurrentGridBlocks}
          initialNodeMap={(currChapterKey !== "" && chapterNodeMapAll[currChapterKey] !== undefined) ? chapterNodeMapAll[currChapterKey] : {}}
          initialGridBlock={(currChapterKey !== "" && gridBlocksAll[currChapterKey] !== undefined) ? gridBlocksAll[currChapterKey] : []}
          updateNodeMapOfChapter={updateNodeMapOfChapter}
          updateGridBlockOfChapter={updateGridBlockOfChapter}
          getGameData={passInGameDataDesignList}
          displayGameDataPanel={handleGameDataManagerOpen}
          loadChapterInfoFromCaller={passInSelectedChapterInfo_Cloud}
          getGdmUpdatedSignal={passInGdmUpdatedSignal}
          resetGdmUpdateSignal={resetGdmUpdateSignal}
          triggerCreatedNewNode={triggerCreatedNewNode}
          triggerNodeMappingsChange={triggerNodeMappingsChange}

          getChapMgrCollapsed={passInChapMgrCollapsed}
           
          getUILanguage={passInUILanguage}

          getCreatedNewNodeWaitListPending={passInCreatedNewNodeWaitListPending}
          triggerSaveToCloud={saveEverythingToCloud}
          chapterChangingOrExiting={chapterChangingOrExiting}
          triggerNodeDeleted={triggerNodeDeleted}
          //TODO500
        />}


        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}



{/* project-nagivation setting tab */}
    {!showChapterMaker && 
    <>
      

        <div className="sectionArea"> 

          <div>
            {screenSizeForAllNavPageText}: 
            <select
                value={currentProjectNav["screenSize"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["screenSize"] = event.target.value;

                  setCurrentProjectNav({...currentProjectNav, "screenSize": event.target.value});
                }}
                >
                          <option value="" key=""> ----- {selectSizeDirectionText} ----- </option>
                          <option value="16:9(horizonal)" key="nav-setter-16:9(horizonal)"> 16:9 {horizontalMarkText} </option>
                          <option value="16:9(vertical)" key="nav-setter-16:9(vertical)"> 16:9 {verticalMarkText} </option>
                          <option value="4:3(horizonal)" key="nav-setter-4:3(horizonal)"> 4:3 {horizontalMarkText} </option>
                          <option value="4:3(vertical)" key="nav-setter-4:3(vertical)"> 4:3 {verticalMarkText} </option>
            </select>

          </div>

          <div className="parallelFrame">
                     
              <div style={{"marginTop": "15px", "marginLeft": "10px", "marginBottom": "10px"}}>
                <NavigationSetter 
                  initialNavObj={currentProjectNav} 
                  updateNavObj={updateCurrProjectNavObj} 
                  openRm={handleResourceManagerOpen} 
                  triggerUpdateCurrPageName={updateCurrPageName} 
                  fetchPageName={passInCurrSelectedPage}
                  initialScreenHeight={screenHeight}
                  getScreenheight={passInScreenHeight}

                  userName={authEmailName} 
                  projName={projectName} 

                  getUsername={passInAuthEmailName}


                  intialEmuPlayerProfile={testPlayerProfile}
                  openEmuManager={openEmuManager}
                  fetchEmuPlayerProfile={passInPlayerProfile}
                   
                  getUILanguage={passInUILanguage}

                  getVisualMap={passInVisualMap}
                  getAudioMap={passInAudioMap}

                  getGameDataDesign={passInGameDataDesignList}
          
                />
              </div>


              <div style={{"marginTop": "15px", "marginLeft": "15px"}}>
                <NavigationPreview
                  fetchNavObj={passInNavObj} 

                  fetchPageName={passInCurrSelectedPage} 
                  chapterData={chapterList} 

                  triggerUpdateCurrPageName={updateCurrPageName}
                  triggerUpdateCurrentStanding={triggerUpdateCurrentStanding}

                  isEditing={true}
                  initialGameDataRefData={emptyValue}
                  initialPlayerProfileRefData={testPlayerProfile}
                  initialPlayerAccountRefData={testPlayerAccount}

                  fetchPlayerInfoSets={passInPlayerInfoSets}
                  fetchCurrentGameData={passInCurrentGameDataList}

 
                  getUILanguage={passInUILanguage}
                  initialUILanguage={languageCodeTextOption}

                  fetchShopItemInfo={passInShopItemInfo}
                  fetchPlayerPurchaseInfo={passInPlayerPurchaseStatus}

                  visualMap={visualMap}
                  audioMap={audioMap}
                  sendOutGameSettingScaleObjFromSubCompo={notUsing}

                  getOpenSettingSignal={passInFalseBool}
                  closeSettingsPage={notUsing} 
                  //TODO later: change to page-changing func for nav-setter

                  />
              </div>
          </div>
    </div>
    
    
    </>
    }





{/*  Entire Viewing -- all parts  */}
    {isDisplayEntireGameViewer && 

<div className={modalStyleName} style={{}}>

        <button className="testEntire" onClick={()=>{closeEntireGameViewer();}}>Stop Testing</button>
        <button
          className="testEntire" 
          onClick={()=>{
              setMutedViewOption(!mutedViewOption);
          }}
        >
          {mutedViewOption === true && <label>Unmute</label>}
          {mutedViewOption === false && <label>Mute</label>}

        </button>
    

<div style={{"display": "flex"}}>
    {/* entire-viewer-screen */}
      <div
        style={{
          "height": `${screenHeight+2}px`,
          "width": `${screenWidth+2}px`,
        }}
      >

         

      <Viewer_Entire

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

      />



    {/* status table */}
      <table style={{"width": "800px", "marginTop": `${screenHeight+20}px`, "marginLeft": "170px","position": "absolute"}}>
              <thead>
                <tr>
                  <th>Current Page Status</th>
                  <th>Current Chapter-Key</th>
                  <th>Current Node-Key</th>
                  <th>Current Node-Type</th>
                </tr>
              </thead>

              <tbody> 
                <tr>
                  <td>{currTestingPageStatus}</td>
                  <td>{currTestingChapterKey}</td>
                  <td>{currTestingNodeKey}</td>
                  <td>{currTestingNodeType}</td>         
                </tr>
      

              </tbody>

            </table>

      </div>


    {/* game data table panel  */}
      <div>
           
        
            {/* game data info */}
            {/* screenWidth > screenHeight means horizontal game-screen */}
            {/* //TODO current: when testing, "localTest" is temporarily true; later change to "false" */}
            {/* {(isDisplayEntireGameViewer && showGameDataPanel) */}
            {/* {isDisplayEntireGameViewer */}
            {/* //TODO700 recover this later */}

            {false
           
            && 
              <div style={{
                "marginLeft": "-850px",
                "height": `${screenHeight}px`, 
                 
              }}>

                <Panel_GameDataTest
                       localTest={true}
                       initialGameDataStatus={gameDataTracker}

                       getScreenHeight={passInScreenHeight} 
                       getScreenWidth={passInScreenWidth}
                       isQuickView={false}

                       receiveGameDataObj={passInPlayerGameDataTracker}

                       getUILanguage={passInUILanguage}
                /> 
        
              </div>
            }


          </div>


</div>

      </div>}
{/*  Entire Viewing -- all parts  */}















</div>







<div>

          
          {/* {<div
            style={{
              "display": isDisplayRmBool === false ? "none" : "flex",
            }}
          > */}
          
          {isDisplayRmBool === true && <div>

              <Modal_ResourceManagingWindow 

                isDisplay = {isDisplayRmBool} 
                handleRmCancel={handleResourceManagerCancel} 
                handleRmSaveChanges={handleResourceManagerSaveChanges}
                refresh={triggerRefreshFetchCloudData}
                triggerRmUpdate={notifyRmUpdated}

                getUILanguage={passInUILanguage}  //TODO20 languageOption

                projName={projectName}   
                getUsername={passInAuthEmailName}

                getOfflineModeName={passInOfflineModeName}

              />
          
          </div>}


          {/* {<div
            style={{
              "display": isDisplayGdmBool === false ? "none" : "flex",
            }}
          > */}

          {isDisplayGdmBool === true && <div>
       
              <Modal_GameDataManager 
                isDisplay={isDisplayGdmBool} 
                handleGdmCancel={handleGameDataManagerCancel} 
                resetNeedCloudData={markNextNeedCloudGameData} 

                getUILanguage={passInUILanguage}  //TODO20 languageOption

                projName={projectName}  
                getUsername={passInAuthEmailName}

                getOfflineModeName={passInOfflineModeName}

                updateForEmuGdt1={getUserConfigFromDataMgr1Gdt}

                updateGameDataDesignListToOuterLayer={updateGameDataDesignList}

              />

          </div>}

{/* 
          {<div
            style={{
              "display": isDisplayEmBool === false ? "none" : "flex",
            }}
          > */}


          {isDisplayEmBool === true && <div>

            <Modal_EmuManager
              handleEmCancel={handleEmuManagerCancel}

              update1Gdt={getUserConfigFromEmuManager1Gdt}
              update2Epp={getUserConfigFromEmuManager2Epp}
              update3Epa={getUserConfigFromEmuManager3Epa}
              update4Ess={getUserConfigFromEmuManager4Ess}
              update5Shp={getUserConfigFromEmuManager5Shp}

              getUILanguage={passInUILanguage}
              isForGameMaker={true}

              projName={projectName}  
              getUsername={passInAuthEmailName}

              getOfflineModeName={passInOfflineModeName}
            />
          </div>}


</div>
</>} 
{/* cloudDbConnOk */}



  </div>


  








); //end of entire component
}
























































































//default -     current Project Nav
    /*
    "screenSize": "4:3(horizonal)",
    "defaultCornerRadius": 0,
    
    "isWithSL": false,
    "fontFamilyForAll": "serif",

    "mainPage-story": true,
    "mainPage-shop": true,
    "mainPage-setting": true,
    "mainPage-playerProfile": true,
    "mainPage-entriesHorizontal": false,
    "mainPage-entriesCustom": false,

    "mainPage-isBackgroundShape": false,
    "mainPage-bgShadeName": "rgb(222, 222, 235)",
    "mainPage-bgPicName": "",
    "mainPage-isListItemShape": true,
    "mainPage-listItemShadeName": "#c0cfe2",
    "mainPage-listItemPicName": "",
    "mainPage-listItemGroupX": 600,
    "mainPage-listItemGroupY": 150,
    "mainPage-listItemGroupWidth": 120,
    "mainPage-listItemGroupHeight": 60,
    "mainPage-listItemGap": 3,
    "mainPage-listItemGroupFontColor": "",
    "mainPage-listItemGroupFontSize": 10,
    "mainPage-listItemGroupCornerRadius": 0, //TODO
    "mainPage-listItemTextFont": "serif", //TODO

    "mainPage-story-isShape": false,
    "mainPage-story-shadeName": "#c0cfe2",
    "mainPage-story-picName": "",
    "mainPage-setting-isShape": false,
    "mainPage-setting-shadeName": "#c0cfe2",
    "mainPage-setting-picName": "",
    "mainPage-playerProfile-isShape": false,
    "mainPage-playerProfile-shadeName": "#c0cfe2",
    "mainPage-playerProfiley-picName": "",
    "mainPage-shop-isShape": false,
    "mainPage-shop-shadeName": "#c0cfe2",
    "mainPage-shop-picName": "",

    "mainPage-story-posX": 300,
    "mainPage-story-posY": 100,
    "mainPage-story-width": 100,
    "mainPage-story-height": 60,
    "mainPage-story-fontSize": 10,
    "mainPage-story-fontColor": "",
    "mainPage-setting-posX": 300,
    "mainPage-setting-posY": 220,
    "mainPage-setting-width": 100,
    "mainPage-setting-height": 60,
    "mainPage-setting-fontSize": 10,
    "mainPage-setting-fontColor": "",
    "mainPage-playerProfile-posX": 300,
    "mainPage-playerProfile-posY": 160,
    "mainPage-playerProfile-width": 100,
    "mainPage-playerProfile-height": 60,
    "mainPage-playerProfile-fontSize": 10,
    "mainPage-playerProfile-fontColor": "",
    "mainPage-shop-posX": 300,
    "mainPage-shop-posY": 280,
    "mainPage-shop-width": 100,
    "mainPage-shop-height": 60,
    "mainPage-shop-fontSize": 10,
    "mainPage-shop-fontColor": "",

    "mainPage-story-name": "Story",
    "mainPage-setting-name": "Settings",
    "mainPage-playerProfile-name": "Player Profile",
    "mainPage-shop-name": "shop",

    "saveloadPage-isBackgroundShape": false,
    "saveloadPage-bgShadeName": "rgb(222, 222, 235)",
    "saveloadPage-bgPicName": "",
    "saveloadPage-isSlotShape": false,
    "saveloadPage-slotShadeName": "#c0cfe2",
    "saveloadPage-slotPicName": "",
    "saveloadPage-slotListIsHorizontal": false,
    "saveloadPage-slotPerPage": 3,
    "saveloadPage-slotRowCount": 2,
    "saveloadPage-slotColCount": 3,
    "saveloadPage-slotPageCount": 10,
    "saveloadPage-slotWidth": 500,
    "saveloadPage-slotHeight": 75,
    "saveloadPage-slotGap": 3, 
    "saveloadPage-groupPosX": 150,
    "saveloadPage-groupPosY": 100,
    
    "settingPage-playSpeed": true,
    "settingPage-bgmVol": true,
    "settingPage-seVol": true,
    "settingPage-entriesHorizontal": false,
    "settingPage-entriesCustom": false,

    "settingPage-isBackgroundShape": false,
    "settingPage-bgShadeName": "rgb(222, 222, 235)",
    "settingPage-bgPicName": "",
    "settingPage-isListItemShape": false,
    "settingPage-listItemShadeName": "#c0cfe2",
    "settingPage-listItemPicName": "",
    "settingPage-listItemGroupX": 130,
    "settingPage-listItemGroupY": 60,
    "settingPage-listItemGroupWidth": 550,
    "settingPage-listItemGroupHeight": 75,
    "settingPage-listItemFontSize": 20,
    "settingPage-listItemFontColor": "",
    "settingPage-listItemGap": 30,
    "settingPage-playSpeedName":"Play Speed",
    "settingPage-bgmVolName": "Background Music Volume",
    "settingPage-seVolName": "Sound Effect Volume",
    "settingPage-sliderWidth": 350,
    "settingPage-sliderHeight": 50,
    "settingPage-sliderColor": "#0373fc",

    "playerProfilePage-isBackgroundShape": false,
    "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
    "playerProfilePage-bgPicName": "",
    "playerProfilePage-itemMap": [],

    "playerProfilePage-previewingTextObj-isPreviewing": false,
    "playerProfilePage-previewingTextObj-textContent": "",
    "playerProfilePage-previewingTextObj-textItalic": false,
    "playerProfilePage-previewingTextObj-textFontSize": 12,
    "playerProfilePage-previewingTextObj-textFont": "serif",
    "playerProfilePage-previewingTextObj-textColor": "#000000",
    "playerProfilePage-previewingTextObj-posX": 30,
    "playerProfilePage-previewingTextObj-posY": 50,

    "playerProfilePage-previewingValueObj-isPreviewing": false,
    "playerProfilePage-previewingValueObj-labelText": "",
    "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
    "playerProfilePage-previewingValueObj-valueItemName": "",
    "playerProfilePage-previewingValueObj-posX": 30,
    "playerProfilePage-previewingValueObj-posY": 70,
    "playerProfilePage-previewingValueObj-textFontSize": 12,
    "playerProfilePage-previewingValueObj-textFont": "serif",
    "playerProfilePage-previewingValueObj-textColor": "#000000",

    "playerProfilePage-previewingPicObj-isPreviewing": false,
    "playerProfilePage-previewingPicObj-posX": 50,
    "playerProfilePage-previewingPicObj-posY": 50,
    "playerProfilePage-previewingPicObj-picName": "",
    "playerProfilePage-previewingPicObj-width": 200,
    "playerProfilePage-previewingPicObj-height": 200,

    "playerProfilePage-playerProfileNickNameItem-adding": true,
    "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "",
    "playerProfilePage-playerProfileNickNameItem-textContent": "",
    "playerProfilePage-playerProfileNickNameItem-textItalic": false,
    "playerProfilePage-playerProfileNickNameItem-textFontSize": 12,
    "playerProfilePage-playerProfileNickNameItem-textFont": "serif",
    "playerProfilePage-playerProfileNickNameItem-textColor": "#000000",
    "playerProfilePage-playerProfileNickNameItem-posX": 357,
    "playerProfilePage-playerProfileNickNameItem-posY": 300,

    "playerProfilePage-playerProfileIconPicItem-adding": true,
    "playerProfilePage-playerProfileIconPicItem-posX": 275,
    "playerProfilePage-playerProfileIconPicItem-posY": 50,
    "playerProfilePage-playerProfileIconPicItem-width": 200,
    "playerProfilePage-playerProfileIconPicItem-height": 200,
    "playerProfilePage-playerProfileIconPicItem-scale": 1,



    "shopPage-isBackgroundShape": false,
    "shopPage-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-bgPicName": "",
    
    "shopPage-listItem-isBackgroundShape": false,
    "shopPage-listItem-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-listItem-bgPicName": "",
    "shopPage-listItem-width": 150,
    "shopPage-listItem-height": 200,
    "shopPage-listItem-gap": 15,
    "shopPage-listItem-groupX": 0,
    "shopPage-listItem-groupY": 30,
    "shopPage-listItem-cornerRadius": 0,
    "shopPage-listItem-buyText": "Buy",   
    "shopPage-listItem-infoText": "Info",

    "shopPage-bConfWindow-width": 500,
    "shopPage-bConfWindow-height": 200,
    "shopPage-bConfWindow-textColor": "#000000",
    "shopPage-bConfWindow-bgColor": "pink",
    "shopPage-bConfWindow-cornerRadius": 0,
    "shopPage-bConfWindow-cancelText": "Cancel",    
    "shopPage-bConfWindow-confirmText": "Confirm",    
        

    "storyPage-chapterListHorizontal": false,
    "storyPage-isBackgroundShape": false,
    "storyPage-bgShadeName": "rgb(222, 222, 235)",
    "storyPage-bgPicName": "",
    "storyPage-isListItemShape": true,
    "storyPage-listItemShadeName": "#c0cfe2",
    "storyPage-listItemPicName": "",
    "storyPage-listItemGroupX": 120,
    "storyPage-listItemGroupY": 182,
    "storyPage-listItemGroupWidth": 560,
    "storyPage-listItemGroupHeight": 45,
    "storyPage-listItemGap": 25,
    "storyPage-listItemGroupFontColor": "",
    "storyPage-listItemGroupFontSize": 22,

    "gsdPage-isBackgroundShape": false,
    "gsdPage-bgShadeName": "rgb(222, 222, 235)",
    "gsdPage-bgPicName": "",

    "backButton-width": 50,
    "backButton-height": 50,
    "backButton-isShape": false,
    "backButton-shapeColor": "#c0cfe2",
    "backButton-picName": "",
    "backButton-displayText": "←",
    "backButton-fontSize": 15,

    "outWindow-askContent": "Are you sure to quit the story?",
    "outWindow-width": 200,
    "outWindow-height": 90,
    "outWindow-Btn-cornerRadius": 0,
    "outWindow-Btn-color": "grey",
    "outWindow-Btn-textColor": "#FFFFFF",
    "outWindow-Btn-confirmingText": "confirm",
    "outWindow-Btn-cancellingText": "cancel",
    "outWindow-horizontalCentred": true,
    "outWindow-verticalCentred": true,
    "outWindow-windowCornerRadius": 0,
    "outWindow-posX": 200,
    "outWindow-posY": 230,
    "outWindow-isShape": false,
    "outWindow-color": "pink",
    "outWindow-picName": "",
  */  


    /*  sample of gridBlocksAll
     "chp-key1": 
      [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart","A1-key","","","D1-key","E1-key","","","",""], 
        ["","","","","","","","","",""],
        ["C1-key","","","B1-key","","","chapterEnd","","",""]
      ]
    ,
      "chp-key2": [
          ["","","","","","","","","",""], 
          ["","","","","","","","","",""],
          ["chapterStart","A2-key","","","D2-key","E2-key","","","",""], 
          ["","","","","","","","","",""],
          ["C2-key","","","B2-key","","","chapterEnd","","",""]
      ],  
    
    */
/* sample of node-map-all
  "chp-key1": {"chapterStart": {
              nodeName: "chapterStart1-title", 
              row: 2, 
              col: 0, 
              nextNode:"A1-key", 
              display: true, 
              nodeType:"*chapterStart*", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "A1-key": {
              nodeName: "A1-title", 
              row: 2, 
              col: 1, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "B1-key": {
              nodeName: "B1-title", 
              row: 4, 
              col: 3, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "C1-key": {
              nodeName: "C1-title", 
              row: 4, 
              col: 0, 
              spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],  
              display: true, 
              nodeType:"LogicSplitter",
              notes: "",
          },
          "D1-key": {
              nodeName: "D1-title", 
              row: 2, 
              col: 4, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "E1-key": {
              nodeName: "E1-title", 
              row: 2, 
              col: 5, 
              nextNode: "chapterEnd", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "chapterEnd": {
              nodeName: "chapterEnd1-title", 
              row: 4, 
              col: 6, 
              nextNode: "", 
              display: true, 
              nodeType:"*chapterEnd*", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
  },
  "chp-key2": {"chapterStart": {
            nodeName: "chapterStart2-title", 
            row: 2, 
            col: 0, 
            nextNode:"A2-key", 
            display: true, 
            nodeType:"*chapterStart*", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "A2-key": {
            nodeName: "A2-title", 
            row: 2, 
            col: 1, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "B2-key": {
            nodeName: "B2-title", 
            row: 4, 
            col: 3, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "C2-key": {
            nodeName: "C2-title", 
            row: 4, 
            col: 0, 
            spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],    //TODO refactor 
            display: true, 
            nodeType:"LogicSplitter",
            notes: "",
        },
        "D2-key": {
          nodeName: "D2-title", 
          row: 2, 
          col: 4, 
          nextNode: "", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
        "E2-key": {
          nodeName: "E2-title", 
          row: 2, 
          col: 5, 
          nextNode: "chapterEnd", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
        "chapterEnd": {
          nodeName: "chapterEnd2-title", 
          row: 4, 
          col: 6, 
          nextNode:"", 
          display: true, 
          nodeType:"*chapterEnd*", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
},
*/   
