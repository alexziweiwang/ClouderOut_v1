import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIInnerPreview from './GameUIInnerPreview';
import GameUITextFramePreview from './GameUITextFramePreview';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType, getScreenSize}) {
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

            <GameUIInnerPreview 
                isSettingUpUI={true}
                dataObj={dataObj} 
                getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                getDefaultButtonUISettings={getDefaultButtonUISettings} 
                getBackButtonUISettings={getBackButtonUISettings}
                getScreenSize={getScreenSize}               
            />
              
            <GameUITextFramePreview
                dataObj={dataObj} 
                getTextFrameUISettings={getTextFrameUISettings}
            />
            
        </div>
        <br></br>

        </div>
    
    );
}