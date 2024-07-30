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

    return (<div>
                <div>
                  Converasation Log...
                  <button onClick={()=>{triggerLogPageClose()}}>Close</button>
          
          {/* //TODO  allPieceContentObj       
          //TODO  logUIObj */}



                </div>



    </div>)
}