import { useState, useEffect } from 'react';
import GameUI_Play_1TextFrame from './GameUI_Play_1TextFrame';
import GameUI_Play_2Buttons from './GameUI_Play_2Buttons';
import GameUI_Play_3ConvNav from './GameUI_Play_3ConvNav';

export default function Modal_QuickGameView ({initialPieceNum, handleQViewCancel, isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, uiData2_buttonOption, uiData3_ConvNavigation, visualList, audioList, gameData}) {
//TODO: receive nav-data (for all game type ) ; do later

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

    const [gameDataCurr, setGameDataCurr] = useState(gameData);
    const [originalGmdt, setOriginalGmdt] = useState({});

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
      if (firstTimeEnter === true) {

        let gameDataTemp = gameData;
        let defaultMap = {}; //for the record of entering-game-data
        {Object.keys(gameDataTemp).map((currKey) => {
            gameDataTemp[currKey]["current_value"] = gameDataTemp[currKey]["default_value"];
            //current_value, data_type("boolean"/"string"/"number"), default_value, name
            defaultMap[currKey] = gameDataTemp[currKey]["default_value"];
        })}
        setGameDataCurr(gameDataTemp);
        setOriginalGmdt(defaultMap);

 
        setFirstTimeEnter(false);
      }



//TODO update of "currPieceNum" : by user clicking and/or operations ... (auto, etc.)


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

    function resetViewingPiece() {
        let gameDataTemp = gameDataCurr;

        {Object.keys(originalGmdt).map((currKey) => {
            gameDataTemp[currKey]["current_value"] = originalGmdt[currKey];
        })}
        setGameDataCurr(gameDataTemp);

        console.log("now gameDataTemp = ", gameDataTemp);
        console.log("now gameDataCurr = ", gameDataCurr);

        console.log("now gameDataCurr[val5] = ", gameDataCurr["val5"]);
        console.log("gameData[val5] = ", gameData["val5"]);

        setCurrPieceNum(initialPieceNum); //TODO reset to given first-piece later
    }

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

    function changeGameData(name, value) {
        let gmdtObj = gameDataCurr;
        gmdtObj[name].current_value = value;
        setGameDataCurr(gmdtObj);
    }

    function changeGameDataByStatement(name, action, newVal, type) {
        if (type === "boolean" || type === "string") {
            // type - boolean 
                // action is "becomes"
            let boolVal = (newVal === "true" || newVal === true) ? true : false;
            changeGameData(name, boolVal);
        } else if (type === "string") {
            // type - string
                // action is "becomes"
            changeGameData(name, newVal);
        } else if (type === "number") {
            // type - number
            let currVal = gameDataCurr[name]["current_value"];

            let result = 0;
            if (action === "plus") {
                result = currVal - (-1 * newVal); //important, not directly adding
                changeGameData(name, result);
            } else if (action === "minus") {   
                result = currVal - newVal;
                changeGameData(name, result);
            } else if (action === "becomes") {
                changeGameData(name, newVal);
            }
          
        }
    }

    let languageCode = 0;
    let closeText = ["Close"];
    let resetText = ["Reset"];

    return ( <div className={modalStyleName}>
        <div className="modalArea">

            <div>
            <button onClick={()=>{handleQViewCancel();}}> {closeText[languageCode]} </button>
            <button onClick={()=>{resetViewingPiece();}}> {resetText[languageCode]} </button>

                <div className="parallelFrame" style={{"overflow": "scroll"}}>

               
                    <div className="previewArea"   
                        style={{"position": "relative", 
                            "height": `${screenHeight}px`, 
                            "width": `${screenWidth}px`,
                            "top": "0px"
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
                                        if (directNextPieceBool === true) {
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
                                        defualtBtnUISettings={uiData2_buttonOption} 
                                        changeGameDataByStatement={changeGameDataByStatement}                                    
                                        gameData={gameDataCurr}
                                    />
                                }

                                {currPieceNum >= 0 &&
                                    <GameUI_Play_3ConvNav
                                        initialPieceNum={initialPieceNum}
                                        getCurrentPieceNum={passInCurrentPieceNum}  
                                        triggerAutoMode={triggerAutoMode}                           
                                        uiConvNav={uiData3_ConvNavigation}
                                        visualMap={visualMap}
                                        audioMap={audioMap}
                                    />
                                
                                }


                                {/* //TODO add standardButtonGroup component
                                //TODO add ConNav component */}


                        Preview Area ...
                    </div>

                    <div className="previewArea" style={{"width": "350px", "height": `${screenHeight}px`, "overflow": "scroll"}}>
                        Game Data Area...
                        {/* //TODO fetch original game-data from cloud, present changes through quick-view */}
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                </tr>
                            </thead>  
                            <tbody> 
                        {Object.keys(gameDataCurr).map((currKey) => {
                            let keyName = "gmdt" + currKey;
                            let val = gameDataCurr[currKey]["data_type"] === "boolean" ? 
                                    ((gameDataCurr[currKey]["current_value"] === true || gameDataCurr[currKey]["current_value"] === "true") ? 
                                        "true" : "false") 
                                : gameDataCurr[currKey]["current_value"];

                            return (
                                <tr value={currKey} key={keyName}>
                                    <td>{gameDataCurr[currKey]["name"]}</td>
                                    <td>{val}</td>               
                                </tr>
                            
                            );
                        })}
                            </tbody>  
                        </table>
                    </div>
                </div>

                </div>
                </div>

    </div>);
}