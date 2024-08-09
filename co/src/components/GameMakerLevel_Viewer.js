import { useState, useEffect } from 'react';

export default function GameMakerLevel_Viewer({isDisplay, makeNotDisplay, navigationObj}) {

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
    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [navStatus, setNavStatus] = useState("Main Page");

    const [gameDataTracker, setGameDataTracker] = useState(); //TODO add default from user's setting; pass-in to callee components (game nodes)

    const [currChapterKey, setCurrChapterKey] = useState("");
    
    const [currNodeType, setCurrNodeType] = useState(""); //TODO according to node-type, display the correct node's viewer?


    function getNavStatus(word) {
        setNavStatus(word);
    }

    function updateGameData(data) { // model's functionality
        setGameDataTracker(data);
    }

    function passInGameData() {
        return gameDataTracker;
    }

return(<>

<div className={modalStyleName}>
    <div className="modalArea" style={{"position": "relative"}}>

        <button onClick={()=>{makeNotDisplay();}}>Close</button>
    ~GameMakerLevel_Viewer~

        {navStatus === "During Game" && <div style={{"position": "absolute"}}>
            placeholder: game node (content+UI)
            
            <br></br>TODO: according to currNodeType, display the component
        </div>}

        <div className="plans" style={{"position": "absolute"}}>
            placeholder: navigation/UI system
            <br></br>with "navigationObj"
            <br></br>TODO: send in getNavStatus() for current nav-page

        </div>

    </div>





</div>

    
</>);

}