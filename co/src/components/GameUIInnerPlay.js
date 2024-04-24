import { useState, useEffect } from 'react';


export default function GameUIInnerPlay({dataObj, gameUIObj, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings}) {
    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [isDisplayDefualtBtnUISettings, setIsDisplayDefualtBtnUISettings] = useState({}); //TODO remove later
    const [defualtBtnUISettings, setDefualtBtnUISettings] = useState({}); //TODO remove later
    const [txtFrameUISettings, setTxtFrameUISettings] = useState({}); //TODO remove later
    const [backButtonUISettings, setBackButtonUISettings] = useState({}); //TODO remove later

    let textFrameSettings = gameUIObj["textFrame"];
    let backButtonSettings = gameObj["backButton"];
    let defaultButtonGroupSettings = gameObj["defaultButtonGroup"];
    let isDefaultButtonDisplay = dataObj.displayTextFrame;
//TODO window width and height


    useEffect(() => {
        
        let txtFrameUISettings = getTextFrameUISettings(); //TODO remove later
        setTxtFrameUISettings(txtFrameUISettings); //TODO remove later
        let isDisplayDefaultVal = getIsDisplayDefaultButton(); //TODO remove later
        setIsDisplayDefualtBtnUISettings(isDisplayDefaultVal); //TODO remove later
        let defaultBtnUISettings = getDefaultButtonUISettings(); //TODO remove later
        setDefualtBtnUISettings(defaultBtnUISettings); //TODO remove later
        let backBtnUISettings = getBackButtonUISettings(); //TODO remove later
        setBackButtonUISettings(backBtnUISettings); //TODO remove later

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



        { dataObj.displayTextFrame && <div style={txtFrameUISettings["isShape"] === true ? {
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
        }
 
    </div>


    );

}