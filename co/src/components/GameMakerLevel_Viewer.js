import { useState, useEffect } from 'react';

export default function GameMakerLevel_Viewer({isDisplay, makeNotDisplay}) {

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





return(<>

<div className={modalStyleName}>
    <div className="modalArea">

        <button onClick={()=>{makeNotDisplay();}}>Close</button>
    ~GameMakerLevel_Viewer~
    
    </div>





</div>

    
</>);

}