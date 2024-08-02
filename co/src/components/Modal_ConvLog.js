import { useState, useEffect } from 'react';


export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, 
    triggerLogPageClose, getAllPieceContent, isQuickView, getLogPageUISettings, getIsDisplay,
    visualMap, getVisualMap, screenWidth, screenHeight,
    isSettingUI
  }) {

        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp

        const [logUIObj, setLogUIObj] = useState(logPageUISettings);

        const [pieceArr, setPieceArr] = useState(isSettingUI === true ? 
            [["speaker1", "sample_content_1-sample_content_1-sample_content_1"],
            ["speaker2", "sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2-sample_content_2"],
            ["speaker3", "sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3"],
            ["", "..."],
            ["speaker5", "12345"],
              ]
            
            : []);
        
      
        const [visualMapLocal, setVisualMapLocal] = useState(visualMap);
   
        useEffect(() => {
     
          if (firstTimeEnter === true) {
    
        // if isQuickView === true, then use "allPieceContent"  and "logPageUISettings" directly;
        // else : use getAllPieceContent & getLogPageUISettings for each render
     
            setFirstTimeEnter(false);
          }


          let uiObjTemp = "";
          let allPieceTemp = "";
          if (isQuickView === false) { // for ui-setting immediate-preview
            uiObjTemp = getLogPageUISettings();
            setLogUIObj(uiObjTemp);

            allPieceTemp = getAllPieceContent();
           
          } else {
            let visualMapTemp = getVisualMap();

            setVisualMapLocal(visualMapTemp);
          }

          let start = 0;
          let end = getCurrPieceNum();
          
          let i = start;
          let pieceArrTemp = [];
          for (; i < end; i++) {
            let speakerInfo = "";
            let contentInfo = "";
            
            if (isQuickView === false) { 
              //use allPieceTemp
              speakerInfo = allPieceTemp[i]["speaker_name"];
              contentInfo = allPieceTemp[i]["content"];

            } else {
              //use allPieceContent
              speakerInfo = allPieceContent[i]["speaker_name"];
              contentInfo = allPieceContent[i]["content"];
            }
            let pair = [];
            pair.push(speakerInfo);
            pair.push(contentInfo);


            
            pieceArrTemp.push(pair);
          }

          if (isSettingUI === false && pieceArr.length !== pieceArrTemp.length) { 
            setPieceArr(pieceArrTemp);
          }

        });


      
    const closeButtonId = "modal-log-close" + (isQuickView === true ? "-quick-view" : "-setter") + (isSettingUI === true ? "-uiSetter" : "-gameContentSetter");

    return (

              
    <div
            style={{
                      "backgroundColor": logUIObj["bgpIsShape"] === true ? logUIObj["bgpShade"] : "",
                      "backgroundImage": logUIObj["bgpIsShape"] === false 
                        ? `url('${visualMapLocal[logUIObj["bgpPicName"]]}')` : "",
                      "height": `${screenHeight}px`,
                      "width": `${screenWidth}px`,
                      "position": "relative",
                      "userSelect": "none"
                    }}
                  
                  >
  
                  <div 
                    id={closeButtonId}
                    style={{
                      "backgroundColor": logUIObj["closeButtonIsShape"] === true ? logUIObj["closeButtonShade"] : "",
                      "backgroundImage": logUIObj["closeButtonIsShape"] === false ? `url('${visualMapLocal[logUIObj["closeButtonPicName"]]}')` : "",
                      "userSelect": "none",
                      "top": `${logUIObj["closeButtonPositionY"]}px`,
                      "left": `${logUIObj["closeButtonPositionX"]}px`,
                      "color": `${logUIObj["closeButtonTextColor"]}`,
                      "position": "absolute",
                      "width": `${logUIObj["closeButtonWidth"]}px`,
                      "height": `${logUIObj["closeButtonHeight"]}px`,
                      "border": `${logUIObj["closeButtonBorderSize"]}px solid ${logUIObj["closeButtonBorderColor"]}`,
                      "display": "flex",
                      "justifyContent": "center",
                      "alignItems": "center",
                      "borderRadius": `${logUIObj["closeButtonCornerRadius"]}px`,
                      


                    }}

                    onMouseDown={
                      ()=>{
                          document.getElementById(closeButtonId).style.filter = "brightness(150%)";
                      }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById(closeButtonId).style.filter = "brightness(100%)";
                        }
                    }

                    onClick={()=>{triggerLogPageClose()}}
                      
                  >
                    {logUIObj["closeButtonText"]}
                  </div>
                  
                  
          {/* //TODO  allPieceContentObj       
          //TODO  logUIObj */}



          <div
            style={{
              "left": `${logUIObj["groupPosX"]}px`,
              "top": `${logUIObj["groupPosY"]}px`,
              "position": "absolute",
              "height": "90%",
              "width": "100%",  
              "overflow": "scroll",

            }}
          >
            {pieceArr.map((item, index) => {
                  let keyStr = "pieceArr-log-" + index;
                  return(
                      <div
                        key={keyStr}
                        style={{
                          "width": `${logUIObj["groupWidth"]}px`, 
                          "backgroundColor": "grey",
                          "marginBottom": `${logUIObj["groupItemGap"]}px`,
                          
                        }}
                      >
                        
                        {item[0] !== "" && <div style={{
                          "display": "flex",
                          "justifyContent": "left",
                          "color": `${logUIObj["speakerTextShade"]}`,
                          "fontFamily": `${logUIObj["speakerTextFont"]}`,
                          "fontSize": `${logUIObj["speakerTextSize"]}px`,
                          "marginLeft": `${logUIObj["speakerPosX"]}px`,
                          "paddingTop": `${logUIObj["speakerPosY"]}px`,

                          
                          }}>
                          {item[0]} 
                        </div>}
      
                        <div className="wrappingFrame"
                          style=
                          {{"display": "flex",
                            "justifyContent": "left",
                            "color": `${logUIObj["contentTextShade"]}`,
                            "fontFamily": `${logUIObj["contentTextFont"]}`,
                            "marginLeft": `${logUIObj["contentPosX"]}px`,
                            "paddingTop": `${logUIObj["contentPosY"]}px`,
                            "fontSize": `${logUIObj["contentTextSize"]}px`,
                            "paddingBottom": "20px",

                          }}
                        >   
                          {item[1]}
                        </div>
                        
                      </div>);
              }
              )}

          </div>


 
    
    </div>)
}