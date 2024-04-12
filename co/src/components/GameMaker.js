import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
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
  console.log("GameMaker-state: ", state);//TODO testing

  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState("");
  const [chapterList, setChapterList] = useState([["key1", "testChapter1", "display", "plot1", "end node"], ["key2", "testChapter2", "display", "", ""]]); //TODO fetch from cloud db
  const [isDisplayRmBool, setDisplayRmModal] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);
  const [selectedProgressStrategy, setSelectedProgressStrategy] = useState("");

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {
    if (firstTimeEnter === true) {
        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
            //TODO setChapterList(); // from cloud-db
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        
        //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        setFirstTimeEnter(false);
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


  return (
  <div>
    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
      <p>projectName: {projectName}</p>
      <button className="buttonRight50" onClick={()=>{setDisplayRmModal(true);}}> Resource Manager </button>
      {isDisplayRmBool && 
      <ResourceManagingModalWindow 
        isDisplay = {isDisplayRmBool} 
        handleRmCancel={handleResourceManagerCancel} 
        handleRmSaveChanges={handleResourceManagerSaveChanges}
      />}
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
    <div className="sectionArea"> Menu & Navigations 
      <br></br>Main Page Setup
      <br></br>TODO list of entries
      <br></br>TODO table of all entry-buttons & settings (position & destination page)

      <br></br>Settings Page Setup
      <br></br>TODO list of options of settings (speed, volume of bgm, etc.)
      <br></br>TODO table of all checkbox/option-buttons/sliders & settings (position & destination page)

      <br></br>Profile Page Setup
      <br></br>TODO elements (pic) and data displaying

      <br></br>Game Status/Data Page Setup
      <br></br>TODO data displaying
      <br></br>TODO layout



      <br></br><label>Game Progress Strategy:</label>
      <div className="parallelFrame" style={{"justify-content": "center"}}>
        <div className="selectableRectangle">
            <input type="radio" name="progressStrategy" value={selectedProgressStrategy} onChange={()=>{setSelectedProgressStrategy("sl");}}></input><label>Save/Load:</label>
            <br></br>enter game from start, or by loading the saved entries; game progress & data/status recorded by save/load slots
        </div>

        <div className="selectableRectangle">
            <input type="radio" name="progressStrategy" value={selectedProgressStrategy} onChange={()=>{setSelectedProgressStrategy("echpt");}}></input><label></label>Short experience in each chapter:
            
            <br></br>enter and view chapters, and experience all options as needed; no game data/status recorded during game-play

        </div>

        <div className="selectableRectangle">
            <input type="radio" name="progressStrategy" value={selectedProgressStrategy} onChange={()=>{setSelectedProgressStrategy("brnch");}}></input><label>Branch and Selection:</label>
          
            <br></br>present entire "story-branch" to the players; players can change some decisions (which impact branches and paths)

        </div>

      </div>

      <br></br><br></br>
      <p className="plans">
        TODO: Menu UI setter (main page, etc.)
        <br></br>TODO: Navigation setter
        <br></br>Path: main-page to story seciton, to either s/l, chapter list, or branch page         
        <br></br>Path: main-page to other parts? player profile(including game data/status?), game settings, meeting(optional), shop(optional), achievements(optional), gallery/memory(optional)  
      </p>






      
    </div>}
   
    <p className="plans">TODO: dynamic setup of "nodedata" for specific chapter, according to user choice</p> 

    <p className="plans"> Game Maker page 
    <br></br>this is the place to edit for a specific game </p>
   
    <p className="plans"> TODO: game-flow controller:
     <br></br> in charge of where the game flow goes, including using logic organizer to decide on branches, progress, etc. 
     <br></br> - need a "pointer" that keeps track of "current game progress", so that it points to the current place, and be ready to continue in the flow
     <br></br> idea: it keeps the "current node", and keeps possible "next node" (decide according to logic splitter)
     <br></br> * should provide [understandable keywords] for decision flow, and the actual game-file parse should understand and decide real-time game-flow
     <br></br> 
     </p>

    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and click
      <br></br>hover a node would show the starting wording/desciption of this node [later]
    </p>

    

    
  </div>

  
    );
}
