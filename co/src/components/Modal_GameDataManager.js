import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';


//TODO20 cloud-func
import { getProjectGameDataDesignVM, updateGameDataDesignVM } from '../viewmodels/GameDataViewModel';

//TODO6000 offline mode prep

 //TODO3000 update from emu_gameDataManager...

//TODO adjust plan: fetch data from cloud-db, and provde display and setup features


//fetch data from cloud, and update to outer-layer when user-changed...
export default function Modal_GameDataManager ({
        handleGdmCancel, 
        resetNeedCloudData, 

        projName,

        username,
        
        
        updateGameDataDesignListToOuterLayer,
        updateForEmuGdt1,
        
        languageCodeTextOption,

        editorMode,            //"offline_half"       "offline_full"        "online_cloud"  
        
        backendOption
    }) {
    
    


    let modalStyleName = "displayBlock modalBackboard";
  

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

    let textText = textDictItem.textText !== undefined ?
            textDictItem.textText
            : textDictItemDefault.textText; 

    let numberText = textDictItem.numberText !== undefined ?
            textDictItem.numberText
            : textDictItemDefault.numberText;

    let trueFalseText = textDictItem.trueFalseText !== undefined ?
            textDictItem.trueFalseText
            : textDictItemDefault.trueFalseText;

    let trueText = textDictItem.trueText !== undefined ?
            textDictItem.trueText
            : textDictItemDefault.trueText;

    let falseText = textDictItem.falseText !== undefined ?
            textDictItem.falseText
            : textDictItemDefault.falseText;

    let selectText = textDictItem.selectText !== undefined ?
            textDictItem.selectText
            : textDictItemDefault.selectText;




    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    useEffect(() => {
   //     console.log("game-data-manager: authname = ", username);
        if (username === "_") {

            if (username !== "_") {
                initialization(username);

            } else {
                setFirstTimeEnter(true);
            }
        }

        if (firstTimeEnter === true && username !== "_") {
        // if (username !== "_" && gdmMapSize === 0) {

        //     initialization(username);

           setFirstTimeEnter(false);
        }


    });

    const [displayNewVarArea, setDisplayNewVarArea] = useState(false);
    const [newGameDataType, setNewGameDataType] = useState("isNumber");
    const [isNewGdataTypeBoolean, setIsNewDdataTypeBoolean] = useState(false);
    const [defaultNewBooleanValue, setDefaultNewBooleanValue] = useState("invalid");
    const [newVarName, setNewVarName] = useState("");
    const [defaultNewValue, setDefaultNewValue] = useState(0);
    const [usingGameDataDesign, setUsingGameDataDesign] = useState({});
    const [editLineDisplay, setEditLineDisplay] = useState("");
    const [editAreaOpen, setEditAreaOpen] = useState(false);
    const [updatedDefaultValue, setUpdatedDefaultValue] = useState("");

    const [gdmMapSize, setGdmMapSize] = useState(0);

    function initialization(usernameTemp) {
        let isUpdated = true;
console.log("initializaed game data manager!!!", usernameTemp);



        let tempGameDataDesign = {};

        if (editorMode === "online_cloud") {
            fetchFromCloud(usernameTemp);
         
        }


    }

    async function fetchFromCloud(usernameTemp) {
        await getProjectGameDataDesignVM({
            projectName: projName, 
            uname: usernameTemp, 
            mostUpdated: true,
            bkOption: backendOption //TODO999
        
        })

        .then((tempGameDataDesign)=>{
            console.log("2!!! game-data-design-list-from-cloud: ", tempGameDataDesign);

            if (tempGameDataDesign !== null && tempGameDataDesign !== undefined) {

                let objSize = Object.keys(tempGameDataDesign).length;
                setGdmMapSize(objSize);
                    //                        console.log("game-data-manager window initialized: ", tempGameDataDesign, "... size = ", objSize);
                                        
                setUsingGameDataDesign(tempGameDataDesign);
    
            } else {
                setGdmMapSize(1);
                setUsingGameDataDesign({"placeholder123456789___###___###___##": "placeholder123456789___###___###___##"});
    
            }
            console.log("3modal-gd-mgr : fetched \n\t", tempGameDataDesign);

            
       });

    }

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
        setNewGameDataType("isNumber");
        setNewVarName("");
        setDefaultNewBooleanValue("invalid");
        setDefaultNewValue(0);
        setIsNewDdataTypeBoolean(false);
    }

    async function addVarPair() {
        if (newVarName === "") {
            window.alert("Variable name can not be empty.");
            return;
        }

        if (newGameDataType === "isBoolean" && (defaultNewBooleanValue === "invalid" || defaultNewBooleanValue.length === 0)) {
            console.log("invalid boolean");
            return;
        }

        if (usingGameDataDesign.hasOwnProperty(newVarName)) {
            console.log("Error: duplicate game-data name."); //TODO test
            return;
        }


        let newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": newGameDataType};
        
        if (newGameDataType === "isBoolean") {
            let boolVal = defaultNewBooleanValue === "isTrue" ? true : false;
            newObj = {"name": newVarName, "default_value": boolVal, "data_type": "boolean"};
        } else if (newGameDataType === "isNumber") {
            newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": "number"};
        } else if (newGameDataType === "isText") {
            newObj = {"name": newVarName, "default_value": defaultNewValue, "data_type": "string"};
        }

        const naming = newObj["name"];
    
        const gameDataTemp = {
          ...usingGameDataDesign,
          [naming]: newObj,
        };


        let objSize = Object.keys(gameDataTemp).length;
        setGdmMapSize(objSize);

                        console.log("adding new var: ", gameDataTemp, ", size = ", objSize); //TODO test
    
        setUsingGameDataDesign(gameDataTemp); /* update local  data structure */
    
        //resetNeedCloudData();// TODO remove?
        
        if (editorMode === "online_cloud") {
            await updateGDataDesignToCloud(gameDataTemp); /* update cloud db */
        }

        updateGameDataDesignListToOuterLayer(gameDataTemp);

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
            setDefaultNewBooleanValue("isTrue");
        } else if (event.target.value === "isFalse") {
            setDefaultNewBooleanValue("isFalse");
        } else {
            setDefaultNewBooleanValue("");
        }
    }

    function changeNewVarName(event) {
        setNewVarName(event.target.value);
    }

    function changeDefaultNewValue(event) {
        setDefaultNewValue(event.target.value);
    }

    async function deleteListItem(obj) {
        //change locally for UI
        let askString = "Are you sure to delete game-data-item " + obj["name"] + " ?";

        let response = window.confirm(askString);
        if (response === true) {

            let tempMap = {};
            Object.keys(usingGameDataDesign).map((key) => {
                if (key !== obj["name"]) {
                    tempMap[key] = usingGameDataDesign[key];
                }
                // return tempMap;
            });
            let objSize = Object.keys(tempMap).length;
            setGdmMapSize(objSize);
                                    console.log("new gdm-design size = ", objSize);
            setUsingGameDataDesign(tempMap);
    
            //TODO3 later: change to cloud db
    
                        //TODO changing area
                    
            resetNeedCloudData();
                                            
            await updateGDataDesignToCloud(tempMap); /* update cloud db */
    
            //fetchFromCaller();
                        //TODO changing area

            updateGameDataDesignListToOuterLayer(tempMap);

        }



      

    }



    function editListItem(obj) {
        setEditLineDisplay(obj["name"]);
        setUpdatedDefaultValue(obj["default_value"]);

        setEditAreaOpen(true);
    }

    async function saveTableChanges() {
        //TODO validation? then save changes? for number & boolean types
        if (editorMode === "online_cloud") {
            await updateVarDefaultValue();
        }

        setEditAreaOpen(false);
        setEditLineDisplay("");
    }
    function editVarDefaultValue(event) {
        setUpdatedDefaultValue(event.target.value);
    }

    async function updateVarDefaultValue() {
        if (editLineDisplay === "") {
            console.log("error: empty editing."); //TODO
            return;
        }

        let updatedVal = updatedDefaultValue;
        if (usingGameDataDesign[editLineDisplay]["data_type"] === "boolean") {
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
        Object.keys(usingGameDataDesign).map((k) => {

            if (k !== editLineDisplay) {
                newGameData[k] = usingGameDataDesign[k];
            } else {
                const newObj = {
                    "name": usingGameDataDesign[k]["name"],
                    "data_type": usingGameDataDesign[k]["data_type"],
                    "default_value": updatedVal,
                }
                newGameData[k] = newObj;
            }
            return newGameData;
        });
        let objSize = Object.keys(newGameData).length;
        setGdmMapSize(objSize);
                                console.log("new gdmMap-data size = ", objSize);
        setUsingGameDataDesign(newGameData);

        if (editorMode === "online_cloud") {
            await updateGDataDesignToCloud(newGameData);
        }

        updateGameDataDesignListToOuterLayer(newGameData);
    }

    async function updateGDataDesignToCloud(gameDataLatest) {


        if (projName === "" || projName === undefined || projName.trim() === "") {
            return;
        }
        let currUser = username;

        if (editorMode === "online_cloud") {

            await updateGameDataDesignVM({
                projectName: projName, 
                uname: currUser, 
                gameData: gameDataLatest,
                bkOption: backendOption //TODO999
            });
        }

        updateForEmuGdt1(gameDataLatest);
    
    }


    return (
    <div className={modalStyleName}>

    <div>

    <div className="modalContent">
        <div style={{
            "marginTop": "50px",
        }}>
        <button className="cursor_pointer modalClose buttonRight50" 
            onClick={()=>{handleGdmCancel()}}>
            {closeText}
        </button>

        <div 
            className="gameDataDisplayArea">
            
            <div>
                <div 
                    className={!displayNewVarArea? "dataArea" : "dataAreaShrink"}
                    style={{
                        
                        "marginTop": "10px",
                        "marginLeft": "20%",
                        "width": "900px",
                        "height": "292px"
                    }}
                >
                    <table style={{"width": "900px"}}>
                        <thead>
                            <tr className="textNoSelect tableRow">
                                <th>{varNameText}</th>
                                <th>{typeText}</th>
                                {/* <th>{defaultValueText}</th> */}
                                <th>{operationsText}</th>
                            </tr>
                        </thead>

                        <tbody>       
                        {Object.keys(usingGameDataDesign).map((key) => {

                            if (key === "placeholder123456789___###___###___##") {
                                return;
                            }
                        
                            return (
                                <tr key={key} className="tableItem tableRow">
                                    <td>{key}</td>

                                    <td>{usingGameDataDesign[key]["data_type"]}</td>

                                {/* {(editLineDisplay !== key) && 
                                    <td>
                                        {usingGameDataDesign[key]["default_value"] === true ? "True" : usingGameDataDesign[key]["default_value"] === false ? "False" : usingGameDataDesign[key]["default_value"]}
                                    </td>}
                                {(editLineDisplay === key && editAreaOpen === true) && 
                                    <td><input value={updatedDefaultValue} onChange={editVarDefaultValue} className="editInput"></input></td>}
                                */}

                                {(editLineDisplay !== key) && 
                                    <td className="parallelFrame">
                                        {/* <button className="cursor_pointer" onClick={()=>{editListItem(usingGameDataDesign[key]);}}>{editText}</button> */}
                                        <button className="cursor_pointer" onClick={()=>{deleteListItem(usingGameDataDesign[key]);}}>{deleteText}</button>
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
               
                {(gdmMapSize >= 8)
                    && <div style={{
                    "backgroundColor": "grey",
                    "marginLeft": "20%",
                    "width": "900px",
                    "height": "17px",
                    "borderRadius": "0px",
                }}>
                   ... ...
                </div>}

            </div>

            {!displayNewVarArea && 
                <div className="addNewGameDataAreaClosed"
                >
                    <button onClick={showNewVarForm}>+ {addNewVariableText}</button>
                </div>}
            {displayNewVarArea && 
                <div className="addNewGameDataArea"
                    style={{
                        
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
                        <option value="isText" key="new-val-type-text"> {textText} </option>
                        <option value="isNumber" key="new-val-type-number"> {numberText} </option>
                        <option value="isBoolean" key="new-val-type-boolean"> {trueFalseText} </option>
                    </select>
                    <br></br>
                    <label>{defaultValueText}: </label>
                    {!isNewGdataTypeBoolean && 
                    <input type="text" value={defaultNewValue} onChange={changeDefaultNewValue}></input>
                    }
                    {isNewGdataTypeBoolean && 
                    <select value={defaultNewBooleanValue} onChange={(event)=>{selectOnDefaultBoolean(event)}}>
                        <option value="" key="new-val-bool-defaultNone"> --- {selectText} ---</option>
                        <option value="isTrue" key="new-val-bool-true"> {trueText} </option>
                        <option value="isFalse" key="new-val-bool-false"> {falseText} </option>
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
    
</div>
    );
}