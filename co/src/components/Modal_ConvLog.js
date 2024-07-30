import { useState, useEffect } from 'react';


export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, 
    triggerLogPageClose, getAllPieceContent, isQuickView, getInLogPageUISettings, getIsDisplay}) {

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
                    "height": "100%",
                    "width": "100%"

                  }}
                
                >
  
                  <button 
                    style={{
                      "backgroundColor": logUIObj["closeButtonIsShape"] === true ? logUIObj["closeButtonShade"] : "",
                      "backgroundImage": "",



                    }}
                    onClick={()=>{triggerLogPageClose()}}
                    
                  >
                    Close
                  </button>
                  
                  
                  Converasation Log...        
          {/* //TODO  allPieceContentObj       
          //TODO  logUIObj */}






    </div>)
}