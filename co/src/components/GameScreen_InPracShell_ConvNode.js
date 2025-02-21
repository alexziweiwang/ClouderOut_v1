import { useState, useEffect } from 'react';

import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';


export default function GameScreen_InPracShell_ConvNode ({

    allPieceData,
    nodeUIConvNav,
    nodeUIDefaultButton,
    nodeUILogPage,
    nodeUITextFrame,

    screenWidth,
    screenHeight,

    notifyNodeFinish,
        
    uiLanguage,
    
    username,
    projectname,
    
    enteringEmuGameDataTracker,
    updatedGameDataTracker,

    visualMap,
    audioMap,

    mutedViewOption,
    fetchGameSettings

}) {

    const initialPieceNum = 0;

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {
                                                                      // initializeDataFromCloud(); //TODO remove

            setFirstTimeEnter(false);
        }

                                  //  console.log("in-prac-shell, allPieceData = ", allPieceData);

/* 
                                                                              
                                                                                    updateCharPicArr(); // done in conv-node-sub-layer
                                                                                    updateBgmSource(); // done in conv-node-sub-layer
                                                                                    updateBgpSource(); // done in conv-node-sub-layer
/*

/*      


                                                                                    if (allPieceContent[currPieceNum].displayTextFrame === false) {
                                                                                        setTextStillTyping(false);
                                                                                    } //TODO test before removing
*/



    }); //-- end of useEffect --




    function notUsing() {
      return "";
    }
    
    function passInResetSignalFalse() {        
      return false;
  }

    //TODO21 refactor to VM
    function changeGameDataTracker(ds, name, value) {
        let gmdtObj = ds;
        gmdtObj[name].current_value = value;
        
                                                            // updatedGameDataTracker(gmdtObj);//TODO remove later
        return gmdtObj;
    }  


    //TODO21 refactor to VM
    function changeGameDataTrackerByStatement(ds, name, action, newVal, type) { //TODO later
        //TODO check if valid
        if (ds[name] === undefined) {
            return;
        }
        //TODO check if valid

        let res = {};
        
        if (type === "boolean" || type === "string") {
            // type - boolean 
                // action is "becomes"
            let boolVal = (newVal === "true" || newVal === true) ? true : false;
            res = changeGameDataTracker(ds, name, boolVal);
        } else if (type === "string") {
            // type - string
                // action is "becomes"
                res = changeGameDataTracker(ds, name, newVal);
        } else if (type === "number") {
            // type - number
            let currVal = ds[name]["current_value"];

            let result = 0;
            if (action === "plus") {
                result = currVal - (-1 * newVal); //important, not directly adding
                res = changeGameDataTracker(ds, name, result);
            } else if (action === "minus") {   
                result = currVal - newVal;
                res = changeGameDataTracker(ds, name, result);
            } else if (action === "becomes") {
                res = changeGameDataTracker(ds, name, newVal);
            }
        }

        return res;
    }

    //TODO21 refactor to VM
    function buttonConsequenceByStatementEntireArray(pieceNum, item) {

        let stndButtonThisButtonInfo = allPieceData[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
        
        let conseqMap = stndButtonThisButtonInfo[0]["conseq"]; 
        if (conseqMap === undefined) {
                                                            console.log("2... conseqMap undefined.");
            return;
        }
                                                          //  console.log("2conseqMap: ", conseqMap, ", len = ", len);
        let res = enteringEmuGameDataTracker;
                                                    //        console.log("\nchange-by-stmt-arr: before - ", res);
        Object.keys(conseqMap).map((currKey) => {

            let name = conseqMap[currKey]["name"];  
            let action = conseqMap[currKey]["action"];  
            let newVal = conseqMap[currKey]["newVal"];  
            let type = conseqMap[currKey]["type"];  
                                                            console.log("2calling change-by-stmt, ", conseqMap[currKey]);
                                  
            res = changeGameDataTrackerByStatement(res, name, action, newVal, type);
        });

                                                            console.log("\nchange-by-stmt-arr: after - ", res);

        updatedGameDataTracker(res);
                                                    // updateRenderCounter()?
        
    }


return (<div>


{/* //TODO51  */}

{/* //TODO53: confirm all-data-tracking layer's position 



*/}

      <GameScreen_QuickView_ConvNode
                    isDisplay={true}  //ok (non-dynamic)
                    screenWidth={screenWidth}   //ok (non-dynamic)
                    screenHeight={screenHeight}   //ok (non-dynamic)

                    initialPieceNum={initialPieceNum}   //ok (non-dynamic)
                    allPieceContent={allPieceData} // ok (non-dynamic)

                    notifyNodeFinish={notifyNodeFinish}
                    
                    uiData1_textframe={nodeUITextFrame}
                    uiData2_defaultButtonOption={nodeUIDefaultButton}
                    uiData3_ConvNavigation={nodeUIConvNav}
                    uiData4_logPageSettings={nodeUILogPage}

                    visualMap={visualMap} //TODO empty so far
                    audioMap={audioMap} //TODO empty so far

                    gameData={enteringEmuGameDataTracker}

                    getResetSignal={passInResetSignalFalse} 
                    getResetInfoSets={notUsing} 

                    notifyAfterReset={notUsing}

                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}  //TODO 
                    isViewMuted={mutedViewOption}
                    fetchGameSettings={fetchGameSettings}
                />
                

</div>);

}