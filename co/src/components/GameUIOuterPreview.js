import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIInnerPreview from './GameUIInnerPreview';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType}) {

    const [menuType, setMenuType] = useState("notStoryCore");

    useEffect(() => {
        let tempType = getMenuType();
        setMenuType(tempType);
    });

    console.log("GameUIPreviewOuterFrame -- setting up Game-UI");

    return(<div className="previewWindow">
        <div className="preveiewArea2">
            <GameUIInnerPreview 
                isSettingUpUI={true}
                dataObj={dataObj} 
                getTextFrameUISettings={getTextFrameUISettings} 
                getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                getDefaultButtonUISettings={getDefaultButtonUISettings} 
                getBackButtonUISettings={getBackButtonUISettings}
            />  
        </div>
        <br></br>

        </div>
    
    );
}