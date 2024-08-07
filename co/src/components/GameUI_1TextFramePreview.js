import { useState, useEffect } from 'react';
import ConvTextContent_preview from './ConvTextContent_preview';

export default function GameUI_1TextFramePreview({isEditing, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getTextFrameUISettings, isInGameView, getIsDirectNextPiece, 
    triggerNextPiece, triggerAutoMode, getUIConvNav,
    passInVisualMap
}) {
    const typingSpeedBase = 100;

    const [typingSpeedValue, setTypingSpeedValue] = useState(40); //TODO1 change in future

    const [txtFrameUISettings, setTxtFrameUISettings] = useState({});

    const [currentPiece, setCurrentPiece] = useState(initialAllPieceData[0]); //TODO2 refactor for larger scope

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData);

    const [isDirectNext, setIsDirectNext] = useState(true);

    const [bgpUrl, setBgpUrl] = useState(""); //TODO

    const [autoOn, setAutoOn] = useState(false);

//TODO fetch resource-list and generate resource-map here, for dynamic pic-var-matching
    const [visualMap, setVisualMap] = useState([]); 

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

        let txtFrameUISettingsTemp = getTextFrameUISettings();
        if (txtFrameUISettingsTemp !== txtFrameUISettings) {
            setTxtFrameUISettings(txtFrameUISettingsTemp);

            let urlTemp = visualMap[txtFrameUISettingsTemp["picVar"]];
            if (urlTemp === undefined) {
                setBgpUrl("");   //TODO2 improve with visualMap
            } else {
                setBgpUrl(urlTemp); //TODO2 check
            }
        }

        let visualMapTemp = passInVisualMap();
        setVisualMap(visualMapTemp);


        let convNavTemp = getUIConvNav();
        let speedLevel = convNavTemp["textDisplaySpeed"]; //TODO fetch from caller  
        let speedValue = typingSpeedBase - ((speedLevel-1) * 30);    
        setTypingSpeedValue(speedValue);

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
            "border": isInGameView === true ? "none" : "2px solid #e99a2b",
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
                >
           

                        {!isEditing && 
                        <div style={{
                            "fontFamily": `${txtFrameUISettings["fontName"]}`
                        }}>
                        <label>(Testing for speed only): </label>
                        <ConvTextContent_preview 
                            initialAllPieceData={initialAllPieceData}
                            initialPieceNum={currentPieceNum}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getAllPieceContent={getAllPieceContent}
                            displaySpeed={typingSpeedValue}
                            getDisplaySpeed={passInSpeed}
                        />
                        </div>}

                        {isEditing && <div
                            style={{
                                "fontFamily": `${txtFrameUISettings["fontName"]}`
                            }}
                         >
                            {allPieceData[currentPieceNum].content}
                        </div>}


                </div>

            </div>}



           

        </div>
    
    </div>);
}