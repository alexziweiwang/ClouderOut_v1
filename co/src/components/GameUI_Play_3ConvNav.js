import { useState, useEffect } from 'react';

export default function GameUI_Play_3ConvNav({
    getCurrentPieceNum, triggerAutoMode, triggerLogPageOpen,
    screenWidth, screenHeight, uiConvNav, visualMap, audioMap,
    openSettingPageFunc
}) {



    const [currentPieceNum, setCurrentPieceNum] = useState(0);

    const [autoOn, setAutoOn] = useState(false);


    //TODO fetch resource-list and generate resource-map here, for dynamic pic-var-matching
    // const [visualMap, setVisualMap] = useState([]);  //TODO testing
    // const [auto0ButtonPicUrl, setAuto0ButtonPicUrl] = useState(""); //TODO testing
    // const [auto1ButtonPicUrl, setAuto1ButtonPicUrl] = useState(""); //TODO testing
    // const [logButtonPicUrl, setLogButtonPicUrl] = useState(""); //TODO testing

    const auto0ButtonPicUrl = visualMap[uiConvNav["buttonAutoPicName0"]];
    const auto1ButtonPicUrl = visualMap[uiConvNav["buttonAutoPicName1"]];
    const logButtonPicUrl = visualMap[uiConvNav["buttonLogPicName"]];

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


        // setAuto0ButtonPicUrl(visualMap[uiConvNav["buttonAutoPicName0"]]); //TODO testing
        // setAuto1ButtonPicUrl(visualMap[uiConvNav["buttonAutoPicName1"]]);
        // setLogButtonPicUrl(visualMap[uiConvNav["buttonLogPicName"]])         
        // let visualMapTemp = getVisualMap();
        // setVisualMap(visualMapTemp);

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
                    id="play-UI-3-autoOn"
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
                        //TODO switch auto-status
            
                        triggerAutoMode(true);
                        setAutoOn(true);
                    }}


                    onMouseDown={
                        ()=>{
                            document.getElementById("play-UI-3-autoOn").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("play-UI-3-autoOn").style.filter = "brightness(100%)";
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
                    id="play-UI-3-autoOff"
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
                        triggerAutoMode(false);
                        setAutoOn(false);
                    }}
                    onMouseDown={
                        ()=>{
                            document.getElementById("play-UI-3-autoOff").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("play-UI-3-autoOff").style.filter = "brightness(100%)";
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
                    id="play-UI-3-log"
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
                        triggerLogPageOpen();
                    }}

                    onMouseDown={
                        ()=>{
                            document.getElementById("play-UI-3-log").style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("play-UI-3-log").style.filter = "brightness(100%)";
                        }
                    }
                >
                   
                        {!uiConvNav["buttonLogFontItalic"] && <label>
                                {uiConvNav["buttonLogDisplayText"]}
                            </label>}
                    
                        {uiConvNav["buttonLogFontItalic"] && <em>{uiConvNav["buttonLogDisplayText"]}</em>}
                 
                </div>}

{/* //TODO300 add "settings" button, with openSettingPageFunc */}
            </div>


</div>);
}