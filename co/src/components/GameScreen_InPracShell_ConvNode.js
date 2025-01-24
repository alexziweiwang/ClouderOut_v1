import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';


export default function GameScreen_InPracShell_ConvNode ({

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


return (<div>


{/* //TODO51  */}
      <GameScreen_QuickView_ConvNode
                    isDisplay={true} 
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}

                    initialPieceNum={0}
                    allPieceContent={allPieceContent}
                    
                    uiData1_textframe={uiData1_textframe}
                    uiData2_buttonOption={uiData2_buttonOption}
                    uiData3_ConvNavigation={uiData3_ConvNavigation} 
                    uiData4_logPageSettings={uiData4_logPageSettings}

                    visualMap={visualMap}
                    audioMap={audioMap}

                    gameData={gameDataTracker}
                    getCurrPieceNum={passInCurrPieceNum}

                    getResetSignal={passInResetSignal}
                    getResetInfoSets={passInResetInfoSets}


                    triggerClickOnGameScreen={triggerClickOnGameScreen} /* important */
                    getIsGameScreenClicked={passInIsGameScreenClicked}

                    notifyNewGameData={notifyNewGameData}
                    notifyAfterReset={notifyAfterReset}

                    receiveGameDataObj={passInGameDataFromScreen}
                    buttonConseqByStatement={changeGameDataTrackerByStatement}
                    buttonConsequenceByStatementEntireArray={buttonConsequenceByStatementEntireArray}
                />
                










</div>);

}