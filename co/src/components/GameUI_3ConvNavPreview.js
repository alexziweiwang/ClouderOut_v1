import { useState, useEffect } from 'react';

export default function GameUI_3ConvNavPreview({isSettingUpUI, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getScreenSize, triggerNextPiece, 
    triggerAutoMode, getUIConvNav, isInGameView,
    passInAudioList, getVisualMap,
    triggerLogOpen
}) {


    const [uiConvNav, setUiConvNav] = useState(-1);

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const allPieceData = initialAllPieceData;

    const [autoOn, setAutoOn] = useState(false);

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    //TODO fetch resource-list and generate resource-map here, for dynamic pic-var-matching
    const [visualMap, setVisualMap] = useState([]); 

    const [auto0ButtonPicUrl, setAuto0ButtonPicUrl] = useState("");
    const [auto1ButtonPicUrl, setAuto1ButtonPicUrl] = useState("");
    const [logButtonPicUrl, setLogButtonPicUrl] = useState("");

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
            if (uiConvNavTemp !== uiConvNav) {
                setUiConvNav(uiConvNavTemp);
                setAuto0ButtonPicUrl(visualMap[uiConvNavTemp["buttonAutoPicName0"]]);
                setAuto1ButtonPicUrl(visualMap[uiConvNavTemp["buttonAutoPicName1"]]);
                setLogButtonPicUrl(visualMap[uiConvNavTemp["buttonLogPicName"]])
            }

        }
      

        let screenSizePair = getScreenSize();
        if (screenSizePair[0] !== screenWidth || screenSizePair[1] !== screenHeight) {
            setScreenWidth(screenSizePair[0]);
            setScreenHeight(screenSizePair[1]);
        }

        let visualMapTemp = getVisualMap();
        setVisualMap(visualMapTemp);

    });

return (<div style={{
                "position": "absolute",
            }}>


<div className="parallelFrame"
    style={{
        "top": `${uiConvNav["groupY"]}px`,
        "left": `${uiConvNav["groupX"]}px`,
        "width": `${uiConvNav["groupWidth"] * 2 + 20}px`,
        "height": `${uiConvNav["groupHeight"]}px`,
        "position": "absolute",
    }}
>
                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    id="preview-UI-3-autoOn"
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonAutoShade0"],
                        "backgroundImage": `url('${auto0ButtonPicUrl}')`,  
                        "fontFamily": `${uiConvNav["buttonAutoFontName"]}`,
                        "width": `${uiConvNav["groupWidth"]}px`,
                        "height": `${uiConvNav["groupHeight"]}px`,
                        "borderRadius": `${uiConvNav["cornerRadius"]}px`,

                        "userSelect": "none",

                        "display": autoOn === true ? "none" : "flex",
                        "justifyContent": "center",
                        "alignItems": "center",

                    }}
                    onClick={()=>{
                        //switch auto-status
            
                        triggerAutoMode();
                        
                        setAutoOn(true);
                    }}


                    onMouseDown={
                        ()=>{
                            document.getElementById("preview-UI-3-autoOn").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("preview-UI-3-autoOn").style.filter = "brightness(100%)";
                        }
                    }
                > 
                  
                            {!uiConvNav["buttonAutoFontItalic"] && 
            
                            <label>
                                {uiConvNav["buttonAutoDisplayText0"]}
                            </label>
                            }

                            {uiConvNav["buttonAutoFontItalic"] && 
                        
                                <em>{uiConvNav["buttonAutoDisplayText0"]}</em>
                            }

                   
            
                </div>
                }


                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    id="preview-UI-3-autoOff"
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonAutoShade1"],   
                        "backgroundImage": `url('${auto1ButtonPicUrl}')`,  
                        "fontFamily": `${uiConvNav["buttonAutoFontName"]}`,
                        "width": `${uiConvNav["groupWidth"]}px`,
                        "height": `${uiConvNav["groupHeight"]}px`,
                        "borderRadius": `${uiConvNav["cornerRadius"]}px`,


                        "userSelect": "none",
                        "display": autoOn === true ? "flex" : "none",
                        "justifyContent": "center",
                        "alignItems": "center",
                    }}
                    onClick={()=>{
                        //switch auto-status
                        //TODO stop auto-mode
                        setAutoOn(false);
                    }}


                    onMouseDown={
                        ()=>{
                            document.getElementById("preview-UI-3-autoOff").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("preview-UI-3-autoOff").style.filter = "brightness(100%)";
                        }
                    }
                > 
                   
                            {!uiConvNav["buttonAutoFontItalic"] && 
                                <label>
                                    {uiConvNav["buttonAutoDisplayText1"]}
                                </label>}

                            {uiConvNav["buttonAutoFontItalic"] && 
                    
                                <em>{uiConvNav["buttonAutoDisplayText1"]}</em>
                            }
                   
                </div>
                }










                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    id="preview-UI-3-log"
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonLogShade"],
                        "backgroundImage": `url('${logButtonPicUrl}')`,

                        "fontFamily": `${uiConvNav["buttonLogFontName"]}`,
                        "fontStyle:": "italic",

                        "width": `${uiConvNav["groupWidth"]}px`,
                        "height": `${uiConvNav["groupHeight"]}px`,
                        "borderRadius": `${uiConvNav["cornerRadius"]}px`,

                        "userSelect": "none",
                        "display": "flex",
                        "justifyContent": "center",
                        "alignItems": "center",
                    }}
                    onClick={()=>{
                        //trigger log-screen
                        triggerLogOpen();




                    }}
                       // document.getElementById(currId).style.filter = "brightness(150%)";

                    onMouseDown={
                        ()=>{
                            document.getElementById("preview-UI-3-log").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("preview-UI-3-log").style.filter = "brightness(100%)";
                        }
                    }
                    
                    >


                   
                        {!uiConvNav["buttonLogFontItalic"] && <label>
                                {uiConvNav["buttonLogDisplayText"]}
                            </label>}
                    
                        {uiConvNav["buttonLogFontItalic"] && <em>{uiConvNav["buttonLogDisplayText"]}</em>}
                 
                </div>}


            </div>


</div>);
}