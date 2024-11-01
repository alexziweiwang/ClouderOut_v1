import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';


export default function Modal_GameDataManager ({
        isDisplay, handleGdmCancel, 
        initialGameData, 
        resetNeedCloudData, 
        updateGameDataDesignToCloud,

        getUILanguage,
    }) {


        const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    let submitText = textDictItem.submitText !== undefined ?
            textDictItem.submitText
            : textDictItemDefault.submitText;
    
    let cancelText = textDictItem.cancelText !== undefined ?
            textDictItem.cancelText
            : textDictItemDefault.cancelText;
    
    let closeText = textDictItem.closeText !== undefined ?
            textDictItem.closeText
            : textDictItemDefault.closeText;
    
    let saveText = textDictItem.saveText !== undefined ?
            textDictItem.saveText
            : textDictItemDefault.saveText;
    
    let deleteText = textDictItem.deleteText !== undefined ?
            textDictItem.deleteText
            : textDictItemDefault.deleteText;

    let editText = textDictItem.editText !== undefined ?
            textDictItem.editText
            : textDictItemDefault.editText;
    
    let addNewVariableText = textDictItem.addNewVariableText !== undefined ?
            textDictItem.addNewVariableText
            : textDictItemDefault.addNewVariableText;
    
    let typeText = textDictItem.typeText !== undefined ? 
            textDictItem.typeText
            : textDictItemDefault.typeText;

    let varNameText = textDictItem.varNameText !== undefined ?
            textDictItem.varNameText
            : textDictItemDefault.varNameText;

    let defaultValueText = textDictItem.defaultValueText !== undefined ?
            textDictItem.defaultValueText
            : textDictItemDefault.defaultValueText;

    let operationsText = textDictItem.operationsText !== undefined ?
            textDictItem.operationsText
            : textDictItemDefault.operationsText;



    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
        useEffect(() => {
        if (firstTimeEnter === true) {

            setFirstTimeEnter(false);
        }
        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);
    });

    const [displayNewVarArea, setDisplayNewVarArea] = useState(false);
    const [newGameDataType, setNewGameDataType] = useState("isNumber");
    const [isNewGdataTypeBoolean, setIsNewDdataTypeBoolean] = useState(false);
    const [defaultNewBooleanValue, setDefaultNewBooleanValue] = useState("invalid");
    const [newVarName, setNewVarName] = useState("");
    const [defaultNewValue, setDefaultNewValue] = useState(0);
    const [usingGameData, setUsingGameData] = useState(initialGameData);
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
        if (newVarName === "") {
            window.alert("Variable name can not be empty.");
            return;
        }

        if (newGameDataType === "isBoolean" && defaultNewBooleanValue === "invalid") {
            console.log("invalid boolean");
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

        console.log("adding new var: ", gameDataTemp); //TODO test
    
        setUsingGameData(gameDataTemp); /* update local  data structure */
    
        //resetNeedCloudData();// TODO remove?
        
        updateGameDataDesignToCloud(gameDataTemp); /* update cloud db */
        // fetchFromCaller();// TODO remove?
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
        let askString = "Are you sure to delete game-data-item " + obj["name"] + " ?";

        let response = window.confirm(askString);
        if (response === true) {

            let tempMap = {};
            Object.keys(usingGameData).map((key) => {
                if (key !== obj["name"]) {
                    tempMap[key] = usingGameData[key];
                }
                // return tempMap;
            });
            
            setUsingGameData(tempMap);
    
            //TODO3 later: change to cloud db
    
                        //TODO changing area
                    
            resetNeedCloudData();
                                            
            updateGameDataDesignToCloud(tempMap); /* update cloud db */
    
            //fetchFromCaller();
                        //TODO changing area


        }



      

    }

    function updateGdmInfoBothLayers(gameDataTemp) {
        //TODO5
        updateGameDataDesignToCloud(gameDataTemp);
    }

    function editListItem(obj) {
        setEditLineDisplay(obj["name"]);
        setUpdatedDefaultValue(obj["default_value"]);

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

        let newGameData = {};
        Object.keys(usingGameData).map((k) => {

            if (k !== editLineDisplay) {
                newGameData[k] = usingGameData[k];
            } else {
                const newObj = {
                    "name": usingGameData[k]["name"],
                    "data_type": usingGameData[k]["data_type"],
                    "default_value": updatedVal,
                }
                newGameData[k] = newObj;
            }
            return newGameData;
        });

        setUsingGameData(newGameData);

        updateGameDataDesignToCloud(newGameData);
    }


    return (
    <div className={modalStyleName}>

    <div>

    <div className="modalContent">
        <br></br>
        <button className="cursor_pointer modalClose" onClick={()=>{handleGdmCancel()}}>
            {closeText}
        </button>

        <div 
            className="gameDataDisplayArea">
            
            <div 
                className={!displayNewVarArea? "dataArea" : "dataAreaShrink"}
                style={{
                    "maxHeight": "310px", 
                    "overflow": "scroll",
                    "marginTop": "10px",
                    "marginLeft": "20%",
                    "width": "900px"
                }}
            >
                <table style={{"width": "900px"}}>
                    <thead>
                        <tr className="textNoSelect tableRow">
                            <th>{varNameText}</th>
                            <th>{typeText}</th>
                            <th>{defaultValueText}</th>
                            <th>{operationsText}</th>
                        </tr>
                    </thead>

                    <tbody>       
                    {Object.keys(usingGameData).map((key) => {
                    
                        return (
                            <tr key={key} className="tableItem tableRow">
                                <td>{key}</td>

                                <td>{usingGameData[key]["data_type"]}</td>

                            {(editLineDisplay !== key) && 
                                <td>
                                    {usingGameData[key]["default_value"] === true ? "True" : usingGameData[key]["default_value"] === false ? "False" : usingGameData[key]["default_value"]}
                                </td>}
                            {(editLineDisplay === key && editAreaOpen === true) && 
                                <td><input value={updatedDefaultValue} onChange={editVarDefaultValue} className="editInput"></input></td>}


                            {(editLineDisplay !== key) && 
                                <td className="parallelFrame">
                                    <button className="cursor_pointer" onClick={()=>{editListItem(usingGameData[key]);}}>{editText}</button>
                                    <button className="cursor_pointer" onClick={()=>{deleteListItem(usingGameData[key]);}}>{deleteText}</button>
                                </td>}
                            {(editLineDisplay === key && editAreaOpen === true) && 
                                <td className="parallelFrame">
                                    <button className="cursor_pointer" onClick={()=>{saveTableChanges();}}>{saveText}</button>
                                    <button className="cursor_pointer" onClick={()=>{setEditLineDisplay("");}}>{cancelText}</button>
                                </td>}


                            </tr>
                            
                        );    
                    }
                    )}
 
                    </tbody>

                </table>
        
            </div>


            {!displayNewVarArea && 
                <div className="addNewGameDataAreaClosed"
                >
                    <button onClick={showNewVarForm}>+ {addNewVariableText}</button>
                </div>}
            {displayNewVarArea && 
                <div className="addNewGameDataArea"
                    style={{
                        "overflow": "scroll",
                        "marginTop": "10px",
                        "marginLeft": "20%",
                        "width": "889px"
                    }}
                >
                    <label>{varNameText}: </label>
                    <input type="text" value={newVarName} onChange={changeNewVarName}/>
                    <br></br>
                    <label>{typeText}: </label>
                    <select value={newGameDataType} onChange={selectOnNewGdataType}>
                        <option value="isText" key="text"> Text </option>
                        <option value="isNumber" key="number"> Number </option>
                        <option value="isBoolean" key="boolean"> True/False </option>
                    </select>
                    <br></br>
                    <label>{defaultValueText}: </label>
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
                    <button onClick={()=>{showNewVarForm()}}>{cancelText}</button>
                    <button onClick={()=>{addVarPair()}}>{submitText}</button>

                </div>
            }
        </div>


    </div> 
    
    
    
    </div> 
    
    </div>
    );
}