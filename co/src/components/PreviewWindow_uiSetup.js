import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';


export default function PreviewWindow_uiSetup({dataObj, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, 
    getLogPageUISettings,
    getBackButtonUISettings, getScreenSize, getUIConvNav, 
    passInAudioList, passInVisualList,

    getUILanguage,
    
}) {
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const initialPieceNum = getCurrentPieceNum();
  

    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 
    
    const [audioMap, setAudioMap] = useState({}); //TODO ffuture feature
    const [visualMap, setVisualMap] = useState({}); 
  
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);

    const placeHolder = -1;
    const enteredgetLogPageUISettings = getLogPageUISettings();

    const [isShowLogScreen, setisShowLogScreen] = useState(false);

    useEffect(() => {


        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);
    
        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);


        let visualListTemp = passInVisualList();
        setVisualList(visualListTemp);

        let audioListTemp = passInAudioList();
        setAudioList(audioListTemp);


        if (audioMapSize < audioListTemp.length || visualMapSize < visualListTemp.length) {
            let i = 0;
            let tempAudioMap = {};
            setAudioMapSize(audioListTemp.length);
            for (;i < audioListTemp.length; i++) {
                let item = audioListTemp[i];
                tempAudioMap[item["var"]] = item["url"];
            }
            setAudioMap(tempAudioMap);

            i = 0;
            let tempVisualMap = {};
            setVisualMapSize(visualListTemp.length);
            for (;i < visualListTemp.length; i++) {
                let item = visualListTemp[i];
                tempVisualMap[item["var"]] = item["url"];
            }
            setVisualMap(tempVisualMap);
                                    console.log("!!! preview-w ui-set, visual-map = ", tempVisualMap);
      }


    });

    function notUsing() {
        console.log();
    }

    function passInVisualMap() {
        return visualMap;
    }

    function passInAudioMap() {
        return audioMap;
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
                            passInAudioMap={passInAudioMap}
                            passInVisualMap={passInVisualMap}
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
                            passInVisualMap={passInVisualMap}
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
                            passInVisualMap={passInVisualMap}
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
                            getVisualMap={passInVisualMap}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                        />

}


            </div>



            <br></br>
            <br></br>



        </div>
    
    );
}