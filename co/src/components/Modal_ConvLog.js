import { useState, useEffect } from 'react';


export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, 
    triggerLogPageClose, getAllPieceContent, isQuickView, getInLogPageUISettings, getIsDisplay,
    visualMap
  }) {

        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp

        const [allPieceContentObj, setAllPieceContentObj] = useState(allPieceContent);
        const [logUIObj, setLogUIObj] = useState(logPageUISettings);

        const [pieceArr, setPieceArr] = useState(isQuickView === false ? 
            [["speaker1", "sample_content_1"],["speaker2", "sample_content_2"],["speaker3", "sample_content_3"]] 
            : []);
        
   
        useEffect(() => {
     
          if (firstTimeEnter === true) {
    
        // if isQuickView === true, then use "allPieceContent"  and "logPageUISettings" directly;
        // else : use getAllPieceContent & getInLogPageUISettings for each render
     
            setFirstTimeEnter(false);
          }
          let uiObjTemp = "";
          let allPieceTemp = "";
          if (isQuickView === false) { // for ui-setting immediate-preview
            uiObjTemp = getInLogPageUISettings();
            setLogUIObj(uiObjTemp);

            allPieceTemp = getAllPieceContent();
            setAllPieceContentObj(allPieceTemp);
          }

          let start = initialPieceNum;
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

          if (isQuickView === true) { 
            setPieceArr(pieceArrTemp);
          }

        });

        //TODO2: close-button-pic:  `url('${visualMap[logUIObj["closeButtonPicName"]]}')`
        //TODO2: close button text: setup by user


    return (
      <div
                  style={{
                    "backgroundColor": logUIObj["bgpIsShape"] === true ? logUIObj["bgpShade"] : "",
                    "backgroundImage": logUIObj["bgpIsShape"] === false ? `url('${visualMap[logUIObj["bgpPicName"]]}')` : "",

                    
                    "height": "100%",
                    "width": "100%"

                  }}
                
                >
  
                  <div 
                    id="modal-log-close"
                    style={{
                      "backgroundColor": logUIObj["closeButtonIsShape"] === true ? logUIObj["closeButtonShade"] : "",
                      "backgroundImage": logUIObj["closeButtonIsShape"] === false ? `url('${visualMap[logUIObj["closeButtonPicName"]]}')` : "",
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
                          document.getElementById("modal-log-close").style.filter = "brightness(150%)";
                      }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("modal-log-close").style.filter = "brightness(100%)";
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
            }}
          >
            {pieceArr.map((item, index) => {
                  return(
                      <div
                        style={{
                          "width": `${logUIObj["groupWidth"]}px`, 
                          "height": `${logUIObj["groupHeight"]}px`, 
                          "backgroundColor": "green",
                        }}
                      >
                        {item[0]}: {item[1]}
                      </div>);
              }
              )}

          </div>


    </div>)
}