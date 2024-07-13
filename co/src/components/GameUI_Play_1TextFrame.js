import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import ConvTextContent_quickGameView from './ConvTextContent_quickGameView';

export default function GameUI_Play_1TextFrame({allPieceContent, getCurrentPieceNum, txtFrameUISettings, getIsDirectNextPiece, triggerNextPieceFunc}) {
//TODO: playView setup:

                                            //TODO1: auto-mode signal...


console.log("allpiece = ", allPieceContent); //TODO 
console.log("ui1 txtf = ", txtFrameUISettings);
//settled data:
// allPieceContent, txtFrameUISettings

//dynamic data:
//currPieceNum, isDirectNextPiece??
 
 //function to caller:
 //triggerNextPieceFunc, triggerAutoModeFunc
 
 
    const typingSpeedBase = 100;


//TODO dynamic
    const [currPieceNum, setcurrPieceNum] = useState(0);
    const [isDirectNext, setIsDirectNext] = useState(true);
    const [autoOn, setAutoOn] = useState(false);

    const [bgpUrl, setBgpUrl] = useState(""); //TODO


//settled

    const typingSpeedValue = typingSpeedBase - ((txtFrameUISettings["textDisplaySpeed"]-1) * 30);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
    
            setFirstTimeEnter(false);
        }
        

        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currPieceNum) { //only update when different pieceNum chosen
          setcurrPieceNum(currPieceNumTemp);
        }

        let tempDirectNext = getIsDirectNextPiece();
        setIsDirectNext(tempDirectNext);

        console.log("currPieceNumTemp[currPieceNum].content=", currPieceNumTemp[currPieceNum].content);

    });

    function passInSpeed() {
        return typingSpeedValue;
    }

    function getAllPieceContent() {
        return allPieceContent;
    }

    function passInSpeed() {
        return typingSpeedValue;
    }

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
            "border": "none",
            "borderRadius": "0px"
        }}>


{currPieceNum >= 0 && 
            <div>
            
                {allPieceContent[currPieceNum].speaker_name !== "" && 
                    <div>
                        {allPieceContent[currPieceNum].speaker_name}<br></br>
                    </div>}
                
                <div 
                className="wrappingFrame"
                style={{
                    "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
                    "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
                    "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
                    "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
                    "justifyContent": "left",
                    "fontFamily": `${txtFrameUISettings["fontName"]}`,
                }}
                onClick={()=>{
                    //TODO1 add "firstTap" for all-content showing on one piece
                    if (isDirectNext === true) {
                        triggerNextPieceFunc();
                    }
                }}
                
                >
           

                        
                        {/* <ConvTextContent_quickGameView
                            allPieceContent={allPieceContent}
                            initialPieceNum={currPieceNum}
                            displaySpeed={typingSpeedValue}
                            getCurrentPieceNum={getCurrentPieceNum}
                        /> */}
                    ???{allPieceContent[currPieceNum]}
                   


                </div>

            </div>}



        </div>
    
    </div>);
}