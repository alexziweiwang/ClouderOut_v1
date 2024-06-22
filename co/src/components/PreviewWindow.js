import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUIOuterPreviewWindow from './GameUIOuterPreviewWindow';
import GameUIInnerPreview from './GameUIInnerPreview';
import GameUITextFramePreview from './GameUITextFramePreview';


export default function PreviewWindow({getCurrentPiece, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    // console.log("re-rendering @preview window"); //TODO test temp

    let name = "/previewwindow";

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");

    const [currentPiece, setCurrentPiece] = useState({}); //TODO2 refactor for larger scope
    const [currentPieceNum, setCurrentPieceNum] = useState(-1);
    
    const [bgmSource, setBgmSource] = useState("");

    let charaPicCurr = currentPiece["chp_curr"]; //only displays immediate adjustments
    let charaPicArr = currentPiece["chp_arr"];//only displays immediate adjustments

    useEffect(() => {
      // let objTemp = getCurrentPiece();
      // setCurrentPiece(objTemp); //only fetches the most-updated current piece


      let allPieceContentTemp = getAllPieceContent();
      let currPieceNumTemp = getCurrentPieceNum();
      if (currPieceNumTemp !== currentPieceNum) { //TODO2 only update when different pieceNum chosen
        setCurrentPieceNum(currPieceNumTemp);
        setCurrentPiece(allPieceContentTemp[currPieceNumTemp]);
      }




      updateBgmSource(); // special because of across-piece setting

      let screenSizePair = getScreenSize();
      setScreenWidth(screenSizePair[0]);
      setScreenHeight(screenSizePair[1]);

    });


    function updateBgmSource() {
      if (currentPiece["bgm_action"] === "startNewBgm") {
        setBgmSource(currentPiece["bgm_source_link"]);
      } else if (currentPiece["bgm_action"] === "stopBgm") {
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
 
    return (

    
        
        <div className="previewWindow">
                 1currentPieceNum={currentPieceNum}
       
            <div className="previewArea" 
              style={{"position": "relative", 
                      "height": `${screenHeight}px`, 
                      "width": `${screenWidth}px`
              }}>
            
              <div style={{
                "background-image": `url(${currentPiece["bgp_source_link"]})`,
                "background-size": `${screenWidth}px ${screenHeight}px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}>
                  
                  <div> 
                    
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
                    })}
                  </div>
                 
              </div>

              {currentPiece.displayTextFrame && 
              <GameUITextFramePreview
                dataObj={currentPiece} 
                getTextFrameUISettings={getTextFrameUISettings}
              />}

              <GameUIInnerPreview 
                  isSettingUpUI={false}
                  dataObj={currentPiece} 
                  style={{"position": "absolute", "top": "0px", "left": "0px"}} 
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
                  getScreenSize={getScreenSize}
              /> 


              

            </div>
            
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