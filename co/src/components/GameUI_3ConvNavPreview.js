import { useState, useEffect } from 'react';

export default function GameUI_3ConvNavPreview({isSettingUpUI, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getScreenSize, triggerNextPiece, triggerAutoMode, getUIConvNav, isInGameView}) {


    const [uiConvNav, setUiConvNav] = useState({});
    //getUIConvNav

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const allPieceData = initialAllPieceData;

    const [autoOn, setAutoOn] = useState(false);


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

    });




return (<div style={{
                "position": "absolute",
            }}>



<div className="parallelFrame">
                <div
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

                <div
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

                </div>
            </div>


</div>);
}