import * as React from 'react';
import { useState } from 'react';
import styles from './webpage.css';

export default function PreviewWindow({dataObj}) {

    console.log("re-rendering @preview window", dataObj);

    let name = "/previewwindow";

    const [gameScreenSize, setGameScreenSize] = useState("");

    function changeGameScreenSize(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
          if (input === "h450_800") {
            console.log("h450_800");
            setGameScreenSize("h450_800");
          } else if (input === "v800_450") {
            console.log("v800_450");
            setGameScreenSize("v800_450");
          } else if (input === "h600_800") {
            console.log("h600_800");
            setGameScreenSize("h600_800");
          } else if (input === "v800_600") {
            console.log("v800_600");
            setGameScreenSize("v800_600");
          } else {
            console.log("not selected!");
          }
        }
    }

    function updateGameSize() {
        console.log("new game size:", gameScreenSize);
        //TODO pop some kind of warning to remind the user
        //TODO design: each node and have one size, and different nodes can have various nodes?

    }

 
    return (
        <div className="previewWindow">
     
            <div className="preveiewArea">
                
            <p className="plans">
                needed data: game size and direction info setting from the user/author
                <br></br> reads all data for current piece and present here
            </p>


            <p className="plans">
            This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)

            <br></br> TODO: load game-data here, and pass to piece-setter
            <br></br> for "consequence" by some clickable, make sure it updates the game-data
            <br></br> conosider local-version keeping, and syncing to cloud

            <br></br> After fetching the data above, previewer should reflect the adjustment and present this piece (refresh with local data)
            <br></br> also, save and update to db if requested by user.


            </p>

            <p className="plans">
                * idea: provide "game-data-viewer" for authors:
                <br></br> at all points (pieces) of the game, the author can check game-data for that progress to keep track of everything in game
                <br></br> toggle in preview-related component
            </p>

            <p className="plans">
                TODO: fetch the current game-size for this node
            </p>


            </div>

            <div>
                    <p className="plans">
                    Adjustment area: setting of size & direction for current node 
                    <br></br>should trigger warning if changing, and asking the user to re-organize things after a size/direciton change...
                    <br></br>but this feature is provided so user can utilize the existing node-content
                    </p>

                    <select value={gameScreenSize} onChange={changeGameScreenSize}>
                        <option value="" key=""> ----- Select Size and Direction ----- </option>
                        <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                        <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
                        <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                        <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>

                    </select>
                    <button onClick={()=>{updateGameSize();}}>Update</button>
                </div>
           
        </div>
    );
}