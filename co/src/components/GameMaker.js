import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';

import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';
import Viewer_Entire from './Viewer_Entire';
import Panel_GameDataTest from './Panel_GameDataTest';
import Panel_EntireView_PlayerInfo from './Panel_EntireView_PlayerInfo';

import { getProjectGameDataVM, updateGameDataDesignVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import langDictionary from './textDictionary';


export default function GameMaker({username, projectName}) {

  

  let languageCodeTextOption = 'en';

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
  -TODO: chapter and node brief intro?

*/

  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);




  const [isDisplayEntireGameViewer, setDisplayEntierGameViewer] = useState(false);
  
/* // TODO game-maker task list
2. logic organizer for game-node-relationship
3. preview and test for node play-flow (progress: 35%)
4. testing data for some nodes on cloud-db
*/


/* // TODO game-node visualization task list, dont items removed
4. optimization of paths: non-overlapping, line to path
7. optimization on node positions when generated
9. game node brief info display and options (hover and click)

*/


  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState("");

  //TODO6
  const [currTestingPageStatus, setCurrTestingPageStatus] = useState("Main Page");
  const [currTestingChapterKey, setCurrTestingChapterKey] = useState("");

  const [currTestingNodeKey, setCurrTestingNodeKey] = useState("");
  const [currTestingNodeType, setCurrTestingNodeType] = useState("");

  const [chapterList, setChapterList] = useState(
    [
      ["chp-key1", "testChapter1", "display", ""], 
      ["chp-key2", "testChapter2", "display", ""],
    ]); //TODO fetch from cloud db when entering game-maker


  const [isDisplayRmBool, setDisplayRmModal] = useState(false);
  const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");


  const [visualList, setVisualList] = useState([]); 
  async function fetchProjResourceLists() {

    /* fetch from cloud db */
    const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projectName});

    console.log("obj: ", obj); 
    setVisualList(obj.visual);

    return obj.visual;
  }





//TODO ------------------------------------------------------ testing data area

const [chapterNodeMapAll, setChapterNodeMapAll] = useState({
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
              spltLogicPairs: [["else", "A1-key", "else"]], 
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
            spltLogicPairs: [["else", "", "else"],], 
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

})

  const [currentChapterNodeMap, setcurrentChapterNodeMap] = useState({});

  const [gridBlocks, setGridBlocks] = useState([]); //stores node-keys

  const [gridBlocksAll, setGridBlocksAll] = useState({
      "chp-key1": [
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

  const [currentProjectNav, setCurrentProjectNav] = useState({
    "screenSize": "16:9(horizonal)",
    
    "isWithSL": true,
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
    "mainPage-listItemGroupX": 200,
    "mainPage-listItemGroupY": 200,
    "mainPage-listItemGroupWidth": 120,
    "mainPage-listItemGroupHeight": 60,
    "mainPage-listItemGap": 3,
    "mainPage-listItemGroupFontColor": "",
    "mainPage-listItemGroupFontSize": 10,

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
    "settingPage-listItemGroupX": 200,
    "settingPage-listItemGroupY": 35,
    "settingPage-listItemGroupWidth": 550,
    "settingPage-listItemGroupHeight": 75,
    "settingPage-listItemFontSize": 20,
    "settingPage-listItemFontColor": "",
    "settingPage-listItemGap": 30,
    "settingPage-playSpeedName":"Play Speed",
    "settingPage-bgmVolName": "Background Music Volume",
    "settingPage-seVolName": "Sound Effect Volume",

    "playerProfilePage-isBackgroundShape": false,
    "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
    "playerProfilePage-bgPicName": "",
    "playerProfilePage-itemMap": [],

    "playerProfilePage-previewingTextObj": { //for previewing only
      "previewing": false,
      "textContent": "",
      "textItalic": false,
      "textFontSize": 12,
      "textFont": "serif",
      "textColor": "#000000",
      "posX": 30,
      "posY": 50,
    },
    "playerProfilePage-previewingValueObj": { //for previewing only
      "previewing": false,
      "labelText": "",
      "valueItemType": "Game Data",
      "valueItemName": "",
      "posX": 30,
      "posY": 70,
      "textFontSize": 12,
      "textFont": "serif",
      "textColor": "#000000",
    },
    "playerProfilePage-previewingPicObj": { //for previewing only
      "previewing": false,
      "posX": 50,
      "posY": 50,
      "picName": "",
      "width": 200,
      "height": 200,
    },


    "playerProfilePage-playerProfileNickNameItem": { //used in actual game
      "adding": true,
      "nicknameLabel": "",
      "textContent": "",
      "textItalic": false,
      "textFontSize": 12,
      "textFont": "serif",
      "textColor": "#000000",
      "posX": 30,
      "posY": 50,
    },
    "playerProfilePage-playerProfileIconPicItem": { //used in actual game
      "adding": true,
      "posX": 50,
      "posY": 50,
      "width": 200,
      "height": 200,
      "scale": 1
    },


    "shopPage-isBackgroundShape": false,
    "shopPage-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-bgPicName": "",

    "storyPage-chapterListHorizontal": true,
    "storyPage-isBackgroundShape": false,
    "storyPage-bgShadeName": "rgb(222, 222, 235)",
    "storyPage-bgPicName": "",
    "storyPage-isListItemShape": true,
    "storyPage-listItemShadeName": "#c0cfe2",
    "storyPage-listItemPicName": "",
    "storyPage-listItemGroupX": 200,
    "storyPage-listItemGroupY": 200,
    "storyPage-listItemGroupWidth": 90,
    "storyPage-listItemGroupHeight": 45,
    "storyPage-listItemGap": 3,
    "storyPage-listItemGroupFontColor": "",
    "storyPage-listItemGroupFontSize": 10,

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

  }); //TODO now: default initial values


  const [testPlayerGameData, setTestPlayerGameData] = useState({});   //TODO important for holder-in-practice

  //TODO6
  const [testPlayerProfile, setTestPlayerProfile] = useState({ 
      "playername": "playerA",
      "userTitle": "",
      "iconPicName": "",
      "level": 2,
      "membership": 1,
  });                                                                 //TODO important for holder-in-practice

  const [testPlayerAccount, setTestPlayerAccount] = useState({
      "playername": "playerA",
      "email": "example@email.com",
    });                                                               //TODO important for holder-in-practice

  const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
      "playername": "playerA",
      "itemStatus": [{}, {}, {}]
    });                                                               //TODO important for holder-in-practice

//TODO ------------------------------------------------------ testing data area

    const [selectedGameDataPanelBetween2, setSelectedGameDataPanelBetween2] = useState(true);

  const [gameDataDesignList, setGameDataDesignList] = useState({});
  const [gameDataArray, setGameDataArray] = useState([]);

  async function fetchGameDataFromCloud() { //TODO3

    console.log("!!! This is for project: ", projectName);
    let project  = projectName;
    console.log("checking2 on project ... [", project, "]");
    if (project === undefined || project === null || project === "" || project.trim() === "") {
      return;
    }
    const isUpdated = true;
    
    
    const gdataTestResult = await getProjectGameDataVM({projectName: project, uname: username, mostUpdated: isUpdated});
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


 

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {

    if (firstTimeEnter === true) {


        console.log("!!! First Enter - GameMaker: ");//TODO testing

        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        triggerRefreshFetchCloudData();

        let isLocal = true; //TODO temp

        loadPlayingGameData(isLocal); 
        loadTestPlayerProfile(isLocal); 
        loadTestPlayerAccount(isLocal); 
        loadTestPlayerSLRecords(isLocal);

        
        setFirstTimeEnter(false);
    }




    if (projectName === "default-no-state projectname") {
      alert("No project selected. Returning to project selection page...");
      goToProjectManagingPanel();
    }

    if (currChapterKey !== undefined && currChapterKey !== "") {
      setcurrentChapterNodeMap(chapterNodeMapAll[currChapterKey]);
      setGridBlocks(gridBlocksAll[currChapterKey]);
    }

    if (currentProjectNav["screenSize"] === "16:9(horizonal)") {
      setScreenHeight(450);
    } else if (currentProjectNav["screenSize"] === "16:9(vertical)" 
      || currentProjectNav["screenSize"] === "4:3(vertical)") {
      setScreenHeight(800);
    } else if (currentProjectNav["screenSize"] === "4:3(horizonal)") {
      setScreenHeight(600);
    }


  });

  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
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
    //TODO update to cloud db
    setDisplayRmModal(false);
  }

  function handleGameDataManagerCancel() {
    setDisplayGdmBool(false);

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
    setDisplayEntierGameViewer(false);
  }

  function passInCurrentChapterNodeMap() {
    let nodeMap = currChapterKey !== "" ? chapterNodeMapAll[currChapterKey] : {};
    return nodeMap;
  }

  function passInCurrentChapterKey() {
    return currChapterKey;
  }

  function passInCurrentGridBlocks() {
    let grid = currChapterKey !== "" ? gridBlocksAll[currChapterKey] : [];
    return grid;
  }

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

    //add all-grid-block
    let gridAllTemp = gridBlocksAll;
    gridAllTemp[newKey] = [
      ["","","","","","","","","",""], 
      ["","","","","","","","","",""],
      [chapterStartKeyStr,"","","","", chapterEndKeyStr,"","","",""], 
      ["","","","","","","","","",""],
      ["","","","","","","","","",""]
    ];
    setGridBlocksAll(gridAllTemp);

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
  }
  
  function updateGridBlockOfChapter(gridArr) {
    let gridBlocksAllTemp = gridBlocksAll;
    gridBlocksAllTemp[currChapterKey] = gridArr;

    setGridBlocksAll(gridBlocksAllTemp);
  }

  function updateChosenChapterItem(chapterKey) {
 
console.log("clicked on chapter-key: ", chapterKey); //TODO testing

    if (chapterKey !== "") {
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

  function loadPlayingGameData(isLocal) {                                          //TODO important
    let gameDataTemp = {};

    // for local test, make from game-data-design-list
    if (isLocal === true) {
      let tempList = gameDataDesignList;

      if (tempList === -1) { //TODO5
            const gdataTestResult = fetchGameDataFromCloud();
            if (gdataTestResult !== undefined) {
              {Object.keys(tempList).map((currKey) => {
                gameDataTemp[currKey]["current_value"] = tempList[currKey]["default_value"];
              })}
            }
      }




    } else {
      // for on-cloud test, fetch from cloud
      //TODO gameDataTemp = ...


    }
                                                            console.log("load-gdata: ", gameDataTemp);
    setTestPlayerGameData(gameDataTemp); // initialize Playing-Game-Data
    return gameDataTemp;
  }

  function loadTestPlayerProfile(isLocal) { 
    let playerProfileTemp = {};
    if (isLocal === true) {
      //use emulated test data

      playerProfileTemp = testPlayerProfile;

      //TODO later: player-account-related panel?
    } else { //use cloud data

    }

    setTestPlayerProfile(playerProfileTemp);

  }

  function loadTestPlayerAccount(isLocal) {
    let playerAccountDataTemp = {};
    if (isLocal === true) {
      //use emulated test data
      //TODO

      playerAccountDataTemp = testPlayerAccount;

    } else {//use cloud data

    }

    setTestPlayerAccount(playerAccountDataTemp);

  }

  function loadTestPlayerSLRecords(isLocal) {
    let playerSLRecordsTemp = {};
    if (isLocal === true) {
      //use emulated test data
      //TODO

      playerSLRecordsTemp = testPlayerSLRecords;  

    } else {//use cloud data

    }

  }
  
  function passInPlayerGameData() { //TODO5
    if (testPlayerGameData.length > 0) {
      return testPlayerGameData;
    } else {
      //TODO

      return -1;
    }
    
  }

  function passInPlayerProfile() {
    return testPlayerProfile;
  }

  function passInPlayerAccountInfo() {
    return testPlayerAccount;
  }

  function passInPlayerSlRecords() {
    return testPlayerSLRecords;
  }

  function updatePlayingGameData(data) {
    setTestPlayerGameData(data);
  }

  function updatePlayerProfile(data) {
    setTestPlayerProfile(data);
  }

  function updatePlayerAccountSettings(data) {
    setTestPlayerAccount(data);
  }

  function updatePlayerSlRecords(data) {
    setTestPlayerSLRecords(data);
  }

  function passInCurrentGameProgress() {
    //TODO7
    let obj = {};
    obj["pageStatus"] = currTestingPageStatus;
    obj["chapterKey"] = currTestingChapterKey;
    obj["nodeKey"] = currTestingNodeKey;
    obj["nodeType"] = currTestingNodeType;

    return obj;
  }

  function updateCurrentStanding(obj) {
    setCurrTestingPageStatus(obj["pageStatus"]);
    setCurrTestingChapterKey(obj["chapterKey"]);
    setCurrTestingNodeKey(obj["nodeKey"]);
    setCurrTestingNodeType(obj["nodeType"]);
  }

  



  function receiveUpdateOnPageStatus(pageName) { //TODO important, needed in holder-in-practice
    setCurrTestingPageStatus(pageName);
  }

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

  function passInPicResourceList() {
      return visualList;
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
    if (gameDataArray.length > 0) {
      return gameDataArray;
    }

    let gameDataTemp = gameDataDesignList;
    if (gameDataDesignList.size === 0) {
      let tempMap = loadPlayingGameData(true);
      gameDataTemp = tempMap;
    }
    let gameDataList = [];


    {Object.keys(gameDataTemp).map((currKey) => {
      let pair = [];
                              console.log("\t\t item = ", gameDataTemp[currKey]);
      pair.push(gameDataTemp[currKey]["name"]);
      pair.push(gameDataTemp[currKey]["default_value"]);
      gameDataList.push(pair);
    })}
                // console.log ("1passInCurrentGameDataList(): gameDataTemp = ", gameDataTemp); //TODO remove later

    setGameDataArray(gameDataList);
    return gameDataList;
  }

  return (
  <div>
<div>
    
    <div className="returning_buttons">
      <button className="button2" onClick={()=>{goToProjectManagingPanel();}}> ← </button>
      <p>Project Name: {projectName}</p>
     
     
      <button
        onClick={()=>{
          setDisplayEntierGameViewer(true);
        }}
        className="button testEntire"
      >Test ▶︎ </button>


      <button className="buttonRight30 rmTab" onClick={()=>{setDisplayRmModal(true);}}> {resourceManagerButtonText} </button>
      <button className="rmTab" onClick={()=>{setDisplayGdmBool(true);}}>{gameDataManagerButtonText}</button>
   
    </div>


    {/*//TODO TESTING */}
                    <div>
                      <input type="checkbox" value={developOnCloudData} checked={developOnCloudData}
                        onChange={()=>{
                          setDevelopOnCloudData(!developOnCloudData);
                        }}
                      ></input><label>TEST toggle: Use Cloud Data</label>
                      <label>Status: {developOnCloudData === true ? "true" : "false"}</label>
                    </div>
    {/*//TODO TESTING */}


    <div>
      <button className={showChapterMaker ? "tabBarGMSelected" : "tabBarGM"} onClick={()=>{setShowChapterMaker(true);}}>{contentChaptersTabText}</button>
      <button className={showChapterMaker? "tabBarGM" : "tabBarGMSelected"} onClick={()=>{setShowChapterMaker(false);}}>{menuNavigationsTabText}</button>
    </div>
    
    {showChapterMaker && <div className="parallelFrame sectionArea">
      
        {!isDisplayRmBool && 
        <ChapterManager 
          initialChapterData={chapterList} 
          getChapterDataInfo={passInChapterList}
          
          chosenChapter={currChapterKey} 
          updateChosenChapterItem={updateChosenChapterItem} 
          
          updateChapterData={updateChapterList} 
          prepareForNewChapterMapping={prepareForNewChapterMapping}
       
          updateLinkingNode={updateLinkingNodeFunc}
          
        />}

        <NodeManager 
          currUser={username} 
          projectName={projectName} 
          initialChapterKey={currChapterKey}
          getNodeMapOfChapter={passInCurrentChapterNodeMap}
          getCurrChapterKey={passInCurrentChapterKey}
          getGridBlocks={passInCurrentGridBlocks}
          initialNodeMap={currChapterKey !== "" ? chapterNodeMapAll[currChapterKey] : {}}
          initialGridBlock={currChapterKey !== "" ? gridBlocksAll[currChapterKey] : []}
          updateNodeMapOfChapter={updateNodeMapOfChapter}
          updateGridBlockOfChapter={updateGridBlockOfChapter}
          getGameData={passInGameDataDesignList}
          displayGameDataPanel={handleGameDataManagerOpen}
          loadChapterInfoFromCaller={passInSelectedChapterInfo_Cloud}
          getGdmUpdatedSignal={passInGdmUpdatedSignal}
          resetGdmUpdateSignal={resetGdmUpdateSignal}
        />
        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}

    {!showChapterMaker && 
    <>
      

        <div className="sectionArea"> 

          <div>
            Screen Size for all navigation pages: 
            <select
                value={currentProjectNav["screenSize"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["screenSize"] = event.target.value;

                  setCurrentProjectNav({...currentProjectNav, "screenSize": event.target.value});
                }}
                >
                          <option value="" key=""> ----- Select Size and Direction ----- </option>
                          <option value="16:9(horizonal)" key="nav-setter-16:9(horizonal)"> 16:9 (horizontal) </option>
                          <option value="16:9(vertical)" key="nav-setter-16:9(vertical)"> 16:9 (vertical) </option>
                          <option value="4:3(horizonal)" key="nav-setter-4:3(horizonal)"> 4:3 (horizontal) </option>
                          <option value="4:3(vertical)" key="nav-setter-4:3(vertical)"> 4:3 (vertical) </option>
            </select>

          </div>

          <div className="parallelFrame">
              
              
              <div style={{"marginTop": "15px", "marginLeft": "10px", "marginBottom": "10px"}}>
                <NavigationSetter 
                  initialNavObj={currentProjectNav} 
                  updateNavObj={updateCurrProjectNavObj} 
                  openRm={handleResourceManagerOpen} 
                  updateCurrentPageName={updateCurrPageName} 
                  fetchPageName={passInCurrSelectedPage}
                  initialScreenHeight={screenHeight}
                  getScreenheight={passInScreenHeight}
                  userName={username} 
                  projName={projectName} 
                  updateEmuPlayerProfile={updateEmuPlayerProfile}
                  intialEmuPlayerProfile={testPlayerProfile}
                />
              </div>
              
              <div style={{"marginTop": "15px", "marginLeft": "15px"}}>
                <NavigationPreview
                  initialNavObj={currentProjectNav} 
                  fetchNavObj={passInNavObj} 
                  fetchPageName={passInCurrSelectedPage} 
                  chapterData={chapterList} 

                  updateCurrentPageName={updateCurrPageName}
                  updateCurrentStanding={updateCurrentStanding}

                  isEditing={true}
                  initialGameDataRefData={emptyValue}
                  initialPlayerProfileRefData={testPlayerProfile}
                  initialPlayerAccountRefData={testPlayerAccount}

                  fetchPlayerInfoSets={passInPlayerInfoSets}
                  fetchCurrentGameData={passInCurrentGameDataList}


                  />
              </div>
          </div>
    </div>
    
    
    </>
    }
   

         
    {isDisplayEntireGameViewer && 

<div className={modalStyleName} style={{"overflow": "scroll"}}>

        <button className="testEntire" onClick={()=>{setDisplayEntierGameViewer(false);}}>Stop Testing</button>

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
    
      <div>
      <Viewer_Entire
          isDisplay={isDisplayEntireGameViewer}
          makeNotDisplay={closeEntireGameViewer}
          navigationObj={currentProjectNav}
          fetchNavigationObj={passInNavObj}
          initialChapterList={chapterList}
          getChapterList={passInChapterList}

          isLocal={true}
          getPlayerGameData={passInCurrentGameDataList}
          updatePlayingGameData={updatePlayingGameData}

          getPlayerProfile={passInPlayerProfile}
          updatePlayerProfile={updatePlayerProfile}
      
          getPlayerAccountSettings={passInPlayerAccountInfo}
          updatePlayerAccountSettings={updatePlayerAccountSettings}
      
          getPlayerSlRecords={passInPlayerSlRecords}
          updatePlayerSlRecords={updatePlayerSlRecords}
          
          getCurrentGameProgress={passInCurrentGameProgress}
          updateCurrentStanding={updateCurrentStanding}

          notifyPageStatus={receiveUpdateOnPageStatus}




      />
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

      <div>

            {/* game data info */}
            {/* screenWidth > screenHeight means horizontal game-screen */}
            {/* //TODO current: when testing, "localTest" is temporarily true; later change to "false" */}
            {(isDisplayEntireGameViewer && showGameDataPanel)
            && 
              <div style={{"height": `${screenHeight}px`, "overflow": "scroll"}}>
                <Panel_GameDataTest
                  localTest={true}

                  getGameDataDesignList={passInGameDataDesignList}

                  getScreenHeight={passInScreenHeight}
                  getScreenWidth={passInScreenWidth}
                  isQuickView={false}
                  triggerClickOnGameDataPanel={notUsing}
                  getIsGameScreenClicked={notUsing}

                  receiveGameDataObj={passInPlayerGameData}

                  getResetSignal={notUsingReturnFalse}
                />
              </div>
            }


          </div>
      
      </div>}

</div>

<div>

          {isDisplayRmBool && 
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
          />
          
          </div>}

          {isDisplayGdmBool && 
            <Modal_GameDataManager 
              isDisplay={isDisplayGdmBool} 
              handleGdmCancel={handleGameDataManagerCancel} 
              initialGameData={gameDataDesignList} 
              resetNeedCloudData={markNextNeedCloudGameData} 
              updateGameDataDesignToCloud={updateGameDataDesignSettingToCloud}
          />} 
</div>

  </div>

  
    );
}
