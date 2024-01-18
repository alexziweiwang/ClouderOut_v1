import * as React from 'react';
import { useState } from 'react';
import styles from './webpage.css';

export default function GameUISetter({dataObj}) {

    return(<div className="previewWindow">
        <p className="plans">
            Provide setting options for game menu, game UI, side menut, etc.
            <br></br>
            Features:
            <br></br>* Opening menu
            <br></br>* in-game side bar
            <br></br>* in-game menu (pause page)
            <br></br>* text-content frames

            <br></br>TODO: provide 1 default look, and provide custom options
            <br></br>customizable: color adjustment
            <br></br>customizable: background-picture based
            <br></br>customizable: size
            <br></br>customizable: position
            <br></br>customizable: button position
            <br></br>customizable: button look
            <br></br><br></br>

            TODO: consider menu setting-list
        </p>

        <div>
            <p className="plans">
                The opening-menu:
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: opening music selection
                <br></br>
                TODO: player profile/account feature
            </p>

            <p className="plans">
                The in-game side bar:
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: setup options for button UX
            </p>

            <p className="plans">
                The in-game menu (pause page):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
            </p>

            <p className="plans">
                The text-content frames:
                <br></br>
                TODO: Text display options (animation)
                <br></br>
                TODO: Text looks - font, font size, color, etc.
            </p>

            <p className="plans">
                The Game Progress save/load:
                <br></br>
                TODO: allow authors to arrangne save/load spots
                <br></br>
                TODO: trigger of saving [game progress + game state]

            </p>



        </div>



    
    </div>);
}