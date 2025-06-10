import { useState, useEffect } from 'react';

import GameScreen_QuickView_ConvNode from './GameScreen_QuickView_ConvNode';

import { buttonConsequenceByStatementEntireArray } from '../viewmodels/CalcAc_QuickView';

//level3 (container of conversation-node, for in-practice)

export default function GameScreen_InPracShell_ConvNode ({

    allPieceData,
    nodeUIConvNav,
    nodeUIDefaultButton,
    nodeUILogPage,
    nodeUITextFrame,

    screenWidth,
    screenHeight,

    notifyNodeFinish,
        
    uiLanguage,
    
    username,
    projectname,
    
    enteringEmuGameDataTracker,
    updatedGameDataTracker,

    visualMap,
    audioMap,

    mutedViewOption,
    fetchGameSettings,

    openSettingPage,


    sendOutBgmSettings

}) {

    const initialPieceNum = 0;

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {
                                                                      // initializeDataFromCloud(); //TODO remove

            setFirstTimeEnter(false);
        }

                         //          console.log("in-prac-shell, allPieceData = ", allPieceData);


console.log("conv-node(from in-prac, enteringEmuGameDataTracker = ", enteringEmuGameDataTracker);


    }); //-- end of useEffect --




    function notUsing() {
      return "";
    }
    
    function passInResetSignalFalse() {        
      return false;
  }

    function buttonConsequenceByStatementEntireArray_QV(pieceNum, item) {
        console.log("game-screen-in-prac : buttonConsequenceByStatementEntireArray_QV");

        buttonConsequenceByStatementEntireArray(pieceNum, item, allPieceData, enteringEmuGameDataTracker, updatedGameDataTracker, notUsing);
    }

return (<div>


{/* //TODO51  */}

{/* //TODO53: confirm all-data-tracking layer's position 



*/}

   {allPieceData.length > 0 &&   <GameScreen_QuickView_ConvNode
                    isPreview={false}
                    isDisplay={true}  //ok (non-dynamic)
                    screenWidth={screenWidth}   //ok (non-dynamic)
                    screenHeight={screenHeight}   //ok (non-dynamic)

                    initialPieceNum={initialPieceNum}   //ok (non-dynamic)
                    allPieceContent={allPieceData} // ok (non-dynamic)

                    notifyNodeFinish={notifyNodeFinish}
                    
                    uiData1_textframe={nodeUITextFrame}
                    uiData2_defaultButtonOption={nodeUIDefaultButton}
                    uiData3_ConvNavigation={nodeUIConvNav}
                    uiData4_logPageSettings={nodeUILogPage}

                    visualMap={visualMap} //TODO empty so far
                    audioMap={audioMap} //TODO empty so far

                    gameData={enteringEmuGameDataTracker}

                    getResetSignal={passInResetSignalFalse} 
                    getResetInfoSets={notUsing} 

                    notifyAfterReset={notUsing}


                    buttonConsequenceByStatementEntireArray_QVC={buttonConsequenceByStatementEntireArray_QV}  //TODO 
                    
                    isViewMuted={mutedViewOption}
                    fetchGameSettingsForPlaying={fetchGameSettings}

                    openSettingPage={openSettingPage}

                    sendOutBgmSettings={sendOutBgmSettings}
                />
    }            

</div>);

}