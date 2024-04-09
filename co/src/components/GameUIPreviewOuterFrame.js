import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIPureInner from './GameUIPureInner';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType}) {

    const [menuType, setMenuType] = useState("(default)");

    useEffect(() => {
        let tempType = getMenuType();
        setMenuType(tempType);
    });


    return(<div className="previewWindow">
        <div className="preveiewArea2">
        
  
            <GameUIPureInner dataObj={dataObj} getTextFrameUISettings={getTextFrameUISettings} getIsDisplayDefaultButton={getIsDisplayDefaultButton} getDefaultButtonUISettings={getDefaultButtonUISettings} getBackButtonUISettings={getBackButtonUISettings}/> 
        </div>

        <div className="preveiewArea2">

                <div style={{"height": "600px", "width": "800px"}}>
                    A1. Title(Main) Screen
                

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
                </div>
        </div>

        {menuType === "storyCore" && <div className="preveiewArea2">

            <div style={{"height": "600px", "width": "800px"}}>
                A2.1 Pause Screen, Modal (story core)
                <p className="plans">
                The in-game menu (pause screen):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>Current design: [save, load, settings, properties, store(future)]
                </p>
            </div>
        </div>}

        {menuType === "notStoryCore" && <div className="preveiewArea2">

            <div>
                A2.2 Chapter Selection or  Branch Screen, Entry of all chapters (comprehensive experience)
            </div>
        </div>}
        
        {menuType === "storyCore" && <div className="preveiewArea2">

            <div>
                A3.Save/Load screen (story core)


                <p className="plans">
                    The Game Progress save/load managing page:
                    <br></br>
                    TODO: allow authors to arrangne save/load spots
                    <br></br>
                    TODO: trigger of saving [game progress + game state]
                </p>


            </div>
        </div>}






        <br></br>



    
        </div>
    
    );
}