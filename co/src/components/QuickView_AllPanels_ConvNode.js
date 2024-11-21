import { useState, useEffect } from 'react';
import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';
import Panel_GameDataTest from './Panel_GameDataTest';
import langDictionary from './textDictionary';

import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { getProjectGameDataDesignVM } from '../viewmodels/GameDataViewModel';
   

export default function QuickView_AllPanels_ConvNode ({initialPieceNum, handleQViewCancel, 
    isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, 
    uiData2_buttonOption, uiData3_ConvNavigation, 
    uiData4_logPageSettings,
    getUILanguage,
    username, projName,
    initialEmuGameDataTracker,
}) {


    const [visualList, setVisualList] = useState([]); //TODO temp
    const [audioList, setAudioList] = useState([]); //TODO temp

    const tempPlaceholder = []; //TODO temp for "initialGameDataDesignList"

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    

    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }




    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    let closeText = textDictItem.closeText !== undefined ?
        textDictItem.closeText
        : textDictItemDefault.closeText;

    let resetText = textDictItem.resetText !== undefined ?
    textDictItem.resetText
    : textDictItemDefault.resetText;



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



    const [gameDataTracker, setGameDataTracker] = useState({}); //used during test-play
    const [gameDataDesignMap, setGameDataDesignMap] = useState([]); //used for storing fetched-design-list from cloud


    // const [originalGmdt, setOriginalGmdt] = useState({});

    const [showConvLog, setShowConvLog] = useState(false);
    
    const [resetSignal, setResetSignal] = useState(false);

    const [clickOnGameScreen, setClickOnGameScreen] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {

            initializeResourceLists();

    
            setFirstTimeEnter(false);
        }


        if (allPieceContent[currPieceNum]["clkb_arr"].length > 0 || 
            allPieceContent[currPieceNum]["stnd_btn_arr"].length > 0) {
            setDirectNextPieceBool(false);
        } else {
            setDirectNextPieceBool(true);
        }

        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);

      
        updateCharPicArr();
        updateBgmSource();
        updateBgpSource();
        

    });

    async function initializeResourceLists() {

        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});

        if (obj === undefined 
            || obj === null 
            || obj.audio === undefined 
            || obj.visual === undefined
            || obj.audio === null 
            || obj.visual === null
            ) {
            return;
        }

        let audioListTemp = obj.audio;
        let visualListTemp = obj.visual;

        setAudioList(audioListTemp);
        setVisualList(visualListTemp);


        //set visualMap & audioMap?
        if (audioMapSize < audioListTemp.length || visualMapSize < visualListTemp.length) {
            let i = 0;
            let tempAudioMap = {};
            setAudioMapSize(audioListTemp.length);
            for (;i < audioListTemp.length; i++) {
                let item = audioListTemp[i];
                tempAudioMap[item["var"]] = item["url"];
            }
            setAudioMap(tempAudioMap);

            i = 0;
            let tempVisualMap = {};
            setVisualMapSize(visualListTemp.length);
            for (;i < visualListTemp.length; i++) {
                let item = visualListTemp[i];
                tempVisualMap[item["var"]] = item["url"];
            }
            setVisualMap(tempVisualMap);
        }




    }

    function reset_GameDataTracker() {
        // let gDataDesignMap = gameDataDesignMap;
        // let trackerMap = {};
        // {Object.keys(gDataDesignMap).map((currKey) => {
        //     let name = gDataDesignMap[currKey]["name"];
        //     let defaultVal = gDataDesignMap[currKey]["default_value"];
        //     let dataType = gDataDesignMap[currKey]["data_type"];

        //     let obj = {
        //         "name": name,
        //         "default_value": defaultVal,
        //         "data_type": dataType,
        //         "current_value": defaultVal
        //     }
        //     let keyStr = currKey;
        //     trackerMap[keyStr] = obj;
        // })}
        
        // setGameDataTracker(trackerMap); //TODO refactor

    } //-- reset_GameDataTracker() --


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



                            function resetViewingPiece() {
                                
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

    function changeGameDataTracker(name, value) {
        let gmdtObj = gameDataTracker;
        gmdtObj[name].current_value = value;
        
        setGameDataTracker(gmdtObj); //TODO20

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
        return gameDataDesignMap;
    }

    function passInGameDataFromScreen() {
        return gameDataTracker;
    }




    function notUsing() {
        return "notUsing";
    }

    return ( <div className={modalStyleName}>
        <div className="modalArea">

            <div style={{"width": "2000px", "marginLeft": "-90px"}}>

            <div style={{"marginLeft": "-700px", "marginTop": "-30px", "paddingBottom": "20px"}}>
                <button 
                    className="cursor_pointer modalClose" 
                    onClick={()=>{handleQViewCancel();}}> {closeText} </button>
                {/* <button onClick={()=>{resetViewingPiece();}}> {resetText} </button> //TODO remove later */}
            </div>


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

                    gameData={tempPlaceholder}

                    getCurrPieceNum={passInCurrPieceNum}


                    getResetSignal={passInResetSignal}


                    triggerClickOnGameScreen={triggerClickOnGameScreen}
                    getIsGameScreenClicked={passInIsGameScreenClicked}


                    notifyNewGameData={notifyNewGameData}
                    notifyAfterReset={notifyAfterReset}
                />

                <Panel_GameDataTest
                       localTest={true}
                       initialGameDataStatus={gameDataTracker}

                       getScreenHeight={passInScreenHeight} 
                       getScreenWidth={passInScreenWidth}
                       isQuickView={true}


                       triggerClickOnGameDataPanel={triggerClickOnGameDataPanel}
                       getIsGameScreenClicked={passInIsGameScreenClicked}

                       receiveGameDataObj={passInGameDataFromScreen}

                       getResetSignal={passInResetSignal}
                       notifyAfterReset={notifyAfterReset}

                       getUILanguage={getUILanguage}
                />
{/* //TODO fetch original game-data from cloud, present changes through quick-view */}



                </div>


         






                

                </div>
           
           
           
           
                </div>

           

    </div>);
}