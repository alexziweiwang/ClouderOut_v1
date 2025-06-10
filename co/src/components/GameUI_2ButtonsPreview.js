import { useState, useEffect } from 'react';

//level5 (a part of a node)


export default function GameUI_2ButtonsPreview({isSettingUpUI, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, 
    getScreenSize, triggerNextPiece, getAudioMap, getVisualMap
}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData);

    const [isDisplaydefaultBtnUISettings, setIsDisplaydefaultBtnUISettings] = useState({});

    const [defaultBtnUISettings, setdefaultBtnUISettings] = useState({});

    const stndButtonTextArr = (isSettingUpUI == true) ? [{"buttonText": "Sample1: Default Button"}, {"buttonText": "Sample2: Default Button, Longer Content"}, {"buttonText": "Sample3: Another option..."}] 
        : (allPieceData[currentPieceNum]["stnd_btn_arr"] !== undefined ? allPieceData[currentPieceNum]["stnd_btn_arr"] : []);

    const [backButtonUISettings, setBackButtonUISettings] = useState({});

    const [buttonPicUrl, setButtonPicurl] = useState("");

//TODO fetch resource-list and generate resource-map here, for dynamic pic-var-matching
//TODO remove "picUrl" for each resource
const [audioMap, setAudioMap] = useState([]); //TODO for sound effects -- future feature
const [visualMap, setVisualMap] = useState([]); 

    useEffect(() => {

        let allPieceContentTemp = getAllPieceContent();
        if (allPieceContentTemp !== allPieceData) {
          setAllPieceData(allPieceContentTemp);
        }
        
        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);

        }

        let visualMapTemp = getVisualMap();

                               //             console.log("\t\t\tgame-ui-2-buttons-preview visualMap = ", visualMapTemp);

        setVisualMap(visualMapTemp);

        let audioMapTemp = getAudioMap();
        setAudioMap(audioMapTemp);


  
        let isDisplayDefaultValTemp = getIsDisplayDefaultButton();
        setIsDisplaydefaultBtnUISettings(isDisplayDefaultValTemp);
       
       
        let defaultBtnUISettingsTemp = getDefaultButtonUISettings();
        if (defaultBtnUISettingsTemp !== defaultBtnUISettings) {
            setdefaultBtnUISettings(defaultBtnUISettingsTemp);
            setButtonPicurl(visualMapTemp[defaultBtnUISettingsTemp["picVar"]]); 
        }

        let backBtnUISettings = getBackButtonUISettings();
        setBackButtonUISettings(backBtnUISettings);

        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);

    });

    return (
        <div style={{"width": screenWidth, "position": "absolute", "top": "0px", "left": "0px"}}>

        <div style={{"left": `${defaultBtnUISettings["groupX"]}px`,
        "top": `${defaultBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>
        {isDisplaydefaultBtnUISettings && 

        <div>
        {stndButtonTextArr.map((item, index)=>{

            let currId = "defaultButtonDivPreviewWindow" + index;
            return (
            <div id={currId} key={index} style={{   
                    "backgroundColor": defaultBtnUISettings["bgColor"],
                    "backgroundImage": defaultBtnUISettings["isShape"] === true ? "" 
                        : `url('${visualMap[defaultBtnUISettings["picVar"]]}')`,
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