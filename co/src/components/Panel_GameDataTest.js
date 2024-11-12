import { useState, useEffect } from 'react';

/*
Keeps a set of creator's preferred configuration data of game-data
*/
export default function Panel_GameDataTest({
    localTest, initialGameDataStatus,
    getScreenHeight, getScreenWidth,
    isQuickView, triggerClickOnGameDataPanel, getIsGameScreenClicked,
    receiveGameDataObj,
    getResetSignal,
    notifyAfterReset,
    getUILanguage
}) {
    
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    const trueBoolean = true;
    const falseBoolean = false;

    const [screenHeight, setScreenHeight] = useState(450);
    const [screenWidth, setScreenWidth] = useState(800); //TODO





    const [gameDataTrackerMap, setGameDataTrackerMap] = useState(initialGameDataStatus); //TODO20 improve later
    //TODO plan1.manage game-data-tracker outside; plan2.manage here and pass-to-outside





    const [editingInput, setEditingInput] = useState("");
    const [editingItem, setEditingItem] = useState();

    const [renderCounter, setRenderCounter] = useState(0);
    function updateRenderCounter() {
        setRenderCounter((renderCounter+1) % 100);
      }
    
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);

        if (firstTimeEnter === true) {
                                    console.log("quickview ... Panel_GameData");
            fetchGdataTrackerFromOuterLayer();


            setFirstTimeEnter(false);
        }


        let receiveGameScreenClicked = getIsGameScreenClicked();
        let resetSignal = getResetSignal();

        if (receiveGameScreenClicked === true || resetSignal === true) {

            fetchGdataTrackerFromOuterLayer();
        } 

        if (resetSignal === true) {
            notifyAfterReset();
        }

        

    });

    function fetchGdataTrackerFromOuterLayer() {
        let newGameDataObj = receiveGameDataObj();
                            console.log("\t (Panel_GameData) !!! new game-data-obj:", newGameDataObj); //TODO test
        setGameDataTrackerMap(newGameDataObj);

    }



return (
    
<div 
    style={{
                "width": `350px`, 
                "overflow": "scroll", 
                "backgroundColor": "#293241",
                "color": "#FFFFFF",
                "marginLeft": (isQuickView === true) ? "60px" : (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`, 
                }}
    onClick={()=>{
        triggerClickOnGameDataPanel();
    }}
                
                
                >
                <label className="textNoSelect">Game Data Panel</label>
                <br></br>
                <table>
                            <thead className="textNoSelect">
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Default Value</th>
                                </tr>
                            </thead>  
                            <tbody> 


                        {Object.keys(gameDataTrackerMap).map((currKey) => {
                            let keyName = "gmdt" + currKey;
                            let val = gameDataTrackerMap[currKey]["data_type"] === "boolean" ? 
                                    ((gameDataTrackerMap[currKey]["current_value"] === true 
                                        || gameDataTrackerMap[currKey]["current_value"] === "true") ? 
                                        "true" : "false") 
                                : gameDataTrackerMap[currKey]["current_value"];

                            let optionFalse = keyName + "-false";
                            let optionTrue = keyName + "-true";
                            let optionNone = keyName + "-unselected";
                            let inputId = keyName+"-input";

                            return (
                                <tr value={currKey} key={keyName} id={inputId}>
                                    <td>{gameDataTrackerMap[currKey]["name"]}</td>
                                    
                                    <td>
                                        <label>{gameDataTrackerMap[currKey]["data_type"] !== "boolean" ? 
                                            gameDataTrackerMap[currKey]["current_value"] 
                                            : (gameDataTrackerMap[currKey]["current_value"] === true ? 
                                                "True" 
                                                : "False")}</label><br></br>
                                        <br></br>
                                        {gameDataTrackerMap[currKey]["data_type"] === "boolean" && 
                                        <select 
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);
                                                setEditingInput(event.target.value);

                                        }}> 
                                            <option key={optionNone} value=""> -- </option>
                                            <option key={optionFalse} value={falseBoolean}>False</option>
                                            <option key={optionTrue} value={trueBoolean}>True</option>
                                        </select>
                                        }

                                        {gameDataTrackerMap[currKey]["data_type"] === "number" && 
                                        <input 
                                            className="textNoSelect"
                                            type="number"
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);

                                                setEditingInput(event.target.value);

                                            }}
                                        
                                        ></input>}

                                        {gameDataTrackerMap[currKey]["data_type"] === "string" && 
                                        <input 
                                            className="textNoSelect"
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);

                                                setEditingInput(event.target.value);
                                            }}
                                    
                                        ></input>}


                                        <button
                                            className="textNoSelect"
                                            onClick={()=>{
                                                triggerClickOnGameDataPanel();

                                                let tempObj = gameDataTrackerMap;
                                                if (editingInput === "true") {
                                                    tempObj[currKey]["current_value"] = true;
                                                } else if (editingInput === "false") {
                                                    tempObj[currKey]["current_value"] = false;
                                                } else {
                                                    tempObj[currKey]["current_value"] = editingInput;
                                                }

                                                console.log("update: ", currKey, " =>", editingInput); //TODO test
                                                console.log(tempObj); //TODO test
                                                console.log(); //TODO test

                                                setGameDataTrackerMap(tempObj);
                                                setEditingInput("");
                                                setEditingItem();
                                                updateRenderCounter();
                                            }}
                                        
                                        >Update</button>

                                        <br></br>
                                        <button 
                                            className="textNoSelect"
                                            onClick={()=>{
                                                triggerClickOnGameDataPanel();

                                                            // let tempObj = gameDataTrackerMap;
                                                            // tempObj[currKey]["current_value"] = tempObj[currKey]["default_value"];
                                                            // setGameDataTrackerMap(tempObj);
                                                            //TODO refactor data-structure-resetting later

                                                setEditingInput("");
                                                setEditingItem(inputId);
                                                updateRenderCounter();
                                            }}
                                        >Reset</button>
                                    </td>   

                                    <td>
                                    <label>{gameDataTrackerMap[currKey]["data_type"] !== "boolean" ? gameDataTrackerMap[currKey]["default_value"] : (gameDataTrackerMap[currKey]["default_value"] == "true" ? "True" : "False")}</label>
                                    
                                    </td>            
                                </tr>
                            
                            );
                        })}


                        
                            </tbody>  
                        </table>
            </div>



);
}