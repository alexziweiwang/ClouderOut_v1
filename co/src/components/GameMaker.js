import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';


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

  const [currChapter, setCurrChapter] = useState("");
  const [chapterList, setChapterList] = useState([["key1", "testChapter1", "display"], ["key2", "testChapter2", "display"]]); //TODO fetch from cloud db
  const [isDisplayRmBool, setDisplayRmModal] = useState(false);

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {
    if (firstTimeEnter === true) {
        //TODO fetch all the chapter names & node-relationship-maps into local into a map of <string, map>
        //TODO format: localChapterInfo = <chapter title, node-relationship-map>
        //TODO the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
        setFirstTimeEnter(false);
    }
  });


  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }


  function updateChapterNodeData() {
    // TODO fetch currChapter
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


  return (
  <div>
    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
      <p>projectName: {projectName}</p>
      <button className="buttonRight50" onClick={()=>{setDisplayRmModal(true);}}> Resource Manager </button>
      {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}


    </div>

    <div className="parallelFrame">
      
   
        {!isDisplayRmBool && <ChapterManager chapterData={chapterList} updateChapterData={setChapterList} chosenChapter={currChapter} updateChosenChapter={setCurrChapter}/>}

        <NodeManager currUser={username} projectName={projectName} chapterTitle={currChapter}/>


    </div>
   
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
