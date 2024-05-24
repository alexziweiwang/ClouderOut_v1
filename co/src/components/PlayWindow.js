import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUIInnerPreview from './GameUIInnerPreview';
import GameUIInnerPlay from './GameUIInnerPreview';


export default function PlayWindow({getCurrentPieceIndex, allPieces, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize}) {
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
      if (bgpSource !== currentPiece["bgp_source_link"]) {
        setBgpSource(currentPiece["bgp_source_link"]);
      }
    }

    function updateBgmSource() {
      if (currentPiece["bgm_action"] === "startNewBgm") {
        setBgmSource(currentPiece["bgm_source_link"]);
      } else if (currentPiece["bgm_action"] === "stopBgm") {
        setBgmSource("");
      }
    }

    function changeGameScreenSizeSetting(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
          if (input === "h450_800") {
            console.log("h450_800");
            setGameScreenSize("h450_800");
          } else if (input === "v800_450") {
            console.log("v800_450");
            setGameScreenSize("v800_450");
          } else if (input === "h600_800") {
            console.log("h600_800");
            setGameScreenSize("h600_800");
          } else if (input === "v800_600") {
            console.log("v800_600");
            setGameScreenSize("v800_600");
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
                "background-image": `url(${bgpSource})`,
                "background-size": `800px 600px`,
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
                    !!bgp_source_link: {bgpSource}

                    <br></br>
                    voiceline: {currentPiece[["vl_source_varname"]]}...
                  </div>
             
              </div>

              <GameUIInnerPreview 
                  isSettingUpUI={false}
                  dataObj={currentPiece} 
                  style={{"position": "absolute", "top": "0px", "left": "0px"}} 
                  getTextFrameUISettings={getTextFrameUISettings} 
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
              /> 

              <GameUIInnerPlay
              
              />


              

            </div>
                  {(bgmSource !== undefined) && 
                      <audio src={bgmSource} controls/> // actual game-playing
                  }
         
        </div>
    );
}