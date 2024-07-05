import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import ConvTextContentViewer from './ConvTextContentViewer';

export default function GameUI1TextFramePlay({initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDirectNextPiece, triggerNextPiece, triggerAutoMode}) {
//TODO: playView setup:

//settled data:
// allPieceData, TextFrameUISettings

//dynamic data:
//currentPieceNum, isDirectNextPiece??
 
 //function to caller:
 //triggerNextPiece, triggerAutoMode
 
 
 
    const typingSpeedBase = 100;

    const [typingSpeedValue, setTypingSpeedValue] = useState(40); //TODO1 change in future


//TODO dynamic
    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [isDirectNext, setIsDirectNext] = useState(true);
    const [autoOn, setAutoOn] = useState(false);


//settled
    const allPieceData = initialAllPieceData;
    const bgpUrl = txtFrameUISettings["picUrl"];
    const [txtFrameUISettings, setTxtFrameUISettings] = useState({}); //TODO change later





    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            let txtFrameUISettingsTemp = getTextFrameUISettings();
            if (txtFrameUISettingsTemp !== txtFrameUISettings) {
                setTxtFrameUISettings(txtFrameUISettingsTemp);
            }

            let speedLevel = txtFrameUISettingsTemp["textDisplaySpeed"];   
            let speedValue = typingSpeedBase - ((speedLevel-1) * 30);    
            setTypingSpeedValue(speedValue);

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

    return (<div 
        style={txtFrameUISettings["isShape"] === true ? {
                "background": txtFrameUISettings["bgColor"],

                "width": `${txtFrameUISettings["width"]}px`,
                "height": `${txtFrameUISettings["height"]}px`,
                "position": "absolute",
                "top": `${txtFrameUISettings["positionY"]}px`,
                "left": `${txtFrameUISettings["positionX"]}px`,  
                "color": txtFrameUISettings["textColor"],
                "border-radius": `${txtFrameUISettings["cornerRadius"]}px`,
                "opacity": txtFrameUISettings["transparency"],
                "font-size": `${txtFrameUISettings["textSize"]}px`,    
                "user-select": "none",
            } : {
                "background-image": bgpUrl === "" ? "" : `url('${bgpUrl}')`,       //TODO improve later
                "background-size": `${txtFrameUISettings["width"]}px ${txtFrameUISettings["height"]}px`,
                
                "width": `${txtFrameUISettings["width"]}px`,
                "height": `${txtFrameUISettings["height"]}px`,
                "position": "absolute",
                "top": `${txtFrameUISettings["positionY"]}px`,
                "left": `${txtFrameUISettings["positionX"]}px`,
                "color": txtFrameUISettings["textColor"],
                "border-radius": `${txtFrameUISettings["cornerRadius"]}px`,
                "opacity": txtFrameUISettings["transparency"],
                "font-size": `${txtFrameUISettings["textSize"]}px`, 
                "user-select": "none", 
            }}
        >
        
        <div style={{
            "position": "relative",
            "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
            "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
            "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
            "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
            "border": "none",
            "border-radius": "0px"
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
                    "justify-content": "left",
                    "font-family": `${txtFrameUISettings["fontName"]}`,
                }}
                onClick={()=>{
                    //TODO1 add "firstTap" for all-content showing on one piece
                    if (isDirectNext === true) {
                        triggerNextPiece();
                    }
                }}
                
                >
           

                        
                        <ConvTextContentViewer 
                            initialAllPieceData={initialAllPieceData}
                            initialPieceNum={currentPieceNum}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getAllPieceContent={getAllPieceContent}
                            displaySpeed={typingSpeedValue}
                            getDisplaySpeed={passInSpeed}
                        />



                </div>

            </div>}



            <div className="parallelFrame">
                <div
                    style={{
                        "margin-right": "50px",
                        "color": txtFrameUISettings["buttonAutoIsTextFont"] ? 
                            (autoOn ? 
                                txtFrameUISettings["buttonAutoShade1"] 
                                :  txtFrameUISettings["buttonAutoShade0"]) 
                            : "",
                        "background-image": !txtFrameUISettings["buttonAutoIsTextFont"] ? "" : "",  
                        "font-family": `${txtFrameUISettings["buttonAutoFontName"]}`,
                        
                    }}
                    onClick={()=>{
                        //switch auto-status
                        if (autoOn === false) { //current status(f), next status(t)
                            triggerAutoMode();
                        }
                        setAutoOn(!autoOn);
                    }}
                > 
                {!txtFrameUISettings["buttonAutoFontItalic"] && <label>Auto</label>}
                {txtFrameUISettings["buttonAutoFontItalic"] && <em>Auto</em>}


                </div>

                <div
                    style={{
                        "margin-right": "50px",
                        "color": txtFrameUISettings["buttonLogIsTextFont"] ? txtFrameUISettings["buttonLogShade0"] : "",
                        "background-image": !txtFrameUISettings["buttonLogIsTextFont"] ? "" : "",  
                        "font-family": `${txtFrameUISettings["buttonLogFontName"]}`,
                        "font-style:": "italic"
                    }}
                    onClick={()=>{
                        //trigger log-screen
                    }}
                >
                    {!txtFrameUISettings["buttonLogFontItalic"] && <label>Log</label>}
                    {txtFrameUISettings["buttonLogFontItalic"] && <em>Log</em>}

                </div>
            </div>


        </div>
    
    </div>);
}