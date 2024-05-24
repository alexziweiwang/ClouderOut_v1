import { useState, useEffect } from 'react';


export default function GameUITextFramePreview({dataObj, getTextFrameUISettings, getScreenSize}) {

    const [txtFrameUISettings, setTxtFrameUISettings] = useState({});

    useEffect(() => {
        
        let txtFrameUISettings = getTextFrameUISettings();
        setTxtFrameUISettings(txtFrameUISettings);
    });

    return (<div style={txtFrameUISettings["isShape"] === true ? {
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
        "background-image": `url('${txtFrameUISettings["picUrl"]}')`,

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
    }}>
        
        <div style={{
            "position": "relative",
            "left": `${txtFrameUISettings["TextContentArea-x"]}px`,
            "top" : `${txtFrameUISettings["TextContentArea-y"]}px`,
            "width" : `${txtFrameUISettings["TextContentArea-w"]}px`,
            "height" : `${txtFrameUISettings["TextContentArea-h"]}px`,
            "border": "2px solid #e99a2b",
            "border-radius": "0px"
        }}>
            {dataObj.speaker_name !== "" && <><label>{dataObj.speaker_name}</label><br></br></>}
            {dataObj.content}               
        </div>
    
    </div>);
}