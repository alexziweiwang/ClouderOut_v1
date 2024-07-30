import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import Modal_ConvLog from './Modal_ConvLog';


export default function PreviewWindow_uiSetup({dataObj, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, 
    getInLogPageUISettings,
    getBackButtonUISettings, getScreenSize, getUIConvNav, 
    passInAudioList, passInVisualList
}) {

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
    const enteredGetInLogPageUISettings = getInLogPageUISettings();

    const [isShowLogScreen, setisShowLogScreen] = useState(false);

    useEffect(() => {
    
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
      }

    });

    function notUsing() {
        return "";
    }

    function passInVisualMap() {
        return visualMap;
    }

    function passInAudioMap() {
        return audioMap;
    }

    function notUsing() {
        return;
    }

    function passInIsDisplayConvLog() {
        return isShowLogScreen;
    }

    return(
    <div className="previewWindow">

            <div className="previewArea2"
                style={{"height": `${screenHeight}px`,"width": `${screenWidth}px`}}
            >

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
                />



            </div>
            <br></br>
            <br></br><br></br>

            {isShowLogScreen && <div className="previewArea2" style={{"height": `${screenHeight}px`,"width": `${screenWidth}px`}}>
                <Modal_ConvLog
                    allPieceContent={initialAllPieceData} 
                    initialPieceNum={initialPieceNum} 
                    getCurrPieceNum={getCurrentPieceNum} 
                    logPageUISettings={enteredGetInLogPageUISettings}
                    getInLogPageUISettings={getInLogPageUISettings}
                    triggerLogPageClose={notUsing}
                    getAllPieceContent={getAllPieceContent}
                    isQuickView={false}
                    getIsDisplay={passInIsDisplayConvLog}
                />

          
            </div>}

            <br></br>
            <br></br>



        </div>
    
    );
}