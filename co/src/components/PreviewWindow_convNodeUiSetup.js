import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';


export default function PreviewWindow_convNodeUiSetup({dataObj, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, 
    getLogPageUISettings,
    getBackButtonUISettings, getScreenSize, getUIConvNav, 

    getVisualMap, getAudioMap,

    getUILanguage,

    username, projName,

    
}) {
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const initialPieceNum = getCurrentPieceNum();

    const [audioMap, setAudioMap] = useState({}); //TODO future feature
    const [visualMap, setVisualMap] = useState({}); 


    const placeHolder = -1;
    const enteredgetLogPageUISettings = getLogPageUISettings();

    const [isShowLogScreen, setisShowLogScreen] = useState(false);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        if (firstTimeEnter === true) {

                    

            setFirstTimeEnter(false);
    
        }

        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);
    
        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);

        let visMap = getVisualMap();
        setVisualMap(visMap);
        let auMap = getAudioMap();
        setAudioMap(auMap);
  

    }); // --- end of useEffect ---


    function notUsing() {
        console.log();
    }

    function notUsing() {
        console.log();
    }

    function passInIsDisplayConvLog() {
        return isShowLogScreen;
    }

    function triggerLogOpen() {
        setisShowLogScreen(true);
    }


    function triggerLogClose() {
        setisShowLogScreen(false);
    }    

    return(
    <div className="previewWindow">

            
            <div className="previewArea2"
                style={{
                    "height": `${screenHeight}px`,
                    "width": `${screenWidth}px`,
                }}
            >
{initialAllPieceData.length > 0 && 
<>


                {<div 
                    style={{
                        "display": !isShowLogScreen ? "flex" : "none"
                    }}>
                        
                        <GameUI_2ButtonsPreview 
                            isSettingUpUI={true}
                            initialAllPieceData={initialAllPieceData}
                            getAllPieceContent={getAllPieceContent}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getIsDisplayDefaultButton={getIsDisplayDefaultButton} 
                            getDefaultButtonUISettings={getDefaultButtonUISettings} 
                            getBackButtonUISettings={getBackButtonUISettings}
                            getScreenSize={getScreenSize}     
                            triggerNextPiece={notUsing}
                            getAudioMap={getAudioMap}
                            getVisualMap={getVisualMap}
                        />
                    
                        <GameUI_1TextFramePreview
                            isEditing={false}
                            dataObj={dataObj} 
                            initialAllPieceData={initialAllPieceData}
                            getAllPieceContent={getAllPieceContent}
                            getCurrentPieceNum={getCurrentPieceNum}
                            getTextFrameUISettings={getTextFrameUISettings}
                            isInGameView={false}
                            getIsDirectNextPiece={notUsing}
                            triggerNextPiece={notUsing}
                            triggerAutoMode={notUsing}
                            getVisualMap={getVisualMap}
                            getUIConvNav={getUIConvNav}

                        />


                        <GameUI_3ConvNavPreview
                            isSettingUpUI={false}
                            initialAllPieceData={initialAllPieceData}
                            getAllPieceContent={getAllPieceContent}
                            getCurrentPieceNum={getCurrentPieceNum}
                            triggerNextPiece={notUsing}
                            getScreenSize={getScreenSize}
                            getUIConvNav={getUIConvNav}
                            triggerAutoMode={notUsing}
                            isInGameView={false}
                            getVisualMap={getVisualMap}
                            triggerLogOpen={triggerLogOpen}
                        />
                </div>}


                {isShowLogScreen && 
                        <Modal_ConvNode_Log
                            allPieceContent={initialAllPieceData} 
                            initialPieceNum={initialPieceNum} 
                            getCurrPieceNum={getCurrentPieceNum} 
                            logPageUISettings={enteredgetLogPageUISettings}
                            getLogPageUISettings={getLogPageUISettings}
                            triggerLogPageClose={triggerLogClose}
                            getAllPieceContent={getAllPieceContent}
                            isQuickView={false}
                            isSettingUI={true}
                            visualMap={visualMap}
                            getVisualMap={getVisualMap}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                        />

}

</>}
            </div>



            <br></br>
            <br></br>

        

        </div>
    
    );
}