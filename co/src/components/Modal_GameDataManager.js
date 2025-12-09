import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';
import { placeholderNameDefault } from './_dataStructure_DefaultObjects';

export default function Modal_GameDataManager ({
        handleGdmCancel, 

        initialGameDataDesign,
        
        updateGameDataDesignListToOuterLayer,

        languageCodeTextOption,
        
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





    const [isDisplayNewVarArea, setIsDisplayNewVarArea] = useState(false);

    const [addingNewVar, setAddingNewVar] = useState(""); // when adding a new variable
    const [addingNewVarType, setAddingNewVarType] = useState("isNumber");
    const [isAddingNewVarTypeBool, setIsAddingNewVarTypeBool] = useState(false);
    const [addingNewVarDftVal, setAddingNewVarDftVal] = useState(0);
    const [addingNewVarDftBool, setAddingNewVarDftBool] = useState("invalid");

    const [editingVarDftVal, setEditingVarDftVal] = useState(""); // when editing a variable's default-value
    const [isDisplayEditingDftValArea, setIsDisplayEditingDftValArea] = useState(false); // whether [editing of one item's default value] area opens or not
    const [editingVarDftCddt, setEditingVarDftCddt] = useState(""); // candidate

    const [usingGameDataDesign, setUsingGameDataDesign] = useState({}); // the main data-structure for game-data-design

    const [gdmMapSize, setGdmMapSize] = useState(0);




    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    useEffect(() => {

        if (firstTimeEnter === true) {

            setUsingGameDataDesign(initialGameDataDesign);
            let mapLen = Object.keys(initialGameDataDesign).length;
            setGdmMapSize(mapLen);

            setFirstTimeEnter(false);
        }


    });


    function showNewVarForm() {
        setIsDisplayNewVarArea(!isDisplayNewVarArea);
        setAddingNewVarType("isNumber");
        setAddingNewVar("");
        setAddingNewVarDftBool("invalid");
        setAddingNewVarDftVal(0);
        setIsAddingNewVarTypeBool(false);
    }

    function addVarPair() {
        if (addingNewVar === "") {
            window.alert("Variable name can not be empty.");
            return;
        }

        if (usingGameDataDesign.hasOwnProperty(addingNewVar)) {
            console.log("Error: duplicate game-data-item name."); //TODO test
            return;
        }


        if (addingNewVarType === "isBoolean" 
            && (addingNewVarDftBool === "invalid" 
                || addingNewVarDftBool.length === 0)) {
            console.log("invalid boolean");
            return;
        }



        let newObj = {
            "name": addingNewVar, 
            "default_value": addingNewVarDftVal, 
            "data_type": addingNewVarType
        };
        
        if (addingNewVarType === "isBoolean") {
            let boolVal = addingNewVarDftBool === "isTrue" ? true : false;
            newObj = {"name": addingNewVar, "default_value": boolVal, "data_type": "boolean"};
        } else if (addingNewVarType === "isNumber") {
            newObj = {"name": addingNewVar, "default_value": addingNewVarDftVal, "data_type": "number"};
        } else if (addingNewVarType === "isText") {
            newObj = {"name": addingNewVar, "default_value": addingNewVarDftVal, "data_type": "string"};
        }

        const naming = newObj["name"];
    
        const gameDataTemp = {
          ...usingGameDataDesign,
          [naming]: newObj,
        };


        let objSize = Object.keys(gameDataTemp).length;

                        console.log("adding new var: ", gameDataTemp, ", size = ", objSize); //TODO test
        
        let actionName = "addNewVar"
        updateGDDesign_allPlaces(gameDataTemp, objSize, actionName, newObj);

        setIsDisplayNewVarArea(false);
    }

    function selectOnNewGdataType(event) {
        setAddingNewVarType(event.target.value);
        console.log("selected:", event.target.value); //TODO testing
        if (event.target.value === "isBoolean") {
            setIsAddingNewVarTypeBool(true);
        } else {
            setIsAddingNewVarTypeBool(false);
        }
    }

    function selectOnDefaultBoolean(event) {
        if (event.target.value === "isTrue") {
            setAddingNewVarDftBool("isTrue");
        } else if (event.target.value === "isFalse") {
            setAddingNewVarDftBool("isFalse");
        } else {
            setAddingNewVarDftBool("");
        }
    }

    function changeaddingNewVar(event) {
        setAddingNewVar(event.target.value);
    }

    function changeaddingNewVarDftVal(event) {
        setAddingNewVarDftVal(event.target.value);
    }

    function deleteListItem(singleObj) {
        //change locally for UI
        let askString = "Are you sure to delete game-data-item " + singleObj["name"] + " ?";

        let response = window.confirm(askString);
        if (response === true) {

            let tempMap = {};
            Object.keys(usingGameDataDesign).map((key) => {
                if (key !== singleObj["name"]) {
                    tempMap[key] = usingGameDataDesign[key];
                }
                // return tempMap;
            });
            let objSize = Object.keys(tempMap).length;
                                    console.log("new gdm-design size = ", objSize);

            let actionName = "removeVar";
            updateGDDesign_allPlaces(tempMap, objSize, actionName, singleObj);

        }

    }

    function handleEditDftValItem(obj) {
        setEditingVarDftVal(obj["name"]);
        setEditingVarDftCddt(obj["default_value"]);

        setIsDisplayEditingDftValArea(true);
    }

    function saveDefaultValChange() { //TODO33333
        //TODO validation? then save changes? for number & boolean types
        updateVarDefaultValue();
        

        setIsDisplayEditingDftValArea(false);
        setEditingVarDftVal("");
    }

    function editVarDefaultValueTemp(event) {
        setEditingVarDftCddt(event.target.value);
    }

    function updateVarDefaultValue() {
                            console.log("func updateVarDefaultValue: for [", editingVarDftVal, "]");


        if (editingVarDftVal === "") {
            console.log("error: empty editing."); //TODO
            return;
        }

        let updatedVal = editingVarDftCddt;

                            console.log("\t going to be : ", updatedVal);


                            // if (usingGameDataDesign[editingVarDftVal]["data_type"] === "boolean") {
                            //     if (editingVarDftCddt === "True" || editingVarDftCddt === "true" || editingVarDftCddt === "1" || editingVarDftCddt === 1 || editingVarDftCddt === "Yes" || editingVarDftCddt === "yes" || editingVarDftCddt === "Y" || editingVarDftCddt === "T") {
                            //         updatedVal = true;
                            //     } else if (editingVarDftCddt === "False" || editingVarDftCddt === "false" || editingVarDftCddt === "0" || editingVarDftCddt === 0 || editingVarDftCddt === "No" || editingVarDftCddt === "no" || editingVarDftCddt === "N" || editingVarDftCddt === "F") {
                            //         updatedVal = false;
                            //     } else {
                            //         console.log("error: please enter valid boolean value."); //TODO test
                            //         return;
                            //     }

                            // }

        const newObj = {
            "name": usingGameDataDesign[editingVarDftVal]["name"],
            "data_type": usingGameDataDesign[editingVarDftVal]["data_type"],
            "default_value": updatedVal,
        }

        let newGameData = usingGameDataDesign;
        newGameData[editingVarDftVal] = {
            "name": usingGameDataDesign[editingVarDftVal]["name"],
            "data_type": usingGameDataDesign[editingVarDftVal]["data_type"],
            "default_value": updatedVal,
        };


                                    // let newGameData = {};
                                    // Object.keys(usingGameDataDesign).map((k) => {

                                    //     if (k !== editingVarDftVal) {
                                    //         newGameData[k] = usingGameDataDesign[k];
                                    //     } else {
                                    //         const newObj2 = {
                                    //             "name": usingGameDataDesign[k]["name"],
                                    //             "data_type": usingGameDataDesign[k]["data_type"],
                                    //             "default_value": updatedVal,
                                    //         }
                                    //         newGameData[k] = newObj2;
                                    //     }
                                    //     return newGameData;
                                    // });
        let objSize = Object.keys(newGameData).length;
                                console.log("new gdmMap-data size = ", objSize);

        let actionName = "editVarDftVal";

        updateGDDesign_allPlaces(newGameData, objSize, actionName, newObj);

    }

    function updateGDDesign_allPlaces(updatedGameDataObj, sizeNum, emuAction, singleObj) {

        setUsingGameDataDesign(updatedGameDataObj); /* update local data structure */ 
        setGdmMapSize(sizeNum);

        updateGameDataDesignListToOuterLayer(
            updatedGameDataObj, 
            emuAction, 
            singleObj
        ); /* update for outer-layer */

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
                    className={isDisplayNewVarArea === false? "dataArea" : "dataAreaShrink"}
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
                                <th>{defaultValueText}</th>
                                <th>{operationsText}</th>
                            </tr>
                        </thead>

                        <tbody>       
                        {Object.keys(usingGameDataDesign).map((key) => {

                                                                                // if (key === "p laceholder123456789___###___###___##") {
                                                                                //     return;
                                                                                // }
                  
                            if (key === placeholderNameDefault) {
                                return;
                            }


                            return (
                                <tr key={key} className="tableItem tableRow">
                                    <td>{key}</td>

                                    <td>{usingGameDataDesign[key]["data_type"]}</td>

                                {(editingVarDftVal !== key) && 
                                    <td>
                                        <label>{usingGameDataDesign[key]["default_value"] === true ? "True" : usingGameDataDesign[key]["default_value"] === false ? "False" : usingGameDataDesign[key]["default_value"]}</label>
                                        <button 
                                            className="cursor_pointer" 
                                            onClick={()=>{
                                                handleEditDftValItem(usingGameDataDesign[key]);
                                            }}>
                                                {editText}
                                        </button>
                                    </td>}
                                {(editingVarDftVal === key && isDisplayEditingDftValArea === true) && 
                                    <td>



                                        {/* //TODO9999999999 */}
                                        {/* check by edited-line data-type! */}
                                        {usingGameDataDesign[key]["data_type"] !== "boolean" 
                                        && <input 
                                            value={editingVarDftCddt} 
                                            onChange={(event)=>{editVarDefaultValueTemp(event)}} 
                                            className="editInput">    
                                        </input>}

                                        {usingGameDataDesign[key]["data_type"] === "boolean" 
                                        && <select
                                            value={editingVarDftCddt}
                                            onChange={(event)=>{editVarDefaultValueTemp(event)}}
                                            >
                                            <option value={true} key="edv-t">True</option>
                                            <option value={false} key="edv-f">False</option>
                                        </select>}

                                        <div>
                                            <button className="cursor_pointer" onClick={()=>{saveDefaultValChange();}}>{saveText}</button>
                                            <button className="cursor_pointer" onClick={()=>{setEditingVarDftVal("");}}>{cancelText}</button>          
                                        </div> 
                                        
                                    </td>}
                               

                                {<td className="parallelFrame">
                                        <button className="cursor_pointer" onClick={()=>{deleteListItem(usingGameDataDesign[key]);}}>{deleteText}</button>
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

            {isDisplayNewVarArea === false && 
                <div className="addNewGameDataAreaClosed"
                >
                    <button onClick={showNewVarForm}>+ {addNewVariableText}</button>
                </div>}
            {isDisplayNewVarArea === true && 
                <div className="addNewGameDataArea"
                    style={{
                        
                        "marginTop": "10px",
                        "marginLeft": "20%",
                        "width": "889px"
                    }}
                >
                    <label>{varNameText}: </label>
                    <input type="text" value={addingNewVar} onChange={changeaddingNewVar}/>
                    <br></br>
                    <label>{typeText}: </label>
                    <select value={addingNewVarType} onChange={selectOnNewGdataType}>
                        <option value="isText" key="new-val-type-text"> {textText} </option>
                        <option value="isNumber" key="new-val-type-number"> {numberText} </option>
                        <option value="isBoolean" key="new-val-type-boolean"> {trueFalseText} </option>
                    </select>
                    <br></br>
                    <label>{defaultValueText}: </label>
                    {!isAddingNewVarTypeBool && 
                    <input type="text" value={addingNewVarDftVal} onChange={changeaddingNewVarDftVal}></input>
                    }
                    {isAddingNewVarTypeBool && 
                    <select value={addingNewVarDftBool} onChange={(event)=>{selectOnDefaultBoolean(event)}}>
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