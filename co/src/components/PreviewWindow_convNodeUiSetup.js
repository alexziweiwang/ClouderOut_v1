import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUI_2ButtonsPreview from './GameUI_2ButtonsPreview';
import GameUI_1TextFramePreview from './GameUI_1TextFramePreview';
import GameUI_3ConvNavPreview from './GameUI_3ConvNavPreview';
import Modal_ConvNode_Log from './Modal_ConvNode_Log';

//TODO20 cloud-func
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function PreviewWindow_convNodeUiSetup({dataObj, initialAllPieceData, getAllPieceContent, 
    getCurrentPieceNum, getTextFrameUISettings, getIsDisplayDefaultButton, getDefaultButtonUISettings, 
    getLogPageUISettings,
    getBackButtonUISettings, getScreenSize, getUIConvNav, 

    getUILanguage,

    username, projName,

    
}) {
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);

    const initialPieceNum = getCurrentPieceNum();
  

    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 
    
    const [audioMap, setAudioMap] = useState({}); //TODO future feature
    const [visualMap, setVisualMap] = useState({}); 
  
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);

    const placeHolder = -1;
    const enteredgetLogPageUISettings = getLogPageUISettings();

    const [isShowLogScreen, setisShowLogScreen] = useState(false);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchProjResourceLists(); //TODO100 from out-layer?
            setFirstTimeEnter(false);
    
    console.log("preview-window ui-setup first-time entry, resource-list fetched."); //TODO test
        }

        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);
    
        let screenSizePair = getScreenSize();
        setScreenWidth(screenSizePair[0]);
        setScreenHeight(screenSizePair[1]);





        if (audioMapSize < audioList.length || visualMapSize < visualList.length) {
            let i = 0;
            let tempAudioMap = {};
            setAudioMapSize(audioList.length);
            for (;i < audioList.length; i++) {
                let item = audioList[i];
                tempAudioMap[item["var"]] = item["url"];
            }
            setAudioMap(tempAudioMap);

            i = 0;
            let tempVisualMap = {};
            setVisualMapSize(visualList.length);
            for (;i < visualList.length; i++) {
                let item = visualList[i];
                tempVisualMap[item["var"]] = item["url"];
            }
            setVisualMap(tempVisualMap);
      }


    });

    async function fetchProjResourceLists() {
        if (username === "default-no-state username" || projName === "default-no-state projectName") {
          return;
        }
        
        /* fetch from cloud db */
        //TODO22
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        // console.log("new render- piece preview: obj from cloud (resource list):"); //TODO test
        // console.log(obj); //TODO test
        setAudioList(obj.audio);
        setVisualList(obj.visual);
    }

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

</>}
            </div>



            <br></br>
            <br></br>

        

        </div>
    
    );
}