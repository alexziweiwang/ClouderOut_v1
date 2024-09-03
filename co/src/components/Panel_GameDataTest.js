import { useState, useEffect } from 'react';

/*
Keeps a set of creator's preferred configuration data of game-data
*/
export default function Panel_GameDataTest({
    localTest,
    getGameDataDesignList, initialGameDataDesignList,
    getScreenHeight, getScreenWidth,
    isQuickView, triggerClickOnGameDataPanel, getIsGameScreenClicked
}) {

    const [screenHeight, setScreenHeight] = useState(600);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

    const [gameDataDesignList, setGameDataDesignList] = useState(initialGameDataDesignList);


    const [gameData, setGameData] = useState({});

    const [editingInput, setEditingInput] = useState("");
    const [editingItem, setEditingItem] = useState();
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

        let gdDesignTemp = getGameDataDesignList();
        setGameDataDesignList(gdDesignTemp);

        if (firstTimeEnter === true) {

            if (localTest === true && gdDesignTemp !== undefined) {
                //local test: create game-data-tracker for this test            
                let gdObjTemp = {};
                {Object.keys(gdDesignTemp).map((currKey) => {
                    let item = gdDesignTemp[currKey];
                    item["current_value"] = gdDesignTemp[currKey]["default_value"];
                    gdObjTemp[currKey] = item;
                }); 
            
                }
                setGameData(gdObjTemp);
                //local test: create game-data-tracker for this test

            } else {
                //TODO not local-test

                //TODO later for cloud: save this settings to cloud or outer-compo? then allow loading for later resuing

            }



            setFirstTimeEnter(false);
        }

    });



return (
    
<div 
    style={{
                "width": `870px`, 
                "height": `${screenHeight}px`, 
                "overflow": "scroll", 
                "backgroundColor": "grey",
                "color": "#FFFFFF",
                "marginLeft": (isQuickView === true) ? "260px" : (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`, 
                }}
    onClick={()=>{
        triggerClickOnGameDataPanel();
    }}
                
                
                >
                <label>Game Data Panel</label>
                <br></br>
                <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>default Value</th>
                                </tr>
                            </thead>  
                            <tbody> 


                        {Object.keys(gameData).map((currKey) => {
                            let keyName = "gmdt" + currKey;
                            let val = gameData[currKey]["data_type"] === "boolean" ? 
                                    ((gameData[currKey]["current_value"] === true 
                                        || gameData[currKey]["current_value"] === "true") ? 
                                        "true" : "false") 
                                : gameData[currKey]["current_value"];

                            let optionFalse = keyName + "-false";
                            let optionTrue = keyName + "-true";
                            let optionNone = keyName + "-unselected";
                            let inputId = keyName+"-input";

                            return (
                                <tr value={currKey} key={keyName} id={inputId}>
                                    <td>{gameData[currKey]["name"]}</td>
                                    
                                    <td>
                                        <label>{gameData[currKey]["data_type"] !== "boolean" ? gameData[currKey]["current_value"] : (gameData[currKey]["current_value"] == "true" ? "True" : "False")}</label><br></br>
                                        <br></br>
                                        {gameData[currKey]["data_type"] === "boolean" && 
                                        <select 
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);
                                                setEditingInput(event.target.value);

                                        }}> 
                                            <option key={optionNone} value=""> -- </option>
                                            <option key={optionFalse} value="false">False</option>
                                            <option key={optionTrue} value="true">True</option>
                                        </select>
                                        }

                                        {gameData[currKey]["data_type"] === "number" && 
                                        <input 
                                            type="number"
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);

                                                setEditingInput(event.target.value);

                                            }}
                                        
                                        ></input>}

                                        {gameData[currKey]["data_type"] === "string" && 
                                        <input 
                                            style={{"width": "90px"}}
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);

                                                setEditingInput(event.target.value);
                                            }}
                                    
                                        ></input>}


                                        <button
                                            onClick={()=>{
                                                let tempObj = gameData;
                                                tempObj[currKey]["current_value"] = editingInput;
                                                setGameData(tempObj);
                                                setEditingInput("");
                                                setEditingItem();
                                            }}
                                        
                                        >Update</button>

                                        <br></br>
                                        <button 
                                            onClick={()=>{
                                                let tempObj = gameData;
                                                tempObj[currKey]["current_value"] = tempObj[currKey]["default_value"];
                                                setGameData(tempObj);
                                                setEditingInput("");
                                                setEditingItem(inputId);
                                            }}
                                        >Reset</button>
                                    </td>   

                                    <td>
                                    <label>{gameData[currKey]["data_type"] !== "boolean" ? gameData[currKey]["default_value"] : (gameData[currKey]["default_value"] == "true" ? "True" : "False")}</label>
                                    
                                    </td>            
                                </tr>
                            
                            );
                        })}


                        
                            </tbody>  
                        </table>
            </div>



);
}