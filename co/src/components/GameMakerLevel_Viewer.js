import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';


export default function GameMakerLevel_Viewer({isDisplay, 
    makeNotDisplay, navigationObj,
    initialChapterList, getChapterList,
    getGameData, initialGameData
}) {
    const [screenWidth, setScreenWidth] = useState(800); //TODO
    const [screenHeight, setScreenHeight] = useState(450); //TODO

    const [showGameDataPanel, setShowGameDataPanel] = useState(true);

    const [gameDataTracker, setGameDataTracker] = useState(initialGameData); 



    const [playerGameData, setPlayerGameData] = useState();
    const [playerProfile, setPlayerProfil] = useState();
    const [playerAccount, setPlayerAccount] = useState();
    const [playerSLRecords, setPlayerSLRecords] = useState();
    //TODO implementation plan:
    //when doing this level of testing or game-in-practice, fetch player's above 4 data from cloud
    //for testing the entire game, use default-testing-player's data, otherwise use cloud-fetched data
    //consider topics about player authentication for game-in-practice



    const [currChapterKey, setCurrChapterKey] = useState("");

    const [currNodeType, setCurrNodeType] = useState(""); //TODO according to node-type, display the correct node's viewer?

//TODO (with "changing" during in-game actions)
//game-data tracker
//progress-tracker: current-chapter & current-node
//path deciding parts

//TODO settled data
//resource maps (visual & audio) [settled once started]
//node-inside-content: 
            // conv-node: <GameScreen_QuickView_ConvNode/>
            // card-game, or board-game, etc.
               
//TODO styles for game-play
//screen settings, etc.
    let modalStyleName = "";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [navPageStatus, setNavPageStatus] = useState("Main Page");

    const [chapterList, setChapterList] = useState(initialChapterList); 


     useEffect(() => {

            if (navigationObj["screenSize"] === "h450_800") {
                setScreenWidth(800);
                setScreenHeight(450);
            } else if (navigationObj["screenSize"] === "v800_450") {
                setScreenWidth(450);
                setScreenHeight(800);
            } else if (navigationObj["screenSize"] === "h600_800") {
                setScreenWidth(800);
                setScreenHeight(600);
            } else if (navigationObj["screenSize"] === "v800_600") {
                setScreenWidth(600);
                setScreenHeight(800);
            }

            let chapterListTemp = getChapterList();
            setChapterList(chapterListTemp);

            let gameDataTrackerTemp = getGameData();
            setGameDataTracker(gameDataTrackerTemp);
        });





    function updateGameData(data) { // model's functionality
        setGameDataTracker(data);
    }

    function passInGameData() {
        return gameDataTracker;
    }

    function passInNavObj() {
        return navigationObj;
    }

    function notUsing() {
        return "";
    }

    function passInNavPageName() {
        return navPageStatus;
    }

    function updateNavPageName(pageName) {
        setNavPageStatus(pageName);
    }


return(<>

<div className={modalStyleName} style={{"overflow": "scroll"}}>
  
  
    <div>

        <button className="testEntire" onClick={()=>{makeNotDisplay();}}>Stop Testing</button>
        <div style={{"marginBottom":" 10px"}}>
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
            >Show Game-Data Tracker Panel</label>
        </div>

      
        <div style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "170px" : "320px"}}>
      


{/* game-screen layer */}
                {navPageStatus === "During Game" && 
                    <div style={{
                        "position": "absolute", 
                        "backgroundColor": "orange", 
                        "top": "0px", 
                        "left": "0px",
                        "width": `${screenWidth}px`, 
                        "height": `${screenHeight}px`,
                
                    }}>
                        !!! placeholder: game node (content+UI)
                        <br></br>2
                        <br></br>3
                        <br></br>TODO: according to currNodeType, display the component
                    </div>
                }





{/* navigation layer */}
                <div style={{
                    "position": "absolute", 
                    "top": "0px", 
                    "left": "0px",
                    "width": `${screenWidth}px`, 
                    "height": `${screenHeight}px`,
                }}>
                    <NavigationPreview 
                        initialNavObj={navigationObj} 
                        fetchNavObj={passInNavObj} 
                        chapterData={chapterList} 
                        fetchPageName={passInNavPageName} 
                        updateCurrentPageName={updateNavPageName}
                    />
                </div>
        </div>

{/* screenWidth > screenHeight means horizontal game-screen */}

        
            {showGameDataPanel && <div style={{
                "width": "350px", 
                "height": `${screenHeight}px`, 
                "overflow": "scroll", 
                "backgroundColor": "grey",
                "color": "#FFFFFF",
                "marginLeft": (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+360}px`, 
                }}>
                Game Data Panel
                <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                </tr>
                            </thead>  
                            <tbody> 
                        {Object.keys(gameDataTracker).map((currKey) => {
                            let keyName = "gmdt" + currKey;
                            let val = gameDataTracker[currKey]["data_type"] === "boolean" ? 
                                    ((gameDataTracker[currKey]["current_value"] === true 
                                        || gameDataTracker[currKey]["current_value"] === "true") ? 
                                        "true" : "false") 
                                : gameDataTracker[currKey]["current_value"];

                            return (
                                <tr value={currKey} key={keyName}>
                                    <td>{gameDataTracker[currKey]["name"]}</td>
                                    <td>{val}</td>               
                                </tr>
                            
                            );
                        })}
                            </tbody>  
                        </table>

            </div>}

     



    </div>




</div>

    
</>);

}