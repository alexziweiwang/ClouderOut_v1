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
import Panel_EntireView_PlayerInfo from './Panel_EntireView_PlayerInfo';

import { getProjectGameDataDesignVM, updateGameDataDesignVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { updateProjectUILangVM, fetchProjectUILangVM } from '../viewmodels/ProjectManagerViewModel';
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
  -TODO: chapter and node brief intro?

*/

  const [renderCounter, setRenderCounter] = useState(0);


  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);


  const [gameDataTracker, setGameDataTracker] = useState({}); //used during test-play


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
  const [isDisplayEmBool, setDisplayEmBool] = useState(false);


  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");


  const [visualList, setVisualList] = useState([]); 
  async function fetchProjResourceLists() {
    if (username === "default-no-state username" || projectName === "default-no-state projectName") {
      return;
    }


    /* fetch from cloud db */
    const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projectName});

                    //          console.log("game-maker, visuallist = : ", obj); //TODO
    setVisualList(obj.visual);

    return obj.visual;
  }


  function updateRenderCounter() {
    console.log("updateRenderCounter!");
    setRenderCounter((renderCounter+1) % 100);
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
    "defaultCornerRadius": 0,
    
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
    "settingPage-sliderWidth": 350,
    "settingPage-sliderHeight": 50,
    "settingPage-sliderColor": "#0373fc",

    "playerProfilePage-isBackgroundShape": false,
    "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
    "playerProfilePage-bgPicName": "",
    "playerProfilePage-itemMap": [],

    // "playerProfilePage-previewingTextObj": { //for previewing only  //TODO remove later
    //   "isPreviewing": false,
    //   "textContent": "",
    //   "textItalic": false,

    //   "textFontSize": 12,
    //   "textFont": "serif",
    //   "textColor": "#000000",
    //   "posX": 30,
    //   "posY": 50,
    // }, //TODO remove later

    "playerProfilePage-previewingTextObj-isPreviewing": false,
    "playerProfilePage-previewingTextObj-textContent": "",
    "playerProfilePage-previewingTextObj-textItalic": false,
    "playerProfilePage-previewingTextObj-textFontSize": 12,
    "playerProfilePage-previewingTextObj-textFont": "serif",
    "playerProfilePage-previewingTextObj-textColor": "#000000",
    "playerProfilePage-previewingTextObj-posX": 30,
    "playerProfilePage-previewingTextObj-posY": 50,


    // "playerProfilePage-previewingValueObj": { //for previewing only  //TODO remove later
    //   "isPreviewing": false,
    //   "labelText": "",
    //   "valueItemType": "Game Data",
    //   "valueItemName": "",
    //   "posX": 30,
    //   "posY": 70,
    //   "textFontSize": 12,
    //   "textFont": "serif",
    //   "textColor": "#000000",
    // },  //TODO remove later

    "playerProfilePage-previewingValueObj-isPreviewing": false,
    "playerProfilePage-previewingValueObj-labelText": "",
    "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
    "playerProfilePage-previewingValueObj-valueItemName": "",
    "playerProfilePage-previewingValueObj-posX": 30,
    "playerProfilePage-previewingValueObj-posY": 70,
    "playerProfilePage-previewingValueObj-textFontSize": 12,
    "playerProfilePage-previewingValueObj-textFont": "serif",
    "playerProfilePage-previewingValueObj-textColor": "#000000",

    // "playerProfilePage-previewingPicObj": { //for previewing only  //TODO remove later
    //   "isPreviewing": false,
    //   "posX": 50,
    //   "posY": 50,
    //   "picName": "",
    //   "width": 200,
    //   "height": 200,
    // },  //TODO remove later

    "playerProfilePage-previewingPicObj-isPreviewing": false,
    "playerProfilePage-previewingPicObj-posX": 50,
    "playerProfilePage-previewingPicObj-posY": 50,
    "playerProfilePage-previewingPicObj-picName": "",
    "playerProfilePage-previewingPicObj-width": 200,
    "playerProfilePage-previewingPicObj-height": 200,

    // "playerProfilePage-playerProfileNickNameItem": { //used in actual game   //TODO remove later
    //   "adding": true,
    //   "nicknameLabel": "",
    //   "textContent": "",
    //   "textItalic": false,
    //   "textFontSize": 12,
    //   "textFont": "serif",
    //   "textColor": "#000000",
    //   "posX": 30,
    //   "posY": 50,
    // },   //TODO remove later"

    "playerProfilePage-playerProfileNickNameItem-adding": true,
    "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "",
    "playerProfilePage-playerProfileNickNameItem-textContent": "",
    "playerProfilePage-playerProfileNickNameItem-textItalic": false,
    "playerProfilePage-playerProfileNickNameItem-textFontSize": 12,
    "playerProfilePage-playerProfileNickNameItem-textFont": "serif",
    "playerProfilePage-playerProfileNickNameItem-textColor": "#000000",
    "playerProfilePage-playerProfileNickNameItem-posX": 30,
    "playerProfilePage-playerProfileNickNameItem-posY": 50,

    // "playerProfilePage-playerProfileIconPicItem": { //used in actual game   //TODO remove later
    //   "adding": true,
    //   "posX": 50,
    //   "posY": 50,
    //   "width": 200,
    //   "height": 200,
    //   "scale": 1
    // },   //TODO remove later

    "playerProfilePage-playerProfileIconPicItem-adding": true,
    "playerProfilePage-playerProfileIconPicItem-posX": 50,
    "playerProfilePage-playerProfileIconPicItem-posY": 50,
    "playerProfilePage-playerProfileIconPicItem-width": 200,
    "playerProfilePage-playerProfileIconPicItem-height": 200,
    "playerProfilePage-playerProfileIconPicItem-scale": 1,



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

  const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                                 //TODO important for holder-in-practice

  const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                               //TODO important for holder-in-practice

  const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
      "playername": "playerA",
      "itemStatus": [{}, {}, {}]
    });       
                                                            //TODO important for holder-in-practice
//TODO ------------------------------------------------------ testing data area

    const [selectedGameDataPanelBetween2, setSelectedGameDataPanelBetween2] = useState(true);

  const [gameDataDesignList, setGameDataDesignList] = useState({});
  const [gameDataArray, setGameDataArray] = useState([]);

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


 

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {

    if (firstTimeEnter === true) {


        console.log("!!! First Enter - GameMaker: ");//TODO testing

        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        triggerRefreshFetchCloudData();

        
        setFirstTimeEnter(false);

        fetchUILangFromCLoud();
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

  function firstSetupUILanguage() {
    return fetchUILangFromCLoud()
  }

  async function fetchUILangFromCLoud() {
    let obj= {projectName: projectName, currUser: username}
    let ans = await fetchProjectUILangVM(obj); //TODO21

    setLanguageCodeTextOption(ans);
    return ans;
  }

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

  // function loadPlayingGameData(isLocal) {                                          //TODO important
  //   let gameDataTemp = {};

  //   // for local test, make from game-data-design-list
  //   if (isLocal === true) {
  //     let tempList = gameDataDesignList;

  //     if (tempList === -1) { //TODO5
  //           const gdataTestResult = fetchGameDataFromCloud();
  //           if (gdataTestResult !== undefined) {
  //             {Object.keys(tempList).map((currKey) => {
  //               gameDataTemp[currKey]["current_value"] = tempList[currKey]["default_value"];
  //             })}
  //           }
  //     }

  //   } else {
  //     // for on-cloud test, fetch from cloud
  //     //TODO gameDataTemp = ...

  //   }
  //                                                           console.log("load-gdata: ", gameDataTemp);
  //   setTestPlayerGameData(gameDataTemp); // initialize Playing-Game-Data
  //   return gameDataTemp;
  // }

  // function loadTestPlayerProfile(isLocal) { 
  //   let playerProfileTemp = {};
  //   if (isLocal === true) {
  //     //use emulated test data

  //     playerProfileTemp = testPlayerProfile;

  //     //TODO later: player-account-related panel?
  //   } else { //use cloud data

  //   }

  //   setTestPlayerProfile(playerProfileTemp);

  // }

  // function loadTestPlayerAccount(isLocal) {
  //   let playerAccountDataTemp = {};
  //   if (isLocal === true) {
  //     //use emulated test data
  //     //TODO

  //     playerAccountDataTemp = testPlayerAccount;

  //   } else {//use cloud data

  //   }

  //   setTestPlayerAccount(playerAccountDataTemp);

  // }

  // function loadTestPlayerSLRecords(isLocal) {
  //   let playerSLRecordsTemp = {};
  //   if (isLocal === true) {
  //     //use emulated test data
  //     //TODO

  //     playerSLRecordsTemp = testPlayerSLRecords;  

  //   } else {//use cloud data

  //   }

  // }
  
  function passInPlayerGameData() { //TODO5
    return testPlayerGameData;
  }

  function passInPlayerProfile() {
    console.log("passs-in player-profile: ", testPlayerProfile);
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
    // if (gameDataArray.length > 0) {
    //   return gameDataArray;
    // }

    // let gameDataTemp = gameDataDesignList;
    // if (gameDataDesignList.size === 0) {
    //   let tempMap = loadPlayingGameData(true);
    //   gameDataTemp = tempMap;
    // }
    // let gameDataList = [];


    // {Object.keys(gameDataTemp).map((currKey) => {
    //   let pair = [];
    //                           console.log("\t\t item = ", gameDataTemp[currKey]);
    //   pair.push(gameDataTemp[currKey]["name"]);
    //   pair.push(gameDataTemp[currKey]["default_value"]);
    //   gameDataList.push(pair);
    // })}
    //             // console.log ("1passInCurrentGameDataList(): gameDataTemp = ", gameDataTemp); //TODO remove later

    // setGameDataArray(gameDataList);
    // return gameDataList;

    //TODO refactor for new-emu-strategy
                            //          console.log("game-maker, passInCurrentGameDataList-func: returning ", testPlayerGameData);



    return testPlayerGameData;

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
    setTestPlayerGameData(data1);
  }

  function getUserConfigFromEmuManager2Epp(data2) {
    //update data2 to be the new Emu-Player-Profile
    setTestPlayerProfile(data2);
  }

  function getUserConfigFromEmuManager3Epa(data3) {
    //update data3 to be the new Emu Player Account
    setTestPlayerAccount(data3);
  }

  function getUserConfigFromEmuManager4Ess(data4) {
    //TODO update data4 to be the new Emu SL slots
    //TODO temp: not using
  }

  function openEmuManager() {
      setDisplayEmBool(true);
  }



  return (
  <div>
<div>
    
    <div className="returning_buttons">
      
      <button className="button2" onClick={()=>{goToProjectManagingPanel();}}> ← </button>

      <div style={{"width": "200px", "overflow": "scroll", "textAlign": "left", "padding": "5px", "marginTop": "10px"}}>
        <label>{projectNameText}: {projectName}</label>
      
      </div>    


      <div
        style={{"minWidth": "150px"}}
      >
        <button
          onClick={()=>{
            setDisplayEntierGameViewer(true);
          }}
          className="button testEntire"
        >Test ▶︎ </button>
      </div>

      <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
        <button className="rmTab" onClick={()=>{setDisplayRmModal(true);}}> {resourceManagerButtonText} </button>
        <button className="rmTab" onClick={()=>{setDisplayGdmBool(true);}}>{gameDataManagerButtonText}</button>
        <button className="rmTab" onClick={()=>{setDisplayEmBool(true);}}>
          Emu-Manager
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
          
          getUILanguage={passInUILanguage}
          
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
                  updateCurrentPageName={updateCurrPageName} 
                  fetchPageName={passInCurrSelectedPage}
                  initialScreenHeight={screenHeight}
                  getScreenheight={passInScreenHeight}
                  userName={username} 
                  projName={projectName} 

                  intialEmuPlayerProfile={testPlayerProfile}
                  openEmuManager={openEmuManager}
                  fetchEmuPlayerProfile={passInPlayerProfile}
                   
                  getUILanguage={passInUILanguage}
          
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

 
                  getUILanguage={passInUILanguage}
                  initialUILanguage={languageCodeTextOption}
          
                  />
              </div>
          </div>
    </div>
    
    
    </>
    }
   

         




{/*  Entire Viewing -- all parts  */}
    {isDisplayEntireGameViewer && 

<div className={modalStyleName} style={{"overflow": "scroll"}}>

        <button className="testEntire" onClick={()=>{setDisplayEntierGameViewer(false);}}>Stop Testing</button>


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
    


  {/* entire-viewer-screen */}
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

 
          getUILanguage={passInUILanguage}
          


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
                "height": `${screenHeight}px`, 
                "overflow": "scroll", 
              }}>

                <Panel_GameDataTest
                       localTest={true}
                       initialGameDataStatus={gameDataTracker}

                       getScreenHeight={passInScreenHeight} 
                       getScreenWidth={passInScreenWidth}
                       isQuickView={false}

                       triggerClickOnGameDataPanel={notUsing}
                       getIsGameScreenClicked={notUsing}

                       receiveGameDataObj={passInPlayerGameData}

                       getResetSignal={notUsingReturnFalse}
                       notifyAfterReset={notUsing}

                       getUILanguage={passInUILanguage}
                /> 
        
              </div>
            }


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
