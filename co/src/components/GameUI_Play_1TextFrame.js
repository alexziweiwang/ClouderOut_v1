import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import ConvTextContent_quickGameView from './ConvTextContent_quickGameView';

export default function GameUI_Play_1TextFrame({allPieceContent, getCurrentPieceNum, 
    txtFrameUISettings, getIsDirectNextPiece, triggerNextPieceFunc, speedLevel,
    notifyFinished, notifyNotYet, getInImmedaiteFinishSignal,
    visualMap, getAutoModeStatus
}) {
//TODO: playView setup:

//settled data:
// allPieceContent, txtFrameUISettings

//dynamic data:
//currPieceNum, isDirectNextPiece??
 
 //function to caller:
 //triggerNextPieceFunc, triggerAutoModeFunc
 
 
    const typingSpeedBase = 100;

    const [currPieceNum, setcurrPieceNum] = useState(0);
    const [isDirectNext, setIsDirectNext] = useState(true);

    const bgpUrl = visualMap[txtFrameUISettings["picVar"]]


    const typingSpeedValue = typingSpeedBase - ((speedLevel-1) * 30);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        console.log("### game-ui-play-1_textframe...   speed = ", speedLevel);

        if (firstTimeEnter === true) {
    
            setFirstTimeEnter(false);
        }
        

        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currPieceNum) { //only update when different pieceNum chosen
          setcurrPieceNum(currPieceNumTemp);
        }

        let tempDirectNext = getIsDirectNextPiece();
        setIsDirectNext(tempDirectNext);

    });

    return (<div 
        style={txtFrameUISettings["isShape"] === true ? {
                "background": txtFrameUISettings["bgColor"],

                "width": `${txtFrameUISettings["width"]}px`,
                "height": `${txtFrameUISettings["height"]}px`,
                "position": "absolute",
                "top": `${txtFrameUISettings["positionY"]}px`,
                "left": `${txtFrameUISettings["positionX"]}px`,  
                "color": txtFrameUISettings["textColor"],
                "borderRadius": `${txtFrameUISettings["cornerRadius"]}px`,
                "opacity": txtFrameUISettings["transparency"],
                "fontSize": `${txtFrameUISettings["textSize"]}px`,    
                "userSelect": "none",

            } : {
                "backgroundImage": bgpUrl === "" ? "" : `url('${bgpUrl}')`,       //TODO improve later
                "backgroundSize": `${txtFrameUISettings["width"]}px ${txtFrameUISettings["height"]}px`,
                
                "width": `${txtFrameUISettings["width"]}px`,
                "height": `${txtFrameUISettings["height"]}px`,
                "position": "absolute",
                "top": `${txtFrameUISettings["positionY"]}px`,
                "left": `${txtFrameUISettings["positionX"]}px`,
                "color": txtFrameUISettings["textColor"],
                "borderRadius": `${txtFrameUISettings["cornerRadius"]}px`,
                "opacity": txtFrameUISettings["transparency"],
                "fontSize": `${txtFrameUISettings["textSize"]}px`, 
                "userSelect": "none", 

            }}
        >
        
        <div style={{
            "position": "relative",
            "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
            "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
            "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
            "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
            "fontFamily": `${txtFrameUISettings["fontName"]}`,
            "border": "none",
            "borderRadius": "0px"
        }}>


    {currPieceNum >= 0 && 
            <div>
                {/* speaker name */}
                {allPieceContent[currPieceNum].speaker_name !== "" && 
                    <div>
                        {allPieceContent[currPieceNum].speaker_name}<br></br>
                    </div>
                }
                

                {/* text area */}
                <div 
                    className="wrappingFrame"
                    style={{
                        "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
                        "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
                        "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
                        "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
                        "justifyContent": "left",
                        "overflow": "hidden"

                    }}

                    onClick={()=>{
                        //TODO1 add "firstTap" for all-content showing on one piece
                        if (isDirectNext === true) {
                            triggerNextPieceFunc();
                        }
                    }}
                
                >
           

                        
                        <ConvTextContent_quickGameView
                            allPieceContent={allPieceContent}
                            initialPieceNum={currPieceNum}
                            displaySpeed={typingSpeedValue}
                            getCurrentPieceNum={getCurrentPieceNum}
                            notifyFinished={notifyFinished}
                            notifyNotYet={notifyNotYet}
                            getInImmedaiteFinishSignal={getInImmedaiteFinishSignal}
                            getAutoModeStatus={getAutoModeStatus}
                            triggerNextPiece={triggerNextPieceFunc}
                        /> 
                 

                </div>

            </div>}



        </div>
    
    </div>);
}