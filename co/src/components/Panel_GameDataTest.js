import { useState, useEffect } from 'react';

/*
Keeps a set of creator's preferred configuration data of game-data
*/
export default function Panel_GameDataTest({
    getGameData, initialGameData,
    getScreenHeight, getScreenWidth
}) {

    const [screenHeight, setScreenHeight] = useState(600);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

    const [gameData, setGameData] = useState(initialGameData);

    useEffect(() => {
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);
        let gdMap = getGameData();
        setGameData(gdMap);
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

                            return (
                                <tr value={currKey} key={keyName}>
                                    <td>{gameData[currKey]["name"]}</td>
                                    <td>
                                        {gameData[currKey]["data_type"] === "boolean" && 
                                        <select value={val} onChange={(event)=>{
                                            //TODO event.target.value
                                        }}>
                                            <option key={optionFalse} value="false">False</option>
                                            <option key={optionTrue} value="true">True</option>
                                        </select>
                                        }

                                        {gameData[currKey]["data_type"] === "number" && 
                                        <input value={val} type="number"
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                            }}
                                        
                                        ></input>}

                                        {gameData[currKey]["data_type"] === "string" && 
                                        <input value={val}
                                            onChange={(event)=>{
                                                //TODO event.target.value
                                            }}
                                    
                                        ></input>}


                                        <button>Update</button>
                                    
                                    </td>               
                                </tr>
                            
                            );
                        })}
                            </tbody>  
                        </table>

            </div>
);


}