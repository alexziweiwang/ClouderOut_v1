import { useState, useEffect } from 'react';

export default function GameUI_Play_2Buttons({initialPieceNum, triggerNextPiece, visualMap, 
    allPieceContent, getCurrentPieceNum, 
    defaultBtnUISettings,
    buttonConsequenceByStatementEntireArray
    }) {

    const [currentPieceNum, setCurrentPieceNum] = useState(initialPieceNum);

    const [stndButtonTextArr, setStndButtonTextArr] = useState(allPieceContent[initialPieceNum]["stnd_btn_arr"] 
    !== undefined ? 
        allPieceContent[initialPieceNum]["stnd_btn_arr"] 
        : []);

    const [buttonPicUrl, setButtonPicUrl] = useState("");


    useEffect(() => {
        
// console.log("allPiece= ", allPieceContent); //TODO testing


        let currPieceNumTemp = getCurrentPieceNum();
        setCurrentPieceNum(currPieceNumTemp);
        setStndButtonTextArr(allPieceContent[currPieceNumTemp]["stnd_btn_arr"] 
            !== undefined ? 
                allPieceContent[currPieceNumTemp]["stnd_btn_arr"] 
                : []);
    

        setButtonPicUrl(visualMap[defaultBtnUISettings["picVar"]]);
   
    });

    return (
        <div style={{"position": "absolute", "top": "0px", "left": "0px"}}>

        <div style={{"left": `${defaultBtnUISettings["groupX"]}px`,
        "top": `${defaultBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        
        {<div>
            {stndButtonTextArr.map((item, index)=>{

                    let currId = "defaultButtonDivPlayWindow" + index;
                    return (
                    <div id={currId} key={currId} style={{   
                            "background": defaultBtnUISettings["bgColor"],
                            "backgroundImage": defaultBtnUISettings["isShape"] === true ? "" 
                                : `url('${buttonPicUrl}')`,
                            "backgroundSize": `${defaultBtnUISettings["widthMax"]}px ${defaultBtnUISettings["height"]}px`,
                            
                            "width": `${defaultBtnUISettings["widthMin"]}px`,
                            "height": `${defaultBtnUISettings["height"]}px`,
                            "borderRadius": `${defaultBtnUISettings["cornerRadius"]}px`,
                            "color": defaultBtnUISettings["textColor"],
                            "opacity": defaultBtnUISettings["transparency"],
                            "border": `${defaultBtnUISettings["border"]}`,
                            "marginBottom": `${defaultBtnUISettings["margin"]}px`,
                            "paddingLeft": `10px`,
                            "justifyContent": defaultBtnUISettings["justifyContent"],
                            "alignItems": defaultBtnUISettings["alignItems"],
                            "fontSize": `${defaultBtnUISettings["textSize"]}px`,
                            "fontFamily": `${defaultBtnUISettings["fontName"]}`,
                            
                            "display": "flex",
                            "cursor": "pointer",
                            "userSelect": "none",
                            "transition": "all 0.2s ease-out",
                            "overflow": "scroll"
                        }}
                    onMouseDown={
                        ()=>{
                            document.getElementById(currId).style.filter = "brightness(150%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById(currId).style.filter = "brightness(100%)";
                                                            
                                                                            console.log("GameUIPlay2Button pressed...", item);
  
                            buttonConsequenceByStatementEntireArray(currentPieceNum, item);

                            triggerNextPiece();
                        }
                    }
                    
                    >
                    {item["buttonText"]}
                    </div>);
        }                
        )}
    </div>              
        }

        </div>









    </div>


    );

}