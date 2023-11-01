import { useState, useEffect } from 'react';


export default function GameDataManager({isDisplay, handleGdmCancel, gameData, resetNeedCloudData, fetchFromCloud}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [displayNewVarArea, setDisplayNewVarArea] = useState(false);
    const [newGameDataType, setNewGameDataType] = useState("isNumber");
    const [isNewGdataTypeBoolean, setIsNewDdataTypeBoolean] = useState(false);
    const [defaultNewBooleanValue, setDefaultNewBooleanValue] = useState(true);
    const [newVarName, setNewVarName] = useState("");
    const [defaultNewValue, setDefaultNewValue] = useState(0);

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
    }

    function addNewVarPair() {
        //TODO update game-data variable: name, type, default-value to cloud db
        //TODO also trigger update of layout's above area: all game data pairs...
        resetNeedCloudData();
        fetchFromCloud();
        setDisplayNewVarArea(false);
    }

    function selectOnNewGdataType(event) {
        setNewGameDataType(event.target.value);
        console.log("selected:", event.target.value); //TODO testing
        if (event.target.value == "isBoolean") {
            setIsNewDdataTypeBoolean(true);
        } else {
            setIsNewDdataTypeBoolean(false);
        }
    }

    function selectOnDefaultBoolean(event) {
        if (event.target.value == "isTrue") {
            setDefaultNewBooleanValue(true);
        } else {
            setDefaultNewBooleanValue(false);
        }
    }

    function changeNewVarName(event) {
        setNewVarName(event.target.value);
    }

    function changeDefaultNewValue(event) {
        setDefaultNewValue(event.target.value);
    }

    return (
    <div className={modalStyleName}>

    <div className="modalArea3">

    <div className="modalContent">
        <p> This is game-data manager!!!!!!!!! </p>
        <div className="gameDataDisplayArea">
            <div className="dataArea">
            <ul>
                {
                Object.keys(gameData).map((key) => {
                return (
                    <li className="clickableListItem" key={key}>{key}:               {gameData[key]}</li>
                )
                })}
            </ul>
            </div>
            
            {!displayNewVarArea && <button onClick={showNewVarForm}> + New Variable </button>}

            {displayNewVarArea && 
                <div>
                    <label>Variable Name: </label>
                    <input type="text" value={newVarName} onChange={changeNewVarName}/>
                    <br></br>
                    <label>Data Type: </label>
                    <select value={newGameDataType} onChange={selectOnNewGdataType}>
                        <option value="isText" key="text"> Text </option>
                        <option value="isNumber" key="number"> Number </option>
                        <option value="isBoolean" key="boolean"> True/False </option>
                    </select>
                    <br></br>
                    <label>Default Value: </label>
                    {!isNewGdataTypeBoolean && 
                    <input type="text" value={defaultNewValue} onChange={changeDefaultNewValue}></input>
                    }
                    {isNewGdataTypeBoolean && 
                    <select value={defaultNewBooleanValue} onChange={selectOnDefaultBoolean}>
                        <option value="isTrue" key="true"> True </option>
                        <option value="isFalse" key="false"> False </option>
                    </select>
                    }
                    <br></br>
                    <button onClick={addNewVarPair}>Submit</button>
                </div>
            }
            {displayNewVarArea && <button onClick={showNewVarForm}> Cancel </button>}


        </div>


        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}