import { useState, useEffect } from 'react';
import styles from './webpage.css';


export default function GameDataManager({isDisplay, handleGdmCancel, gameData, resetNeedCloudData, fetchFromCloud, updateGameDataToCloud}) {
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
    const [usingGameData, setUsingGameData] = useState(gameData);

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
    }

    function addVarPair() {
        if (usingGameData.hasOwnProperty(newVarName)) {
            console.log("Error: duplicate game-data name."); //TODO test
            return;
        }

        let newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": newGameDataType};
        
        if (newGameDataType == "isBoolean") {
            newObj = {"name": newVarName, "default_value": defaultNewBooleanValue, "data_type": "boolean"};
        } else if (newGameDataType == "isNumber") {
            newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": "number"};
        } else if (newGameDataType == "isText") {
            newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": "string"};
        }

        const naming = newObj["name"];
    
        const gameDataTemp = {
          ...usingGameData,
          [naming]: newObj,
        };
    
        setUsingGameData(gameDataTemp); /* update local  data structure */
        resetNeedCloudData();
        
        updateGameDataToCloud(gameDataTemp); /* update cloud db*/
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
        <p className="plans">
            1. TODO: table-like looking for list items -- improve for UX
            <br></br>(change list to table with rows)
            <br></br>
        </p>

    <div className="modalContent">
        <button className="buttonRight90 cursor_pointer" onClick={handleGdmCancel}>X</button>

        <div className="gameDataDisplayArea">
            <div className="dataArea">
            <ul>
                {
                Object.keys(usingGameData).map((key) => {
                return (
                    <li className="clickableListItem" key={key}>{key}:{usingGameData[key]["data_type"]}, {usingGameData[key]["default_value"]}
                        <div className="pairGroup2">
                            <button className="cursor_pointer">Edit</button>
                            <button className="cursor_pointer">Delete</button> 
                        </div>
                         
                    </li>

                  
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
                    <button onClick={addVarPair}>Submit</button>
                </div>
            }
            {displayNewVarArea && <button onClick={showNewVarForm}> Cancel </button>}


        </div>


    </div> 
    
    
    
    </div> 
    
    </div>
    );
}