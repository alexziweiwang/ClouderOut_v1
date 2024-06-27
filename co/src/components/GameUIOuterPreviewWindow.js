import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';

export default function GameUIOuterPreviewWindow({dataObj, initialAllPieceData, getAllPieceContent, getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType, getScreenSize}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const [menuType, setMenuType] = useState("notStoryCore");
    

    useEffect(() => {
        let tempType = getMenuType();
        setMenuType(tempType);
        
        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);

    });

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
            />
              
            <GameUI_1TextFramePreview
                dataObj={dataObj} 
                initialAllPieceData={initialAllPieceData}
                getAllPieceContent={getAllPieceContent}
                getCurrentPieceNum={getCurrentPieceNum}
                getTextFrameUISettings={getTextFrameUISettings}
                isInGameView={false}
            />
            
        </div>
        <br></br>

        </div>
    
    );
}