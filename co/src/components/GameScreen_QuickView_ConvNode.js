import { useState, useEffect } from 'react';
import GameUI_Play_1TextFrame from './GameUI_Play_1TextFrame';
import GameUI_Play_2Buttons from './GameUI_Play_2Buttons';
import GameUI_Play_3ConvNav from './GameUI_Play_3ConvNav';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';

// includes conversational-node content+UI
export default function GameScreen_QuickView_ConvNode ({
    initialPieceNum, 
    getResetSignal, getResetInfoSets, notifyAfterReset,
    isDisplay, screenWidth, screenHeight, 

    notifyNodeFinish,
    
    gameData,
    allPieceContent, 
    uiData1_textframe, uiData2_defaultButtonOption, uiData3_ConvNavigation, uiData4_logPageSettings,

    visualMap, audioMap,
    buttonConsequenceByStatementEntireArray,
    isViewMuted

    
                                //triggerClickOnGameScreen, getIsGameScreenClicked, //TODO test before removing these two

}) { //temp: not holding game-data-tracker
        const audioPlayerId = "audio-player";

        let modalStyleName = "modalBackboard"; 
        const allPieceLimit = allPieceContent === undefined ? 0 : allPieceContent.length;

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
    
        const [bgmSource, setBgmSource] = useState("");
        const [bgpSource, setBgpSource] = useState("");
    
        const [charaPicArr2, setCharaPicArr2] = useState((allPieceContent !== undefined && allPieceContent.length > 0) ? allPieceContent[0]["chp_arr"] : []);

        

// const [gameScreenClickedStatus, setGameScreenClickedStatus] = useState(false); //TODO temp remove, test before removing

    
        const [showConvLog, setShowConvLog] = useState(false);
    
        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
        useEffect(() => {
     
            if (firstTimeEnter === true) {

                setFirstTimeEnter(false);
            }

            let resetSignal = getResetSignal();
            if (resetSignal === true) {
                let info = getResetInfoSets();
                resetPlaying(info);


                notifyAfterReset();
            }
    
            // let clickStatus = getIsGameScreenClicked();
            // if (clickStatus === true) {
            //     //clicked on game-screen
            //     setGameScreenClickedStatus(true);
            // }



            if ((allPieceContent[currPieceNum]["clkb_arr"] !== undefined && allPieceContent[currPieceNum]["clkb_arr"].length > 0) || 
                (allPieceContent[currPieceNum]["stnd_btn_arr"] !== undefined && allPieceContent[currPieceNum]["stnd_btn_arr"].length > 0)) {
                setDirectNextPieceBool(false);
            } else {
                setDirectNextPieceBool(true);
            }
    
            
            updateCharPicArr();
            updateBgmSource();
            updateBgpSource();
      
            



 
            if (allPieceContent[currPieceNum].displayTextFrame === false) {
                setTextStillTyping(false);
            }

                    //                console.log("game-screen quick-view conv-node ... render once");

        }); // --- end of useEffect ---
    
    
        //TODO21 refactor to VM
        function updateCharPicArr() {
            if (currPieceNum < 0) {
                return;
              }
              
              if (allPieceContent[currPieceNum]["chp_action"] === "changeCharPicArr") {     
                setCharaPicArr2(allPieceContent[currPieceNum]["chp_arr"]);  
              } 
        }
    
        //TODO21 refactor to VM
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
    
        //TODO21 refactor to VM
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
    
   
        //TODO21 refactor to VM
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

                if (currPieceNum+1 === allPieceLimit) {
                    notifyNodeFinish();
                }
            
        }

        function resetPlaying(arr) {
            setCurrPieceNum(arr[0]);
        }
    
        function passInCurrentPieceNum() {
            return currPieceNum;
        }
    
        function passInDirectNextPieceBool() {
            return directNextPieceBool;
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
        
        //TODO105
        function changeBgmVolume(volumeValue) {
            let audioElem = document.getElementById(audioPlayerId);
            audioElem.volume = volumeValue;
        }

    return (         
<div   
style={{
    "position": "relative", 
    "height": `${screenHeight}px`, 
    "width": `${screenWidth}px`,
    "top": "0px",
    "borderRadius": "0px"
}}
                                // onClick={()=>{  //TODO test before removing!
                                //     if (allPieceContent[currPieceNum]["stnd_btn_arr"]. length === 0) {
                                //         triggerClickOnGameScreen();
                                //     }
                                // }} //TODO test before removing!
>


            {<div style={{
                "backgroundColor": "#000000",
                "backgroundImage": (currPieceNum >= 0 && bgpSource !== "") ? 
                `url(${bgpSource})` 
                    : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", 
                "top": "0px", 
                "left": "0px", 
                "height": `${screenHeight}px`, 
                "width": `${screenWidth}px`,
                "borderRadius": "0px"

            }}
                
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
        "display": !showConvLog ? "flex" : "none",
        "position": "absolute", 
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
                    defaultBtnUISettings={uiData2_defaultButtonOption} 
                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}

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

//TODO105
            <audio 
                id={audioPlayerId}
                src={bgmSource} 
                autoPlay="autoPlay" 
                controls 
                loop={allPieceContent[currPieceNum]["bgm_loop"]}
                muted={isViewMuted}
                style={{
                    "height": "30px",
                    "display": "none",
                }}
            />


            </div>

    );


}