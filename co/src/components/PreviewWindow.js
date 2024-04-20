import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './webpage.css';
import GameUIPreviewOuterFrame from './GameUIPreviewOuterFrame';
import GameUIPureInner from './GameUIPureInner';


export default function PreviewWindow({getCurrentPiece, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings}) {

    console.log("re-rendering @preview window");

    let name = "/previewwindow";

    const [gameScreenSize, setGameScreenSize] = useState("");

    const [currentPiece, setCurrentPiece] = useState({});
    
    let charaPicCurr = currentPiece["chp_curr"];
    let charaPicArr = currentPiece["chp_arr"];

    useEffect(() => {
      let objTemp = getCurrentPiece();
      setCurrentPiece(objTemp);

    });



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

    function triggerContinue(action, valueObj) {
      //when players click on everywhere except for game-content-button or menu-button
        //action is "direct next-piece"?
      
      //when players click on game-content-button or menu-button (trigger a change of game-data, etc.)
        //action is "changed game-data and see"?

    }



 
    return (
        <div className="previewWindow">
       
            <div className="preveiewArea" style={{"position": "relative"}}>
            
              <div style={{
                "background-image": `url(${currentPiece["bgp_source_link"]})`,
                "background-size": `800px 600px`,
                "position": "absolute", "top": "0px", "left": "0px", "height": "600px", "width": "800px"}}>
                  
                  <div> data-previewing area:
                    
                
            
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
                    !!bgp_source_link: {currentPiece["bgp_source_link"]}

                    <br></br>
                    voiceline: {currentPiece[["vl_source_varname"]]}...
                  </div>
             
              </div>

              <GameUIPureInner 
                  dataObj={currentPiece} 
                  style={{"position": "absolute", "top": "0px", "left": "0px"}} 
                  getTextFrameUISettings={getTextFrameUISettings} 
                  getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                  getDefaultButtonUISettings={getDefaultButtonUISettings} 
                  getBackButtonUISettings={getBackButtonUISettings}
              /> 


              

            </div>

                    {/* {currentPiece["bgm_source_link"] !== undefined &&  */}
                    <audio src={currentPiece["bgm_source_link"]} autoplay controls/>
                    bgm = {currentPiece["bgm_source_link"]}
                    bgm_var = {currentPiece["bgm_source_varname"]}
                    {/* } */}


            <div>
                    <select value={gameScreenSize} onChange={changeGameScreenSizeSetting}>
                        <option value="" key=""> ----- Select Size and Direction ----- </option>
                        <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                        <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
                        <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                        <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>

                    </select>
                    <button onClick={()=>{updateGameSizeSetting();}}>Update</button>
                </div>


                      
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