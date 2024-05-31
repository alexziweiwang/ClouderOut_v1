import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';
import styles from './webpage.css';

export default function GameMaker() {

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
  const [chapterList, setChapterList] = useState([["key1", "testChapter1", "display", "plot1", "end node"], ["key2", "testChapter2", "display", "", ""]]); //TODO fetch from cloud db
  const [isDisplayRmBool, setDisplayRmModal] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);

  const [currPageName, setCurrPageName] = useState("");

//TODO ------------------------------------------------------

  const [currentProjectNav, setCurrentProjectNav] = useState({
    "screenSize": "h450_800",
    "isWithSL": true,
    "mainPage-story": false,
    "mainPage-shop": false,
    "mainPage-setting": false,
    "mainPage-playerProfile": false,    
    "mainPage-entriesHorizontal": true,
    "mainPage-entriesCustom": false,

    "mainPage-isBackgroundShape": false,
    "mainPage-bgShadeName": "",
    "mainPage-bgPicName": "",
    "mainPage-isListItemShape": false,
    "mainPage-listItemShapeName": "",
    "mainPage-listItemPicName": "",
    "mainPage-listItemGroupX": 0,
    "mainPage-listItemGroupY": 0,
    "mainPage-listItemGroupWidth": 0,
    "mainPage-listItemGroupHeight": 0,

    "mainPage-story-posX": 0,
    "mainPage-story-posY": 0,
    "mainPage-story-width": 0,
    "mainPage-story-height": 0,
    "mainPage-story-fontSize": 10,
    "mainPage-story-fontColor": "",
    "mainPage-setting-posX": 0,
    "mainPage-setting-posY": 0,
    "mainPage-setting-width": 0,
    "mainPage-setting-height": 0,
    "mainPage-setting-fontSize": 10,
    "mainPage-setting-fontColor": "",
    "mainPage-playerProfile-posX": 0,
    "mainPage-playerProfile-posY": 0,
    "mainPage-playerProfile-width": 0,
    "mainPage-playerProfile-height": 0,
    "mainPage-playerProfile-fontSize": 10,
    "mainPage-playerProfile-fontColor": "",
    "mainPage-shop-posX": 0,
    "mainPage-shop-posY": 0,
    "mainPage-shop-width": 0,
    "mainPage-shop-height": 0,
    "mainPage-shop-fontSize": 10,
    "mainPage-shop-fontColor": "",

    "saveloadPage-isBackgroundShape": false,
    "saveloadPage-bgShadeName": "",
    "saveloadPage-bgPicName": "",
    "saveloadPage-isSlotShape": false,
    "saveloadPage-slotShapeName": "",
    "saveloadPage-slotPicName": "",
    "saveloadPage-slotRowCount": 1,
    "saveloadPage-slotColCount": 1,
    "saveloadPage-slotPageCount": 1,
    "saveloadPage-slotWidth": 1,
    "saveloadPage-slotHeight": 1,
    "saveloadPage-slotHorizontalGap": 1, 
    "saveloadPage-slotVerticalGap": 1,
    "saveloadPage-groupPosX": 0,
    "saveloadPage-groupPosY": 0,
    
    "settingPage-playSpeed": false,
    "settingPage-bgmVol": false,
    "settingPage-seVol": false,
    "settingPage-entriesHorizontal": true,
    "settingPage-entriesCustom": false,

    "storyPage-chapterListHorizontal": true,

    "settingPage-isBackgroundShape": false,
    "settingPage-bgShadeName": "",
    "settingPage-bgPicName": "",
    "settingPage-isListItemShape": false,
    "settingPage-listItemShapeName": "",
    "settingPage-listItemPicName": "",
    "settingPage-listItemGroupX": 0,
    "settingPage-listItemGroupY": 0,
    "settingPage-listItemGroupWidth": 0,
    "settingPage-listItemGroupHeight": 0,

    "settingPage-playSpeed-posX": 0,
    "settingPage-playSpeed-posY": 0,
    "settingPage-playSpeed-width": 0,
    "settingPage-playSpeed-height": 0,
    "settingPage-playSpeed-fontSize": 10,
    "settingPage-playSpeed-fontColor": "",

    "settingPage-bgmVol-posX": 0,
    "settingPage-bgmVol-posY": 0,
    "settingPage-bgmVol-width": 0,
    "settingPage-bgmVol-height": 0,
    "settingPage-bgmVol-fontSize": 10,
    "settingPage-bgmVol-fontColor": "",

    "settingPage-seVol-posX": 0,
    "settingPage-seVol-posY": 0,
    "settingPage-seVol-width": 0,
    "settingPage-seVol-height": 0,
    "settingPage-seVol-fontSize": 10,
    "settingPage-seVol-fontColor": "",

  }); //TODO now: default initial values

//TODO ------------------------------------------------------
 
  

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
    console.log("updated, now nav-obj is...", obj);
  }

  function passInNavObj() {
    console.log("!! passing in nav-obj...", currentProjectNav);

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

  return (
  <div>
    
    <div className="returning_buttons">
      <button className="button" onClick={()=>{goToProjectManagingPanel();}}> ← Project Management </button>
      <p>Project Name: {projectName}</p>
      <button className="buttonRight50" onClick={()=>{setDisplayRmModal(true);}}> Resource Manager </button>
    </div>
    <div>
      <button className={showChapterMaker ? "tabBarGMSelected" : "tabBarGM"} onClick={()=>{setShowChapterMaker(true);}}>Content Chapters</button>
      <button className={showChapterMaker? "tabBarGM" : "tabBarGMSelected"} onClick={()=>{setShowChapterMaker(false);}}>Menu & Navigations</button>
    </div>
    
    {showChapterMaker && <div className="parallelFrame sectionArea">
      
        {!isDisplayRmBool && 
        <ChapterManager 
          chapterData={chapterList} 
          updateChapterData={setChapterList} 
          chosenChapter={currChapterKey} 
          updateChosenChapter={setCurrChapterKey} 
          updateLinkingNode={updateLinkingNodeFunc}
          getCurrentChapterNodeList={fetchCurrChapterNodeList}
        />}

        <NodeManager 
          currUser={username} 
          projectName={projectName} 
          chapterKey={currChapterKey}
        />
    </div>}

    {!showChapterMaker && 

        <div className="parallelFrame sectionArea"> 
          
     
          <NavigationSetter initialNavObj={currentProjectNav} updateNavObj={updateCurrProjectNavObj} openRm={handleResourceManagerOpen} updateCurrentPageName={updateCurrPageName}/>
          
          <NavigationPreview initialNavObj={currentProjectNav} fetchNavObj={passInNavObj} fetchPageName={passInCurrSelectedPage}/>

    </div>}
   

    
    {isDisplayRmBool && 
      <ResourceManagingModalWindow 
        isDisplay = {isDisplayRmBool} 
        handleRmCancel={handleResourceManagerCancel} 
        handleRmSaveChanges={handleResourceManagerSaveChanges}
      />}
    
  </div>

  
    );
}
