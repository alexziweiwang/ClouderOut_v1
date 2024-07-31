import { useState, useEffect } from 'react';


export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, 
    triggerLogPageClose, getAllPieceContent, isQuickView, getInLogPageUISettings, getIsDisplay,
    visualMap
  }) {

        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp

        const [allPieceContentObj, setAllPieceContentObj] = useState(allPieceContent);
        const [logUIObj, setLogUIObj] = useState(logPageUISettings);
        
   
        useEffect(() => {
     
          if (firstTimeEnter === true) {
    
        // if isQuickView === true, then use "allPieceContent"  and "logPageUISettings" directly;
        // else : use getAllPieceContent & getInLogPageUISettings for each render
     
            setFirstTimeEnter(false);
          }
          
          if (isQuickView === false) { // for ui-setting immediate-preview
            let uiObjTemp = getInLogPageUISettings();
            setLogUIObj(uiObjTemp);

            let allPieceTemp = getAllPieceContent();
            setAllPieceContentObj(allPieceTemp);
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
                  
                  
                  Converasation Log...        
          {/* //TODO  allPieceContentObj       
          //TODO  logUIObj */}






    </div>)
}