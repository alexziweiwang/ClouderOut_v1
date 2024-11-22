import { useState, useEffect } from 'react';
import GameUI_Play_1TextFrame from './GameUI_Play_1TextFrame';
import GameUI_Play_2Buttons from './GameUI_Play_2Buttons';
import GameUI_Play_3ConvNav from './GameUI_Play_3ConvNav';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';

// includes conversational-node content+UI
export default function GameScreen_QuickView_ConvNode ({initialPieceNum, getCurrPieceNum, 
    isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, 
    uiData2_buttonOption, uiData3_ConvNavigation, 
    uiData4_logPageSettings,
    visualList, audioList, gameData, notifyNewGameData,
    getResetSignal,
    triggerClickOnGameScreen, getIsGameScreenClicked,
    notifyAfterReset,
    receiveGameDataObj,
    changeGameDataTrackerByStatement
}) {

        let modalStyleName = "modalBackboard"; 

        if (isDisplay === true) {
            modalStyleName = "displayBlock modalBackboard";
        } else {
            modalStyleName = "displayNone modalBackboard";
        }
    
        const [currPieceNum, setCurrPieceNum] = useState(initialPieceNum);
        const [directNextPieceBool, setDirectNextPieceBool] = useState(true);
        const [textStillTyping, setTextStillTyping] = useState(true);
        const [immediateFinishSignal, setImmediateFinishSignal] = useState(false);
        const [autoMode, setAutoMode] = useState(false);
    
        const [audioMap, setAudioMap] = useState({});
        const [visualMap, setVisualMap] = useState({}); 
        const [audioMapSize, setAudioMapSize] = useState(0);
        const [visualMapSize, setVisualMapSize] = useState(0);
        
        const [bgmSource, setBgmSource] = useState("");
        const [bgpSource, setBgpSource] = useState("");
    
        const [charaPicArr2, setCharaPicArr2] = useState(allPieceContent[0]["chp_arr"]);

        

// const [gameDataTracker, setGameDataTracker] = useState(gameData); //TODO improve!

const [gameScreenClickedStatus, setGameScreenClickedStatus] = useState(false);

    
        const [showConvLog, setShowConvLog] = useState(false);
    
        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
        useEffect(() => {
     
          if (firstTimeEnter === true) {

            setFirstTimeEnter(false);
          }
    
            let clickStatus = getIsGameScreenClicked();
            if (clickStatus === true) {
                //clicked on game-screen
                setGameScreenClickedStatus(true);
            }



            if (allPieceContent[currPieceNum]["clkb_arr"].length > 0 || 
                allPieceContent[currPieceNum]["stnd_btn_arr"].length > 0) {
                setDirectNextPieceBool(false);
            } else {
                setDirectNextPieceBool(true);
            }
    
          
          updateCharPicArr();
          updateBgmSource();
          updateBgpSource();
          
    
            if (audioMapSize < audioList.length || visualMapSize < visualList.length) {
                let i = 0;
                let tempAudioMap = {};
                setAudioMapSize(audioList.length);
                for (;i < audioList.length; i++) {
                    let item = audioList[i];
                    tempAudioMap[item["var"]] = item["url"];
                }
                setAudioMap(tempAudioMap);
    
                i = 0;
                let tempVisualMap = {};
                setVisualMapSize(visualList.length);
                for (;i < visualList.length; i++) {
                    let item = visualList[i];
                    tempVisualMap[item["var"]] = item["url"];
                }
                setVisualMap(tempVisualMap);
            }

            let resetSignal = getResetSignal();
            if (resetSignal === true) {
                let pieceNumTemp = getCurrPieceNum();
                setCurrPieceNum(pieceNumTemp);
                                                            // if (clickStatus === true) {
                                                            //         //TODO fetch game-data-tracker from caller compo
                                                            //     let newGdt = receiveGameDataObj();
                                                            //     setGameDataTracker(newGdt);
                                                            // }

                notifyAfterReset();
            }

            if (allPieceContent[currPieceNum].displayTextFrame === false) {
                setTextStillTyping(false);
            }

        });
    
    
    
        function updateCharPicArr() {
            if (currPieceNum < 0) {
                return;
              }
              
              if (allPieceContent[currPieceNum]["chp_action"] === "changeCharPicArr") {     
                setCharaPicArr2(allPieceContent[currPieceNum]["chp_arr"]);  
              } 
        }
    
        function updateBgmSource() {
            if (currPieceNum < 0) {
                return;
              }
              if (allPieceContent[currPieceNum]["bgm_action"] === "startNewBgm") {
                if (allPieceContent[currPieceNum]["bgm_source_varname"] !== "") {
                  setBgmSource(audioMap[allPieceContent[currPieceNum]["bgm_source_varname"]]);
                }
              } else if (allPieceContent[currPieceNum]["bgm_action"] === "stopBgm") {
                setBgmSource("");
              } 
              //TODO "naturalStopBgm" stop looping...
    
        }
    
        function updateBgpSource() {
            if (currPieceNum < 0) {
              return;
            }
            if (allPieceContent[currPieceNum]["bgp_action"] === "switchToNewBgp") {
              if (allPieceContent[currPieceNum]["bgp_source_varname"] !== "") {
                setBgpSource(visualMap[allPieceContent[currPieceNum]["bgp_source_varname"]]);
              } else {
                setBgpSource("");
              }
            
            } 
        }    
    
    
        function triggerToDirectNextPiece() {
     
            // console.log("going to next piece! ", allPieceContent[currPieceNum+1]); //TODO test
            // console.log("\t  textStillTyping? ", textStillTyping === true ? "True" : "False", ", currPieceNum+1 = ", currPieceNum+1); //TODO test


                if (textStillTyping === true) {
                    // notify to finished immediately
                    if (autoMode === false) {
                        setImmediateFinishSignal(true);
                    } else { // in auto-mode
                        if (currPieceNum >= 0 && allPieceContent[currPieceNum+1] 
                            !== undefined) { //also when textStillTyping is false        
                            setCurrPieceNum(currPieceNum+1);
                            setImmediateFinishSignal(false);
                        } 
                    }
                } else if (currPieceNum >= 0 && allPieceContent[currPieceNum+1] 
                        !== undefined) { //also when textStillTyping is false
        
                    setCurrPieceNum(currPieceNum+1);
                    setImmediateFinishSignal(false);
                } 
            
        }
    
        function passInCurrentPieceNum() {
            return currPieceNum;
        }
    
        function passInDirectNextPieceBool() {
            return directNextPieceBool;
        }
    
        // function resetViewingPiece() {
        //     let mapTemp = {};
        //     {Object.keys(gameDataTracker).map((currKey) => {
        //         let item = gameDataTracker[currKey];
        //         let itemName = item["name"];
        //         let newItem = {};
        
        //         newItem["name"] = itemName;
        //         newItem["current_value"] = item["default_value"];
        //         newItem["default_value"] = item["default_value"];
        //         newItem["data_type"] = item["data_type"];
                
        //         mapTemp[itemName] = newItem;
        //     })} 
        //     setGameDataTracker(mapTemp); //TODO20
    
    
        //     console.log("now gameDataTemp = ", mapTemp);
        //     console.log("now gameDataTracker = ", gameDataTracker);
    
        //     console.log("now gameDataTracker[val5] = ", gameDataTracker["val5"]);
        //     console.log("gameData[val5] = ", gameData["val5"]);
    
        //     setCurrPieceNum(initialPieceNum); //TODO reset to given first-piece later
        // }      //TODO
    
        function notifyFinished() {
            setTextStillTyping(false);
        } 
    
        function notifyNotYet() {
            setTextStillTyping(true);
        }
    
        function passInImmedaiteFinishSignal() {
            return immediateFinishSignal;
        }
    
        function triggerAutoMode(val) {
            setAutoMode(val);
        }
    
        function passInAutoModeStatus() {
            return autoMode;
        }
    
        // function changeGameData(name, value) {
        //     let gmdtObj = gameDataTracker;
        //     gmdtObj[name].current_value = value;
        //     setGameDataTracker(gmdtObj);

        //     console.log("gamescreenquickviewconvnode... changed-game-data, now-obj: ", gmdtObj); //TODO test
            
        //     //TODO3 update to outer-layer
        //     notifyNewGameData(gmdtObj);

        // }
    
        // function changeGameDataByStatement(name, action, newVal, type) {
        //     console.log("!!! changeGameDataByStatement(): ", name, ":", action, ", ", newVal, " (", type, ")"); //TODO test
        //     console.log("curr-val = ", gameDataTracker[name]["current_value"]); //TODO test


        //     if (type === "boolean") {
        //         // type - boolean 
        //             // action is "becomes"
        //         let boolVal = (newVal === "true" || newVal === true) ? true : false;
        //         changeGameData(name, boolVal);
        //     } else if (type === "string") {
        //         // type - string
        //             // action is "becomes"
        //         changeGameData(name, newVal);
        //     } else if (type === "number") {
        //         // type - number
        //         let currVal = gameDataTracker[name]["current_value"];
    
        //         let result = 0;
        //         if (action === "plus") {
        //             result = currVal - (-1 * newVal); //important, not directly adding
        //             changeGameData(name, result);
        //         } else if (action === "minus") {   
        //             result = currVal - newVal;
        //             changeGameData(name, result);
        //         } else if (action === "becomes") {
        //             changeGameData(name, newVal);
        //         }
              
        //     }
        // }
    
        function closeConvLog() {
            setShowConvLog(false);
        }
    
        function openConvLog() {
            setShowConvLog(true);
        }
    
        function notUsing() {
            console.log();
        }
    
        function passInVisualMap() {
            return visualMap;
        }
    
        // function passInIsDisplayConvLog() {
        //     return showConvLog;
        // }     //TODO: remove unusued later

        function changeGameDataByStatement2Arr(pieceNum, item) {
            let stndButtonThisButtonInfo = allPieceContent[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
            let conseqArray = stndButtonThisButtonInfo[0]["conseq"];
            if (conseqArray === undefined) {
                                                    console.log("2... conseqArray undefined.");
                return;
            }
            let len = conseqArray.length;
                                                    console.log("2conseqArray: ", conseqArray, ", len = ", len);

            let i = 0;
            for (; i < len; i++) {
                let name = conseqArray[i][0];

                if (gameData[name] === undefined) {
                                                        console.log("\t\t\t 2 item naem not found... continue");
                    continue;
                }

                let action = conseqArray[i][1];
                let newVal = conseqArray[i][2];
                let type = gameData[name]["data_type"];
                                                        console.log("2calling change-by-stmt");
                
                changeGameDataTrackerByStatement(name, action, newVal, type);

            }
            
        }


    return (         
        <div   
                    style={{"position": "relative", 
                        "height": `${screenHeight}px`, 
                        "width": `${screenWidth}px`,
                        "top": "0px"
                    }}
                    onClick={()=>{
                        if (allPieceContent[currPieceNum]["stnd_btn_arr"].length === 0) {
                            triggerClickOnGameScreen();
                        }
                    }}
                    >

            {<div style={{
                "backgroundColor": "#000000",
                "backgroundImage": (currPieceNum >= 0 && bgpSource !== "") ? 
                `url(${bgpSource})` 
                    : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}
                
                onClick={()=>{
                    if (directNextPieceBool === true && showConvLog === false) {
                        //TODO1 add "firstTap" for all-content showing on one piece
                        triggerToDirectNextPiece();
                    }
                }}
                >


                <div> 

                        {charaPicArr2 !== undefined && charaPicArr2.map((item, index) => {
                        let altStr = index+"already added character picture";
                        return (
                            <>
                            {(visualMap[item[0]] !== undefined && visualMap[item[0]] !== "") && 
                            <img style={{
                                "position": "absolute", 
                                "top": `${item[2]}px`, "left": `${item[1]}px`,
                                "width": `${item[3] * item[5]}px`, "height": `${item[4] * item[5]}px`,
                                }}
                                src={visualMap[item[0]]}
                                alt={altStr}
                            />}
                            </>
                        );
                        })}
                    </div>

            </div>}

    <div style={{
    "display": !showConvLog ? "flex" : "none"
    }}>

            {(currPieceNum >= 0 && allPieceContent[currPieceNum].displayTextFrame === true) &&                          
                <GameUI_Play_1TextFrame
                    initialPieceNum={initialPieceNum}
                    allPieceContent={allPieceContent}
                    getCurrentPieceNum={passInCurrentPieceNum}
                    txtFrameUISettings={uiData1_textframe}
                    getIsDirectNextPiece={passInDirectNextPieceBool}
                    triggerNextPieceFunc={triggerToDirectNextPiece} 
                    speedLevel={uiData3_ConvNavigation["textDisplaySpeed"]}
                    notifyFinished={notifyFinished}
                    notifyNotYet={notifyNotYet}
                    getInImmedaiteFinishSignal={passInImmedaiteFinishSignal}
                    visualMap={visualMap}
                    getAutoModeStatus={passInAutoModeStatus}
                />
                
            }                
            
            {currPieceNum >= 0 && 
                <GameUI_Play_2Buttons
                    initialPieceNum={initialPieceNum}
                    triggerNextPiece={triggerToDirectNextPiece}
                    audioMap={audioMap}
                    visualMap={visualMap}
                    allPieceContent={allPieceContent} 
                    getCurrentPieceNum={passInCurrentPieceNum} 
                    defaultBtnUISettings={uiData2_buttonOption} 
                    // changeGameDataByStatement={changeGameDataByStatement}                                    
                    // gameData={gameDataTracker}
                    changeGameDataByStatement2Arr={changeGameDataByStatement2Arr}

                />
            }

            {currPieceNum >= 0 &&
                <GameUI_Play_3ConvNav
                    initialPieceNum={initialPieceNum}
                    getCurrentPieceNum={passInCurrentPieceNum}  
                    triggerAutoMode={triggerAutoMode}    
                    triggerLogPageOpen={openConvLog}                       
                    uiConvNav={uiData3_ConvNavigation}
                    visualMap={visualMap}
                    audioMap={audioMap}
                />
            
            }
    </div>



            {showConvLog && <Modal_ConvNode_Log
                allPieceContent={allPieceContent} 
                initialPieceNum={initialPieceNum} 
                getCurrPieceNum={passInCurrentPieceNum} 
                logPageUISettings={uiData4_logPageSettings}
                triggerLogPageClose={closeConvLog}
                getLogPageUISettings={notUsing}
                getAllPieceContent={notUsing}
                isQuickView={true}
                isSettingUI={false}
                visualMap={visualMap}
                getVisualMap={passInVisualMap}
                screenWidth={screenWidth}
                screenHeight={screenHeight}

            />}



            </div>

    );


}