import { useState, useEffect } from 'react';

/*
Keeps a set of creator's preferred configuration data of game-data
*/
export default function Panel_GameDataTest({
    localTest, initialGameDataStatus,
    getScreenHeight, getScreenWidth,
    isQuickView, 

    receiveGameDataObj,

    getUILanguage
}) {
    
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    const trueBoolean = true;
    const falseBoolean = false;

    const [screenHeight, setScreenHeight] = useState(600);
    const [screenWidth, setScreenWidth] = useState(800); //TODO





    const [gameDataTrackerMap, setGameDataTrackerMap] = useState(initialGameDataStatus); //TODO20 improve later
    //TODO plan1.manage game-data-tracker outside; plan2.manage here and pass-to-outside





    const [editingInput, setEditingInput] = useState("");
    const [editingItem, setEditingItem] = useState();

    const [renderCounter, setRenderCounter] = useState(0);
    function updateRenderCounter() {
        console.log("updateRenderCounter!");
        setRenderCounter((renderCounter+1) % 100);
      }
    
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        fetchGdataTrackerFromOuterLayer();


        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);

        if (firstTimeEnter === true) {
                                    console.log("quickview ... Panel_GameData");

            setFirstTimeEnter(false);
        }


        // let receiveGameScreenClicked = getIsGameScreenClicked();
        // let resetSignal = getResetSignal();

        

        // if (resetSignal === true) {
        //     notifyAfterReset();
        // }

        

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
                 
                "backgroundColor": "#293241",
                "color": "#FFFFFF",
                "marginLeft": (isQuickView === true) ? "60px" : (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`, 
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