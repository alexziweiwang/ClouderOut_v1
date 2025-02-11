import { useState, useEffect } from 'react';
import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';
import Panel_GameDataTest from './Panel_GameDataTest';
import langDictionary from './textDictionary';


//TODO20 cloud-func
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
   

export default function QuickView_AllPanels_ConvNode ({initialPieceNum, handleQViewCancel, 
    isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, 
    uiData2_defaultButtonOption, uiData3_ConvNavigation, 
    uiData4_logPageSettings,
    getVisualMap, getAudioMap,
    getUILanguage,
    username, projName,
    initialEmuGameDataTracker,
    resetViewing
}) {


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


    const [renderCounter, setRenderCounter] = useState(0);

    const [currPieceNum, setCurrPieceNum] = useState(initialPieceNum);
    
    const [directNextPieceBool, setDirectNextPieceBool] = useState(true);
    const [textStillTyping, setTextStillTyping] = useState(true);
    const [immediateFinishSignal, setImmediateFinishSignal] = useState(false);
    const [autoMode, setAutoMode] = useState(false);

    const [audioMap, setAudioMap] = useState({});
    const [visualMap, setVisualMap] = useState({}); 

    const [bgmSource, setBgmSource] = useState("");
    const [bgpSource, setBgpSource] = useState("");

    const [charaPicArr2, setCharaPicArr2] = useState(allPieceContent[0]["chp_arr"]);



    const [gameDataTracker, setGameDataTracker] = useState(initialEmuGameDataTracker); //used during test-play
    const [gameDataDesignMap, setGameDataDesignMap] = useState([]); //used for storing fetched-design-list from cloud

    const [initGdtRecord , setInitGdtRecord] = useState(initialEmuGameDataTracker);

    // const [originalGmdt, setOriginalGmdt] = useState({});

    const [showConvLog, setShowConvLog] = useState(false);
    
    const [resetSignal, setResetSignal] = useState(false);
    const [resetInfo, setResetInfo] = useState([]);

    const [clickOnGameScreen, setClickOnGameScreen] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {


            makeDupGdt();

                            //            console.log("first entry quick-view, gdt = ", initialEmuGameDataTracker);

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

        let auMap = getAudioMap();
        setAudioMap(auMap);
        let visMap = getVisualMap();
        setVisualMap(visMap);
        

    });

    function updateRenderCounter() {
        console.log("updateRenderCounter!");
        setRenderCounter((renderCounter+1) % 100);
    }

  

    function makeDupGdt() {
        let tempObj = {};

        {Object.keys(initGdtRecord).map((currKey) => {
            let name = initGdtRecord[currKey]["name"];
            let defaultVal = initGdtRecord[currKey]["default_value"];
            let dataType =initGdtRecord[currKey]["data_type"];
            let currVal = initGdtRecord[currKey]["current_value"];

            let obj = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let keyStr = currKey;
            tempObj[keyStr] = obj;
        })} 

        setInitGdtRecord(tempObj);
    }



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
        //setClickOnGameScreen(false);
    }

    function passInIsGameScreenClicked() {
        return clickOnGameScreen;
    }


    function changeGameDataTracker(ds, name, value) {
        let gmdtObj = ds;
        gmdtObj[name].current_value = value;
        
                                                            // setGameDataTracker(gmdtObj);//TODO remove later
        return gmdtObj;
    }  

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

    function buttonConsequenceByStatementEntireArray(pieceNum, item) {

        let stndButtonThisButtonInfo = allPieceContent[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
        
        let conseqMap = stndButtonThisButtonInfo[0]["conseq"]; 
        if (conseqMap === undefined) {
                                                            console.log("2... conseqMap undefined.");
            return;
        }
                                                          //  console.log("2conseqMap: ", conseqMap, ", len = ", len);
        let res = gameDataTracker;
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

        setGameDataTracker(res);
        updateRenderCounter();
        
    }



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
                                                    console.log("quickview-allpanel... new-gdt  = ", data);
        setGameDataTracker(data);
    }

    function passInScreenHeight() {
        return screenHeight;
    }

    function passInScreenWidth() {
        return screenWidth;
    }

    function passInGameDataFromScreen() {
        console.log("\t\t!! qv- gameDataTracker = ", gameDataTracker);

        return gameDataTracker;
    }

    function passInResetInfoSets() {
        
        //TODO
        return resetInfo;

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
                    onClick={()=>{
                        setGameDataTracker(initGdtRecord)
                        handleQViewCancel();
                        
                    }}> {closeText} </button>
                    
                    <button 
                        className="cursor_pointer modalClose" 
                        onClick={()=>{
                            let resArr = resetViewing();
                                                                        console.log("reset clicked: ", resArr);

                            setGameDataTracker(resArr[1]);
                            setResetSignal(true);
                            setResetInfo(resArr);
                        }}
                    > {resetText} </button> //TODO remove later
            </div>


                <div  style={{"overflow": "scroll", "display": "flex"}}>

                <GameScreen_QuickView_ConvNode
                    isDisplay={isDisplay} 
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}

                    initialPieceNum={initialPieceNum}
                    allPieceContent={allPieceContent}
                    
                    uiData1_textframe={uiData1_textframe}
                    uiData2_defaultButtonOption={uiData2_defaultButtonOption}
                    uiData3_ConvNavigation={uiData3_ConvNavigation} 
                    uiData4_logPageSettings={uiData4_logPageSettings}
                    
                  
                    visualMap={visualMap}
                    audioMap={audioMap}

                    gameData={gameDataTracker}
                    getCurrPieceNum={passInCurrPieceNum}

                    getResetSignal={passInResetSignal}
                    getResetInfoSets={passInResetInfoSets}


               //     triggerClickOnGameScreen={triggerClickOnGameScreen} /* important */ //TODO test before removing
               //     getIsGameScreenClicked={passInIsGameScreenClicked} //TODO test before removing

                    notifyNewGameData={notifyNewGameData}
                    notifyAfterReset={notifyAfterReset}

                    receiveGameDataObj={passInGameDataFromScreen}
                    buttonConseqByStatement={changeGameDataTrackerByStatement}
                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}
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