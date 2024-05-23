import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIInnerPreview from './GameUIInnerPreview';
import GameUITextFramePreview from './GameUITextFramePreview';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(800);


    const [menuType, setMenuType] = useState("notStoryCore");

    useEffect(() => {
        let tempType = getMenuType();
        setMenuType(tempType);
    });

    return(
    <div className="previewWindow">

        <div className="preveiewArea2"
        style={{"height": `${screenWidth}px`,"width": `${screenHeight}px`}}
        >

            <GameUIInnerPreview 
                isSettingUpUI={true}
                dataObj={dataObj} 
                getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                getDefaultButtonUISettings={getDefaultButtonUISettings} 
                getBackButtonUISettings={getBackButtonUISettings}
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