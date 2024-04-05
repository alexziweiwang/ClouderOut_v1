import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIPureInner from './GameUIPureInner';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings}) {

    return(<div className="previewWindow">

        <div className="preveiewArea2">
  
            <GameUIPureInner dataObj={dataObj} getTextFrameUISettings={getTextFrameUISettings} getIsDisplayDefaultButton={getIsDisplayDefaultButton} getDefaultButtonUISettings={getDefaultButtonUISettings} getBackButtonUISettings={getBackButtonUISettings}/> 
                    </div>

            <div> <br></br><br></br><br></br>Outside: <br></br>
                A1. Title Screen
                <br></br>
                A2. Pause Screen 
            </div>


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



    
        </div>
    
    );
}