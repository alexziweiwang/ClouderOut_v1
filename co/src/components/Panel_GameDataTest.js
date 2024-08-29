
import { useState, useEffect } from 'react';

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
                                <tr style={{"height": "20px"}}>
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

                            return (
                                <tr value={currKey} key={keyName} style={{"height": "20px"}}>
                                    <td>{gameData[currKey]["name"]}</td>
                                    <td>{val}</td>               
                                </tr>
                            
                            );
                        })}
                            </tbody>  
                        </table>

            </div>
);


}