import { useState, useEffect } from 'react';
import GameUI_Play_1TextFrame from './GameUI_Play_1TextFrame';
import GameUI_Play_2Buttons from './GameUI_Play_2Buttons';
import GameUI_Play_3ConvNav from './GameUI_Play_3ConvNav';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';

//level4 (content of node: conversation node)

// includes conversational-node content+UI
export default function Viewer__ConvNode ({
    isPreview,
    initialPieceNum, 

    getResetSignal, getResetInfoSets, notifyAfterReset,

    isDisplay, 
    screenWidth, screenHeight, 

    notifyNodeFinish,
    
    gameData,
    allPieceContent, 

    uiData1_textframe, uiData2_defaultButtonOption, uiData3_ConvNavigation, uiData4_logPageSettings,

    visualMap, audioMap,
    buttonConsequenceByStatementEntireArray_QVC,
    isViewMuted,
    fetchGameSettingsForPlaying,


    openSettingPage,

    sendOutBgmSettings,

    triggerSLPageToSave
    
                                //triggerClickOnGameScreen, getIsGameScreenClicked, //TODO test before removing these two

}) { //temp: not holding game-data-tracker
        const audioPlayerId = "audio-player";
        let [audioElem, setAudioElem] = useState(document.getElementById(audioPlayerId));

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
        const [bgmVol, setBgmVol] = useState(90);
        const [bgmLoopOption, setBgmLoopOption] = useState(true);
        
        const [bgpSource, setBgpSource] = useState("");
    
        const [charaPicArr2, setCharaPicArr2] = useState((allPieceContent !== undefined && allPieceContent.length > 0) ? allPieceContent[0]["chp_map"] : []);
//TODO500 refactor structure


        const [gameSettingScaleObj, setGameSettingScaleObj] = useState(-1);
//gameSettingScaleObj["settingPage-playSpeed"]
//gameSettingScaleObj["settingPage-bgmVol"]
//gameSettingScaleObj["settingPage-seVol"]




// const [gameScreenClickedStatus, setGameScreenClickedStatus] = useState(false); //TODO temp remove, test before removing

    
        const [showConvLog, setShowConvLog] = useState(false);

        const [isNodeFinished, setIsNodeFinished] = useState(false);
    
        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
        useEffect(() => {


            // console.log("gs_qv_cn -- allPieceLimit === 0 = ", allPieceLimit);


         
            if (firstTimeEnter === true) {

                setFirstTimeEnter(false);
            }

 

            let resetSignal = getResetSignal();
            if (resetSignal === true) {
                let info = getResetInfoSets();
                resetPlaying(info);


                notifyAfterReset();
            }
            
            let scaleObjTemp = fetchGameSettingsForPlaying();
                             //                      console.log("qv-conv :      scaleObj = ", scaleObjTemp);
            if (
            gameSettingScaleObj["settingPage-playSpeed"] !== scaleObjTemp["settingPage-playSpeed"]
            && gameSettingScaleObj["settingPage-bgmVol"] !== scaleObjTemp["settingPage-bgmVol"]
            && gameSettingScaleObj["settingPage-seVol"] !== scaleObjTemp["settingPage-seVol"]
            ) {
                setGameSettingScaleObj(scaleObjTemp);
                // let bgmVolScale = gameSettingScaleObj !== -1 ? scaleObjTemp["settingPage-bgmVol"] / 100 : 1;
                // let currBgmVol = allPieceContent[currPieceNum]["bgm_volume"] / 100;
                // let resVol = bgmVolScale * currBgmVol;
    
                // console.log("!!! qv_conv_node: vol...  bgmVolScale = ", bgmVolScale, ",     currBgmVol = ", currBgmVol, "      resVol = ", resVol);
    
                // changeBgmVolume(resVol);
            }
    
            // let clickStatus = getIsGameScreenClicked();
            // if (clickStatus === true) {
            //     //clicked on game-screen
            //     setGameScreenClickedStatus(true);
            // }



            if ((allPieceContent[currPieceNum]["stnd_btn_arr"] !== undefined 
                && allPieceContent[currPieceNum]["stnd_btn_arr"].length > 0)
            ) {
                                                // TODO LATER: || (allPieceContent[currPieceNum]["clkb_arr"] !== undefined && allPieceContent[currPieceNum]["clkb_arr"].length > 0) 
                
                if (directNextPieceBool === true) {
                    setDirectNextPieceBool(false);
                }
                
            } else {
                if (directNextPieceBool === false) {
                    setDirectNextPieceBool(true);
                }
            }
    
            
            updateCharPicArr();
            updateBgmSource();
            updateBgpSource();
      
            



 
            if (allPieceContent.length > 0 
                && allPieceContent[currPieceNum] !== undefined 
                && allPieceContent[currPieceNum].displayTextFrame === false) {

                    setTextStillTyping(false);
            }


//console.log("game-screen quick-view conv-node ... render once");

        }); // --- end of useEffect ---
    
    
        function updateCharPicArr() {
            if (currPieceNum < 0) {
                return;
              }
              
              if (allPieceContent[currPieceNum]["chp_action"] === "changeCharPicArr") {     
                setCharaPicArr2(allPieceContent[currPieceNum]["chp_map"]);  
              } 
        }
    
        //TODO21 refactor to VM
        function updateBgmSource() {
            if (currPieceNum < 0) {
                return;
              }
              if (allPieceContent[currPieceNum]["bgm_action"] === "startNewBgm") { // start new 
                if (allPieceContent[currPieceNum]["bgm_source_varname"] !== "") {
                  setBgmSource(audioMap[allPieceContent[currPieceNum]["bgm_source_varname"]]);
                  setBgmVol(allPieceContent[currPieceNum]["bgm_volume"]);
                  setBgmLoopOption(allPieceContent[currPieceNum]["bgm_loop"])

                  sendOutBgmSettings(
                    audioMap[allPieceContent[currPieceNum]["bgm_source_varname"]], 
                    allPieceContent[currPieceNum]["bgm_loop"], 
                    allPieceContent[currPieceNum]["bgm_volume"]
                  );
                }
              } else if (allPieceContent[currPieceNum]["bgm_action"] === "stopBgm") { // immediate stop
                setBgmSource("");
                setBgmVol(90);
                setBgmLoopOption(true);

                sendOutBgmSettings(
                    "",
                    true,
                    bgmVol
                );

              } else if (allPieceContent[currPieceNum]["bgm_action"] ===  "naturalStopBgm") { // natural stop
                                                                      //TODO "naturalStopBgm" : stop looping...
           
                setBgmLoopOption(false);
                sendOutBgmSettings(
                    bgmSource,
                    false,
                    bgmVol
                )

              } else { // maintain (no change)

                sendOutBgmSettings(
                    bgmSource, 
                    bgmLoopOption, 
                    bgmVol
                );
              }

       

            
    
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
                    //TODO999999999 checking

                    setIsNodeFinished(true);

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

        function buttonConsequenceByStatementEntireArray_QVC_local(pieceNum, item) {
                                                    console.log("qvc layer...");
            if (currPieceNum+1 < allPieceLimit) {
                buttonConsequenceByStatementEntireArray_QVC(pieceNum, item);
            }
        }

        //TODO106
        // function changeBgmVolume(volumeValue) {
        //     if (audioElem !== null && audioElem !== undefined) {
        //         console.log("\t\t 200 volume changed! ", volumeValue);
        //         audioElem.volume = volumeValue;
        //     } else {
        //         console.log("\t\t 200 volume not changed");

        //     }
        // }

        function triggerSLPageToSave_local(slModeFlag) {
            //TODO9
            triggerSLPageToSave(slModeFlag);
        }

        function passInScreenSize() {
            //TODO99999999

            let pair = [];
            pair.push(screenWidth);
            pair.push(screenHeight);
            return pair;
        }

        function passInUiConvNav() {
            return uiData3_ConvNavigation;
        }

        function passInVisualMap() {
            return visualMap;
        }

        function passInAudioMap() {
            return audioMap;
        }

        function openSettingPage_local() {
            openSettingPage();
        }

    return (   
<>      
{(allPieceContent !== undefined && allPieceContent.length > 0) 
&&
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


            {<div 
                style={{
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

            {(allPieceContent.length > 0 
                    && currPieceNum >= 0 
                    && allPieceContent[currPieceNum] !== undefined 
                    && allPieceContent[currPieceNum].displayTextFrame === true) 
            && <GameUI_Play_1TextFrame
                    initialPieceNum={initialPieceNum}
                    allPieceContent={allPieceContent}

                    txtFrameUISettings={uiData1_textframe}

                                        
                    speedLevel={gameSettingScaleObj["settingPage-playSpeed"] !== undefined ? gameSettingScaleObj["settingPage-playSpeed"] : uiData3_ConvNavigation["textDisplaySpeed"]}
                    // TODO109 eventual speed


                    getCurrentPieceNum={passInCurrentPieceNum}
                    getIsDirectNextPiece={passInDirectNextPieceBool}
                    triggerNextPieceFunc={triggerToDirectNextPiece} 
                    
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
                    buttonConsequenceByStatementEntireArray_UP2={buttonConsequenceByStatementEntireArray_QVC_local}

                />
            }

            {currPieceNum >= 0 &&
                <>
                <GameUI_Play_3ConvNav
                    initialPieceNum={initialPieceNum}

                    getCurrentPieceNum={passInCurrentPieceNum}  

                    triggerAutoMode={triggerAutoMode}    
                    triggerLogPageOpen={openConvLog}  

                    uiConvNav={uiData3_ConvNavigation}
                    visualMap={visualMap}
                    audioMap={audioMap}
                    openSettingPageFunc={openSettingPage_local}

                    triggerSLPageToSave={triggerSLPageToSave_local}
                />

                <GameUI_3ConvNavPreview
                  
                    getCurrentPieceNum={passInCurrentPieceNum}
                    triggerNextPiece={notUsing}

                    getScreenSize={passInScreenSize}

                    getUIConvNav={passInUiConvNav}

                    triggerAutoMode={triggerAutoMode}

                    getVisualMap={passInVisualMap}

                    triggerLogOpen={openConvLog}

                    openSettingPageFunc={openSettingPage_local}

                    initialConvNav={uiData3_ConvNavigation}
                    initialVisualMap={visualMap}

                    isPreviewingBool={false}
              />    
            

                </>
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



        


//TODO106
{/* //layer of conversation-node (textframe, buttons, conv-navigation (auto, log, settings button-group), log-page) */}
            {
            isPreview 
            &&
                <audio 
                id={audioPlayerId}
                src={bgmSource} 
                autoPlay="autoPlay" 
                controls 
                loop={bgmLoopOption}
                muted={isViewMuted}
                style={{
                    "height": "30px",
                    "display": "none",
                }}
            />}


</div>}


</>
    );


}