import { useState, useEffect } from 'react';


export default function Modal_QuickGameView ({handleQViewCancel, isDisplay, screenWidth, screenHeight, allPieceContent, uiData1_textframe, uiData2_buttonOption, uiData3_ConvNavigation, visualList, audioList}) {
//TODO: receive nav-data (for all game type ) ; do later


    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [currPieceNum, setCurrPieceNum] = useState(0);
    const [directNextPieceBool, setDirectNextPieceBool] = useState(true);

    const [audioMap, setAudioMap] = useState({});
    const [visualMap, setVisualMap] = useState({}); 
  
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);

    const [charaPicArr2, setCharaPicArr2] = useState(allPieceContent[0]["chp_arr"]);

    // const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
//       if (firstTimeEnter === true) {
//         setFirstTimeEnter(false);

// console.log("game-q-view entry, resource-list fetched."); //TODO temp
//       }



//TODO update of "currPieceNum" : by user clicking and/or operations ... (auto, etc.)


        if (allPieceContent[currPieceNum]["clkb_arr"].length > 0 || 
            allPieceContent[currPieceNum]["stnd_btn_arr"].length > 0) {
            setDirectNextPieceBool(false);
        } else {
            setDirectNextPieceBool(true);
        }

      
      updateCharPicArr(allPieceContent, currPieceNum);
      updateBgmSource(allPieceContent, currPieceNum);
      updateBgpSource(allPieceContent, currPieceNum);
      

        if (audioMapSize < audioList.length || visualMapSize < visualList.length) {
            let i = 0;
            let tempAudioMap = {};
            setAudioMapSize(audioList.length);
            for (;i < audioList.length; i++) {
                let item = audioList[i];
                tempAudioMap[item["var"]] = item["url"];
            }
            setAudioMap(tempAudioMap);

            i = 0;
            let tempVisualMap = {};
            setVisualMapSize(visualList.length);
            for (;i < visualList.length; i++) {
                let item = visualList[i];
                tempVisualMap[item["var"]] = item["url"];
            }
            setVisualMap(tempVisualMap);
        }

    });



    function updateCharPicArr() {
        if (currPieceNum < 0) {
            return;
          }
          
          if (allPieceContent[currPieceNum]["chp_action"] === "changeCharPicArr") {     
            setCharaPicArr2(allPieceContent[currPieceNum]["chp_arr"]);  
          } 
    }

    function triggerNextPiece() {
        setCurrPieceNum(currPieceNum+1);
    }





    return ( <div className={modalStyleName}>
        <div className="modalArea">

            <div>
            <button onClick={()=>{handleQViewCancel();}}> Close </button>
                <div className="parallelFrame">

               
                    <div className="previewArea"   
                        style={{"position": "relative", 
                            "height": `${screenHeight}px`, 
                            "width": `${screenWidth}px`
                        }}
                    >
                                {<div style={{
                                    "backgroundColor": "#000000",
                                    "backgroundImage": (currPieceNum >= 0 && bgpSource !== "") ? 
                                    `url(${bgpSource})` 
                                        : "",
                                    "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                                    "position": "absolute", "top": "0px", "left": "0px", "height": `${screenHeight}px`, "width": `${screenWidth}px`}}
                                    
                                    onClick={()=>{
                                        if (directNextPieceBool === true) {
                                        //TODO1 add "firstTap" for all-content showing on one piece
                                        triggerNextPiece();
                                        }
                                    }}
                                    >


                                    <div> 
            
                                            {charaPicArr2 !== undefined && charaPicArr2.map((item, index) => {
                                            let altStr = index+"already added character picture";
                                            return (
                                                <>
                                                {(visualMap[item[0]] !== undefined && visualMap[item[0]] !== "") && 
                                                <img style={{
                                                    "position": "absolute", 
                                                    "top": `${item[2]}px`, "left": `${item[1]}px`,
                                                    "width": `${item[3] * item[5]}px`, "height": `${item[4] * item[5]}px`,
                                                    }}
                                                    src={visualMap[item[0]]}
                                                    alt={altStr}
                                                />}
                                                </>
                                            );
                                            })}
                                        </div>

                                </div>}
          

                        Preview Area ...
                    </div>

                    <div>
                        Game Data Area...
                    </div>
                </div>

                </div>
                </div>

    </div>);
}