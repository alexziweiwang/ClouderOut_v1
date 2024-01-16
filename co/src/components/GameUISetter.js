import * as React from 'react';
import { useState } from 'react';
import styles from './webpage.css';

export default function GameUISetter({dataObj}) {

    return(<div className="gameUISettingArea">
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



    
    </div>);
}