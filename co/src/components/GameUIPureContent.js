import { useState, useEffect } from 'react';


export default function GameUIPureContent({dataObj, getTextFrameData, getIsDisplayDefaultButton, getDefaultButtonData, getBackButtonData}) {

    const [isDisplayDefualtBtnData, setIsDisplayDefualtBtnData] = useState({});

    const [defualtBtnData, setDefualtBtnData] = useState({});
    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [txtFrameData, setTxtFrameData] = useState({});

    const [backButtonData, setBackButtonData] = useState({});

    useEffect(() => {
        
        let txtFramedata = getTextFrameData();
        setTxtFrameData(txtFramedata);
        let isDisplayDefaultVal = getIsDisplayDefaultButton();
        setIsDisplayDefualtBtnData(isDisplayDefaultVal);
        let defaultBtnData = getDefaultButtonData();
        setDefualtBtnData(defaultBtnData);
        let backBtnData = getBackButtonData();
        setBackButtonData(backBtnData);

    });
    


    return (
        <div className="preveiewArea2" style={{"width": 800}}>



                
        <div style={{"left": `${defualtBtnData["groupX"]}px`,
        "top": `${defualtBtnData["groupY"]}px`,                       
        "position": "absolute"}}>
        {isDisplayDefualtBtnData && 

        <div>
        {defaultButtonTextSampleArr.map((item, index)=>{
            let currId = "defaultButtonDivPreviewWindow" + index;
            return (
            <div id={currId} key={index} style={
                defualtBtnData["isShape"] === true ? {   
                    "background": defualtBtnData["bgColor"],
                    
                    "width": `${defualtBtnData["widthMin"]}px`,
                    "height": `${defualtBtnData["height"]}px`,
                    "border-radius": `${defualtBtnData["cornerRadius"]}px`,
                    "color": defualtBtnData["textColor"],
                    "opacity": defualtBtnData["transparency"],
                    "border": `${defualtBtnData["border"]}`,
                    "margin-bottom": `${defualtBtnData["margin"]}px`,
                    "padding-left": `10px`,
                    "justify-content": defualtBtnData["justifyContent"],
                    "align-items": defualtBtnData["alignItems"],
                    "font-size": `${defualtBtnData["textSize"]}px`,
                    
                    "display": "flex",
                    "cursor": "pointer",
                    "user-select": "none",
                    "transition": "all 0.2s ease-out",
                    "overflow": "scroll"
                } : {
                    "background-image": `url('${defualtBtnData["picUrl"]}')`,
                    "background-size": `${defualtBtnData["widthMax"]}px ${defualtBtnData["height"]}px`,
                    
                    "width": `${defualtBtnData["widthMin"]}px`,
                    "height": `${defualtBtnData["height"]}px`,
                    "border-radius": `${defualtBtnData["cornerRadius"]}px`,
                    "color": defualtBtnData["textColor"],
                    "opacity": defualtBtnData["transparency"],
                    "border": `${defualtBtnData["border"]}`,
                    "margin-bottom": `${defualtBtnData["margin"]}px`,
                    "padding-left": `10px`,
                    "justify-content": defualtBtnData["justifyContent"],
                    "align-items": defualtBtnData["alignItems"],
                    "font-size": `${defualtBtnData["textSize"]}px`,

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
            style={backButtonData["isShape"] === true ?{
                "background": backButtonData["bgColor"],

                "width": `${backButtonData["width"]}px`,
                "height": `${backButtonData["height"]}px`,
                "color": backButtonData["textColor"],
                "border-radius": `${backButtonData["cornerRadius"]}px`,
                "opacity": backButtonData["transparency"],
                "font-size": `${backButtonData["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonData["posX"]}px`,
                "top": `${backButtonData["posY"]}px`,
                "justify-content": "center",
                "align-items": "center",                        
                "display": "flex",
                "border": `${backButtonData["borderSize"]}px solid ${backButtonData["borderColor"]}`,
                "cursor": "pointer",
                "user-select": "none",
                "transition": "all 0.2s ease-out"
            } : {
                "background-image": `url('${backButtonData["picUrl"]}')`,
                "background-size": `${backButtonData["width"]}px ${backButtonData["height"]}px`,
                
                "width": `${backButtonData["width"]}px`,
                "height": `${backButtonData["height"]}px`,
                "color": backButtonData["textColor"],
                "border-radius": `${backButtonData["cornerRadius"]}px`,
                "opacity": backButtonData["transparency"],
                "font-size": `${backButtonData["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonData["posX"]}px`,
                "top": `${backButtonData["posY"]}px`,
                "justify-content": "center",
                "align-items": "center",
                "display": "flex",
                "border": `${backButtonData["borderSize"]}px solid ${backButtonData["borderColor"]}`,
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
        {backButtonData["buttonText"]}
    </div>



        <div style={txtFrameData["isShape"] === true ? {
            "background": txtFrameData["bgColor"],

            "width": `${txtFrameData["width"]}px`,
            "height": `${txtFrameData["height"]}px`,
            "position": "absolute",
            "top": `${txtFrameData["positionY"]}px`,
            "left": `${txtFrameData["positionX"]}px`,  
            "color": txtFrameData["textColor"],
            "border-radius": `${txtFrameData["cornerRadius"]}px`,
            "opacity": txtFrameData["transparency"],
            "font-size": `${txtFrameData["textSize"]}px`,    
        } : {
            "background-image": `url('${txtFrameData["picUrl"]}')`,

            "background-size": `${txtFrameData["width"]}px ${txtFrameData["height"]}px`,
            
            "width": `${txtFrameData["width"]}px`,
            "height": `${txtFrameData["height"]}px`,
            "position": "absolute",
            "top": `${txtFrameData["positionY"]}px`,
            "left": `${txtFrameData["positionX"]}px`,
            "color": txtFrameData["textColor"],
            "border-radius": `${txtFrameData["cornerRadius"]}px`,
            "opacity": txtFrameData["transparency"],
            "font-size": `${txtFrameData["textSize"]}px`,  
        }}>
            
            <div style={{
                "position": "relative",
                "left": `${txtFrameData["TextContentArea-x"]}px`,
                "top" : `${txtFrameData["TextContentArea-y"]}px`,
                "width" : `${txtFrameData["TextContentArea-w"]}px`,
                "height" : `${txtFrameData["TextContentArea-h"]}px`,
                "border": "2px solid #e99a2b",
                "border-radius": "0px"
            }}>
                Text Content Area...
            </div>
        
        </div>





    </div>


    );

}