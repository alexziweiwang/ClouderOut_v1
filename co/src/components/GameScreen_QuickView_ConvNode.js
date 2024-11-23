import { useState, useEffect } from 'react';
import GameUI_Play_1TextFrame from './GameUI_Play_1TextFrame';
import GameUI_Play_2Buttons from './GameUI_Play_2Buttons';
import GameUI_Play_3ConvNav from './GameUI_Play_3ConvNav';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';

// includes conversational-node content+UI
export default function GameScreen_QuickView_ConvNode ({initialPieceNum, getCurrPieceNum, 
    isDisplay, screenWidth, screenHeight, allPieceContent, 
    uiData1_textframe, uiData2_buttonOption, uiData3_ConvNavigation, uiData4_logPageSettings,
    visualList, audioList, 
    buttonConsequenceByStatementEntireArray,
    

                                //triggerClickOnGameScreen, getIsGameScreenClicked, //TODO test before removing these two

}) { //temp: not holding game-data-tracker

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

        

// const [gameScreenClickedStatus, setGameScreenClickedStatus] = useState(false); //TODO temp remove, test before removing

    
        const [showConvLog, setShowConvLog] = useState(false);
    
        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
        useEffect(() => {
     
          if (firstTimeEnter === true) {

            setFirstTimeEnter(false);
          }
    
            // let clickStatus = getIsGameScreenClicked();
            // if (clickStatus === true) {
            //     //clicked on game-screen
            //     setGameScreenClickedStatus(true);
            // }



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


    return (         
        <div   
                    style={{"position": "relative", 
                        "height": `${screenHeight}px`, 
                        "width": `${screenWidth}px`,
                        "top": "0px"
                    }}
                    // onClick={()=>{  //TODO test before removing!
                    //     if (allPieceContent[currPieceNum]["stnd_btn_arr"].length === 0) {
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



            </div>

    );


}