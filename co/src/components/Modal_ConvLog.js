import { useState, useEffect } from 'react';


export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, 
    triggerLogPageClose, getAllPieceContent, isQuickView, getInLogPageUISettings}) {

        const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
   
        useEffect(() => {
     
          if (firstTimeEnter === true) {
    
        // if isQuickView === true, then use "allPieceContent"  and "logPageUISettings" directly;
        // else : use getAllPieceContent & getInLogPageUISettings for each render
     
            setFirstTimeEnter(false);
          }
    
    
    
    
    
        });

    return (<div>

        Converasation Log...
        <button onClick={()=>{triggerLogPageClose()}}>Close</button>

    </div>)
}