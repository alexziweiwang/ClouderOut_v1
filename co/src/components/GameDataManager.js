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

//TODO game-data manager: to add/remove variable, its type, and default value

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

    return (
    <div className={modalStyleName}>

    <div className="modalArea3">

    <div className="modalContent">
        <p> This is game-data manager!!!!!!!!! </p>
        <div className="gameDataDisplayArea">

            <ul>
                {
                Object.keys(gameData).map((key) => {
                return (
                    <li key={key}>{key}:{gameData[key]}</li>
                )
                })}
            </ul>
            <button onClick={showNewVarForm}> + New Variable </button>
            {displayNewVarArea && 
                <div>
                    <p className="plans">
                        variable name
                        <br></br>data type (options: text, number, true/false)
                        <br></br>default value
                    </p>
                    <label>Variable Name: </label>
                    <input></input>
                    <br></br>
                    <label>Data Type: </label>
                    <select value={newGameDataType} onChange={selectOnNewGdataType}>
                        <option value="isText" key="text"> Text </option>
                        <option value="isNumber" key="number"> Number </option>
                        <option value="isBoolean" key="boolean"> True/False </option>
                    </select>
                    <br></br>
                    <label>Default Value: </label>
                    {!isNewGdataTypeBoolean && <input></input>}
                    {isNewGdataTypeBoolean && 
                    <select value={defaultNewBooleanValue} onChange={selectOnDefaultBoolean}>
                        <option value="isTrue" key="true"> True </option>
                        <option value="isFalse" key="false"> False </option>
                    </select>}
                    <br></br>
                    <button onClick={addNewVarPair}>Submit</button>
                </div>
            }

        </div>


        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}