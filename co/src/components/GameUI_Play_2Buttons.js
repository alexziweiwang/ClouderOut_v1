import { useState, useEffect } from 'react';

export default function GameUI_Play_2Buttons({isSettingUpUI, initialallPieceContent, getAllPieceContent, 
    getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, 
    getScreenSize, 
    
    

    triggerNextPiece, passInAudioMap, passInVisualMap, //TODO for quick-view-gameplay parameters
    allPieceContent, getCurrentPieceNum, 
    defaultButtonUISettings, screenWidth, screenHeight

}) {

    const [currentPieceNum, setCurrentPieceNum] = useState(0);


    const [isDisplayDefualtBtnUISettings, setIsDisplayDefualtBtnUISettings] = useState({});

    const [defualtBtnUISettings, setDefualtBtnUISettings] = useState({});

    const stndButtonTextArr = (isSettingUpUI == true) ? [{"buttonText": "Sample1: Default Button"}, {"buttonText": "Sample2: Default Button, Longer Content"}, {"buttonText": "Sample3: Another option..."}] 
        : (allPieceContent[currentPieceNum]["stnd_btn_arr"] !== undefined ? allPieceContent[currentPieceNum]["stnd_btn_arr"] : []);


    const [buttonPicUrl, setButtonPicurl] = useState("");


    const [audioMap, setAudioMap] = useState([]); //TODO for sound effects -- future feature
    const [visualMap, setVisualMap] = useState([]); 

    useEffect(() => {

    
        
        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);

        }

        let visualMapTemp = passInVisualMap();
        setVisualMap(visualMapTemp);

        let audioMapTemp = passInAudioMap();
        setAudioMap(audioMapTemp);


  
        let isDisplayDefaultValTemp = getIsDisplayDefaultButton();
        setIsDisplayDefualtBtnUISettings(isDisplayDefaultValTemp);
       
       
        let defaultBtnUISettingsTemp = getDefaultButtonUISettings();
        if (defaultBtnUISettingsTemp !== defualtBtnUISettings) {
            setDefualtBtnUISettings(defaultBtnUISettingsTemp);
            setButtonPicurl(visualMapTemp[defaultBtnUISettingsTemp["picVar"]]);
        }

        let backBtnUISettings = getBackButtonUISettings();
        setBackButtonUISettings(backBtnUISettings);

 
    });

    return (
        <div style={{"width": screenWidth, "position": "absolute", "top": "0px", "left": "0px"}}>

        <div style={{"left": `${defualtBtnUISettings["groupX"]}px`,
        "top": `${defualtBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        {isDisplayDefualtBtnUISettings && 

        <div>
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