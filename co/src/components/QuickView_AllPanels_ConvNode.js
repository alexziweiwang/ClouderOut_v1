import { useState, useEffect } from 'react';
import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';
import Panel_GameDataTest from './Panel_GameDataTest';


export default function QuickView_AllPanels_ConvNode ({initialPieceNum, handleQViewCancel, 
    isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, 
    uiData2_buttonOption, uiData3_ConvNavigation, 
    uiData4_logPageSettings,
    visualList, audioList, initialGameDataDesignList, getGameDataDesignList}) {

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



    const [gameDataTracker, setGameDataTracker] = useState({});
    const [gameDataDesignList, setGameDataDesignList] = useState(initialGameDataDesignList);


    // const [originalGmdt, setOriginalGmdt] = useState({});

    const [showConvLog, setShowConvLog] = useState(false);
    
    const [resetSignal, setResetSignal] = useState(false);

    const [clickOnGameScreen, setClickOnGameScreen] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {

            initializeGameDataTracker();



    
            setFirstTimeEnter(false);
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
    
    function triggerClickOnGameScreen() {
        setClickOnGameScreen(true);
    }

    function triggerClickOnGameDataPanel() {
        setClickOnGameScreen(false);
    }

    function passInIsGameScreenClicked() {
        return clickOnGameScreen;
    }
/*
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
*/ //TODO: remove unusued later



    function initializeGameDataTracker() {
        let gameDataTemp = getGameDataDesignList(); //TODO refactor for separating
        let defaultMap = {}; //for the record of entering-game-data

        {Object.keys(gameDataTemp).map((currKey) => {
            gameDataTemp[currKey]["current_value"] = gameDataTemp[currKey]["default_value"];
            //current_value, data_type("boolean"/"string"/"number"), default_value, name
            defaultMap[currKey] = gameDataTemp[currKey]["default_value"];
        })}
        setGameDataTracker(gameDataTemp); 

    }

    function resetViewingPiece() {


                            //TODO temp removed
                            // let gameDataTemp = gameDataTracker; 

                            // {Object.keys(gameDataDesignList).map((currKey) => {
                            //     gameDataTemp[currKey]["current_value"] = gameDataDesignList[currKey];
                            // })}
                            // setGameDataTracker(gameDataTemp);

                            //                                                 console.log("now gameDataTemp = ", gameDataTemp);
                            //                                                 console.log("now gameDataTracker = ", gameDataTracker);

                            //                                                 console.log("initialPieceNum = ", initialPieceNum);
                            //TODO temp removed

        initializeGameDataTracker();

        setCurrPieceNum(initialPieceNum); //TODO reset to given first-piece later
        setResetSignal(true);
        setClickOnGameScreen(false);
    }

    // function notifyFinished() {
    //     setTextStillTyping(false);
    // } 

    // function notifyNotYet() {
    //     setTextStillTyping(true);
    // }

    // function passInImmedaiteFinishSignal() {
    //     return immediateFinishSignal;
    // }

    // function triggerAutoMode(val) {
    //     setAutoMode(val);
    // }

    // function passInAutoModeStatus() {
    //     return autoMode;
    // }

    function changeGameDataTracker(name, value) { //TODO later
        let gmdtObj = gameDataTracker;
        gmdtObj[name].current_value = value;
        setGameDataTracker(gmdtObj);
    }  

    function changeGameDataTrackerByStatement(name, action, newVal, type) { //TODO later
        if (type === "boolean" || type === "string") {
            // type - boolean 
                // action is "becomes"
            let boolVal = (newVal === "true" || newVal === true) ? true : false;
            changeGameDataTracker(name, boolVal);
        } else if (type === "string") {
            // type - string
                // action is "becomes"
            changeGameDataTracker(name, newVal);
        } else if (type === "number") {
            // type - number
            let currVal = gameDataTracker[name]["current_value"];

            let result = 0;
            if (action === "plus") {
                result = currVal - (-1 * newVal); //important, not directly adding
                changeGameDataTracker(name, result);
            } else if (action === "minus") {   
                result = currVal - newVal;
                changeGameDataTracker(name, result);
            } else if (action === "becomes") {
                changeGameDataTracker(name, newVal);
            }
        }
    }






    // function closeConvLog() {
    //     setShowConvLog(false);
    // }

    // function openConvLog() {
    //     setShowConvLog(true);
    // }

    // function notUsing() {
    //     console.log();
    // }

    // function passInVisualMap() {
    //     return visualMap;
    // }

    // function passInIsDisplayConvLog() {
    //     return showConvLog;
    // }       //TODO: remove unusued later








    let languageCode = 0;
    let closeText = ["Close"];
    let resetText = ["Reset"];


    function passInCurrPieceNum() {
        return currPieceNum;
    }

    function passInResetSignal() {        
        return resetSignal;
    }

    function notifyAfterReset() {
        setResetSignal(false);
    }

    function notifyNewGameData(data) {
        setGameDataTracker(data);
    }

    function passInScreenHeight() {
        return screenHeight;
    }

    function passInScreenWidth() {
        return screenWidth;
    }

    function passInGameDataDesignList() {
        return gameDataDesignList;
    }

    function passInGameDataFromScreen() {
        return gameDataTracker;
    }

    return ( <div className={modalStyleName}>
        <div className="modalArea">

            <div style={{"width": "2000px", "marginLeft": "-90px"}}>
            <button onClick={()=>{handleQViewCancel();}}> {closeText[languageCode]} </button>
            <button onClick={()=>{resetViewingPiece();}}> {resetText[languageCode]} </button>

                <div  style={{"overflow": "scroll", "display": "flex"}}>

                <GameScreen_QuickView_ConvNode
                    initialPieceNum={initialPieceNum}
                    isDisplay={isDisplay} 
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    allPieceContent={allPieceContent}
                    uiData1_textframe={uiData1_textframe}
                    uiData2_buttonOption={uiData2_buttonOption}
                    uiData3_ConvNavigation={uiData3_ConvNavigation} 
                    uiData4_logPageSettings={uiData4_logPageSettings}
                    visualList={visualList} 
                    audioList={audioList}
                    gameData={initialGameDataDesignList}
                    getCurrPieceNum={passInCurrPieceNum}
                    getResetSignal={passInResetSignal}
                    notifyNewGameData={notifyNewGameData}
                    triggerClickOnGameScreen={triggerClickOnGameScreen}
                    getIsGameScreenClicked={passInIsGameScreenClicked}
                    notifyAfterReset={notifyAfterReset}
                />

                <Panel_GameDataTest
                       localTest={true}
                       getGameDataDesignList={passInGameDataDesignList} 
                       initialGameDataDesignList={gameDataDesignList}
                       getScreenHeight={passInScreenHeight} 
                       getScreenWidth={passInScreenWidth}
                       isQuickView={true}
                       triggerClickOnGameDataPanel={triggerClickOnGameDataPanel}
                       getIsGameScreenClicked={passInIsGameScreenClicked}
                       receiveGameDataObj={passInGameDataFromScreen}
                       getResetSignal={passInResetSignal}
                       notifyAfterReset={notifyAfterReset}
                />
{/* //TODO fetch original game-data from cloud, present changes through quick-view */}



                </div>


         






                

                </div>
           
           
           
           
                </div>

           

    </div>);
}