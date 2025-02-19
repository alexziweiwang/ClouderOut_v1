import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI2ButtonsPlay from './GameUI_2ButtonsPreview';


export default function PlayWindow({getCurrentPieceIndex, allPieces, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings}) {
//TODO important: keeps a node's game-content
//TODO important: interact with play-tracker
//TODO important: refactor to stable-UI-setting input

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    console.log("re-rendering @play window");

    let name = "/playwindow";

    const [gameScreenSize, setGameScreenSize] = useState("");

    const [currentPiece, setCurrentPiece] = useState({});
    const [currentPieceIndex, setCurrentPieceIndex] = useState(0);

    const [bgpSource, setBgpSource] = useState("");    
    const [bgmSource, setBgmSource] = useState("");

    const [charaPicCurr, setCharacPicCurr] = useState([]);
    const [charaPicArr, setCharaPicArr] = useState([]);

    // let charaPicCurr = currentPiece["chp_curr"];
    // let charaPicArr = currentPiece["chp_arr"];

    useEffect(() => {
      // let objTemp = getCurrentPiece();
      // setCurrentPiece(objTemp);


      let indexTemp = getCurrentPieceIndex();
      if (indexTemp !== currentPieceIndex) { // need to update current-piece
        setCurrentPieceIndex(indexTemp);
        let len = currentPiece.length;
        if (len === 0) {
          setCharacPicCurr(currentPiece["chp_curr"]);
          setCharaPicArr(currentPiece["chp_arr"]);
        }
        
        let tempAllPieces = getAllPieces();
        setCurrentPiece(tempAllPieces[indexTemp]);
        

        //TODO strategy: only update when change happens ...

      }

      updateBgpSource();
      updateBgmSource();




    });

    function updateBgpSource() {

      console.log("PlayWindow - updateBgpSource() _NONE_ TODO: fetch from resource-lists");
    }

    function updateBgmSource() {
      if (currentPiece["bgm_action"] === "startNewBgm") {
        // setBgmSource(currentPiece["bgm _ source _ link"]); //TODO refactor later
      } else if (currentPiece["bgm_action"] === "stopBgm") {
        setBgmSource("");
      }
    }

    function changeGameScreenSizeSetting(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
  
          if (input === "16:9(horizonal)"
                || input === "16:9(vertical)"
                || input === "4:3(horizonal)"
                ||input === "4:3(vertical)") {
              setSelectedGameScreenSize(input);
          } else {
              console.log("not selected!");
          }
        }
    }

    function updateGameSizeSetting() {
        console.log("new game size setting:", gameScreenSize);
        //TODO pop some kind of warning to remind the user
        //TODO design: each node and have one size, and different nodes can have various sizes?

    } 

    function triggerContinue(action, valueObj) { //TODO important for play-window
      //when players click on everywhere except for game-content-button or menu-button
        //action is "direct next-piece"?
      
      //when players click on game-content-button or menu-button (trigger a change of game-data, etc.)
        //action is "changed game-data and see"?

    }



 
    return (
        <div className="playWindow">
       currentPieceIndex: {currentPieceIndex}
            <div className="previewArea" style={{"position": "relative", "height": `${screenHeight}px`,"width": `${screenWidth}px`}}>
            
              <div style={{
                "backgroundImage": `url(${bgpSource})`,
                "backgroundSize": `800px 600px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": "600px", "width": "800px"}}>
                  
                  <div> data:
                    {(charaPicCurr !== undefined && charaPicCurr !== [] && charaPicCurr[5] !== "default-none" && charaPicCurr[5] !== "") && 
                          
                            <img style={{
                              "position": "absolute", 
                              "top": `${charaPicCurr[2]}px`, "left": `${charaPicCurr[1]}px`,
                              "width": `${charaPicCurr[3]}px`, "height": `${charaPicCurr[4]}px`,
                            }}
                              src={charaPicCurr[5]} 
                              alt="currently being added character picture" 
                            />
                    }

                    {charaPicArr !== undefined && charaPicArr.map((item, index) => {
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
                    })}<br></br>
                    !!(former)bgp _ source _ link: {bgpSource}

                    <br></br>
                    voiceline: {currentPiece[["vl_source_varname"]]}...
                  </div>
             
              </div>

              <GameUI_2ButtonsPreview 
                  isSettingUpUI={false}
                  initialAllPieceData={initialAllPieceData}
                  getAllPieceContent={passInAllPieceDataContent}
                  getCurrentPieceNum={passInCurrentPieceNum}
                  getTextFrameUISettings={getTextFrameUISettings} 
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
              /> 
{/* 
              <GameUI2ButtonsPlay
              
              /> */}


              

            </div>
                  {(bgmSource !== undefined) && 
                      <audio 
                      src={bgmSource} 
                      controls
                    /> // actual game-playing
                  }
         
        </div>
    );
}