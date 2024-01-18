import * as React from 'react';
import { useState, useEffect } from 'react';
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
  
  function goToProjectManagingPanel() {
    navigate('/projectmanagingpanel', { replace: true });
  }

  const [nodeData, setNodeData] = useState([
    { nodeName: "plot1", depth: 1, inGroupPosition:0, nextNodes:[1], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "plot2",depth: 2, inGroupPosition:0, nextNodes:[2, 3], spltCondt: ["c1", "c2"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option x", depth: 3, inGroupPosition:0, nextNodes:[4], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option y", depth: 3, inGroupPosition:1, nextNodes:[4], spltCondt: ["Default: Always Reachable"], display: true, nodeType:"Card Game", screenSize: "h450_800"},
    { nodeName: "end node", depth: 4, inGroupPosition:0, nextNodes:[], spltCondt: [], display: true, nodeType:"Conversation", screenSize: "h450_800"},
  ]); //TODO testing data
  
  const [nodeRelationship, setNodeRelationship] = useState([
    { nodeName: "plot1", depth: 1, prevNode: [], nextPairs:[["plot2","Default: Always Reachable"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "plot2", depth: 2, prevNode: ["plot1"], nextPairs:[["option x","c1"], ["option y","c2"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option x", depth: 3, prevNode: ["plot2"], nextPairs:[["end node","Default: Always Reachable"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    { nodeName: "option y", depth: 3, prevNode: ["plot2"], nextPairs:[["end node","Default: Always Reachable"]], display: true, nodeType:"Card Game", screenSize: "h450_800"},
    { nodeName: "end node", depth: 4, prevNode: ["option x", "option y"], nextPairs:[], display: true, nodeType:"Conversation", screenSize: "h450_800"},
  ]); //TODO new data-design
  // prevNode: an clue to search for previous-node, and get the prev-node's next-node list length, for visualization
  // improvement on prevNode involved: adding link & deleting link, involved fields: current node's prevNode, previous nodes' nextPairs

  const [nodeRelationshipMap, setNodeRelationshipMap] = useState({
    "plot1": {depth: 1, prevNode: [], nextPairs:[["plot2","Default: Always Reachable"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    "plot2": {depth: 2, prevNode: ["plot1"], nextPairs:[["option x","c1"], ["option y","c2"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    "option x": {depth: 3, prevNode: ["plot2"], nextPairs:[["end node","Default: Always Reachable"]], display: true, nodeType:"Conversation", screenSize: "h450_800"},
    "option y": {depth: 3, prevNode: ["plot2"], nextPairs:[["end node","Default: Always Reachable"]], display: true, nodeType:"Card Game", screenSize: "h450_800"},
    "end node": {depth: 4, prevNode: ["option x", "option y"], nextPairs:[], display: true, nodeType:"Conversation", screenSize: "h450_800"},
  }); //TODO new data-design

  function updateChapterNodeData() {
    // TODO fetch currChapter
    // TODO update nodeRelationshipMap by chapter title
    // TODO strategy: from cloud? local?
    // TODO consider data structure to store, balance efficiency and cloud traffic
  }


  return (
  <div>
    
    <div className="returning_buttons">
      <button className="button" onClick={goToProjectManagingPanel}> ← Project Management </button>
      <p>projectName: {projectName}</p>

    </div>

    <div className="parallelFrame">
      
      <div>
        <ChapterManager chapterData={chapterList} updateChapterData={setChapterList} chosenChapter={currChapter} updateChosenChapter={setCurrChapter}/>
      </div>

      <div>
        <label>current chapter: {currChapter}</label><br></br>

        <NodeManager currUser={username} projectName={projectName} setNodeDataFunc={setNodeData} nodeData={nodeData}/>
      </div>

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
