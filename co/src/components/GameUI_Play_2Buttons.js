import { useState, useEffect } from 'react';

export default function GameUI_Play_2Buttons({triggerNextPiece, visualMap, 
    allPieceContent, getCurrentPieceNum, 
    defualtBtnUISettings}) {

    const [currentPieceNum, setCurrentPieceNum] = useState(0);

    const [stndButtonTextArr, setStndButtonTextArr] = useState([]);

    const [buttonPicUrl, setButtonPicUrl] = useState("");


    useEffect(() => {


        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
          setStndButtonTextArr(allPieceContent[currPieceNumTemp]["stnd_btn_arr"] !== undefined ? 
            allPieceContent[currPieceNumTemp]["stnd_btn_arr"] : []);
        
        }

        setButtonPicUrl(visualMap[defualtBtnUISettings["picVar"]]);
   
    });

    return (
        <div style={{"position": "absolute", "top": "0px", "left": "0px"}}>

        <div style={{"left": `${defualtBtnUISettings["groupX"]}px`,
        "top": `${defualtBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        
        {<div>
            {stndButtonTextArr.map((item, index)=>{

                    let currId = "defaultButtonDivPreviewWindow" + index;
                    return (
                    <div id={currId} key={index} style={{   
                            "background": defualtBtnUISettings["bgColor"],
                            "backgroundImage": defualtBtnUISettings["isShape"] === true ? "" 
                                : `url('${buttonPicUrl}')`,
                            "backgroundSize": `${defualtBtnUISettings["widthMax"]}px ${defualtBtnUISettings["height"]}px`,
                            
                            "width": `${defualtBtnUISettings["widthMin"]}px`,
                            "height": `${defualtBtnUISettings["height"]}px`,
                            "borderRadius": `${defualtBtnUISettings["cornerRadius"]}px`,
                            "color": defualtBtnUISettings["textColor"],
                            "opacity": defualtBtnUISettings["transparency"],
                            "border": `${defualtBtnUISettings["border"]}`,
                            "marginBottom": `${defualtBtnUISettings["margin"]}px`,
                            "paddingLeft": `10px`,
                            "justifyContent": defualtBtnUISettings["justifyContent"],
                            "alignItems": defualtBtnUISettings["alignItems"],
                            "fontSize": `${defualtBtnUISettings["textSize"]}px`,
                            "fontFamily": `${defualtBtnUISettings["fontName"]}`,
                            
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

                            //TODO1 important: update game-data!!

                        //TODO1 add "firstTap" for all-content showing on one piece

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