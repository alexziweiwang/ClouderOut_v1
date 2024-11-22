import { useState, useEffect } from 'react';

export default function GameUI_Play_2Buttons({initialPieceNum, triggerNextPiece, visualMap, 
    allPieceContent, getCurrentPieceNum, 
    defaultBtnUISettings,
    // gameData, changeGameDataByStatement,
    changeGameDataByStatement2Arr
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
                                                            console.log("GameUIPlay2Button pressed...");

                            // if (gameData === undefined) { //TODO trying to remove
                            //                                         console.log("... gameData undefined.");
                            //     return;
                            // } //TODO trying to remove
                            
                            //TODO1 important: update game-data!!
                      //      let stndButtonThisButtonInfo = allPieceContent[currentPieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
                      //      let conseqArray = stndButtonThisButtonInfo[0]["conseq"];
                            
                            // if (conseqArray === undefined) {
                            //                                   //      console.log("... conseqArray undefined.");

                            //     return;
                            // }
                            // let len = conseqArray.length;
                                                                    //console.log("conseqArray: ", conseqArray, ", len = ", len);
                    
                            // let i = 0;
                            // for (; i < len; i++) {
                            //     let name = conseqArray[i][0];
                                
                            //     if (gameData[name] === undefined) {
                            //                                     //    console.log("\t\t\titem naem not found... continue");
                                                        
                            //         continue;
                            //     }

                            //     let action = conseqArray[i][1];
                            //     let newVal = conseqArray[i][2];
                            //     let type = gameData[name]["data_type"];
                            //                                     //    console.log("calling outside func:  change-by-stmt");
                            //     changeGameDataByStatement(name, action, newVal, type);

                            // }
                            
                            changeGameDataByStatement2Arr(currentPieceNum, item);

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