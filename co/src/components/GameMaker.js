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

  /* variable area */
  const navigate = useNavigate();
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState("");
  const [chapterList, setChapterList] = useState([["key1", "testChapter1", "display", "plot1", "end node"], ["key2", "testChapter2", "display", "", ""]]); //TODO fetch from cloud db
  const [isDisplayRmBool, setDisplayRmModal] = useState(false);

  const [showChapterMaker, setShowChapterMaker] = useState(true);
  const [selectedProgressStrategy, setSelectedProgressStrategy] = useState("");

  const [isWithSL, setIsWithSL] = useState(true);

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
          
          
          <div className="guiSettings">
              <br></br>
              <label>Main Navigation Screen Size: </label><select>
                        <option value="" key=""> ----- Select Size and Direction ----- </option>
                        <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                        <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
                        <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                        <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
              </select>
              TODO
              <br></br>

              <br></br><label>Game Progress Strategy:</label>
                <div style={{"justify-content": "center"}}>
                        <input type="radio" name="progressStrategy" checked={isWithSL} value={isWithSL} onChange={()=>{setIsWithSL(true);}}></input>
                        <label onClick={()=>{setIsWithSL(true);}}>Save and Load System</label>                    
                    
                        <br></br>
                        <input type="radio" name="progressStrategy" checked={!isWithSL} value={isWithSL} onChange={()=>{setIsWithSL(false);}}></input>
                        <label onClick={()=>{setIsWithSL(false);}}>Without Save and Load System</label>
                    
                </div>

              <br></br><label>Main Page Content: </label>
              <br></br><input type="checkbox"></input><label>Story</label>
              <br></br><input type="checkbox"></input><label>Setting</label>
              <br></br><input type="checkbox"></input><label>Player Profile</label>
              <br></br><input type="checkbox"></input><label>Shop</label>

              <br></br><br></br>
              <label></label>List Direction:
              <br></br><input type="radio"></input><label>Horizontal</label>
              <br></br><input type="radio"></input><label>Vertical</label>
              <br></br>

              
              <br></br>Settings Page Setup
              <br></br>TODO list of options of settings (speed, volume of bgm, etc.)
              <br></br>TODO table of all checkbox/option-buttons/sliders & settings (position & destination page)

              <br></br>Profile Page Setup
              <br></br>TODO elements (pic) and data displaying

              <br></br>Game Status/Data Page Setup
              <br></br>TODO data displaying
              <br></br>TODO layout

              <br></br><br></br>
              <p className="plans">
                TODO: Menu UI setter (main page, etc.)
                <br></br>TODO: Navigation setter
                <br></br>Path: main-page to story seciton, to either s/l, chapter list, or branch page         
                <br></br>Path: main-page to other parts? player profile(including game data/status?), game settings, meeting(optional), shop(optional), achievements(optional), gallery/memory(optional)  
              </p>




          </div>

          <div className="previewWindow">
            navigation preview area

          </div>








      
    </div>}
   

    <p className="plans"> Game Maker page 
    <br></br>this is the place to edit for a specific game </p>
    
    <p className="plans">
      *** design of interactable graph *** 
      <br></br>visualization and operation panel: view, hover and click
      <br></br>hover a node would show the starting wording/desciption of this node [later]
    </p>

    
    {isDisplayRmBool && 
      <ResourceManagingModalWindow 
        isDisplay = {isDisplayRmBool} 
        handleRmCancel={handleResourceManagerCancel} 
        handleRmSaveChanges={handleResourceManagerSaveChanges}
      />}
    
  </div>

  
    );
}
