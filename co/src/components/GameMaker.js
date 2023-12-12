import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProjectGameDataVM, updateGameDataVM } from '../viewmodels/GameDataViewModel';
import GameDataManager from './GameDataManager';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';

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

  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";
  const [needCloudGameData, setNeedCloudGameData] = useState(true);

  const [gameDataLocal, setGameDataLocal] = useState({});
  const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
  const [displayGameDataButton, setDisplayGameDataButton] = useState(true);

  const [currChapter, setCurrChapter] = useState("");
  const [chapterList, setChapterList] = useState(["testChapter1", "testChapter2"]); //TODO fetch from cloud db

  async function displayGameData() {
    setDisplayGameDataButton(false);

    if (needCloudGameData === true) {
      await fetchGameDataFromCloud();
    } else {
      console.log("*from local* game-data: using existing data"); 
    }
    setDisplayGameDataWindow(!displayGameDataWindow);
    setDisplayGameDataButton(true);
  }

  async function fetchGameDataFromCloud() {

    const currUser = "user002"; //TODO test

    let project = "";
    if (state != null) {
      if (state.selected_project_name !== null && state.selected_project_name!== undefined) {
        
        console.log("!!! This is for project: ", state.selected_project_name);
        project  = state.selected_project_name;
        console.log("checking2 on project ... [", project, "]");
        if (project.trim() === "") {
          return;
        }

        const gdataTestResult = await getProjectGameDataVM({projectName: project, uname: currUser, mostUpdated: needCloudGameData});
     
        if (gdataTestResult === undefined) {
          console.log("Error: no game_data in this project...");
          return;
        }
        console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
        setGameDataLocal(gdataTestResult);
        setNeedCloudGameData(false);
      
      }
    } 
  }

  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }

  function handleGameDataManagerCancel() {
    setDisplayGameDataWindow(!displayGameDataWindow);
  }


  function updateGDataToCloud(gameDataLatest) {
    const currUser = "user002"; //TODO test

    let project = "";
    if (state != null) {
      if (state.selected_project_name !== null && state.selected_project_name!== undefined) {
        project  = state.selected_project_name;
        if (project.trim() === "") {
          return;
        }
        updateGameDataVM({projectName: project, uname: currUser, gameData: gameDataLatest});
      }
    }
  }

  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }


  return (
  <div>

    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
    </div>

    <button onClick={fetchGameDataFromCloud}>Load Game Data </button>
    {displayGameDataButton && <button onClick={displayGameData}> Check Game data </button>}
    {!displayGameDataButton && <label> Opening Game Data Manager... </label>}



    <br></br>
   {displayGameDataWindow && <GameDataManager isDisplay={displayGameDataWindow} handleGdmCancel={handleGameDataManagerCancel} gameData={gameDataLocal} resetNeedCloudData={markNextNeedCloudGameData} fetchFromCloud={fetchGameDataFromCloud} updateGameDataToCloud={updateGDataToCloud}/>}


    <p className="plans"> Game Maker page 
    <br></br>this is the place to edit for a specific game </p>
   
    <p className="plans"> TODO: game-flow controller:
     <br></br> in charge of where the game flow goes, including using logic organizer to decide on branches, progress, etc. 
     <br></br> - need a "pointer" that keeps track of "current game progress", so that it points to the current place, and be ready to continue in the flow
     <br></br> idea: it keeps the "current node", and keeps possible "next node" (decide according to logic splitter)
     <br></br> * should [understand] the logic splitter's decision flow: compare game-data with the conditional-pairs from author
     <br></br> 
     </p>

    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and click
      <br></br>hover a node would show the starting wording/desciption of this node [later]
    </p>

    

    <ChapterManager chapterData={chapterList} updateChapterData={setChapterList} chosenChapter={currChapter} updateChosenChapter={setCurrChapter}/>

 
    <NodeManager state={state}/>
  </div>

  
    );
}
