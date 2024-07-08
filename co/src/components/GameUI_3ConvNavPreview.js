import { useState, useEffect } from 'react';

export default function GameUI_3ConvNavPreview({isSettingUpUI, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getScreenSize, triggerNextPiece, triggerAutoMode, getUIConvNav, isInGameView}) {


    const [uiConvNav, setUiConvNav] = useState(-1);

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const allPieceData = initialAllPieceData;

    const [autoOn, setAutoOn] = useState(false);

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        //TODO one-time:
        //TODO getScreenSize
        if (firstTimeEnter === true) {



            setFirstTimeEnter(false);    
          }



        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
        }

        let uiConvNavTemp = getUIConvNav();
        if (uiConvNavTemp !== undefined) {
            setUiConvNav(uiConvNavTemp);
            console.log("conv-nav now is : " , uiConvNavTemp); //TODO test
        }
      

        let screenSizePair = getScreenSize();
        if (screenSizePair[0] !== screenWidth || screenSizePair[1] !== screenHeight) {
            setScreenWidth(screenSizePair[0]);
            setScreenHeight(screenSizePair[1]);
        }
        

    });




return (<div style={{
                "position": "absolute",
            }}>



<div className="parallelFrame">
                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    style={{
                        "margin-right": "50px",
                        "color": uiConvNav["buttonAutoIsTextFont"] ? 
                            (autoOn ? 
                                uiConvNav["buttonAutoShade1"] 
                                :  uiConvNav["buttonAutoShade0"]) 
                            : "",
                        "background-image": !uiConvNav["buttonAutoIsTextFont"] ? "" : "",  
                        "font-family": `${uiConvNav["buttonAutoFontName"]}`,
                        
                    }}
                    onClick={()=>{
                        //switch auto-status
                        if (autoOn === false) { //current status(f), next status(t)
                            triggerAutoMode();
                        }
                        setAutoOn(!autoOn);
                    }}
                > 
                {!uiConvNav["buttonAutoFontItalic"] && <label>Auto</label>}
                {uiConvNav["buttonAutoFontItalic"] && <em>Auto</em>}


                </div>
                }


                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    style={{
                        "margin-right": "50px",
                        "color": uiConvNav["buttonLogIsTextFont"] ? uiConvNav["buttonLogShade0"] : "",
                        "background-image": !uiConvNav["buttonLogIsTextFont"] ? "" : "",  
                        "font-family": `${uiConvNav["buttonLogFontName"]}`,
                        "font-style:": "italic"
                    }}
                    onClick={()=>{
                        //trigger log-screen
                    }}
                >
                    {!uiConvNav["buttonLogFontItalic"] && <label>Log</label>}
                    {uiConvNav["buttonLogFontItalic"] && <em>Log</em>}

                </div>}
            </div>


</div>);
}