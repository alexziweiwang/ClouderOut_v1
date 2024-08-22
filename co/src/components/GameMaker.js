import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';

import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';
import GameMakerLevel_Viewer from './GameMakerLevel_Viewer';

import { getProjectGameDataVM, updateGameDataVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';


export default function GameMaker() {
  const [screenHeight, setScreenHeight] = useState(600);


  const languageCode = 0;
  const resourceManagerButtonText = ["Resource Manager"];
  const gameDataManagerButtonText = ["Game-Data Manager"];
  const contentChaptersTabText = ["Content Chapters"];
  const menuNavigationsTabText = ["Menu & Navigations"];



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
  const {state} = useLocation();
  let projectName = "default-no-state projectname"; //TODO testing
  let username = "default-no-state username";

  if (state !== null) {
    projectName = state.selected_project_name;
    username = state.username;
  }

  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState("");


  const [chapterList, setChapterList] = useState(
    [
      ["chp-key1", "testChapter1", "display", ""], 
      ["chp-key2", "testChapter2", "display", ""],
    ]); //TODO fetch from cloud db when entering game-maker


  const [isDisplayRmBool, setDisplayRmModal] = useState(false);
  const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");

//TODO ------------------------------------------------------

const [chapterNodeMapAll, setChapterNodeMapAll] = useState({
  "chp-key1": {"chapterStart1-key": {
              nodeName: "chapterStart1-title", 
              row: 2, 
              col: 0, 
              nextNode:"A1-key", 
              display: true, 
              nodeType:"*chapterStart*", 
              screenSize:"h600_800"
          },
          "A1-key": {
              nodeName: "A1-title", 
              row: 2, 
              col: 1, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"h600_800"
          },
          "B1-key": {
              nodeName: "B1-title", 
              row: 4, 
              col: 3, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"h600_800"
          },
          "C1-key": {
              nodeName: "C1-title", 
              row: 4, 
              col: 0, 
              spltLogicPairs: [["else", "", "else"],], 
              display: true, 
              nodeType:"LogicSplitter"
          },
          "D1-key": {
              nodeName: "D1-title", 
              row: 2, 
              col: 4, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"h600_800"
          },
          "E1-key": {
              nodeName: "E1-title", 
              row: 4, 
              col: 6, 
              nextNode: "chapterEnd1-key", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"h600_800"
          },
          "chapterEnd1-key": {
              nodeName: "chapterEnd1-title", 
              row: 2, 
              col: 5, 
              nextNode: "", 
              display: true, 
              nodeType:"*chapterEnd*", 
              screenSize:"h600_800"
          },
  },
  "chp-key2": {"chapterStart2-key": {
            nodeName: "chapterStart2-title", 
            row: 2, 
            col: 0, 
            nextNode:"A2-key", 
            display: true, 
            nodeType:"*chapterStart*", 
            screenSize:"h600_800"
        },
        "A2-key": {
            nodeName: "A2-title", 
            row: 2, 
            col: 1, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"h600_800"
        },
        "B2-key": {
            nodeName: "B2-title", 
            row: 4, 
            col: 3, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"h600_800"
        },
        "C2-key": {
            nodeName: "C2-title", 
            row: 4, 
            col: 0, 
            spltLogicPairs: [["else", "", "else"],], 
            display: true, 
            nodeType:"LogicSplitter"
        },
        "D2-key": {
          nodeName: "D2-title", 
          row: 2, 
          col: 4, 
          nextNode: "", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"h600_800"
        },
        "E2-key": {
          nodeName: "E2-title", 
          row: 4, 
          col: 6, 
          nextNode: "chapterEnd2-key", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"h600_800"
        },
        "chapterEnd2-key": {
          nodeName: "chapterEnd2-title", 
          row: 2, 
          col: 5, 
          nextNode:"", 
          display: true, 
          nodeType:"*chapterEnd*", 
          screenSize:"h600_800"
        },
},

})

  const [currentChapterNodeMap, setcurrentChapterNodeMap] = useState({});

  const [gridBlocks, setGridBlocks] = useState([]); //stores node-keys

  const [gridBlocksAll, setGridBlocksAll] = useState({
      "chp-key1": [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart1-key","A1-key","","","D1-key","chapterEnd1-key","","","",""], 
        ["","","","","","","","","",""],
        ["C1-key","","","B1-key","","","E1-key","","",""]
      ]
    ,
      "chp-key2": [
          ["","","","","","","","","",""], 
          ["","","","","","","","","",""],
          ["chapterStart2-key","A2-key","","","D2-key","chapterEnd2-key","","","",""], 
          ["","","","","","","","","",""],
          ["C2-key","","","B2-key","","","E2-key","","",""]
      ],
    
  }); //stores node-keys

  const [currentProjectNav, setCurrentProjectNav] = useState({
    "screenSize": "h450_800",
    
    "isWithSL": true,
    "fontFamilyForAll": "sans-serif",

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
    "saveloadPage-bgShadeName": "",
    "saveloadPage-bgPicName": "",
    "saveloadPage-isSlotShape": false,
    "saveloadPage-slotShadeName": "",
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
    "settingPage-bgShadeName": "",
    "settingPage-bgPicName": "",
    "settingPage-isListItemShape": false,
    "settingPage-listItemShadeName": "",
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

    "gsdPage-isBgShape": false,
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

//TODO ------------------------------------------------------

  const [gameDataLocal, setGameDataLocal] = useState({});

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
    setGameDataLocal(gdataTestResult);
  }

  const [needCloudGameData, setNeedCloudGameData] = useState(true);

  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }

  function updateGDataToCloud(gameDataLatest) {

    let project = "";
    project  = projectName;
    if (project.trim() === "") {
      return;
    }
    updateGameDataVM({projectName: project, uname: username, gameData: gameDataLatest});
    
  }

  async function getChapterDataFromCloud(chapter) {
    return await getChapterDataVM({projectName: projectName, uname: username, chapterName: chapter});
   
  }

  function triggerGdmUpdateList() {
    console.log("Gdm updated"); //TODO6
    //TODO: set the update-signal in game-maker level, then pass-in for node-manager level for game-data-item list

  }

  function passInGameDataLocal() {
    return gameDataLocal;
  }

  function passInSelectedChapterInfo_Cloud() {
    //TODO fetch cloud-info !


    return chapterNodeMapAll[currChapterKey]; //temporary
  }


 
  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);


  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {
    if (firstTimeEnter === true) {


        console.log("First Enter - GameMaker-state: ", state);//TODO testing

        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        fetchGameDataFromCloud();
        
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

    if (currentProjectNav["screenSize"] === "h450_800") {
      setScreenHeight(450);
    } else if (currentProjectNav["screenSize"] === "v800_450" || currentProjectNav["screenSize"] === "v800_600") {
      setScreenHeight(800);
    } else if (currentProjectNav["screenSize"] === "h600_800") {
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

  function triggerRefresh() {
    setFirstTimeEnter(true);
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
    let nodeMap = currChapterKey !== "" ? chapterNodeMapAll[currChapterKey] : {}
    console.log("passing in1 ..."); //TODO test
    console.log(nodeMap);
    return nodeMap;
  }

  function passInCurrentChapterKey() {
    return currChapterKey;
  }

  function passInCurrentGridBlocks() {
    let grid = currChapterKey !== "" ? gridBlocksAll[currChapterKey] : []
    console.log("passing in2 ..."); //TODO test
    console.log(grid);
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
      screenSize:"h600_800"
    };
    obj[chapterEndKeyStr] = {
      nodeName: chapterEndTitleStr, 
      row: 2, 
      col: 5, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"h600_800"
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
    setCurrChapterKey(chapterKey);
  } 
  
  function updateChapterList(chapterData) {
    setChapterList(chapterData);
  }

  return (
  <div>
    
    <div className="returning_buttons">
      <button className="button2" onClick={()=>{goToProjectManagingPanel();}}> ← </button>
      <p>Project Name: {projectName}</p>
     
     
      <button
        onClick={()=>{
          setDisplayEntierGameViewer(true);
        }}
        className="button testEntire"
      >Test Game-play</button>


      <button className="buttonRight30 rmTab" onClick={()=>{setDisplayRmModal(true);}}> {resourceManagerButtonText[languageCode]} </button>
      <button className="rmTab" onClick={()=>{setDisplayGdmBool(true);}}>{gameDataManagerButtonText[languageCode]}</button>
   
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
      <button className={showChapterMaker ? "tabBarGMSelected" : "tabBarGM"} onClick={()=>{setShowChapterMaker(true);}}>{contentChaptersTabText[languageCode]}</button>
      <button className={showChapterMaker? "tabBarGM" : "tabBarGMSelected"} onClick={()=>{setShowChapterMaker(false);}}>{menuNavigationsTabText[languageCode]}</button>
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
          getGameData={passInGameDataLocal}
          displayGameDataPanel={handleGameDataManagerOpen}
          loadChapterInfoFromCaller={passInSelectedChapterInfo_Cloud}
        />
        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}

    {!showChapterMaker && 

        <div className="parallelFrame sectionArea"> 
          
          <div style={{"marginTop": "15px", "marginLeft": "10px", "marginBottom": "10px"}}>
            <NavigationSetter 
              initialNavObj={currentProjectNav} 
              updateNavObj={updateCurrProjectNavObj} 
              openRm={handleResourceManagerOpen} 
              updateCurrentPageName={updateCurrPageName} 
              fetchPageName={passInCurrSelectedPage}
              initialScreenHeight={screenHeight}
              getScreenheight={passInScreenHeight}
            />
          </div>
          
          <div style={{"marginTop": "15px", "marginLeft": "15px"}}>
            <NavigationPreview initialNavObj={currentProjectNav} fetchNavObj={passInNavObj} fetchPageName={passInCurrSelectedPage} chapterData={chapterList} updateCurrentPageName={updateCurrPageName}/>
          </div>
    </div>}
   

    
    {isDisplayRmBool && 
      <Modal_ResourceManagingWindow 
        isDisplay = {isDisplayRmBool} 
        handleRmCancel={handleResourceManagerCancel} 
        handleRmSaveChanges={handleResourceManagerSaveChanges}
        refresh={triggerRefresh}
      />}

      {isDisplayGdmBool && 
        <Modal_GameDataManager 
            isDisplay={isDisplayGdmBool} 
            handleGdmCancel={handleGameDataManagerCancel} 
            initialGameData={gameDataLocal} 
            resetNeedCloudData={markNextNeedCloudGameData} 
            fetchFromCloud={fetchGameDataFromCloud} 
            updateGameDataToCloud={updateGDataToCloud}
            triggerListUpdate={triggerGdmUpdateList}
        />} 
          
   
          {/* //TODO moved from sublayer, to fix */}

    {isDisplayEntireGameViewer && 
      <GameMakerLevel_Viewer
        isDisplay={isDisplayEntireGameViewer}
        makeNotDisplay={closeEntireGameViewer}
        navigationObj={currentProjectNav}
        initialChapterList={chapterList}
        getChapterList={passInChapterList}
        getGameData={passInGameDataLocal}
        initialGameData={gameDataLocal}

      />}

 
  </div>

  
    );
}
