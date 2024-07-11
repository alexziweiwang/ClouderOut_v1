import { useState, useEffect } from 'react';

export default function GameUI_3ConvNavPreview({isSettingUpUI, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getScreenSize, triggerNextPiece, 
    triggerAutoMode, getUIConvNav, isInGameView,
    passInAudioList, passInVisualMap
}) {


    const [uiConvNav, setUiConvNav] = useState(-1);

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const allPieceData = initialAllPieceData;

    const [autoOn, setAutoOn] = useState(false);

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    //TODO fetch resource-list and generate resource-map here, for dynamic pic-var-matching
    const [visualMap, setVisualMap] = useState([]); 


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
        }
      

        let screenSizePair = getScreenSize();
        if (screenSizePair[0] !== screenWidth || screenSizePair[1] !== screenHeight) {
            setScreenWidth(screenSizePair[0]);
            setScreenHeight(screenSizePair[1]);
        }

        let visualMapTemp = passInVisualMap();
        setVisualMap(visualMapTemp);

    });

return (<div style={{
                "position": "absolute",
            }}>


<div className="parallelFrame"
    style={{
        "top": `${uiConvNav["groupY"]}px`,
        "left": `${uiConvNav["groupX"]}px`,
        "width": `${uiConvNav["groupWidth"]}px`,
        "height": `${uiConvNav["groupHeight"]}px`,
        "position": "absolute",
    }}
>
                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonAutoShade0"],
                        "backgroundImage": `url('${visualMap[uiConvNav["buttonAutoPicName1"]]}')`,  
                        "fontFamily": `${uiConvNav["buttonAutoFontName"]}`,
                        "width": `${uiConvNav["groupWidth"] / 2}px`,
                        "height": `${uiConvNav["groupHeight"]}px`,

                        "userSelect": "none",

                        "display": autoOn === true ? "none" : "content",
                        
                    }}
                    onClick={()=>{
                        //switch auto-status
            
                        triggerAutoMode();
                        
                        setAutoOn(!autoOn);
                    }}
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
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonAutoShade1"],   
                        "backgroundImage": `url('${visualMap[uiConvNav["buttonAutoPicName1"]]}')`,  
                        "fontFamily": `${uiConvNav["buttonAutoFontName"]}`,
                        "width": `${uiConvNav["groupWidth"] / 2}px`,
                        "height": `${uiConvNav["groupHeight"]}px`,


                        "userSelect": "none",
                        "display": autoOn === false ? "none" : "content",

                    }}
                    onClick={()=>{
                        //switch auto-status
                        //TODO stop auto-mode
                        setAutoOn(!autoOn);
                    }}
                > 
                {!uiConvNav["buttonAutoFontItalic"] && 
                    <label>
                        {uiConvNav["buttonAutoDisplayText1"]}
                    </label>}

                {uiConvNav["buttonAutoFontItalic"] && 
                <>
                    {autoOn === true && <em>{uiConvNav["buttonAutoDisplayText1"]}</em>}
                </>}

                </div>
                }











                {(uiConvNav !== -1 && uiConvNav !== undefined) && <div
                    style={{
                        "marginRight": "50px",
                        "color": uiConvNav["buttonLogShade"],
                        "backgroundImage": `url('${visualMap[uiConvNav["buttonLogPicName"]]}')`,

                        "fontFamily": `${uiConvNav["buttonLogFontName"]}`,
                        "fontStyle:": "italic",

                        "width": "30px",
                        "height": `${uiConvNav["groupHeight"]}px`,

                        "userSelect": "none",

                    }}
                    onClick={()=>{
                        //trigger log-screen
                    }}
                >
                    {!uiConvNav["buttonLogFontItalic"] && <label>
                            {uiConvNav["buttonLogDisplayText"]}
                        </label>}
                   
                   {uiConvNav["buttonLogFontItalic"] && <em>{uiConvNav["buttonLogDisplayText"]}</em>}

                </div>}

            </div>


</div>);
}