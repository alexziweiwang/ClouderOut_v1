import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import ConvTextContentViewer from './ConvTextContentViewer';

export default function GameUI_Play_1TextFrame({allPieceContent, getCurrentPieceNum, txtFrameUISettings, getIsDirectNextPiece, triggerNextPieceFunc}) {
//TODO: playView setup:

                                            //TODO1: auto-mode signal...


//settled data:
// allPieceData, txtFrameUISettings

//dynamic data:
//currentPieceNum, isDirectNextPiece??
 
 //function to caller:
 //triggerNextPieceFunc, triggerAutoModeFunc
 
 
    const typingSpeedBase = 100;


//TODO dynamic
    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [isDirectNext, setIsDirectNext] = useState(true);
    const [autoOn, setAutoOn] = useState(false);


//settled
    const allPieceData = initialAllPieceData;

    const typingSpeedValue = typingSpeedBase - ((txtFrameUISettings["textDisplaySpeed"]-1) * 30);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
    
            setFirstTimeEnter(false);
        }
        

        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
        }

        let tempDirectNext = getIsDirectNextPiece();
        setIsDirectNext(tempDirectNext);

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


{currentPieceNum >= 0 && 
            <div>
            
                {allPieceData[currentPieceNum].speaker_name !== "" && 
                    <div>
                        {allPieceData[currentPieceNum].speaker_name}<br></br>
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
                        triggerNextPiece();
                    }
                }}
                
                >
           

                        {!isEditing && 
                        <ConvTextContentViewer 
                            initialAllPieceData={allPieceData}
                            initialPieceNum={currentPieceNum}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getAllPieceContent={getAllPieceContent}
                            displaySpeed={typingSpeedValue}
                            getDisplaySpeed={passInSpeed}
                        />}

                        {isEditing && <>
                            {allPieceData[currentPieceNum].content}
                        </>}


                </div>

            </div>}



        </div>
    
    </div>);
}