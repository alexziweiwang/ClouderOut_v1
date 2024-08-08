import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';

import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';


export default function PreviewWindow_gameContent({initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, 
    getTextFrameUISettings, getIsDisplayDefaultButton, 
    getDefaultButtonUISettings, getBackButtonUISettings, 
    getLogPageUISettings,
    getScreenSize, triggerToDirectNext, setIsClickedOnSetters, getUIConvNav}) {
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing
  
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);
   
    const [directNextPieceBool, setDirectNextPieceBool] = useState(true);

    const [isShowLogScreen, setisShowLogScreen] = useState(false);
    const enteredgetLogPageUISettings = getLogPageUISettings();


    // console.log("re-rendering @preview window"); //TODO test temp

    let name = "/previewwindow";

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");

    const [currentPiece, setCurrentPiece] = useState({}); //TODO2 refactor for larger scope

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData);
    
    const [bgmSource, setBgmSource] = useState("");
    const [bgpSource, setBgpSource] = useState("");

    const [charaPicCurr2, setCharaPicCurr2] = useState(-1);
    const [charaPicArr2, setCharaPicArr2] = useState(initialAllPieceData[0]["chp_arr"]);

    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    
    async function fetchProjResourceLists() {

      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
      // console.log("new render- piece preview: obj from cloud (resource list):"); //TODO test
      // console.log(obj); //TODO test
      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }

    const [audioMap, setAudioMap] = useState({}); //TODO for bgm on each nav-page -- future feature
    const [visualMap, setVisualMap] = useState({}); 
  
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
 
      if (firstTimeEnter === true) {
        fetchProjResourceLists();
        setFirstTimeEnter(false);

console.log("preview-window first-time entry, resource-list fetched."); //TODO test
      }

      let allPieceContentTemp = getAllPieceContent();
      if (allPieceContentTemp !== allPieceData) {
        setAllPieceData(allPieceContentTemp);
      }
      
      let currPieceNumTemp = getCurrentPieceNum();
      if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
        setCurrentPieceNum(currPieceNumTemp);
        setCurrentPiece(allPieceContentTemp[currPieceNumTemp]);
      }

      if (allPieceContentTemp[currPieceNumTemp]["clkb_arr"].length > 0 || 
        allPieceContentTemp[currPieceNumTemp]["stnd_btn_arr"].length > 0) {
          setDirectNextPieceBool(false);
      } else {
          setDirectNextPieceBool(true);
      }

      setCharaPicCurr2(allPieceContentTemp[currPieceNumTemp]["chp_curr"]); 
      
      let isForward = (currPieceNumTemp > currentPieceNum);
      updateCharPicArr(allPieceContentTemp, currPieceNumTemp, isForward);
      updateBgmSource(allPieceContentTemp, currPieceNumTemp, isForward);
      updateBgpSource(allPieceContentTemp, currPieceNumTemp, isForward);
      

      let screenSizePair = getScreenSize();
      setScreenWidth(screenSizePair[0]);
      setScreenHeight(screenSizePair[1]);
      

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

    function updateBgmSource(allPieceContentTemp, currPieceNumTemp, isForward) {
      if (currentPieceNum < 0) {
        return;
      }
      if (allPieceContentTemp[currentPieceNum]["bgm_action"] === "startNewBgm") {
        if (allPieceContentTemp[currentPieceNum]["bgm_source_varname"] !== "") {
          setBgmSource(audioMap[allPieceContentTemp[currentPieceNum]["bgm_source_varname"]]);
        }
      } else if (allPieceContentTemp[currentPieceNum]["bgm_action"] === "stopBgm") {
        setBgmSource("");
      } else if (!isForward && 
            (allPieceContentTemp[currentPieceNum]["bgm_action" === "maintainBgm"] 
            || allPieceContentTemp[currentPieceNum]["bgm_action"] === "naturalStopBgm")) {
        let bgmNameTemp = findNearestBgmName(currPieceNumTemp);
        if (bgmNameTemp === "") {
          setBgmSource("");
        } else {
          setBgmSource(audioMap[bgmNameTemp]);
        }

      }
    }

    function updateCharPicArr(allPieceContentTemp, currPieceNumTemp, isForward) {
      if (currPieceNumTemp < 0) {
        return;
      }
      
      if (allPieceContentTemp[currPieceNumTemp]["chp_action"] === "changeCharPicArr") { 
        console.log("chara-pic-arr CHANGED!!!");  

        setCharaPicArr2(allPieceContentTemp[currPieceNumTemp]["chp_arr"]);  
      } else if (!isForward && allPieceContentTemp[currPieceNumTemp]["chp_action"] === "maintainCharPicArr") {
        //TODO1 fetch nearest chp-arr
        let charArrTemp = findNearestCharaArr(currPieceNumTemp);
        setCharaPicArr2(charArrTemp);

      }
    }


    function updateBgpSource(allPieceContentTemp, currPieceNumTemp, isForward) {
      if (currPieceNumTemp < 0) {
        return;
      }
      if (allPieceContentTemp[currPieceNumTemp]["bgp_action"] === "switchToNewBgp") {
        if (allPieceContentTemp[currPieceNumTemp]["bgp_source_varname"] !== "") {
          setBgpSource(visualMap[allPieceContentTemp[currPieceNumTemp]["bgp_source_varname"]]);
        } else {
          setBgpSource("");
        }
      
      } else if (!isForward && allPieceContentTemp[currPieceNumTemp]["bgp_action"] === "maintainBgp") {
        let bgpSourceNameTemp = findNearestBgpName(currPieceNumTemp);
        if (bgpSourceNameTemp === "") {
          setBgpSource("");
        } else {
          if (bgpSource !== visualMap[bgpSourceNameTemp]) {
            setBgpSource(visualMap[bgpSourceNameTemp]);
          }
        }
      }
    }    

    function findNearestBgpName(currNum) {
      let i = currNum-1;
      for(; i >= 0; i--) {
        if (allPieceData[i]["bgp_action"] === "switchToNewBgp") {
          return allPieceData[i]["bgp_source_varname"];  
        }
      }
      return "";
    }

    function findNearestCharaArr(currNum) {
      let i = currNum-1;
      for(; i >= 0; i--) {
        if (allPieceData[i]["chp_action"] === "changeCharPicArr") {
          return allPieceData[i]["chp_arr"];  
        }
      }
    }

    function findNearestBgmName(currNum) {
      let i = currNum-1;
      for(; i >= 0; i--) {
        if (allPieceData[i]["bgm_action"] === "startNewBgm") {
          return allPieceData[i]["bgm_source_varname"];  
        }
      }
      return "";
    }


    function passInAllPieceDataContent() {
      return allPieceData;
    }

    function passInCurrentPieceNum() {
      return currentPieceNum;
    }

    function passInDirectNextPieceBool() {
      return directNextPieceBool;
    }

    function triggerNextPiece() {
      //make piece to be the next one
      triggerToDirectNext();
    }

    function triggerAutoMode() {
      console.log("triggerAutoMode() in game-preview-window");
      //TODO1
    }
 
    function passInVisualMap() {
      return visualMap;
    }

    function passInAudioMap() {
      return audioMap;
    }



    function triggerLogOpen() {
      setisShowLogScreen(true);
    }


    function triggerLogClose() {
      setisShowLogScreen(false);
    }  

    return (
    
        <div className="previewWindow"  
          onClick={()=>{
            setIsClickedOnSetters(false);
          }}
        >       

            <div className="previewArea" 
              style={{"position": "relative", 
                      "height": `${screenHeight}px`, 
                      "width": `${screenWidth}px`
              }}>


<div style={{
  "display": !isShowLogScreen ? "flex" : "none"
}}>

              {<div style={{
                "backgroundColor": "#000000",
                "backgroundImage": (currentPieceNum >= 0 && bgpSource !== "") ? 
                  `url(${bgpSource})` 
                    : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}
                
                  onClick={()=>{
                    if (directNextPieceBool === true) {
                      //TODO1 add "firstTap" for all-content showing on one piece
                      triggerNextPiece();
                    }
                  }}
                >


                  <div> 
            
                    {(charaPicCurr2 !== undefined && charaPicCurr2 !== -1 && charaPicCurr2 !== [] && visualMap[charaPicCurr2[0]] !== undefined && visualMap[charaPicCurr2[0]] !== "") && 
                          
                            <img style={{
                              "position": "absolute", 
                              "top": `${charaPicCurr2[2]}px`, "left": `${charaPicCurr2[1]}px`,
                              "width": `${charaPicCurr2[3] * charaPicCurr2[5]}px`, "height": `${charaPicCurr2[4] * charaPicCurr2[5]}px`,
                            }}
                              src={visualMap[charaPicCurr2[0]]}
                              
                              alt="currently character-picture that's being added"
                            />
                    }

                    {charaPicArr2 !== undefined && charaPicArr2.map((item, index) => {
                      let altStr = index+"already added character picture";
                      let keyStr = "charPic-" + index;
                      return (
                        <div key={keyStr}>
                          {(visualMap[item[0]] !== undefined && visualMap[item[0]] !== "") && 
                          <img style={{
                              "position": "absolute", 
                              "top": `${item[2]}px`, "left": `${item[1]}px`,
                              "width": `${item[3] * item[5]}px`, "height": `${item[4] * item[5]}px`,
                              }}
                            src={visualMap[item[0]]}
                            alt={altStr}
            
                          />}
                        </div>
                      );
                    })}
                  </div>

              </div>}
              
              {(currentPieceNum >= 0 && allPieceData[currentPieceNum].displayTextFrame === true) && 
              <GameUI_1TextFramePreview
                isEditing={true}
                dataObj={currentPiece} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={passInAllPieceDataContent}
                getCurrentPieceNum={passInCurrentPieceNum}
                getIsDirectNextPiece={passInDirectNextPieceBool}
                triggerNextPiece={triggerNextPiece}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={true}
                triggerAutoMode={triggerAutoMode}
                passInVisualMap={passInVisualMap}
                getUIConvNav={getUIConvNav}

              />}

              <GameUI_2ButtonsPreview 
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  triggerNextPiece={triggerNextPiece}
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
                  passInAudioMap={passInAudioMap}
                  passInVisualMap={passInVisualMap}
              /> 

              <GameUI_3ConvNavPreview
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  triggerNextPiece={triggerNextPiece}
                  getScreenSize={getScreenSize}
                  getUIConvNav={getUIConvNav}
                  triggerAutoMode={triggerAutoMode}
                  isInGameView={true}
                  passInVisualMap={passInVisualMap}
                  triggerLogOpen={triggerLogOpen}
              />

</div>




                {isShowLogScreen && 
                        <Modal_ConvNode_Log
                            allPieceContent={initialAllPieceData} 
                            initialPieceNum={currentPieceNum} 
                            getCurrPieceNum={getCurrentPieceNum} 
                            logPageUISettings={enteredgetLogPageUISettings}
                            getLogPageUISettings={getLogPageUISettings}
                            triggerLogPageClose={triggerLogClose}
                            getAllPieceContent={getAllPieceContent}
                            isQuickView={false}
                            isSettingUI={false}
                            visualMap={visualMap}
                            getVisualMap={passInVisualMap}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                />}



            </div>
            1currentPieceNum={currentPieceNum} (TESTing)


            <br></br>
            {(bgmSource !== undefined) && 
                      // <audio src={bgmSource} controls loop={allPieceData[currentPieceNum]["bgm_loop"]}/> //TODO actual game-playing

                <audio src={bgmSource} autoPlay="autoPlay" controls loop={allPieceData[currentPieceNum]["bgm_loop"]}/> //TODO previewing/testing

            }



            <p className="plans">
            This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)

            <br></br> TODO: load game-data here, and pass to piece-setter
            <br></br> for "consequence" by some clickable, make sure it updates the game-data
            <br></br> conosider local-version keeping, and syncing to cloud

            <br></br> After fetching the data above, previewer should reflect the adjustment and present this piece (refresh with local data)
            <br></br> also, save and update to db if requested by user.

            </p>

            <p className="plans">
                * idea: provide "game-data-viewer" for authors:
                <br></br> at all points (pieces) of the game, the author can check game-data for that progress to keep track of everything in game
                <br></br> toggle in preview-related component
            </p>

               
        </div>
    
    );
}