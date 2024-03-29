import * as React from 'react';
import { useState, useEffect } from 'react';

export default function GameUIPreviewWindow({dataObj, getTextFrameData, getIsDisplayDefaultButton, getDefaultButtonData}) {
    const [isDisplayDefualtBtnData, setIsDisplayDefualtBtnData] = useState({});

    const [defualtBtnData, setDefualtBtnData] = useState({});
    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content"];

    const [txtFrameData, setTxtFrameData] = useState({});

    useEffect(() => {
        
        // console.log("!!! GameUIPreviewWindow - gameUITextFrame: "); //TODO test

        let txtFramedata = getTextFrameData();
        setTxtFrameData(txtFramedata);
        let isDisplayDefaultVal = getIsDisplayDefaultButton();
        setIsDisplayDefualtBtnData(isDisplayDefaultVal);
        let defaultBtnData = getDefaultButtonData();
        setDefualtBtnData(defaultBtnData);

    });
    

    return(<div className="previewWindow">


            <div className="preveiewArea2" style={{"width": 800}}>

                {Object.keys(defualtBtnData).map((k) => {
                    console.log(k, ":", txtFrameData[k]);
                })}

             
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
                            Text Content...
                        </div>
                    
                    </div>

         



            </div>

            
        <div> <br></br><br></br><br></br>Outside: <br></br>
            A1. Title Screen
            <br></br>
            A2. Pause Screen 
        </div>


        <div>
            <p className="plans">
                The opening-menu (title screen):
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: opening music selection
                <br></br>
                TODO: player profile/account feature
                <br></br>Current design: [start game, load game, settings, gallery(future)]
            </p>

            <p className="plans">
                The in-game menu (pause screen):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>Current design: [save, load, settings, properties, store(future)]
            </p>


            <p className="plans">
                The Game Progress save/load managing page:
                <br></br>
                TODO: allow authors to arrangne save/load spots
                <br></br>
                TODO: trigger of saving [game progress + game state]
            </p>



        </div>



    
    </div>);
}