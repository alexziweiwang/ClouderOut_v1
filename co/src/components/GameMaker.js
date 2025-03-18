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


//TODO20 cloud-func (marked)
import { getProjectGameDataDesignVM, updateGameDataDesignVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { updateProjectUILangVM, fetchProjectUILangVM, updateProjectNavigationSettingsVM, fetchProjectNavigationSettingsVM } from '../viewmodels/ProjectManagerViewModel';
import { fetchChapterNodesDataVM, updateChapterNodesToCloudDataVM,fetchAllChapterListVM, updateChapterListToCloudVM } from '../viewmodels/ChapterInfoViewModel';
import { addNewNodeFoldersVM } from '../viewmodels/NodeEditingViewModel';
import { addNewChapterFoldersVM } from '../viewmodels/ChapterInfoViewModel';

import { fetchNodeDataEachNodeVM, fetchNodeDataEachChapterVM, fetchNodeDataEntireProjectVM } from '../viewmodels/NodeDataInPlayViewModel';
//TODO112: fetch node-contents here, and send into Viewer_Entire and its sub-component [GameScreen_AllNodeTypeContainer]


import langDictionary from './textDictionary';
import uiLangMap from './uiLangMap';


export default function GameMaker({username, projectName}) {

  
  const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

  const [screenHeight, setScreenHeight] = useState(600);
  const [screenWidth, setScreenWidth] = useState(800); //TODO

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

  const [chapterList, setChapterList] = useState(
    [
      ["chp-key1", "testChapter1", "display", ""], 
      ["chp-key2", "testChapter2", "display", ""],
    ]); //TODO fetch from cloud db when entering game-maker
//TODO36

  const [isDisplayRmBool, setDisplayRmModal] = useState(false);
  const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);
  const [isDisplayEmBool, setDisplayEmBool] = useState(false);


  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");

  const [createNodeFolderSignal, setCreateNodeFolderSignal] = useState(false);
  const [createdNewNodeWaitlist, setCreatedNewNodeWaitlist] = useState([]);
  const [createdNewChapterList, setCreatedNewChapterList] = useState([]);
  const [createdChapterFolderSignal, setCreatedChapterFolderSignal] = useState(false);

  const [visualMap, setVisualMap] = useState([]); 
  const [audioMap, setAudioMap] = useState([]);

  const [allNodesContainer, setAllNodesContainer] = useState([]); //TODO200


    async function fetchProjResourceLists() {
      if (username === "default-no-state username" || projectName === "default-no-state projectName") {
        return;
      }


      /* fetch from cloud db */
      //TODO300     
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projectName});
      
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
                                        console.log("initialized visual map = ", tempMap); //TODO test

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
                                        console.log("initialized audio map = ", tempMap); //TODO test
        
        setAudioMap(tempMap);
    }


//TODO ------------------------------------------------------ testing data area

  const [chapterNodeMapAll, setChapterNodeMapAll] = useState({});
  const [gridBlocksAll, setGridBlocksAll] = useState({}); //stores node-keys

  const [nodeMapUpdatedSignal , setNodeMapUpdatedSignal] = useState(false);
  const [gridBlocksUpdatedSignal, setGridBlocksUpdatedSignal] = useState(false);


  const emptyConversationNodeTemplate = {
    "num": -1, 
    "content": "", 
    "speaker_name": "", 
    "bgp_pos_x": 0, 
    "bgp_pos_y": 0, 
    "bgp_width": {screenWidth}, 
    "bgp_height": {screenHeight}, 
    "chp_arr": [], 
    "stnd_btn_arr": [], 
    "clkb_arr": [],
    "bgm_loop": true, 
    "bgm_volume": 100, 
    "vl_source_link": "", 
    "vl_volume": 100,
    "displayTextFrame": true
  };  

  //TODO501 node-ui template...


 // const [currentChapterNodeMap, setCurrentChapterNodeMap] = useState({});           //--- not used ---
 // const [gridBlocks, setGridBlocks] = useState([]); //stores node-keys              //--- not used ---






  const [isChapMgrCollapsed, setChapMgrCollapsed] = useState(false);

  
//TODO23 update to and fetch from cloud for this project !!!
  const [currentProjectNav, setCurrentProjectNav] = useState({
    
  }); //TODO now: default initial values

  const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({});   //TODO important for holder-in-practice
  const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                                 //TODO important for holder-in-practice
  const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                               //TODO important for holder-in-practice
  const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
      "playername": "playerA",
      "itemStatus": [{}, {}, {}]
    });
    
  const [testShopProducts, setTestShopProducts] = useState({});
  const [testPlayerPurchaseStatus, setTestPlayerPurchaseStatus] = useState({});

                                                            //TODO important for holder-in-practice
//TODO ------------------------------------------------------ testing data area

    const [selectedGameDataPanelBetween2, setSelectedGameDataPanelBetween2] = useState(true);

  const [gameDataDesignList, setGameDataDesignList] = useState({});
  const [gameDataArray, setGameDataArray] = useState([]);

  function manuallyResetWithSampleData() {

  setChapterNodeMapAll({
    "chp-key1": {"chp-key1_start": {
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
      nextNode: "chp-key1_end", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "chp-key1_end": {
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
"chp-key2": {"chp-key2_start": {
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
  nextNode: "chp-key2_end", 
  display: true, 
  nodeType:"Conversation", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
"chp-key2_end": {
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
      ["chp-key1_start","A1-key","","","D1-key","E1-key","","","",""], 
      ["","","","","","","","","",""],
      ["C1-key","","","B1-key","","","chp-key1_end","","",""]
    ]
  ,
    "chp-key2": [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chp-key2_start","A2-key","","","D2-key","E2-key","","","",""], 
        ["","","","","","","","","",""],
        ["C2-key","","","B2-key","","","chp-key2_end","","",""]
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
    
    
    const gdataTestResult = await getProjectGameDataDesignVM({projectName: project, uname: username, mostUpdated: isUpdated});
    if (gdataTestResult === undefined) {
      console.log("Error: no game_data in this project...");
      return;
    }
              console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
    setGameDataDesignList(gdataTestResult);
    return gdataTestResult;

  }

  const [needCloudGameData, setNeedCloudGameData] = useState(true);


  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }

  function updateGameDataDesignSettingToCloud(gameDataLatest) {

    let project = "";
    project  = projectName;
    if (project.trim() === "") {
      return;
    }
    updateGameDataDesignVM({projectName: project, uname: username, gameData: gameDataLatest});

    //TODO3: change signal for other components using game-data (such as node-manager, viwer, etc.)
    setGdmUpdatedSignal(true);
    
    setGameDataDesignList(gameDataLatest); // update game-data here, so then it can send to callees with the latest ver. of data

  }

  function passInGdmUpdatedSignal() {
    return gdmUpdatedSignal;
  }

  function resetGdmUpdateSignal() {
    setGdmUpdatedSignal(false);
  }

  async function getChapterDataFromCloud(chapter) {
    return await getChapterDataVM({projectName: projectName, uname: username, chapterName: chapter});
   
  }

  function passInGameDataDesignList() {
    return gameDataDesignList;
  }

  function passInSelectedChapterInfo_Cloud() {
    //TODO fetch cloud-info !


    return chapterNodeMapAll[currChapterKey]; //temporary
  }


 
                                  //const [secondTimeEnter, setSecondTimeEnter] = useState(true);

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {

    window.onbeforeunload = () => {
      return "show message";
    }
               //               console.log("gridBlocksUpdatedSignal = ", gridBlocksUpdatedSignal);
                  
                  
              //                console.log("curr chapter-key = ? ", currChapterKey, " data = ", chapterNodeMapAll[currChapterKey], "  from  ", chapterNodeMapAll);


    if (firstTimeEnter === true) {


        console.log("!!! First Enter - GameMaker: ");//TODO testing

    
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        triggerRefreshFetchCloudData();


        fetchChapterNodeMappingFromCloud();
        fetchProjectNavigationSettingsFromCloud();
        
        fetchUILangFromCLoud();

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

  function firstSetupUILanguage() {
    return fetchUILangFromCLoud()
  }

  async function fetchUILangFromCLoud() {
    let obj= {projectName: projectName, currUser: username}
    let ans = await fetchProjectUILangVM(obj); //TODO21

    setLanguageCodeTextOption(ans);
    return ans;
  }

  function pureNavigateToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });

  }

  async function goToProjectManagingPanel() {

    let saveOrNot = window.confirm("Save all changes and exit?");
    if (saveOrNot) {
          if (currChapterKey !== "") {
            await updateChapterNodeMappingsToCloud(); 
            await saveNewlyCreatedNodeFolder();
          }

          pureNavigateToProjectManagingPanel();
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


  //TODO21 refactor to VM
  function prepareForNewChapterMapping(newKey) {
    
    //update all-node-map
    let nodeMapTemp = chapterNodeMapAll;
    let chapterStartKeyStr = "chapterStart-key-" + newKey;
    let chapterStartTitleStr = "chapterStart-title-" + newKey;

    let chapterEndKeyStr = "chapterEnd-key-" + newKey;
    let chapterEndTitleStr = "chapterEnd-title-" + newKey;

    let obj = {};
    obj[chapterStartKeyStr] = {
      nodeName: chapterStartTitleStr, 
      row: 2, 
      col: 0, 
      nextNode:"", 
      display: true, 
      nodeType:"*chapterStart*", 
      screenSize:"4:3(horizonal)"
    };
    obj[chapterEndKeyStr] = {
      nodeName: chapterEndTitleStr, 
      row: 2, 
      col: 5, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"4:3(horizonal)"
    };
    nodeMapTemp[newKey] = obj;

    setChapterNodeMapAll(nodeMapTemp);
    setNodeMapUpdatedSignal(true);

    //add all-grid-block
    let gridAllTemp = gridBlocksAll;
    gridAllTemp[newKey] = [
      ["","","","","","","","","",""], 
      ["","","","","","","","","",""],
      [chapterStartKeyStr,"","","","", chapterEndKeyStr,"","","",""], 
      ["","","","","","","","","",""],
      ["","","","","","","","","",""]
    ];
    //TODO200 flexible grid-scales


    setGridBlocksAll(gridAllTemp);
    setGridBlocksUpdatedSignal(true);


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
        //TODO ask if save to cloud?
      if (currChapterKey === "") {
        return;
      }
      if (createNodeFolderSignal === true) {
          let answer = window.confirm("Save current chapter data to cloud?");
          if (answer) {
              //by createdNewNodeWaitlist, update cloud-folders...
              //TODO37

              await saveNewlyCreatedNodeFolder();

              await updateChapterNodeMappingsToCloud(); //TODO later: check same ver., if different then update
          }
      }
  }

  async function editorExitingHandleChapterMgr() {
      //save newly-created-chapter-folders
      if (createdChapterFolderSignal === true) {

          await addNewChapterFoldersVM({
            project: projectName,
            username: username,
              chapterKeyList: createdNewChapterList
          });
      }
  
      setCreatedNewChapterList([]);

      setCreatedChapterFolderSignal(false);

  }

  //TODO21 refactor to VM
  async function saveNewlyCreatedNodeFolder() {
//TODO600

    if (createdNewNodeWaitlist.length === 0) {
      return;
    }

    if (createNodeFolderSignal === true) {
          //by signal, add a new document at /"nodes"

                          console.log("updating to cloud: func-step1-node-folders ", createdNewNodeWaitlist);

          await addNewNodeFoldersVM(
            { 
                project: projectName,
                username: username,
                nodeList: createdNewNodeWaitlist, 
                chapterKey: currChapterKey
            }
          );
          //TODO36

          setCreatedNewNodeWaitlist([]);

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
  
  function updateChapterList(chapterData) {
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

  function passInProjectNavData() {
      return currentProjectNav;
  }

  function updateProjectNavData(data) {
    setCurrentProjectNav(data);
  }

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

      let obj= {projectName: projectName, currUser: username, selectedUILang: val};
      await updateProjectUILangVM(obj);
    }
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
  }

  function passInShopItemInfo() {
  //  console.log("game-maker shop product info", testShopProducts);
    return testShopProducts;
  }

  function passInPlayerPurchaseStatus() {
    return testPlayerPurchaseStatus; //TODO30
  }


  //TODO21 refactor to VM
  async function updateChapterNodeMappingsToCloud() {
    //TODO transfer gridBlocksAll into non-nested array
    //TODO send nodeMap
    if (nodeMapUpdatedSignal === true || gridBlocksUpdatedSignal === true) {

console.log("updating to cloud ... func-step2-all-node-mapping-grid", gridBlocksAll);
console.log("updating to cloud ... func-step2-all-node-mapping-nodemap", chapterNodeMapAll);


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
            currUser: username,
            chapterNodeMappingObj: chapterNodeMapAll, 
            chapterNodeGridBlocks: gridMapTemp
        });      
        setNodeMapUpdatedSignal(false);
        setGridBlocksUpdatedSignal(false);

    }
    
    
    alert("All contents are updated.");
    console.log("update-Chapter-Node-Mappings-To-Cloud!");
  }


  //TODO21 refactor to VM
  function triggerCreatedNewNode(newNodeKey, chapterKeyTemp, nodeTypeTemp) {
    setCreateNodeFolderSignal(true);
    let newNodeList = createdNewNodeWaitlist;
    let infoObj = {
      "nodeKey": newNodeKey,
      "chapKey": chapterKeyTemp,
      "nodeType": nodeTypeTemp,
    }


    let nodeObj = {};

    if (nodeTypeTemp === "Conversation") {
      nodeObj["nodeContent"] = emptyConversationNodeTemplate;

      //TODO add conv-ui obj

    }

    infoObj["detailObj"] = nodeObj;






    newNodeList.push(infoObj);
    setCreatedNewNodeWaitlist(newNodeList); // append this node into node-adding-list ...
    

    //TODO500 TO-DEBUG!   add initial data for the blank node!!    *important

    //TODO according to type, add new-node template?
    //TODO add this node-obj into project-chapter-nodes on cloud

  }



  function triggerCreatedNewChapter(nodeChapterKey) {
    //TODO39
    let list = createdNewChapterList;
    list.push(nodeChapterKey);
    setCreatedNewChapterList(list);
    setCreatedChapterFolderSignal(true);

  }

  function convertNodeMapToGridBlocks(nodeMapTemp) {


//TODO200 change ways to initialize grid blocks             
    let gridEntireTemp = [];

    // make conversion(format of stored grid blocks) of grid-blocks
    let j = 0;
    let gridTempMap = {};
    let gridTempArr = [];
console.log("convertNodeMapToGridBlocks with ", nodeMapTemp);
    let rowMax = 0;
    let colMax = 0;

    Object.keys(nodeMapTemp).map((chapterKey) => {  
      let currChapter = nodeMapTemp[chapterKey];
        console.log("nodeMapTemp[chapterKey] = ", nodeMapTemp[chapterKey]);

      Object.keys(currChapter).map((nodeKeyTemp) => {  
        let currNode = currChapter[nodeKeyTemp];
        console.log("\tcurrChapter[nodeKeyTemp] = ", currChapter[nodeKeyTemp]);
        let currRow = currNode["row"];
        if (currRow > rowMax) {
          rowMax = currRow;
        }
        let currCol = currNode["col"];
        if (currCol > colMax) {
          colMax = currCol;
        }
      });

      colMax = colMax + 10;
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

        console.log("r = ", currRow, " ... col = ", currCol, " ....... node = ", nodeKeyTemp);
      
        maxGrid[currRow][currCol] = nodeKeyTemp;
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
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        



    let data = await fetchChapterNodesDataVM({   
        projectName: projectName, 
        currUser: username,
    });

    if (data === undefined || data === null) {
      return;
    }

  
    
                                        //  console.log("!!! data.chapterNodeGridBlocks = ", data.chapterNodeGridBlocks);
    let gridChapterMap = {};



//TODO...............
    gridChapterMap = convertNodeMapToGridBlocks(data.chapterNodeMapping);
    
//TODO...............

//TODO20 refactored func




    setGridBlocksAll(gridChapterMap);






    setChapterNodeMapAll(data.chapterNodeMapping);


                                       console.log("FromCloud !!! data.chapterNodeMapping = ", data.chapterNodeMapping);

                                       console.log("FromCloud !!! after conversion ... GridBlocks = ", gridChapterMap);


  }

  function passInChapterNodeMapping() {
    return chapterNodeMapAll;
  }

  async function updateProjectNavigationSettingsToCloud() {

    await updateProjectNavigationSettingsVM({
      projectName: projectName, 
      currUser: username,
      dataObj: currentProjectNav
    });
    
  }

  async function fetchProjectNavigationSettingsFromCloud() {

    let data = await fetchProjectNavigationSettingsVM({
      projectName: projectName, 
      currUser: username,
    })
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
        currUser: username,
        chapterListData: chapterListMap
      }
    )

  }


  //TODO21 refactor to VM
  async function fetchChapterListFromCloud() {
    let listTemp = await fetchAllChapterListVM(
      {
        projectName: projectName, 
        currUser: username      
      }      
    );

    if (listTemp === undefined || listTemp === null) {
      console.log("test func-fetchChapterListFromCloud(): ...data is invalid");
      return;
    }


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
    console.log("test func-fetchChapterListFromCloud(): ", arrTemp);
    // setChapterList(arrTemp);



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
  }



  function triggerNodeWalk(nodeKeyName, nodeTypeName) { //important for viewing //from sub-compo
    setCurrTestingNodeKey(nodeKeyName);
    setCurrTestingNodeType(nodeTypeName);
  }

  function triggerChapterWalk(chapterKeyName, chapterTitleName) { //important for viewing //from sub-compo
    setCurrTestingNodeKey(chapterKeyName + "_start");
    setCurrTestingNodeType("*chapterStart*");
    setCurrTestingChapterKey(chapterKeyName);
    setCurrTestingChapterTitle(chapterTitleName);
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

  async function fetchAllNodesContainerFromCloud() {
    //TODO201 strategy: load chapter data for each chapter (optional)?


    // console.log("...fetchAllNodesContainerFromCloud - chapterNodeMapAll = ", chapterNodeMapAll);


    // let chapNodeKeyDs = fromNodeMapToChapterNodeKeyDs();
    // console.log("...fetchAllNodesContainerFromCloud - chapNodeKeyDs = ", chapNodeKeyDs);


    let data = await fetchNodeDataEntireProjectVM({
      uname: username, 
      projectName: projectName
    });

    if (data !== undefined) {
      setAllNodesContainer(data);
    }

    console.log("fetchAllNodesContainerFromCloud, data = ", data);
    

    //TODO200
  
  }

  function passInAllNodesContainer() {
    return allNodesContainer;
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
<div>
    
    <div className="returning_buttons">
      
      <button className="button2" onClick={()=>{chapterChangingOrExiting(); goToProjectManagingPanel(); }}> ← </button>

      <div style={{"width": "200px",  "textAlign": "left", "padding": "5px", "marginTop": "10px"}}>
        <label>{projectNameText}: {projectName}</label>
      
      </div>    


      <div
        style={{"minWidth": "150px"}}
      >
        <button
          onClick={()=>{
            fetchAllNodesContainerFromCloud();

            setDisplayEntireGameViewer(true);
          }}
          className="button testEntire"
        >Test ▶︎ </button>
      </div>

      <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
        <button className="rmTab" onClick={()=>{setDisplayRmModal(true);}}> {resourceManagerButtonText} </button>
        <button className="rmTab" onClick={()=>{setDisplayGdmBool(true);}}>{gameDataManagerButtonText}</button>
        <button className="rmTab" onClick={()=>{setDisplayEmBool(true);}}>
          {emuManagerText}
        </button>
      

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
        fetchProjectNavigationSettingsFromCloud();
        fetchChapterNodeMappingFromCloud();
      }}
      >Load From Cloud</button>

      <button onClick={()=>{
        updateProjectNavigationSettingsToCloud();
        updateChapterNodeMappingsToCloud(); 
        saveNewlyCreatedNodeFolder(); 
        editorExitingHandleChapterMgr();}}
      >Save To Cloud</button>

      <button className={showChapterMaker ? "tabBarGMSelected" : "tabBarGM"} onClick={()=>{setShowChapterMaker(true);}}>{contentChaptersTabText}</button>
      <button className={showChapterMaker? "tabBarGM" : "tabBarGMSelected"} onClick={()=>{setShowChapterMaker(false);}}>{menuNavigationsTabText}</button>
    
    
    </div>
    
    {showChapterMaker && <div className="parallelFrame sectionArea">

        {!isDisplayRmBool && 
        <ChapterManager 
          currUser={username} 
          projectName={projectName} 
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

        <NodeManager 
          currUser={username} 
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
          
        />
        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}

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
                  userName={username} 
                  projName={projectName} 

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

    {/* top bar for optional displaying */}
        <div style={{"marginBottom":" 10px", "userSelect": "none", "color": "#FFFFFF"}}>
            <input 
                type="checkbox" 
                value={showGameDataPanel}
                checked={showGameDataPanel}
                onChange={()=>{
                    setShowGameDataPanel(!showGameDataPanel);
                }}
            ></input><label
                onClick={()=>{
                    setShowGameDataPanel(!showGameDataPanel);
                }}
            >Show Game-Data Tracking Panel</label><br></br>

        </div>
    

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

          username={username}
          projectname={projectName}

          initialShopItemInfo={testShopProducts}
          initialPlayerPurchaseInfo={testPlayerPurchaseStatus}

          triggerNodeWalk={triggerNodeWalk} //update things to this layer
          triggerChapterWalk={triggerChapterWalk} //update things to this layer
          triggerUpdateCurrentStanding={triggerUpdateCurrentStanding} //update things to this layer

          visualMap={visualMap}
          audioMap={audioMap}
          mutedViewOption={mutedViewOption}

          allNodesContainer={allNodesContainer}
          getAllNodesContainer={passInAllNodesContainer}

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
            {(isDisplayEntireGameViewer && showGameDataPanel)
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

          
          <div
            style={{
              "display": isDisplayRmBool === false ? "none" : "flex",
            }}
          >
              <Modal_ResourceManagingWindow 
                isDisplay = {isDisplayRmBool} 
                handleRmCancel={handleResourceManagerCancel} 
                handleRmSaveChanges={handleResourceManagerSaveChanges}
                refresh={triggerRefreshFetchCloudData}
                triggerRmUpdate={notifyRmUpdated}

                getUILanguage={passInUILanguage}  //TODO20 languageOption

                username={username} 
                projName={projectName}   
            
              />
          
          </div>


          <div
            style={{
              "display": isDisplayGdmBool === false ? "none" : "flex",
            }}
          >
       
              <Modal_GameDataManager 
                isDisplay={isDisplayGdmBool} 
                handleGdmCancel={handleGameDataManagerCancel} 
                resetNeedCloudData={markNextNeedCloudGameData} 

                getUILanguage={passInUILanguage}  //TODO20 languageOption
                username={username} 
                projName={projectName}  
              />

          </div>


          <div
            style={{
              "display": isDisplayEmBool === false ? "none" : "flex",
            }}
          >
            <Modal_EmuManager
              handleEmCancel={handleEmuManagerCancel}

              update1Gdt={getUserConfigFromEmuManager1Gdt}
              update2Epp={getUserConfigFromEmuManager2Epp}
              update3Epa={getUserConfigFromEmuManager3Epa}
              update4Ess={getUserConfigFromEmuManager4Ess}
              update5Shp={getUserConfigFromEmuManager5Shp}

              getUILanguage={passInUILanguage}
              isForGameMaker={true}

              username={username} 
              projName={projectName}  

            />
          </div>
</div>

  </div>


  
    );
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
        ["chp-key1_start","A1-key","","","D1-key","E1-key","","","",""], 
        ["","","","","","","","","",""],
        ["C1-key","","","B1-key","","","chp-key1_end","","",""]
      ]
    ,
      "chp-key2": [
          ["","","","","","","","","",""], 
          ["","","","","","","","","",""],
          ["chp-key2_start","A2-key","","","D2-key","E2-key","","","",""], 
          ["","","","","","","","","",""],
          ["C2-key","","","B2-key","","","chp-key2_end","","",""]
      ],  
    
    */
/* sample of node-map-all
  "chp-key1": {"chp-key1_start": {
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
              nextNode: "chp-key1_end", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "chp-key1_end": {
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
  "chp-key2": {"chp-key2_start": {
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
          nextNode: "chp-key2_end", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
        "chp-key2_end": {
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
