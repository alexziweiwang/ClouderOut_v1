import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';

export default function GameUIOuterPreviewWindow({dataObj, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    useEffect(() => {
    
        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);
    });


    function notUsing() {
        return "";
    }

    return(
    <div className="previewWindow">

        <div className="previewArea2"
        style={{"height": `${screenHeight}px`,"width": `${screenWidth}px`}}
        >

            <GameUI_2ButtonsPreview 
                isSettingUpUI={true}
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={getAllPieceContent}
                getCurrentPieceNum={getCurrentPieceNum}
                getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                getDefaultButtonUISettings={getDefaultButtonUISettings} 
                getBackButtonUISettings={getBackButtonUISettings}
                getScreenSize={getScreenSize}     
                triggerNextPiece={notUsing}
            />
              
            <GameUI_1TextFramePreview
                isEditing={false}
                dataObj={dataObj} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={getAllPieceContent}
                getCurrentPieceNum={getCurrentPieceNum}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={false}
                getIsDirectNextPiece={notUsing}
                triggerNextPiece={notUsing}
                triggerAutoMode={notUsing}
            />
            
        </div>
        <br></br>

        </div>
    
    );
}