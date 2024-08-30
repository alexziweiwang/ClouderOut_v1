import { useState, useEffect } from 'react';

/*
Keeps a set of creator's preferred configuration data of game-data
*/
export default function Panel_GameDataTest({
    getGameDataDesignList, initialGameDataDesignList,
    getScreenHeight, getScreenWidth
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


            //TODO later for cloud: save this settings to cloud or outer-compo? then allow loading for later resuing

            setFirstTimeEnter(false);
        }

    });



return (
    
<div style={{
                "width": "370px", 
                "height": `${screenHeight}px`, 
                "overflow": "scroll", 
                "backgroundColor": "grey",
                "color": "#FFFFFF",
                "marginLeft": (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`, 
                }}>
                <label>Game Data Panel</label>
                <br></br>
                <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
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
                            let inputId = keyName+"-input";

                            return (
                                <tr value={currKey} key={keyName} id={inputId}>
                                    <td>{gameData[currKey]["name"]}</td>
                                    
                                    <td>
                                        <label>{gameData[currKey]["current_value"]}</label><br></br>
                                        
                                        {gameData[currKey]["data_type"] === "boolean" && 
                                        <select 
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);
                                                setEditingInput(event.target.value);

                                        }}>
                                            <option key={optionFalse} value="false">False</option>
                                            <option key={optionTrue} value="true">True</option>
                                        </select>
                                        }

                                        {gameData[currKey]["data_type"] === "number" && 
                                        <input 
                                            type="number"
                                            value={(editingItem === inputId) ? editingInput : ""}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                                setEditingItem(inputId);

                                                setEditingInput(event.target.value);

                                            }}
                                        
                                        ></input>}

                                        {gameData[currKey]["data_type"] === "string" && 
                                        <input 
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

                                            }}
                                        
                                        >Update</button>
                                    
                                    </td>               
                                </tr>
                            
                            );
                        })}
                            </tbody>  
                        </table>

            </div>
);


}