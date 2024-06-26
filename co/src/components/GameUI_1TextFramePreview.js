import { useState, useEffect } from 'react';
import ConvTextContentViewer from './ConvTextContentViewer';

export default function GameUI_1TextFramePreview({initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, isInGameView, getIsDirectNextPiece, triggerNextPiece}) {
    const typingSpeed = 100; //TODO testing


    const [txtFrameUISettings, setTxtFrameUISettings] = useState({});

    const [currentPiece, setCurrentPiece] = useState(initialAllPieceData[0]); //TODO2 refactor for larger scope

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData);

    const [isDirectNext, setIsDirectNext] = useState(true);

    useEffect(() => {
        let allPieceContentTemp = getAllPieceContent();
        if (allPieceContentTemp !== allPieceData) {
          setAllPieceData(allPieceContentTemp);
        }
        
        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
          setCurrentPiece(allPieceContentTemp[currPieceNumTemp]);
        }

        let txtFrameUISettings = getTextFrameUISettings();
        setTxtFrameUISettings(txtFrameUISettings);

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
                "border-radius": `${txtFrameUISettings["cornerRadius"]}px`,
                "opacity": txtFrameUISettings["transparency"],
                "font-size": `${txtFrameUISettings["textSize"]}px`,    
                "user-select": "none",
            } : {
                "background-image": txtFrameUISettings["picUrl"] === "" ? "" : `url('${txtFrameUISettings["picUrl"]}')`,       //TODO improve later
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
            onClick={()=>{
                //TODO1 add "firstTap" for all-content showing on one piece
                if (isDirectNext === true) {
                    triggerNextPiece();
                }
            }}
        >
        
        <div style={{
            "position": "relative",
            "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
            "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
            "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
            "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
            "border": isInGameView === true ? "none" : "2px solid #e99a2b",
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
                }}>
                        <ConvTextContentViewer 
                            initialAllPieceData={initialAllPieceData}
                            initialPieceNum={currentPieceNum}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getAllPieceContent={getAllPieceContent}
                            displaySpeed={typingSpeed}
                        />
                </div>

            </div>}

        </div>
    
    </div>);
}