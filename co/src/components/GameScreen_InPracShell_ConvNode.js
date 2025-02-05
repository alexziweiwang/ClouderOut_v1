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

    visualMap,
    audioMap,

}) {

    const initialPieceNum = 0;
    const nodePieceLimit = allPieceData !== undefined ? allPieceData.length : 0;

    const isDisplay = true;
    const [resetSignal, setResetSignal] = useState(false);

    const [currPieceNum, setCurrPieceNum] = useState(initialPieceNum);
                            //  const [directNextPieceBool, setDirectNextPieceBool] = useState(true); //TODO test before removing
                            //  const [textStillTyping, setTextStillTyping] = useState(true); //TODO test before removing
                            //  const [immediateFinishSignal, setImmediateFinishSignal] = useState(false); //TODO test before removing
                            //  const [autoMode, setAutoMode] = useState(false); //TODO test before removing

    // const [audioMap, setAudioMap] = useState({}); //TODO using the one from out-layer
    // const [visualMap, setVisualMap] = useState({});  //TODO using the one from out-layer
    // const [audioMapSize, setAudioMapSize] = useState(0); //TODO using the one from out-layer
    // const [visualMapSize, setVisualMapSize] = useState(0); //TODO using the one from out-layer
    
                            // const [bgmSource, setBgmSource] = useState(""); //TODO test before removing
                            // const [bgpSource, setBgpSource] = useState(""); //TODO test before removing

  //  const [allPieceContent, setAllPieceContent] = useState({});
                            //  const [allPieceUI, setAllPieceUI] = useState({}); //TODO remove?

 //   const [charaPicArr2, setCharaPicArr2] = useState(allPieceContent[0]["chp_arr"]);

                            // const [showConvLog, setShowConvLog] = useState(false); //TODO test before removing


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {
                                                                      // initializeDataFromCloud(); //TODO remove

            setFirstTimeEnter(false);
        }

                                    console.log("in-prac-shell, allPieceData = ", allPieceData);

/* 
  
        updateCharPicArr(); // done in conv-node-sub-layer
        updateBgmSource(); // done in conv-node-sub-layer
        updateBgpSource(); // done in conv-node-sub-layer
/*

  /*      
 //TODO using the one from out-layer
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
 TODO using the one from out-layer

        if (allPieceContent[currPieceNum].displayTextFrame === false) {
            setTextStillTyping(false);
        } //TODO test before removing
*/



    }); //-- end of useEffect --


/*
    //async function initializeDataFromCloud() { //TODO remove
      // let obj = await fetchNodeDataEachNode({
      //     projectName: projectname, 
      //     uname: username, 
      //     chapterKey: chapterKey,
      //     nodeKey: nodeKey
      // });

      // if (obj === undefined || obj === null) {
      //   return;
      // }

      
      // setAllPieceContent(obj[nodeContent]); //TODO test later
      // setAllPieceUI(obj[nodeUISettings]); //TODO test later
      
                          // obj[nodeContent] 
                          // obj[nodeUISettings] 

    // } //TODO remove



    // function updateCharPicArr() { //TODO test before removing
    //     if (currPieceNum < 0) {
    //         return;
    //       }
          
    //       if (allPieceContent[currPieceNum]["chp_action"] === "changeCharPicArr") {     
    //         setCharaPicArr2(allPieceContent[currPieceNum]["chp_arr"]);  
    //       } 
    // }

    // function updateBgmSource() { //TODO test before removing
    //     if (currPieceNum < 0) {
    //         return;
    //       }
    //       if (allPieceContent[currPieceNum]["bgm_action"] === "startNewBgm") {
    //         if (allPieceContent[currPieceNum]["bgm_source_varname"] !== "") {
    //           setBgmSource(audioMap[allPieceContent[currPieceNum]["bgm_source_varname"]]);
    //         }
    //       } else if (allPieceContent[currPieceNum]["bgm_action"] === "stopBgm") {
    //         setBgmSource("");
    //       } 
    //       //TODO "naturalStopBgm" stop looping...

    // } //TODO test before removing

    // function updateBgpSource() { //TODO test before removing
    //     if (currPieceNum < 0) {
    //       return;
    //     }
    //     if (allPieceContent[currPieceNum]["bgp_action"] === "switchToNewBgp") {
    //       if (allPieceContent[currPieceNum]["bgp_source_varname"] !== "") {
    //         setBgpSource(visualMap[allPieceContent[currPieceNum]["bgp_source_varname"]]);
    //       } else {
    //         setBgpSource("");
    //       }
        
    //     } 
    // }  //TODO test before removing

    */

    function notUsing() {
      return "";
    }
    
    function passInResetSignal() {        
      return resetSignal;
  }

    function buttonConsequenceByStatementEntireArray() {
      //TODO button-caused-change

      //TODO (game data tracker kept in this layer? out-layer?)
    }

    function receivedSignalOfPieceLimitReached() {
      //TODO100
      //TODO notify outer-layer... able to walk to next node there...
    }


return (<div>


{/* //TODO51  */}

{/* //TODO53: confirm all-data-tracking layer's position 



*/}

      <GameScreen_QuickView_ConvNode
                    isDisplay={true}  //ok
                    screenWidth={screenWidth}   //ok
                    screenHeight={screenHeight}   //ok

                    initialPieceNum={initialPieceNum}   //ok
                    allPieceContent={allPieceData}

                    notifyNodeFinish={notifyNodeFinish}
                    
                    uiData1_textframe={nodeUITextFrame}
                    uiData2_defaultButtonOption={nodeUIDefaultButton}
                    uiData3_ConvNavigation={nodeUIConvNav}
                    uiData4_logPageSettings={nodeUILogPage}

                    visualMap={visualMap} //TODO empty so far
                    audioMap={audioMap} //TODO empty so far

                    gameData={enteringEmuGameDataTracker}
                  //  getCurrPieceNum={passInCurrPieceNum} // hidden, remove

                    getResetSignal={passInResetSignal} 
                    getResetInfoSets={notUsing} 

                  //  triggerClickOnGameScreen={triggerClickOnGameScreen} // important //TODO test before removing
                  //  getIsGameScreenClicked={passInIsGameScreenClicked} //TODO test before removing

                  //  notifyNewGameData={notUsing} //TODO notUsing
                    notifyAfterReset={notUsing} //TODO notUsing

                  //  receiveGameDataObj={passInGameDataFromScreen}   //TODO test before removing
                  //  buttonConseqByStatement={changeGameDataTrackerByStatement}     //TODO test before removing
                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}  //TODO 
                />
                

</div>);

}