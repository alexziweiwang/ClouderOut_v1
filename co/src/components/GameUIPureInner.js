import { useState, useEffect } from 'react';


export default function GameUIPureInner({dataObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings}) {

    const [isDisplayDefualtBtnUISettings, setIsDisplayDefualtBtnUISettings] = useState({});

    const [defualtBtnUISettings, setDefualtBtnUISettings] = useState({});
    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [txtFrameUISettings, setTxtFrameUISettings] = useState({});

    const [backButtonUISettings, setBackButtonUISettings] = useState({});

    useEffect(() => {
        
        let txtFrameUISettings = getTextFrameUISettings();
        setTxtFrameUISettings(txtFrameUISettings);
        let isDisplayDefaultVal = getIsDisplayDefaultButton();
        setIsDisplayDefualtBtnUISettings(isDisplayDefaultVal);
        let defaultBtnUISettings = getDefaultButtonUISettings();
        setDefualtBtnUISettings(defaultBtnUISettings);
        let backBtnUISettings = getBackButtonUISettings();
        setBackButtonUISettings(backBtnUISettings);

    });
    


    return (
        <div style={{"width": 800}}>
   
        <div style={{"left": `${defualtBtnUISettings["groupX"]}px`,
        "top": `${defualtBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        {isDisplayDefualtBtnUISettings && 

        <div>
        {defaultButtonTextSampleArr.map((item, index)=>{
            let currId = "defaultButtonDivPreviewWindow" + index;
            return (
            <div id={currId} key={index} style={
                defualtBtnUISettings["isShape"] === true ? {   
                    "background": defualtBtnUISettings["bgColor"],
                    
                    "width": `${defualtBtnUISettings["widthMin"]}px`,
                    "height": `${defualtBtnUISettings["height"]}px`,
                    "border-radius": `${defualtBtnUISettings["cornerRadius"]}px`,
                    "color": defualtBtnUISettings["textColor"],
                    "opacity": defualtBtnUISettings["transparency"],
                    "border": `${defualtBtnUISettings["border"]}`,
                    "margin-bottom": `${defualtBtnUISettings["margin"]}px`,
                    "padding-left": `10px`,
                    "justify-content": defualtBtnUISettings["justifyContent"],
                    "align-items": defualtBtnUISettings["alignItems"],
                    "font-size": `${defualtBtnUISettings["textSize"]}px`,
                    
                    "display": "flex",
                    "cursor": "pointer",
                    "user-select": "none",
                    "transition": "all 0.2s ease-out",
                    "overflow": "scroll"
                } : {
                    "background-image": `url('${defualtBtnUISettings["picUrl"]}')`,
                    "background-size": `${defualtBtnUISettings["widthMax"]}px ${defualtBtnUISettings["height"]}px`,
                    
                    "width": `${defualtBtnUISettings["widthMin"]}px`,
                    "height": `${defualtBtnUISettings["height"]}px`,
                    "border-radius": `${defualtBtnUISettings["cornerRadius"]}px`,
                    "color": defualtBtnUISettings["textColor"],
                    "opacity": defualtBtnUISettings["transparency"],
                    "border": `${defualtBtnUISettings["border"]}`,
                    "margin-bottom": `${defualtBtnUISettings["margin"]}px`,
                    "padding-left": `10px`,
                    "justify-content": defualtBtnUISettings["justifyContent"],
                    "align-items": defualtBtnUISettings["alignItems"],
                    "font-size": `${defualtBtnUISettings["textSize"]}px`,

                    "display": "flex",
                    "cursor": "pointer",
                    "user-select": "none",
                    "transition": "all 0.2s ease-out",
                    "overflow": "scroll"
                }      
            }
            onMouseDown={
                ()=>{
                    document.getElementById(currId).style.filter = "invert(100%)";
                }
            }
            onMouseUp={
                ()=>{
                    document.getElementById(currId).style.filter = "invert(0%)";
                }
            }
            
            >
            {defaultButtonTextSampleArr[index]}
            </div>);
        }                
        )}
    </div>              
        }

        </div>



        <div id="backButtonDivPreview" key="backButtonPreview"
            style={backButtonUISettings["isShape"] === true ?{
                "background": backButtonUISettings["bgColor"],

                "width": `${backButtonUISettings["width"]}px`,
                "height": `${backButtonUISettings["height"]}px`,
                "color": backButtonUISettings["textColor"],
                "border-radius": `${backButtonUISettings["cornerRadius"]}px`,
                "opacity": backButtonUISettings["transparency"],
                "font-size": `${backButtonUISettings["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonUISettings["posX"]}px`,
                "top": `${backButtonUISettings["posY"]}px`,
                "justify-content": "center",
                "align-items": "center",                        
                "display": "flex",
                "border": `${backButtonUISettings["borderSize"]}px solid ${backButtonUISettings["borderColor"]}`,
                "cursor": "pointer",
                "user-select": "none",
                "transition": "all 0.2s ease-out"
            } : {
                "background-image": `url('${backButtonUISettings["picUrl"]}')`,
                "background-size": `${backButtonUISettings["width"]}px ${backButtonUISettings["height"]}px`,
                
                "width": `${backButtonUISettings["width"]}px`,
                "height": `${backButtonUISettings["height"]}px`,
                "color": backButtonUISettings["textColor"],
                "border-radius": `${backButtonUISettings["cornerRadius"]}px`,
                "opacity": backButtonUISettings["transparency"],
                "font-size": `${backButtonUISettings["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonUISettings["posX"]}px`,
                "top": `${backButtonUISettings["posY"]}px`,
                "justify-content": "center",
                "align-items": "center",
                "display": "flex",
                "border": `${backButtonUISettings["borderSize"]}px solid ${backButtonUISettings["borderColor"]}`,
                "cursor": "pointer",
                "user-select": "none",
                "transition": "all 0.2s ease-out"
            }}

            onMouseDown={
                ()=>{
                    document.getElementById("backButtonDivPreview").style.filter = "invert(100%)";
                }
                }
            onMouseUp={
                ()=>{
                    document.getElementById("backButtonDivPreview").style.filter = "invert(0%)";
                }
            }
        >
        {backButtonUISettings["buttonText"]}
  
    </div>



        <div style={txtFrameUISettings["isShape"] === true ? {
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
        
        </div>


        TODO: textframe and standard-button-group can be 0 or 1 -- need to fetch current-piece data to decide 
        <br></br>TODO: textframe should be clickable for next-piece (default) as the game-content


    </div>


    );

}