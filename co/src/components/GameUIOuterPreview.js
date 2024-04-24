import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIInnerPreview from './GameUIInnerPreview';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getMenuType}) {

    const [menuType, setMenuType] = useState("notStoryCore");

    useEffect(() => {
        let tempType = getMenuType();
        setMenuType(tempType);
    });


    return(<div className="previewWindow">
        <div className="preveiewArea2">
            <GameUIInnerPreview dataObj={dataObj} getTextFrameUISettings={getTextFrameUISettings} getIsDisplayDefaultButton={getIsDisplayDefaultButton} getDefaultButtonUISettings={getDefaultButtonUISettings} getBackButtonUISettings={getBackButtonUISettings}/>  
        </div>
        <br></br>

        </div>
    
    );
}