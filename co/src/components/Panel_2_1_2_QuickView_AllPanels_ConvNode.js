import { useState, useEffect } from 'react';
import Viewer__ConvNode from './Viewer__ConvNode';
import Panel_GameDataTest from './InfoTable_GameDataTest';
import langDictionary from './_textDictionary';
   

//level3 (container of conversation-node, for quick view, along with panel attached)
//the same layer with duing-game-screen_all-node-type-container
import { buttonConsequenceByStatementEntireArray } from '../viewmodels/CalcAc_QuickView';
import { initializeGameDataTracker_vm } from '../viewmodels/PrepAc_ViewerEntireAc';

export default function QuickView_AllPanels_ConvNode ({
    initialPieceNum, 
    handleQViewCancel, 

    screenWidth, 
    screenHeight, 

    allPieceContent, 

    uiData1_textframe, 
    uiData2_defaultButtonOption, 
    uiData3_ConvNavigation, 
    uiData4_logPageSettings,

    getVisualMap, 
    getAudioMap,
    getUILanguage,
    
    initialEmuGameDataTracker,
    resetViewing,
    openSettingPage,
    notifyCurrGdt
}) {

//TODO123: sl-info related properties

    const tempPlaceholder = []; //TODO temp for "initialGameDataDesignList"

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    

    let modalStyleName = "displayBlock modalBackboard";
    




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

//TODO


    const [gameDataTracker, setGameDataTracker] = useState(initialEmuGameDataTracker); //used during test-play
    const [gameDataDesignMap, setGameDataDesignMap] = useState([]); //used for storing fetched-design-list from cloud

    const [initGdtRecord , setInitGdtRecord] = useState(initialEmuGameDataTracker);

    // const [originalGmdt, setOriginalGmdt] = useState({});

    const [showConvLog, setShowConvLog] = useState(false);
    
    const [resetSignal, setResetSignal] = useState(false);
    const [resetInfo, setResetInfo] = useState([]);

    const [clickOnGameScreen, setClickOnGameScreen] = useState(false);

    const [mutedViewOption, setMutedViewOption] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {


            initializeGameDataTracker_local(initialEmuGameDataTracker);


            console.log("all-panels entered:",     
            // uiData1_textframe, 
            // uiData2_defaultButtonOption, 
            // uiData3_ConvNavigation, 
            // uiData4_logPageSettings
                initialEmuGameDataTracker
            );


            let auMap = getAudioMap();
            setAudioMap(auMap);
            
            let visMap = getVisualMap();
            setVisualMap(visMap);
                                                //  console.log("vis-map = ", visMap);            
            
    

            
            makeDupGdt();

                            //            console.log("first entry quick-view, gdt = ", initialEmuGameDataTracker);

            setFirstTimeEnter(false);
        }

                            //    console.log("all-panels-QuickView: ", allPieceContent, " with piece-num: ", currPieceNum);
        
        if (allPieceContent === undefined) {
            handleQViewCancel();
        }


        if (allPieceContent[currPieceNum]["isContentNotClkb"] === false) {
            if (directNextPieceBool === true) {
               setDirectNextPieceBool(false); 
            }                    
            

        } else { //content only, no clicking interaction
            if (directNextPieceBool === false) {
               setDirectNextPieceBool(true); 
            }
            
        }

        let UILang = getUILanguage();
        if (UILang !== languageCodeTextOption) {
            setLanguageCodeTextOption(UILang);
        }

      
        updateBgmSource();
        updateBgpSource();



        



    });

    function initializeGameDataTracker_local(dataObj) {
        initializeGameDataTracker_vm(dataObj, setGameDataTracker);
    }


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
    
    // refactored to VM - already put in vm-part
    // function changeGameDataTrackerByStatement__

    // refactored to VM - already put in vm-part
    function buttonConsequenceByStatementEntireArray_QV(pieceNum, item) {
        console.log("quick-view-conv-node : buttonConsequenceByStatementEntireArray_QV");
        buttonConsequenceByStatementEntireArray(
                pieceNum, 
                item, 
                allPieceContent, 
                gameDataTracker, 
                notifyNewGameData, 
                updateRenderCounter
        );
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

        //TODO to panel2:
      //  notifyCurrGdt(data);
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

    function notUsingThreeParam(a1, a2, a3) {
        return "notUsingThreeParam";
    }

    function passInDefulatGameSettings() {

        let defaultObj = {            
            "settingPage-playSpeed" : 3,
            "settingPage-bgmVol": 90,
            "settingPage-seVol": 90
        };

        return defaultObj;
    }

    function resetViewing() {
        setCurrPieceNum(initialPieceNum);
        
    }

    function triggerSLPageToSave_qv() {
        alert("Save/Load Page pops when this is clicked.");
    }

    return ( 
<div>
        <div className="modalArea textNoSelect">

            <div style={{
                "width": "2000px", 
                "marginLeft": "-90px",
            }}>

            <div style={{"marginLeft": "-700px", "marginTop": "-30px", "paddingBottom": "20px"}}>



                    
                                                    {/* <button 
                                                        className="cursor_pointer modalClose" 
                                                        onClick={()=>{
                                                            let resArr = resetViewing();
                                                                                                        console.log("reset clicked: ", resArr);

                                                            setGameDataTracker(resArr[1]);
                                                            setResetSignal(true);
                                                            setResetInfo(resArr);
                                                        }}
                                                    > {resetText} </button> */}

                                                    {/* <button
                                                        className="cursor_pointer modalClose" 
                                                        onClick={()=>{
                                                            setMutedViewOption(!mutedViewOption);
                                                        }}
                                                    >
                                                        {mutedViewOption === true && <label>Unmute</label>}
                                                        {mutedViewOption === false && <label>Mute</label>} 

                                                    </button> */}
            </div>


                <div  style={{ "display": "flex"}}>

                    <Viewer__ConvNode

                        screenWidth={screenWidth}
                        screenHeight={screenHeight}

                        allPieceContent={allPieceContent}
                        
                        uiData1_textframe={uiData1_textframe}
                        uiData2_defaultButtonOption={uiData2_defaultButtonOption}
                        uiData3_ConvNavigation={uiData3_ConvNavigation} 
                        uiData4_logPageSettings={uiData4_logPageSettings}
                        
                        visualMap={visualMap}
                        audioMap={audioMap}

                        initialPieceNum={initialPieceNum}

                        gameData={gameDataTracker}
                
                        isViewMuted={mutedViewOption}
                        openSettingPage={openSettingPage}

                        isPreview={true}
                        isDisplay={true}

                        getCurrPieceNum={passInCurrPieceNum}

                        getResetSignal={passInResetSignal}
                        getResetInfoSets={passInResetInfoSets}

                        notifyNewGameData={notifyNewGameData}
                        notifyAfterReset={notifyAfterReset}

                        receiveGameDataObj={passInGameDataFromScreen}
                        
                        buttonConsequenceByStatementEntireArray_QVC={buttonConsequenceByStatementEntireArray_QV}
            

                        fetchGameSettingsForPlaying={passInDefulatGameSettings}

                        sendOutBgmSettings={notUsingThreeParam}

                        notifyNodeFinish={notUsing}

                        triggerSLPageToSave={triggerSLPageToSave_qv}
                    />
                    
    
                    <div style={{"marginLeft": "20px"}}>
                        <table>
                                <thead className="textNoSelect">
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                        <th>Default Value</th>
                                    </tr>
                                </thead>  
                
                <tbody> 
    {/* //TODO: list all emu-game-data-status here */}

                            {Object.keys(gameDataTracker).map((currKey) => {
                                let keyName = "gmdt" + currKey;
                                let val = gameDataTracker[currKey]["data_type"] === "boolean" ? 
                                        ((gameDataTracker[currKey]["current_value"] === true 
                                            || gameDataTracker[currKey]["current_value"] === "true") ? 
                                            "true" : "false") 
                                    : gameDataTracker[currKey]["current_value"];

                                let inputId = keyName+"-input";

                                return (
                                    <tr value={currKey} key={keyName} id={inputId}>
                                        <td>{gameDataTracker[currKey]["name"]}</td>
                                        
                                        <td>
                                            <label>{gameDataTracker[currKey]["data_type"] !== "boolean" ? 
                                                gameDataTracker[currKey]["current_value"] 
                                                : (gameDataTracker[currKey]["current_value"] === true ? 
                                                    "True" 
                                                    : "False")}</label><br></br>

                                        </td>   

                                        <td>
                                        <label>{gameDataTracker[currKey]["data_type"] !== "boolean" 
                                        ? gameDataTracker[currKey]["default_value"] 
                                        : (gameDataTracker[currKey]["default_value"] == "true" ? "True" : "False")}</label>
                                        
                                        </td>            
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