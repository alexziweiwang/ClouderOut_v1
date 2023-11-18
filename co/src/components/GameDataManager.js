import { useState, useEffect } from 'react';
import styles from './webpage.css';


export default function GameDataManager({isDisplay, handleGdmCancel, gameData, resetNeedCloudData, fetchFromCloud, updateGameDataToCloud}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay === true) {
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
    const [editLineDisplay, setEditLineDisplay] = useState("");
    const [editAreaOpen, setEditAreaOpen] = useState(false);

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
        setNewGameDataType("isNumber");
        setNewVarName("");
        setDefaultNewBooleanValue(false);
        setDefaultNewValue(0);
        setIsNewDdataTypeBoolean(false);
    }

    function addVarPair() {
        if (usingGameData.hasOwnProperty(newVarName)) {
            console.log("Error: duplicate game-data name."); //TODO test
            return;
        }

        let newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": newGameDataType};
        
        if (newGameDataType === "isBoolean") {
            newObj = {"name": newVarName, "default_value": defaultNewBooleanValue, "data_type": "boolean"};
        } else if (newGameDataType === "isNumber") {
            newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": "number"};
        } else if (newGameDataType === "isText") {
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
        if (event.target.value === "isBoolean") {
            setIsNewDdataTypeBoolean(true);
        } else {
            setIsNewDdataTypeBoolean(false);
        }
    }

    function selectOnDefaultBoolean(event) {
        if (event.target.value === "isTrue") {
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

    function deleteListItem(obj) {
        //change locally for UI
        let tempMap = {};
        Object.keys(usingGameData).map((key) => {
            if (key !== obj["name"]) {
                tempMap[key] = usingGameData[key];
            }
        });
        setUsingGameData(tempMap);
        //TODO later: change to cloud db

    }

    function editListItem(obj) {
        if (editAreaOpen === false) {
        console.log("editing game-data: " , obj); //TODO 
        setEditLineDisplay(obj["name"]);
        //TODO display editing panel
        //TODO update locally
        //TODO update to cloud db
        
        }
        setEditAreaOpen(!editAreaOpen);
    }


    return (
    <div className={modalStyleName}>

    <div className="modalArea3">
        <p className="plans">
            1. TODO: table-like looking for list items -- improve for UX
            <br></br>(change list to table with rows)
            <br></br>
            2. TODO: table-item operation: edit (name, type, default value)
            <br></br> delete: consider revert options


        </p>

    <div className="modalContent">
        <button className="buttonRight90 cursor_pointer" onClick={handleGdmCancel}>X</button>

        <div className="gameDataDisplayArea">
            <div className={!displayNewVarArea? "dataArea" : "dataAreaShrink"}>
                <table>
                    <thead>
                        <tr>
                            <th>Variable Name</th>
                            <th>Type</th>
                            <th>Default Value</th>
                            <th>                                
                                <button className="cursor_pointer" onClick={()=>{setEditAreaOpen(true);}}>Edit</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>       
                    {!editAreaOpen && Object.keys(usingGameData).map((key) => {
                        return (
                            <tr key={key}>
                            <td>{key}</td>
                            <td>{usingGameData[key]["data_type"]}</td>
                            <td>{usingGameData[key]["default_value"]}</td>
                            <td>
                                <div className="parallelFrame">
                                <button className="cursor_pointer" onClick={()=>{deleteListItem(usingGameData[key]);}}>Delete</button> 
                                </div>
                            </td>
                            </tr>
                        );
                    })}
                    {editAreaOpen && Object.keys(usingGameData).map((key) => {
                        return (
                            <tr key={key}>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td>
                                <div className="parallelFrame">
                                <button className="cursor_pointer" onClick={()=>{setEditAreaOpen(false);}}>Save</button>
                                <button className="cursor_pointer" onClick={()=>{setEditAreaOpen(false);}}>Cancel</button> 
                                </div>
                            </td>
                            </tr>
                        );
                    })}
                        
                    </tbody>

                </table>
        
            </div>
            
            {!displayNewVarArea && 
                <div className="addNewGameDataAreaClosed">
                <button onClick={showNewVarForm}> + New Variable </button>
                </div>}
            {displayNewVarArea && 
                <div className="addNewGameDataArea">
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
                    <button onClick={showNewVarForm}> Cancel </button>
                    <button onClick={addVarPair}>Submit</button>

                </div>

            }


        </div>


    </div> 
    
    
    
    </div> 
    
    </div>
    );
}