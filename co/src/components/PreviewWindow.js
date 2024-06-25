import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUIOuterPreviewWindow from './GameUIOuterPreviewWindow';
import GameUIInnerPreview from './GameUIInnerPreview';
import GameUITextFramePreview from './GameUITextFramePreview';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function PreviewWindow({getCurrentPiece, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize}) {
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing
  
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    // console.log("re-rendering @preview window"); //TODO test temp

    let name = "/previewwindow";

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");

    const [currentPiece, setCurrentPiece] = useState({}); //TODO2 refactor for larger scope

    const [currentPieceNum, setCurrentPieceNum] = useState(-1);
    const [allPieceData, setAllPieceData] = useState();

    const [bgmSource, setBgmSource] = useState("");

    const [charaPicCurr2, setCharaPicCurr2] = useState([]);
    const [charaPicArr2, setCharaPicArr2] = useState([]);

    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    async function fetchProjResourceLists() {
      console.log("nav-preview: fetchProjResourceLists()"); //TODO test
      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
      console.log("new render- nav preview: obj from cloud (resource list):"); //TODO test
      console.log(obj); //TODO test
      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }

    const [audioMap, setAudioMap] = useState({}); //TODO for bgm on each nav-page -- future feature
    const [visualMap, setVisualMap] = useState({}); 
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);

    useEffect(() => {

      let allPieceContentTemp = getAllPieceContent();
      if (allPieceContentTemp !== allPieceData) {
        setAllPieceData(allPieceContentTemp);
      }
      
      let currPieceNumTemp = getCurrentPieceNum();
      if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
        setCurrentPieceNum(currPieceNumTemp);
        setCurrentPiece(allPieceContentTemp[currPieceNumTemp]);
      }

      setCharaPicCurr2(allPieceContentTemp[currPieceNumTemp]["chp_curr"]);
      setCharaPicArr2(allPieceContentTemp[currPieceNumTemp]["chp_arr"]);


      updateBgmSource(); // special because of across-piece setting

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


    function updateBgmSource() {
      if (currentPieceNum < 0) {
        return;
      }
      if (allPieceData[currentPieceNum]["bgm_action"] === "startNewBgm") {
        setBgmSource(allPieceData[currentPieceNum]["bgm_source_link"]);
      } else if (allPieceData[currentPieceNum]["bgm_action"] === "stopBgm") {
        setBgmSource("");
      }
    }

    function changeselectedGameScreenSizeSetting(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
          if (input === "h450_800") {
            console.log("h450_800");
            setSelectedGameScreenSize("h450_800");
          } else if (input === "v800_450") {
            console.log("v800_450");
            setSelectedGameScreenSize("v800_450");
          } else if (input === "h600_800") {
            console.log("h600_800");
            setSelectedGameScreenSize("h600_800");
          } else if (input === "v800_600") {
            console.log("v800_600");
            setSelectedGameScreenSize("v800_600");
          } else {
            console.log("not selected!");
          }
        }
    }

    function updateGameSizeSetting() {
        console.log("new game size setting:", selectedGameScreenSize);
        //TODO design: each node and have one size, and different nodes can have various sizes?
        let respondGiven = window.confirm("Please note that changing game-size would impact current visual elements on each piece and would require adjustments. Click [ok] to continue size-changing, or [cancel].");
          if (respondGiven) {
            if (selectedGameScreenSize === "h450_800") {
              setScreenWidth(800);
              setScreenHeight(450);
          } else if (selectedGameScreenSize === "v800_450") {
              setScreenWidth(450);
              setScreenHeight(800);
          } else if (selectedGameScreenSize === "h600_800") {
              setScreenWidth(800);
              setScreenHeight(600);
          } else if (selectedGameScreenSize === "v800_600") {
              setScreenWidth(600);
              setScreenHeight(800);
          }
          alert("Game node size changed!");
        } 
    } 

    function passInAllPieceDataContent() {
      return allPieceData;
    }

    function passInCurrentPieceNum() {
      return currentPieceNum;
    }
 
    return (

    
        
        <div className="previewWindow">       
            <div className="previewArea" 
              style={{"position": "relative", 
                      "height": `${screenHeight}px`, 
                      "width": `${screenWidth}px`
              }}>

              <div style={{
                "background-color": "#000000",
                "background-image": currentPieceNum >= 0 ? 
                  `url(${visualMap[allPieceData[currentPieceNum]["bgp_source_varname"]]})` 
                    : "",
                "background-size": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}>
                  
                  <div> 
                    
                    {(charaPicCurr2 !== undefined && charaPicCurr2 !== [] && charaPicCurr2[5] !== "default-none" && charaPicCurr2[5] !== "") && 
                          
                            <img style={{
                              "position": "absolute", 
                              "top": `${charaPicCurr2[2]}px`, "left": `${charaPicCurr2[1]}px`,
                              "width": `${charaPicCurr2[3]}px`, "height": `${charaPicCurr2[4]}px`,
                            }}
                              src={charaPicCurr2[5]} 
                              alt="currently character-picture that's being added" 
                            />
                    }

                    {charaPicArr2 !== undefined && charaPicArr2.map((item, index) => {
                      let altStr = index+"already added character picture";
                      return (
                        <>
                          <img style={{
                              "position": "absolute", 
                              "top": `${item[2]}px`, "left": `${item[1]}px`,
                              "width": `${item[3]}px`, "height": `${item[4]}px`,
                              }}
                            src={item[5]} 
                            alt={altStr}
                          />
                        </>
                      );
                    })}
                  </div>
                 
              </div>
              
              {(currentPieceNum >= 0 && allPieceData[currentPieceNum].displayTextFrame === true) && 
              <GameUITextFramePreview
                dataObj={currentPiece} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={passInAllPieceDataContent}
                getCurrentPieceNum={passInCurrentPieceNum}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={true}
              />}

              <GameUIInnerPreview 
                  isSettingUpUI={false}
                  dataObj={currentPiece} 
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
              /> 


              

            </div>
            1currentPieceNum={currentPieceNum} (TESTing)

            <br></br>
            {(bgmSource !== undefined) && 
                      <audio src={bgmSource} controls/> //TODO actual game-playing
                      // <audio src={bgmSource} autoplay="autoplay" controls/> //TODO previewing/testing

            }



            <p className="plans">
                needed data: game size and direction info setting from the user/author
                <br></br> reads all data for current piece and present here
            </p>


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

            <p className="plans">
                TODO: fetch the current game-size for this node
            </p>

            <p className="plans">
                    Below is ... Adjustment area: setting of size & direction for current *node*
                    <br></br>should trigger warning if changing, and asking the user to re-organize things after a size/direciton change...
                    <br></br>but this feature is provided so user can utilize the existing node-content
                    </p>
            <p className="plans">
                    [bg-pic] char-pics, clickable
                    <br></br> to-next-piece clicking area: everywhere(including text-frame) excepts(underneath) buttons & menu-button
                    <br></br>
            </p>

            <p>
            TODO: textframe and standard-button-group can be 0 or 1 -- need to fetch current-piece data to decide 
            <br></br>TODO: textframe should be clickable for next-piece (default) as the game-content


            </p>
               
        </div>
    
    );
}