import * as React from 'react';
import { useState, useEffect } from 'react';

import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';


//TODO102 test for visualMap and audioMap

export default function PreviewWindow_convNodeGameContent({initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, 
    getTextFrameUISettings, getIsDisplayDefaultButton, 
    getDefaultButtonUISettings, getBackButtonUISettings, 
    getLogPageUISettings,
    getScreenSize, triggerToDirectNext, setIsClickedOnSetters, getUIConvNav,

    getVisualMap,
    getAudioMap,

    getUILanguage,

    username, projName,

    getDisplayNonPmTemp,
    getPmEditingPreviewPiece,

    getCharaPicPrvw
    
  
  }) {

    const [isNonPmTempPiece, setIsNonPmTempPiece] = useState(true);

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

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
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData === undefined ? [] : initialAllPieceData);
    
    const [bgmSource, setBgmSource] = useState("");
    const [bgpSource, setBgpSource] = useState("");

    const [charaPicCurr2, setCharaPicCurr2] = useState(-1);
    const [charaPicArr2, setCharaPicArr2] = useState((initialAllPieceData !== undefined && initialAllPieceData.length > 0) ? initialAllPieceData[0]["chp_map"] : []);
//TODO500 refactor structure


    const [audioMap, setAudioMap] = useState({}); //TODO for bgm on each nav-page -- future feature
    const [visualMap, setVisualMap] = useState({}); 

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
 
      if (firstTimeEnter === true) {

        setFirstTimeEnter(false);

console.log("preview-window game-content first-time entry, resource-list fetched."); //TODO test
      }

      let isDisplayNonPmTemp = getDisplayNonPmTemp();
      setIsNonPmTempPiece(isDisplayNonPmTemp);

      
      let uiLangTemp = getUILanguage();
      setLanguageCodeTextOption(uiLangTemp);
//TODO testing


      let allPieceContentTemp = getAllPieceContent();
      if (allPieceContentTemp !== undefined && allPieceContentTemp.length > 0) {

          
          let currPieceNumTemp = getCurrentPieceNum();

        console.log("*1 currPieceNumTemp = ", currPieceNumTemp);
          
          if (allPieceContentTemp !== allPieceData) {
            setAllPieceData(allPieceContentTemp);
          }

          if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
            setCurrentPieceNum(currPieceNumTemp);
            setCurrentPiece(allPieceContentTemp[currPieceNumTemp]);
          }

          if (allPieceContentTemp !== undefined && allPieceContentTemp[currPieceNumTemp]["clkb_arr"] !== undefined && (allPieceContentTemp[currPieceNumTemp]["clkb_arr"].length > 0 || 
            allPieceContentTemp[currPieceNumTemp]["stnd_btn_arr"].length > 0)) {
              setDirectNextPieceBool(false);
          } else {
              setDirectNextPieceBool(true);
          }
     
          let isForward = (currPieceNumTemp > currentPieceNum);
          updateCharPicArr(allPieceContentTemp, currPieceNumTemp, isForward);
          updateBgmSource(allPieceContentTemp, currPieceNumTemp, isForward);
          updateBgpSource(allPieceContentTemp, currPieceNumTemp, isForward);
      }
        
      let charaPicPreviewingTemp = getCharaPicPrvw();
      console.log("\tpreview-screen.. chara-pic-temp is : ", charaPicPreviewingTemp);
      setCharaPicCurr2(charaPicPreviewingTemp);

      if (charaPicPreviewingTemp !== -1) {
        console.log("visualMap[charaPicCurr2[",  charaPicPreviewingTemp["picVar"] ,  "] = ", visualMap[charaPicCurr2["picVar"]]);
      }


      //TODO testing

      let screenSizePair = getScreenSize();
      setScreenWidth(screenSizePair[0]);
      setScreenHeight(screenSizePair[1]);
      

      let visMap = getVisualMap();
      setVisualMap(visMap);
      let auMap = getAudioMap();
      setAudioMap(auMap);

      console.log("previewing22222: visual-map = ", visMap);


    }); // --- end of useEffect ---

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
        console.log("chara-pic-arr CHANGED!!!: ", allPieceContentTemp[currPieceNumTemp]["chp_map"]);  

        setCharaPicArr2(allPieceContentTemp[currPieceNumTemp]["chp_map"]);  
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
          return allPieceData[i]["chp_map"];  
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

    function triggerAutoMode() {
      console.log("triggerAutoMode() in game-preview-window");
      //TODO1
    }
 
    function triggerLogOpen() {
      setisShowLogScreen(true);
    }


    function triggerLogClose() {
      setisShowLogScreen(false);
    }  

    function notUsing() {
      console.log();
    }


    return (
    
        <div className="previewWindow"  
          onClick={()=>{
            setIsClickedOnSetters(false);
          }}
        >       
        {(allPieceData !== undefined && allPieceData.length > 0) && <>
            <div className="previewArea" 
              style={{
                  "position": "relative", 
                  "height": `${screenHeight}px`, 
                  "width": `${screenWidth}px`
              }}>



{isNonPmTempPiece === true && 
<div style={{
  "display": !isShowLogScreen ? "flex" : "none"
}}>

              {<div style={{
                "backgroundColor": "#000000",
                "backgroundImage": (currentPieceNum >= 0 && bgpSource !== "") ? 
                  `url(${bgpSource})` 
                    : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", 
                "top": "0px", 
                "left": "0px", 
                "height": `${screenHeight}px`, 
                "width": `${screenWidth}px`,
              }}
                
                >


                  <div> 
       
            {/* //TODO500 refactor */}


                    {charaPicArr2 !== undefined && 
                      Object.keys(charaPicArr2).map((index) => {
                      
                        let item = charaPicArr2[index];

                        let altStr = index+"already added character picture";
                        let keyStr = "charPic-" + index;
                        return (
                          <div key={keyStr}>
                            {(visualMap[item["picVar"]] !== undefined && visualMap[item["picVar"]] !== "") && 
                            <img style={{
                                "position": "absolute", 
                                "top": `${item["posY"]}px`, "left": `${item["posX"]}px`,
                                "width": `${item["width"] * item["scale"]}px`, "height": `${item["height"] * item["scale"]}px`,
                                }}
                              src={visualMap[item["picVar"]]}
                              alt={altStr}
              
                            />}
                          </div>
                        );

                      })

                    }


                         {/* //TODO500 refactor */}
                         {(charaPicCurr2 !== undefined 
                            && charaPicCurr2 !== -1 
                            && visualMap[charaPicCurr2["picVar"]] !== undefined
                            && Object.keys(charaPicCurr2).length > 0
                    ) 
                    
                    
                      && 
                          
                            <img style={{
                              "position": "absolute", 
                              "top": `${charaPicCurr2["posY"]}px`, "left": `${charaPicCurr2["posX"]}px`,
                              "width": `${charaPicCurr2["width"] * charaPicCurr2["scale"]}px`, "height": `${charaPicCurr2["height"] * charaPicCurr2["scale"]}px`,
                            }}
                              src={visualMap[charaPicCurr2["picVar"]]}
                              
                              alt="currently character-picture that's being added"
                            />
                    }
                  </div>

              </div>}
              
              {(allPieceData !== undefined && allPieceData.length > 0 && currentPieceNum >= 0 && allPieceData[currentPieceNum].displayTextFrame === true) && 
              <GameUI_1TextFramePreview
                isEditing={true}
                dataObj={currentPiece} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={passInAllPieceDataContent}
                getCurrentPieceNum={passInCurrentPieceNum}
                getIsDirectNextPiece={passInDirectNextPieceBool}
                triggerNextPiece={notUsing}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={true}
                triggerAutoMode={triggerAutoMode}
                getVisualMap={getVisualMap}
                getUIConvNav={getUIConvNav}

              />}

             




              <GameUI_2ButtonsPreview 
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  triggerNextPiece={notUsing}
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
                  getAudioMap={getAudioMap}
                  getVisualMap={getVisualMap}
              /> 

              <GameUI_3ConvNavPreview
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  triggerNextPiece={notUsing}
                  getScreenSize={getScreenSize}
                  getUIConvNav={getUIConvNav}
                  triggerAutoMode={triggerAutoMode}
                  isInGameView={true}
                  getVisualMap={getVisualMap}
                  triggerLogOpen={triggerLogOpen}
              />

</div>}




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
                            getVisualMap={getVisualMap}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                />}



</div>
   

            {/* <p className="plans">
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
            </p> */}
        </>}
               
        </div>
    
    );
}