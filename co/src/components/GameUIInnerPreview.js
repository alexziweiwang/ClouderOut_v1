import { useState, useEffect } from 'react';


export default function GameUIInnerPreview({isSettingUpUI, dataObj, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);


    const [isDisplayDefualtBtnUISettings, setIsDisplayDefualtBtnUISettings] = useState({});

    const [defualtBtnUISettings, setDefualtBtnUISettings] = useState({});
    const stndButtonTextArr = (isSettingUpUI == true) ? [{"buttonText": "Sample1: Default Button"}, {"buttonText": "Sample2: Default Button, Longer Content"}, {"buttonText": "Sample3: Another option..."}] : (dataObj["stnd_btn_arr"] !== undefined ? dataObj["stnd_btn_arr"] : []);

    const [backButtonUISettings, setBackButtonUISettings] = useState({});

    useEffect(() => {

        let isDisplayDefaultVal = getIsDisplayDefaultButton();
        setIsDisplayDefualtBtnUISettings(isDisplayDefaultVal);
        let defaultBtnUISettings = getDefaultButtonUISettings();
        setDefualtBtnUISettings(defaultBtnUISettings);
        let backBtnUISettings = getBackButtonUISettings();
        setBackButtonUISettings(backBtnUISettings);

        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);

    });

    return (
        <div style={{"width": screenWidth}}>
   
        <div style={{"left": `${defualtBtnUISettings["groupX"]}px`,
        "top": `${defualtBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        {isDisplayDefualtBtnUISettings && 

        <div>
        {stndButtonTextArr.map((item, index)=>{

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
            {/* {defaultButtonTextSampleArr[index]} */}
            {item["buttonText"]}
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


    </div>


    );

}