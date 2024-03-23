import * as React from 'react';
import { useState, useEffect } from 'react';

export default function GameUIPreviewWindow({dataObj, getTextFrameData}) {
    const [txtFrameData, setTxtFrameData] = useState({});

    useEffect(() => {
        
        console.log("!!! GameUIPreviewWindow - gameUITextFrame: ");
        let data = getTextFrameData();
        console.log(data);
        setTxtFrameData(data);
    });
    

    return(<div className="previewWindow">
            <div className="preveiewArea2">
            
            {Object.keys(txtFrameData).map((k) => {
                return (<>
                    -{k}: {txtFrameData[k]}<br></br>
                </>);
            })}
            </div>

            
        <div> <br></br><br></br><br></br>Outside: <br></br>
            A1. Title Screen
            <br></br>
            A2. Pause Screen 
        </div>

        <p className="plans">

            <br></br>TODO: provide 1 default look, and provide custom options
            <br></br>customizable: color adjustment
            <br></br>customizable: background-picture based
            <br></br>customizable: size
            <br></br>customizable: position
            <br></br>customizable: button position
            <br></br>customizable: button look
            <br></br><br></br>

        </p>

        <div>
            <p className="plans">
                The opening-menu (title screen):
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: opening music selection
                <br></br>
                TODO: player profile/account feature
                <br></br>Current design: [start game, load game, settings, gallery(future)]
            </p>

            <p className="plans">
                The in-game menu (pause screen):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>Current design: [save, load, settings, properties, store(future)]
            </p>


            <p className="plans">
                The Game Progress save/load managing page:
                <br></br>
                TODO: allow authors to arrangne save/load spots
                <br></br>
                TODO: trigger of saving [game progress + game state]
            </p>



        </div>



    
    </div>);
}