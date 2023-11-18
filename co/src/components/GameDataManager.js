import { useState } from 'react';

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
    const [defaultNewBooleanValue, setDefaultNewBooleanValue] = useState("invalid");
    const [newVarName, setNewVarName] = useState("");
    const [defaultNewValue, setDefaultNewValue] = useState(0);
    const [usingGameData, setUsingGameData] = useState(gameData);
    const [editLineDisplay, setEditLineDisplay] = useState("");
    const [editAreaOpen, setEditAreaOpen] = useState(false);
    const [updatedDefaultValue, setUpdatedDefaultValue] = useState("");

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
        setNewGameDataType("isNumber");
        setNewVarName("");
        setDefaultNewBooleanValue("invalid");
        setDefaultNewValue(0);
        setIsNewDdataTypeBoolean(false);
    }

    function addVarPair() {
        if (defaultNewBooleanValue === "invalid") {
            return;
        }

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
        } else if (event.target.value === "isFalse") {
            setDefaultNewBooleanValue(false);
        } else {
            setDefaultNewBooleanValue("invalid");
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
            return tempMap;
        });
        setUsingGameData(tempMap);
        //TODO later: change to cloud db

    }

    function editListItem(obj) {
       
        console.log("editing game-data: " , obj); //TODO 
        console.log("before editing: " , usingGameData); //TODO

        setEditLineDisplay(obj["name"]);
        setUpdatedDefaultValue(obj["default_value"]);

        //TODO update to cloud db
                
        setEditAreaOpen(true);
    }

    function saveTableChanges() {
        //TODO validation? then save changes? for number & boolean types
        updateVarDefaultValue();
        setEditAreaOpen(false);
        setEditLineDisplay("");
    }
    function editVarDefaultValue(event) {
        setUpdatedDefaultValue(event.target.value);
    }

    function updateVarDefaultValue() {
        if (editLineDisplay === "") {
            console.log("error: empty editing."); //TODO
            return;
        }

        let updatedVal = updatedDefaultValue;
        if (usingGameData[editLineDisplay]["data_type"] === "boolean") {
            if (updatedDefaultValue === "True" || updatedDefaultValue === "true" || updatedDefaultValue === "1" || updatedDefaultValue === 1 || updatedDefaultValue === "Yes" || updatedDefaultValue === "yes" || updatedDefaultValue === "Y" || updatedDefaultValue === "T") {
                updatedVal = true;
            } else if (updatedDefaultValue === "False" || updatedDefaultValue === "false" || updatedDefaultValue === "0" || updatedDefaultValue === 0 || updatedDefaultValue === "No" || updatedDefaultValue === "no" || updatedDefaultValue === "N" || updatedDefaultValue === "F") {
                updatedVal = false;
            } else {
                console.log("error: please enter valid boolean value."); //TODO test
                return;
            }

        }

        console.log("updateVarDefaultValue(): ");
        let newGameData = {};
        Object.keys(usingGameData).map((k) => {
            console.log("each", k, "...", usingGameData[k]);
            if (k !== editLineDisplay) {
                newGameData[k] = usingGameData[k];
            } else {
                const newObj = {
                    "name": usingGameData[k]["name"],
                    "data_type": usingGameData[k]["data_type"],
                    "default_value": updatedVal
                }
                newGameData[k] = newObj;
            }
            return newGameData;
        });

        setUsingGameData(newGameData);
    }


    return (
    <div className={modalStyleName}>

    <div className="modalArea3">
        <p className="plans">
            TODO: table-item operation: delete: consider revert options


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
                            
                            </th>
                        </tr>
                    </thead>

                    <tbody>       
                    {Object.keys(usingGameData).map((key) => {
                    
                        return (
                            <tr key={key}>
                            <td>{key}</td>

                            <td>{usingGameData[key]["data_type"]}</td>

                            {(editLineDisplay !== key) && 
                            <td>
                                {usingGameData[key]["default_value"] === true ? "True" : usingGameData[key]["default_value"] === false ? "False" : usingGameData[key]["default_value"]}
                            
                            </td>}
                            {(editLineDisplay === key && editAreaOpen === true) && <td><input value={updatedDefaultValue} onChange={editVarDefaultValue}></input></td>}

                            {(editLineDisplay === "") && <td>
                                <button className="cursor_pointer" onClick={()=>{editListItem(usingGameData[key]);}}>Edit</button>
                            </td>}
                            {(editLineDisplay === key && editAreaOpen === true) && <td>
                                <button className="cursor_pointer" onClick={()=>{saveTableChanges();}}>Save</button>
                                <button className="cursor_pointer" onClick={()=>{setEditLineDisplay("");}}>Cancel</button>
                            </td>}


                            </tr>
                            
                        );    
                    }
                    )}
 
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
                        <option value="" key=""> True or False </option>
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