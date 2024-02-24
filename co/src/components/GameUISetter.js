import * as React from 'react';

export default function GameUISetter({}) {
    return (<div className="guiSettings">
    1. Button Look, Defualt
    <br></br><label>Corner Radius: </label>
        <select>
            <option value="0" key="0">0</option>
            <option value="1" key="1">1</option>
            <option value="5" key="5">5</option>
        </select>
    <br></br><label>Transparency: </label><input></input>

    <br></br><input type="radio"></input><label>Rectangle: </label>
        <div className="indentOne">
        <label>Button Shade </label><input></input>
        </div>
    <br></br><input type="radio"></input><label>Base Picture </label>
    <select></select><button>Resource Adding</button>
    <div className="indentOne">
        <br></br>Min-Width: <input></input>
        <br></br>Max-Width: <input></input>
        <br></br>Height: <input></input>
    </div>

    <br></br><br></br><br></br>
    2. Text Frame
    <br></br><label>Corner Radius: </label>
        <select>
            <option value="0" key="0">0</option>
            <option value="1" key="1">1</option>
            <option value="5" key="5">5</option>
        </select>
    <br></br><label>Transparency: </label><input></input>

    <br></br><input type="radio"></input><label>Rectangle: </label>
        <label>Button Shade </label><input></input>
    <br></br><input type="radio"></input><label>Base Picture </label>
    <div className="indentOne">
        <select></select><button>Resource Adding</button>
        <br></br>Width: <input></input>
        <br></br>Height: <input></input>
        <br></br>Position X: <input></input>
        <br></br>Position Y: <input></input>
    </div>
    <label>Font: </label><input></input>
    <br></br>
    <label>Font Size: </label><input></input>

    <br></br><br></br><br></br>

    3. In-game Side-bar
    <br></br>Back Button: TODO
    <br></br><labrl>Menu Option: </labrl>   
    <br></br><input type="radio"></input><label>Single Menu Option</label>
    <div className="indentOne">
        <br></br>Position X: <input></input>
        <br></br>Position Y: <input></input>
        <br></br>TODO: jump to pause page
    </div>
    <br></br><input type="radio"></input><label>Menu Option List</label>
    <div className="indentOne">
        <input type="checkbox"></input><labe>Auto</labe>
        <br></br>
        <input type="checkbox"></input><labe>Save</labe>
        <br></br>
        <input type="checkbox"></input><labe>Load</labe>
        <br></br>
        <input type="checkbox"></input><labe>Settings</labe>
        <br></br>
        <input type="checkbox"></input><labe>Return to Title-Page</labe>
        <br></br>
        <input type="checkbox"></input><labe>In-Game Data</labe>
        <br></br>
        <input type="checkbox"></input><labe>Store</labe>
        <br></br>
        <select>
            <option key="v" value="vertical">Vertical</option>    
            <option key="h" value="horizontal">Horizontal</option>    
        </select>
    </div>
    <br></br>Position X: <input></input>
    <br></br>Position Y: <input></input>

    <br></br><button>Save</button>
</div>);
}