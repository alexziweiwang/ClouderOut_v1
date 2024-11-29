import { useState, useEffect } from 'react';

import langDictionary from './textDictionary';





export default function GameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getCurrentGameDataTracker,

    username,
    projectname,
    uiLanguage

}) {


    const [screenWidth, setScreenWidth] = useState(800); //TODO /* according to current node's size */
    const [screenHeight, setScreenHeight] = useState(450); //TODO /* according to current node's size */


    const [currNodeType, setCurrNodeType] = useState("");
    const [currNodeKey, setCurrNodeKey] = useState("");
    const [currChapterKey, setCurrChapterKey] = useState("");

    const [gameDataTracker, setGameDataTracker] = useState({});


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
 
        if (firstTimeEnter === true) {
            //TODO
            setFirstTimeEnter(false);
        }

        //TODO

        let nodeTypeTemp = getNodeType();
        setCurrNodeType(nodeTypeTemp);

        let chapterKeyTemp = getChapterKey();
        setCurrChapterKey(chapterKeyTemp);

        let nodeKeyTemp = getNodeKey();
        if (nodeKeyTemp !== currNodeKey) {
            setCurrNodeKey(nodeKeyTemp);
            setupScreenSizeByNodeKey(nodeKeyTemp);            
        }



        

    });

    function setupScreenSizeByNodeKey(nodeKeyName) {
        //TODO fetch from cloud for this node's size data...?



    }








return (<div style={{"backgroundColor": "purple"}}>
    {currNodeType === "" && <div>
        </div>}

</div>);


}

/* for conversation-node


    initialPieceNum = 0
    isDisplay = true
    allPieceContent = {pieceDataStructure} // fetched from cloud
    
    uiData1_textframe={gameUITextFrame}  // fetched from cloud
    uiData2_buttonOption={gameUIDefaultButton}  // fetched from cloud
    uiData3_ConvNavigation={uiConvNav}  // fetched from cloud
    uiData4_logPageSettings={logPageUISettings} // fetched from cloud
    
    screenWidth={screenWidth} // fetched from cloud
    screenHeight={screenHeight} // fetched from cloud
        
    
    uiLanguage={uiLanguage}
    
    username={usename}
    projectname={projectname} 
    
    enteringEmuGameDataTracker={gameDataTracker}





*/