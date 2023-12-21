import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const projectName = "project001"; //TODO testing
  console.log("GameMaker-state: ", state);//TODO testing

  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapter, setCurrChapter] = useState("");
  const [chapterList, setChapterList] = useState(["testChapter1", "testChapter2"]); //TODO fetch from cloud db

  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }


  return (
  <div>

    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
    </div>

    <br></br>

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

    

    <ChapterManager chapterData={chapterList} updateChapterData={setChapterList} chosenChapter={currChapter} updateChosenChapter={setCurrChapter}/>

 
    <NodeManager currState={state} projectName={projectName}/>
  </div>

  
    );
}
