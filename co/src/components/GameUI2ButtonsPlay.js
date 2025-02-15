import { useState, useEffect } from 'react';

export default function GameUI2ButtonsPlay({isSettingUpUI, initialAllPieceData, getCurrentPieceNum, getIsDisplayDefaultButton, getDefaultButtonUISettings, getBackButtonUISettings, getScreenSize, triggerNextPiece}) {
   
    //TODO: in play-mode, some input data are settled when first entering
   //screenSize, allPieceData, defaultButtonUISettings, (BackButtonUISettings - for future)
   //TODO: dynamic
   //currentPieceNum,
   //TODO always t/f
   //IsDisplayDefaultButton(true)?, isSettingUpUI(false)
   //TODO function
   //triggerNextPiece



//dynamic
   const [currentPieceNum, setCurrentPieceNum] = useState(0);



    const [screenWidth, setScreenWidth] = useState(800); //TODO: first element
    const [screenHeight, setScreenHeight] = useState(600); //TODO: second element


//settled data:
    const allPieceData = initialAllPieceData;

               //TODO remove later?                            // const [isDisplaydefaultBtnUISettings, setIsDisplaydefaultBtnUISettings] = useState({});

    const [defaultBtnUISettings, setdefaultBtnUISettings] = useState({});

    const stndButtonTextArr //TODO change later ??
        = (isSettingUpUI == true) ? [{"buttonText": "Sample1: Default Button"}, {"buttonText": "Sample2: Default Button, Longer Content"}, {"buttonText": "Sample3: Another option..."}] 
        : (allPieceData[currentPieceNum]["stnd_btn_arr"] !== undefined ? allPieceData[currentPieceNum]["stnd_btn_arr"] : []);


    // const [backButtonUISettings, setBackButtonUISettings] = useState({}); //TODO temp

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {

            let screenSizePair = getScreenSize();
            setScreenWidth(screenSizePair[0]);
            setScreenHeight(screenSizePair[1]);  

            let defaultBtnUISettings = getDefaultButtonUISettings();
            setdefaultBtnUISettings(defaultBtnUISettings);
           
            // let backBtnUISettings = getBackButtonUISettings();
            // setBackButtonUISettings(backBtnUISettings); //TODO temp
 



            setFirstTimeEnter(false);
        }
        

        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) {
          setCurrentPieceNum(currPieceNumTemp);

        }
  
    });

    return (
        <div style={{"width": screenWidth, "position": "absolute", "top": "0px", "left": "0px"}}>

        <div style={{"left": `${defaultBtnUISettings["groupX"]}px`,
        "top": `${defaultBtnUISettings["groupY"]}px`,                       
        "position": "absolute"}}>


        {true &&  //TODO: change later!! (by checking stndButtonTextArr's length)

        <div>
        {stndButtonTextArr.map((item, index)=>{

            let currId = "defaultButtonDivPreviewWindow" + index;
            return (
            <div id={currId} key={index} style={{   
                    "background": defaultBtnUISettings["bgColor"],
                    "backgroundImage": defaultBtnUISettings["isShape"] === true ? "" 
                        : `url('')`, //TODO improve later
                    "backgroundSize": `${defaultBtnUISettings["widthMax"]}px ${defaultBtnUISettings["height"]}px`,
                    
                    "width": `${defaultBtnUISettings["widthMin"]}px`,
                    "height": `${defaultBtnUISettings["height"]}px`,
                    "borderRadius": `${defaultBtnUISettings["cornerRadius"]}px`,
                    "color": defaultBtnUISettings["textColor"],
                    "opacity": defaultBtnUISettings["transparency"],
                    "border": `${defaultBtnUISettings["border"]}`,
                    "margin-bottom": `${defaultBtnUISettings["margin"]}px`,
                    "padding-left": `10px`,
                    "justifyContent": defaultBtnUISettings["justifyContent"],
                    "align-items": defaultBtnUISettings["alignItems"],
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


        {/* //TODO refactor: move back-button to nav-UI system */}
        {/* <div id="backButtonDivPreview" key="backButtonPreview"
            style={backButtonUISettings["isShape"] === true ?{
                "background": backButtonUISettings["bgColor"],

                "width": `${backButtonUISettings["width"]}px`,
                "height": `${backButtonUISettings["height"]}px`,
                "color": backButtonUISettings["textColor"],
                "borderRadius": `${backButtonUISettings["cornerRadius"]}px`,
                "opacity": backButtonUISettings["transparency"],
                "fontSize": `${backButtonUISettings["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonUISettings["posX"]}px`,
                "top": `${backButtonUISettings["posY"]}px`,
                "justifyContent": "center",
                "align-items": "center",                        
                "display": "flex",
                "border": `${backButtonUISettings["borderSize"]}px solid ${backButtonUISettings["borderColor"]}`,
                "cursor": "pointer",
                "userSelect": "none",
                "transition": "all 0.2s ease-out"
            } : {
                "backgroundImage": `url('')`, //TODO improve later
                "backgroundSize": `${backButtonUISettings["width"]}px ${backButtonUISettings["height"]}px`,
                
                "width": `${backButtonUISettings["width"]}px`,
                "height": `${backButtonUISettings["height"]}px`,
                "color": backButtonUISettings["textColor"],
                "borderRadius": `${backButtonUISettings["cornerRadius"]}px`,
                "opacity": backButtonUISettings["transparency"],
                "fontSize": `${backButtonUISettings["textSize"]}px`,

                "position": "absolute",
                "left": `${backButtonUISettings["posX"]}px`,
                "top": `${backButtonUISettings["posY"]}px`,
                "justifyContent": "center",
                "align-items": "center",
                "display": "flex",
                "border": `${backButtonUISettings["borderSize"]}px solid ${backButtonUISettings["borderColor"]}`,
                "cursor": "pointer",
                "userSelect": "none",
                "transition": "all 0.2s ease-out"
            }}

            onMouseDown={
                ()=>{
                    document.getElementById("backButtonDivPreview").style.filter = "brightness(150%)";
                }
                }
            onMouseUp={
                ()=>{
                    document.getElementById("backButtonDivPreview").style.filter = "brightness(100%)";
                }
            }
        >
        {backButtonUISettings["buttonText"]}
  
    </div>
 */}

    </div>


    );

}