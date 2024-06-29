import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUIOuterPreviewWindow from './GameUIOuterPreviewWindow';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function PreviewWindow({getCurrentPiece, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize, triggerToDirectNext}) {
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing
  
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);
    const [directNextPieceBool, setDirectNextPieceBool] = useState(true);

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
      console.log("piece-preview: fetchProjResourceLists()"); //TODO test
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
      updateCharPicArr(allPieceContentTemp, currPieceNumTemp);
      updateBgmSource();
      updateBgpSource();
      

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

    function updateCharPicArr(allPieceContentTemp, currPieceNumTemp) {
      if (currPieceNumTemp < 0) {
        return;
      }
      
      //TODO1
      if (allPieceContentTemp[currPieceNumTemp]["chp_action"] === "changeCharPicArr") { 
        console.log("chara-pic-arr CHANGED!!!");  

        setCharaPicArr2(allPieceContentTemp[currPieceNumTemp]["chp_arr"]);  
    
      }

    }

    function updateBgmSource() {
      if (currentPieceNum < 0) {
        return;
      }
      if (allPieceData[currentPieceNum]["bgm_action"] === "startNewBgm") {
        if (allPieceData[currentPieceNum]["bgm_source_varname"] !== "") {
          setBgmSource(audioMap[allPieceData[currentPieceNum]["bgm_source_varname"]]);
        }
      } else if (allPieceData[currentPieceNum]["bgm_action"] === "stopBgm") {
        setBgmSource("");
      }
    }

    function updateBgpSource() {
      if (currentPieceNum < 0) {
        return;
      }
      if (allPieceData[currentPieceNum]["bgp_action"] === "switchToNewBgp" && allPieceData[currentPieceNum]["bgp_source_varname"] !== "") {
        setBgpSource(visualMap[allPieceData[currentPieceNum]["bgp_source_varname"]]); //TODO1
      }
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

    function triggerNextPieceFunc() {
      //make piece to be the next one
      triggerToDirectNext();
    }
 
    return (

    
        
        <div className="previewWindow">       

            <div className="previewArea" 
              style={{"position": "relative", 
                      "height": `${screenHeight}px`, 
                      "width": `${screenWidth}px`
              }}>




              {<div style={{
                "background-color": "#000000",
                "background-image": (currentPieceNum >= 0 && bgpSource !== "") ? 
                  `url(${bgpSource})` 
                    : "",
                "background-size": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}
                
                  onClick={()=>{
                    if (directNextPieceBool === true) {
                      triggerNextPieceFunc();
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
              
              {(currentPieceNum >= 0 && allPieceData[currentPieceNum].displayTextFrame === true) && 
              <GameUI_1TextFramePreview
                dataObj={currentPiece} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={passInAllPieceDataContent}
                getCurrentPieceNum={passInCurrentPieceNum}
                getIsDirectNextPiece={passInDirectNextPieceBool}
                triggerNextPiece={triggerNextPieceFunc}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={true}
              />}

              <GameUI_2ButtonsPreview 
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  triggerNextPiece={triggerNextPieceFunc}
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
              /> 


              

            </div>
            1currentPieceNum={currentPieceNum} (TESTing)


            <br></br>
            {(bgmSource !== undefined) && 
                      // <audio src={bgmSource} controls/> //TODO actual game-playing
                  <audio src={bgmSource} autoplay="autoplay" controls/> //TODO previewing/testing

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