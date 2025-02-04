import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';


export default function GameScreen_InPracShell_ConvNode ({

    allPieceData,
    nodeUIConvNav,
    nodeUIDefaultButton,
    nodeUILogPage,
    nodeUITextFrame,

    screenWidth,
    screenHeight,
        
    uiLanguage,
    
    username,
    projectname,
    
    enteringEmuGameDataTracker,

    visualMap,
    audioMap,

}) {

    const initialPieceNum = 0;
    const isDisplay = true;

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

    const [allPieceContent, setAllPieceContent] = useState({});
    const [allPieceUI, setAllPieceUI] = useState({});

    const [charaPicArr2, setCharaPicArr2] = useState(allPieceContent[0]["chp_arr"]);

    const [showConvLog, setShowConvLog] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {
            initializeDataFromCloud();

            setFirstTimeEnter(false);
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

    }); //-- useEffect --

    async function initializeDataFromCloud() {
      let obj = await fetchNodeDataEachNode({
          projectName: projectname, 
          uname: username, 
          chapterKey: chapterKey,
          nodeKey: nodeKey
      });

      if (obj === undefined || obj === null) {
        return;
      }

      
      // setAllPieceContent(obj[nodeContent]); //TODO test later
      // setAllPieceUI(obj[nodeUISettings]); //TODO test later
      
                          // obj[nodeContent] 
                          // obj[nodeUISettings] 

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

    function notUsing() {
      return "";
    }
    
    function passInResetSignal() {
      return false; // not resetting in-viewing-in-practice
    }

    function buttonConsequenceByStatementEntireArray() {
      //TODO button-caused-change

      //TODO (game data tracker kept in this layer? out-layer?)
    }


return (<div>


{/* //TODO51  */}

{/* //TODO53: confirm all-data-tracking layer's position 

   allPieceData,
    nodeUIConvNav,
    nodeUIDefaultButton,
    nodeUILogPage,
    nodeUITextFrame,




*/}

      <GameScreen_QuickView_ConvNode
                    isDisplay={true}  //ok
                    screenWidth={screenWidth}   //ok
                    screenHeight={screenHeight}   //ok

                    initialPieceNum={0}   //ok
                    allPieceContent={allPieceData}
                    
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

                  //  triggerClickOnGameScreen={triggerClickOnGameScreen} /* important */ //TODO test before removing
                  //  getIsGameScreenClicked={passInIsGameScreenClicked} //TODO test before removing

                  //  notifyNewGameData={notUsing} //TODO notUsing
                    notifyAfterReset={notUsing} //TODO notUsing

                  //  receiveGameDataObj={passInGameDataFromScreen}   //TODO test before removing
                  //  buttonConseqByStatement={changeGameDataTrackerByStatement}     //TODO test before removing
                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}  //TODO 
                />
                










</div>);

}