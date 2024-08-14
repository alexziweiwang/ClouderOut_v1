import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';
import GameMakerLevel_Viewer from './GameMakerLevel_Viewer';

export default function GameMaker() {
  const [screenHeight, setScreenHeight] = useState(600);


  const languageCode = 0;
  const resourceManagerButtonText = ["Resource Manager"];
  const contentChaptersTabText = ["Content Chapters"];
  const menuNavigationsTabText = ["Menu & Navigations"];



  const [isDisplayEntireGameViewer, setDisplayEntierGameViewer] = useState(false);
  
/* // TODO game-maker task list
2. logic organizer for game-node-relationship
3. preview and test for node play-flow (progress: 35%)
4. testing data for some nodes on cloud-db
5. consider optimization of "change destination-node" operation
*/


/* // TODO game-node visualization task list, dont items removed
4. optimization of paths: non-overlapping, line to path
5. optimization of paths: arrow looking
7. optimization on node positions when generated
8. dynamic svg size?
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
      ["key1", "testChapter1", "display"], 
      ["key2", "testChapter2", "display"],
    ]); //TODO fetch from cloud db when entering game-maker


  const [isDisplayRmBool, setDisplayRmModal] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("Main Page");

//TODO ------------------------------------------------------
  
const [chapterNodeMapAll, setChapterNodeMapAll] = useState({
  "key1": {"chapterStart1-key": {
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
  "key2": {"chapterStart2-key": {
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
      key1: [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart1-key","A1-key","","","D1-key","chapterEnd1-key","","","",""], 
        ["","","","","","","","","",""],
        ["C1-key","","","B1-key","","","E1-key","","",""]
      ]
    ,
      key2: [
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
 
  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);


  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {
    if (firstTimeEnter === true) {
      console.log("GameMaker-state: ", state);//TODO testing

        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
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

  function updateLinkingNodeFunc(position, nodename, chapterkey) {
    //TODO either update "starting" or "ending" node of a chapter
  }

  function fetchCurrChapterNodeList(chapterKey) {
    // with chapter key, return the node list from cloud(?)
    console.log("fetchCurrChapterNodeList - ", chapterKey); //TODO
    if (chapterKey === -1) {
      setCurrChapterKey("");
    }
  }

  function updateCurrProjectNavObj(obj) {
    setCurrentProjectNav(obj);
  }

  function passInNavObj() {
    return currentProjectNav;
  }

  function handleResourceManagerOpen() {
    setDisplayRmModal(true);
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

  function passInChapterData() {
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

  function addNewChapter(chapterData, newKey) {
    setChapterList(chapterData);
    
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

  function passInChapterList() {
    return chapterList;
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
      >Test Game-play</button>
      <button className="buttonRight50 rmTab" onClick={()=>{setDisplayRmModal(true);}}> {resourceManagerButtonText[languageCode]} </button>
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
          chapterData={chapterList} 
          updateChapterData={addNewChapter} 
          chosenChapter={currChapterKey} 
          passInChosenChapter={setCurrChapterKey} 
          updateLinkingNode={updateLinkingNodeFunc}
          getCurrentChapterNodeList={fetchCurrChapterNodeList}
          getChapterDataInfo={passInChapterData}
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
        />
        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}

    {!showChapterMaker && 

        <div className="parallelFrame sectionArea"> 
          
     
          <NavigationSetter 
            initialNavObj={currentProjectNav} 
            updateNavObj={updateCurrProjectNavObj} 
            openRm={handleResourceManagerOpen} 
            updateCurrentPageName={updateCurrPageName} 
            fetchPageName={passInCurrSelectedPage}
            initialScreenHeight={screenHeight}
            getScreenheight={passInScreenHeight}
          />
          
          
          <div style={{"marginTop": "15px"}}>
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

    {isDisplayEntireGameViewer && 
      <GameMakerLevel_Viewer
        isDisplay={isDisplayEntireGameViewer}
        makeNotDisplay={closeEntireGameViewer}
        navigationObj={currentProjectNav}
        initialChapterList={chapterList}
        getChapterList={passInChapterList}
      />}

 
  </div>

  
    );
}
