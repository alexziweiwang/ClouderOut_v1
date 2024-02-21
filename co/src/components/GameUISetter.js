import * as React from 'react';
import { useState } from 'react';
import styles from './webpage.css';

export default function GameUISetter({dataObj}) {

    return(<div className="previewWindow">

        <div className="settings">
            1. Button Look, Defualt
            <br></br><label>Corner Radius: </label><input></input>
            <br></br><label>Transparency: </label><input></input>

            <br></br><input type="radio"></input><label>Rectangle: </label>
                <label>Button Shade </label><input></input>
            <br></br><input type="radio"></input><label>Base Picture </label>
            <select></select><button>Resource Adding</button>
            <br></br>Min-Width: <input></input>
            <br></br>Max-Width: <input></input>
            <br></br>Height: <input></input>

            <br></br><br></br><br></br>
            2. Text Frame
            <br></br><label>Corner Radius: </label><input></input>
            <br></br><label>Transparency: </label><input></input>

            <br></br><input type="radio"></input><label>Rectangle: </label>
                <label>Button Shade </label><input></input>
            <br></br><input type="radio"></input><label>Base Picture </label>
            <select></select><button>Resource Adding</button>
            <br></br>Width: <input></input>
            <br></br>Height: <input></input>
            <br></br>Position X: <input></input>
            <br></br>Position Y: <input></input>

            <br></br><br></br><br></br>

            3. In-game Side-bar
            <br></br>Back Button: TODO
            <br></br><labrl>Menu Option: </labrl>   
            <br></br><input type="radio"></input><label>Single Menu Option</label>
            <br></br>Position X: <input></input>
            <br></br>Position Y: <input></input>
            <br></br>TODO: jump to pause page
            <br></br><input type="radio"></input><label>Menu Option List</label>
            <br></br>TODO: select needed options (checkbox items)
            <br></br><select></select> TODO: vertical or horizontal
            <br></br>TODO: list position
            <br></br>Position X: <input></input>
            <br></br>Position Y: <input></input>
        </div>

        <div> <br></br><br></br><br></br>Outside: <br></br>
            A1. Title Screen (special node before chapter?)<br></br>
            A2. Pause Screen (special node within chapter?)
        </div>

        <p className="plans">
            Provide setting options for game menu, game UI, side menut, etc.
            <br></br>
            Features:
            <br></br>* Opening menu (TODO: consider as a special page or node, etc.)
            <br></br>* in-game side bar (TODO: consider a list/table of multiple designs by users)
            <br></br>* in-game menu (pause page) (TODO: consider the jumping logic ***)
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
                <br></br>Current design: [start game, load game, settings, gallery(future)]
            </p>

            <p className="plans">
                The in-game side bar:
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: setup options for button UX
                <br></br>Current design: menu single button + return + auto? 
            </p>

            <p className="plans">
                The in-game menu (pause page):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>Current design: [save, load, settings, properties, store(future)]
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