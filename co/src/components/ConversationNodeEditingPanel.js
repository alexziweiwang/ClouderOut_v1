import * as React from 'react';
import styles from './webpage.css';
import { useState, useEffect } from 'react';

import PieceSetter from './PieceSetter';
import PieceManager from './PieceManager';
import ConvNodeUISetter from './ConvNodeUISetter';


import PreviewWindow_convNodeGameContent from './PreviewWindow_convNodeGameContent';
import PreviewWindow_convNodeUiSetup from './PreviewWindow_convNodeUiSetup';

import langDictionary from './_textDictionary';

import { emptyConvNodeSinglePieceTemplate, gameUIDefaultButtonTemplate, gameUITextFrameTemplate, gameUIBackButtonTemplate, uiConvNavTemplate, logPageUISettingsTemplate } from './_dataStructure_DefaultObjects';
import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';
import { sizeLookupMap, defaultScreenWidth, defaultScreenHeight } from './_dataStructure_DefaultObjects';

import { resourceRawListToUsableMap_vm } from '../viewmodels/PrepAc_Conversion';

//level2

export default function ConversationNodeEditingPanel({
        clickedNodeKey,  //TODO adjust for display-use
        chapterKey,  //TODO adjust for display-use
        projectName, //TODO adjust for display-use
        userName,  //TODO adjust for display-use

        screenSizeStr,  //TODO to dynamic

        initialCurrNodeEverything,

        getUiLangOption,

        getProjectResourceVarPairs,
        getGameDataDesignList,

        saveConvNodeUiPlanFunc,
        fetchConvNodeUiAllPlansFunc,

        saveCurrNodeEntire,
        backToGameMaker,

        saveBothObjToCloud_release,
        startQuickView_panel2,
}
) {



/*
format

    nodeData["nodeUISettings"]
    nodeData["nodeContent"]
    nodeData["nodeKey"]
    nodeData["chapterKey"]
    nodeData["nodeType"]
    

*/


/*
node-UI-settings format

    nodeUISettings["defaultButton"]
    nodeUISettings["textFrame"]
    nodeUISettings["backButton"]
    nodeUISettings["convNav"]
    nodeUISettings["logPage"]



*/




    const authEmailName = userName;

    let longKey = generateNodeLongKeyString_vm({chapterKey: chapterKey, nodeKey: clickedNodeKey});



// TODO here, keeps all sub-component's "unsaved local" data structures

    const [backendOption, setBackendOption] = useState("firebase"); //firebase / local?
    //TODO2000 add "platform option"? 
    //TODO     fetch from game-maker & add UI for choosing platform
    const [isBackendOptionCloud, setIsBackendOptionCloud] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    /**
used data structures:

single(current) node data (content + ui-settings) [chapter_key, node_key] <map of maps>
ProjectResourceVarPairs_audio  <map>   
ProjectResourceVarPairs_visual  <map>    
conv-node-ui-plans  <map>
GameDataDesign <map>

*/

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); // local-use



    
// console.log("ConversationNodeEditingPanel-state: ", state);//TODO test
 

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const returnGameMakerButtonText = textDictItem.returnGameMakerButtonText !== undefined ?
            textDictItem.returnGameMakerButtonText
            : textDictItemDefault.returnGameMakerButtonText;
    
    const resourceManagerButtonText = textDictItem.resourceManagerButtonText !== undefined ?
            textDictItem.resourceManagerButtonText
            : textDictItemDefault.resourceManagerButtonText;
    
    const gameDataManagerText = textDictItem.gameDataManagerButtonText !== undefined ?
            textDictItem.gameDataManagerButtonText
            : textDictItemDefault.gameDataManagerButtonText;

    const quickGameViewText = textDictItem.quickGameViewText !== undefined ?
            textDictItem.quickGameViewText
            : textDictItemDefault.quickGameViewText;
    
    const gameContentSetupText = textDictItem.gameContentSetupText !== undefined ?
            textDictItem.gameContentSetupText
            : textDictItemDefault.gameContentSetupText;
    
    const gameUIsetupText = textDictItem.gameUIsetupText !== undefined ?
            textDictItem.gameUIsetupText
            : textDictItemDefault.gameUIsetupText;

    const updateText = textDictItem.updateText !== undefined ?
            textDictItem.updateText
            : textDictItemDefault.updateText;

    const emuManagerText = textDictItem.emuManagerText !== undefined ?
            textDictItem.emuManagerText
            : textDictItemDefault.emuManagerText;
    
    const saveToCloudText = textDictItem.saveToCloudText !== undefined ?
            textDictItem.saveToCloudText
            : textDictItemDefault.saveToCloudText;

//TODO15

    const [pieceDataStructure, setPiecedataStructure] = useState(
        [

            // {"num": 1, "content": "", "displayTextFrame": false, "speaker_name": "", "bgp_source_varname": "", "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_preview": ["", 0, 0, 60, 120, 1], "chp_map": [], "chp_action": "maintainCharPicArr", "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [{"buttonText": 'a', "conseq": {'hp_001': {"name": "hp_001", "action": "plus", "newVal": "10", "type": "number"}}}], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 2, "content": "b2000222222222222222222222222222222222 ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_preview": ["", 0, 0, 60, 120, 1], "chp_map": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 3, "content": "sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_preview": ["", 0, 0, 60, 120, 1], "chp_map": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 4, "content": "d4000!!!!!!! ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_preview": ["", 0, 0, 60, 120, 1], "chp_map": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 5, "content": "e5000???????????????? ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_preview": ["", 0, 0, 60, 120, 1], "chp_map": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}
        
        ]
    ); //TODO testing *Important* later: load from cloud, with all detailed setting info
    // receive & send-out

    const [gameUIisDisplayDefaultButton, setGameUIisDisplayDefaultButton] = useState(true); // receive & send-out

//TODO600 test start --- 

    let gameUIDefaultButtonLocal = {};
    Object.keys(gameUIDefaultButtonTemplate).map((currKey) => {
        gameUIDefaultButtonLocal[currKey] = gameUIDefaultButtonTemplate[currKey];
    });
    const [gameUIDefaultButton, setGameUIDefaultButton] = useState(
        gameUIDefaultButtonLocal
    ); // receive & send-out


    let gameUITextFrameLocal = {};
    Object.keys(gameUITextFrameTemplate).map((currKey) => {
        gameUITextFrameLocal[currKey] = gameUITextFrameTemplate[currKey];
    });
    const [gameUITextFrame, setGameUITextFrame] = useState(
        gameUITextFrameLocal
    ); // receive & send-out
  
    
    let gameUIBackButtonLocal = {};
    Object.keys(gameUIBackButtonTemplate).map((currKey) => {
        gameUIBackButtonLocal[currKey] = gameUIBackButtonTemplate[currKey];
    });
    const [gameUIBackButton, setGameUIBackButton] = useState(
        gameUIBackButtonLocal
    ); // receive & send-out
  

    let uiConvNavLocal = {};
    Object.keys(uiConvNavTemplate).map((currKey) => {
        uiConvNavLocal[currKey] = uiConvNavTemplate[currKey];
    });
    const [uiConvNav, setUIConvNav] = useState(
        uiConvNavLocal
    ); // receive & send-out


    let logPageUISettingsLocal = {};
    Object.keys(logPageUISettingsTemplate).map((currKey) => {
        logPageUISettingsLocal[currKey] = logPageUISettingsTemplate[currKey];
    });  

    const [logPageUISettings, setLogPageUISettings] = useState(
        logPageUISettingsLocal
    ); // receive & send-out

//TODO600 test end --- 



    const [currBgmVol, setCurrBgmVol] = useState(90);

    const [isActionOnSetter, setIsActionOnSetter] = useState(true);

    const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
    const [needCloudGameData, setNeedCloudGameData] = useState(true);

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);//TODO99999 remove (Adjust to panel2-level)
    const [isDisplayQview, setIsDisplayQview] = useState(false);//TODO99999 remove (Adjust to panel2-level)
    const [isDisplayEmBool, setDisplayEmBool] = useState(false);//TODO99999 remove (Adjust to panel2-level)


    const [browseList, setBrowseList] = useState(true);
    const [pieceNumber, setPieceNumber] = useState(1); //TODO: this would be the current/"counter of" piece to fetch from db/ds
    const [previewingIndex, setPreviewingIndex] = useState(0);

    const [isDisplayNonPmTemp, setDisplayNonPmTemp] = useState(true);
    const [editingPmPreviewPiece, setEditingPmPreviewPiece] = useState({});

    const [isDisplayGameContentPreview, setIsDisplayGameContentPreview] = useState(true);

    const [gameUISetterOpen, setGameUISetterOpen] = useState(false);

    const [pmQuickEditModeOn, setPmQuickEditModeOn] = useState(false);



    const [testPlayerGameData, setTestPlayerGameData] = useState({});   //TODO important for holder-in-practice
    const [testPlayerGameDataDup, setTestPlayerGameDataDup] = useState({});   //TODO important for holder-in-practice
    const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                                 //TODO important for holder-in-practice
    const [testPlayerAccount, setTestPlayerAccount] = useState({});        

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");
    const [screenWidth, setScreenWidth] = useState(defaultScreenWidth);
    const [screenHeight, setScreenHeight] = useState(defaultScreenHeight);

    //TODO100
    const [audioMap, setAudioMap] = useState({}); //TODO for bgm on each nav-page -- future feature
    const [visualMap, setVisualMap] = useState({}); 


    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 


    const [gameDataDesignList, setGameDataDesignList] = useState({});                    /* Important */
 
    const [charaPicPrvw, setCharaPicPrvw] = useState(-1);
    
    const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
    //    console.log("testPlayerGameData = " , testPlayerGameData);

    
        let uiLangFromOuterCompo = getUiLangOption();
        setLanguageCodeTextOption(uiLangFromOuterCompo);


        if (firstTimeEnter === true) {

            if (authEmailName !== "_") {

                loadFromOuterLayer();

                                        //TODO99999

                                        
                                        // const item = {};
                                        // Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
                                        //     item[currKey] = emptyConvNodeSinglePieceTemplate[currKey];
                                        // });
                                        // setEditingPmPreviewPiece(item);



                setFirstTimeEnter(false);
            }
        } 
        



//         console.log("index = ", previewingIndex ,"\ncurr piece info: ", pieceDataStructure[ previewingIndex ]["stnd_btn_arr"]);
// //TODO1
    
    }); 
    
    
    useEffect(()=>{
        updateToOuter();
    }, [
        gameUIDefaultButton, 
        gameUITextFrame, 
        gameUIBackButton, 
        uiConvNav, 
        logPageUISettings, 
        pieceDataStructure
    ]);
    
    
    
    
    
    
    
    
    
    // --- useEffect ends here ---

                                                    


    function passInGameDataDesignList() {
        return gameDataDesignList;
    }


    function fetchGameDataDesignList() { 
        let gddList = getGameDataDesignList();
        if (gddList !== -1) {
            setGameDataDesignList(gddList);
        }

    }


    function fetchProjResourceLists() {


        /* fetch from cloud db */
        let obj = getProjectResourceVarPairs();

                                            console.log("conv-node-editor:   fetch-proj-resource-lists: ", obj);

        setAudioList(obj.audio);
        setVisualList(obj.visual);

        resetVisualMapFromList(obj.visual);
        resetAudioMapFromList(obj.audio)
    }

    function resetVisualMapFromList(visualList) { 
                            // let tempMap = {};

        resourceRawListToUsableMap_vm(visualList, setVisualMap);


                                    // let len = visualList.length;
                                    // let i = 0;
                                    // tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
                                    // tempMap[""] = '';
                                    // while (i < len) {
                                    //     let item = visualList[i];
                                    //     tempMap[item["var"]] = item["url"];
                                    //     i++;
                                    // }
                                    //                                 console.log("initialized visual map = ", tempMap); //TODO test

                                    // setVisualMap(tempMap);
    }

    function resetAudioMapFromList(audioList) {

        resourceRawListToUsableMap_vm(audioList, setAudioMap);

        // let tempMap = {};


        // let len = audioList.length;
        // let i = 0;
        // tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
        // tempMap[""] = '';
        // while (i < len) {
        //     let item = audioList[i];
        //     tempMap[item["var"]] = item["url"];
        //     i++;
        // }
        //                                 console.log("initialized audio map = ", tempMap); //TODO test
        
        // setAudioMap(tempMap);
    }

    function passInVisualMap() {
        return visualMap;
    }

    function passInAudioMap() {
        return audioMap;
    }

    function passInVisualList() {
        return visualList;
    }

    function passInAudioList() {
        return audioList;
    }

    function handleResourceManagerOpen() {
        setDisplayRmModal(true);
    }

    function handleModal_GameDataManagerOpen() {
        setDisplayGameDataWindow(true);
    }


    function handleResourceManagerCancel() {
        setDisplayRmModal(false);

        //TODO3 fetch laterst data from cloud?
        // setRmUpdatedSignal(true);
        
    }
    
    function handleEmuManagerCancel() {
        setDisplayEmBool(false);
    } 

    function handleResourceManagerSaveChanges() {
        console.log("modal save changes!");
        //TODO update to cloud db
        setDisplayRmModal(false);
    }

    function switchListEditor() {
        setBrowseList(!browseList);
    }

    //TODO21 refactor to VM
    function getSelectedPiece(num) {
        setPieceNumber(num);
        let tempArr = pieceDataStructure;
        tempArr.sort((a, b) => a.num - b.num);
        setPiecedataStructure(tempArr);
        switchListEditor();
    }

    function changePieceData(updatedPieceData) {
       // console.log("!!! in editing-panel: changePieceData ...", updatedPieceData); //TODO test
        setPiecedataStructure(updatedPieceData);
        //TODO update to cloud
    }

    function getUpdatePreviewingIndex(index) {
        console.log("conv-edit-panel, getUpdatePreviewingIndex:" , index); 
        setPreviewingIndex(index);

    }

    function returnToList() {
        setBrowseList(!browseList);
    }

    function updateTextFrameUISettings(data) {
        setGameUITextFrame(data);
    }

    function updateDefaultButtonUISettings(data) {
        setGameUIDefaultButton(data);        
    }

    function updateIsDisplayDefaultButtonPreviewSetting(val) {
        setGameUIisDisplayDefaultButton(val);
    }

    function updateBackButtonUISettings(data) {
        setGameUIBackButton(data);
    }

    function updateConvNavSettings(data) {
        setUIConvNav(data);
    }

    function updateConvLogUISettings(data) {
        setLogPageUISettings(data);
    }

    function passInDefaultButtonUISettings() {
        return gameUIDefaultButton;
    }

    function passInTextFrameUISettings() {
        return gameUITextFrame;
    }

    function passInIsDisplayDefaultButton() {
        return gameUIisDisplayDefaultButton;
    }

    function passInBackButtonUISettings() {
        return gameUIBackButton;
    }

    function passInAllPieceDataContent() {
        if (pieceDataStructure === undefined || pieceDataStructure === null) {
            return [];
        } else {
                          //          console.log("all-piece = ", pieceDataStructure);
            return pieceDataStructure;
        }
    }

    function passInCurrentPieceNum() {
        return previewingIndex;
    }

    function passInUIConvNav() {
        return uiConvNav;
    }

    function passInLogPageUISettings() {
        return logPageUISettings;
    }

    function changeselectedGameScreenSizeSetting(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
            if (input === "16:9(horizonal)"
                    || input === "16:9(vertical)"
                    || input === "4:3(horizonal)"
                    ||input === "4:3(vertical)") {
                setSelectedGameScreenSize(input);
            } else {
                console.log("not selected!");
            }
        }
    }

    function updateGameSizeSetting() {
        console.log("new game size setting:", selectedGameScreenSize);
        //TODO design: each node and have one size, and different nodes can have various sizes?
        let respondGiven = window.confirm("Please note that changing game-size would impact current visual elements on each piece and would require adjustments. Click [ok] to continue size-changing, or [cancel].");
          if (respondGiven) {
          
            if (selectedGameScreenSize === "16:9(horizonal)"
                || selectedGameScreenSize === "16:9(vertical)"
                || selectedGameScreenSize === "4:3(horizonal)"
                || selectedGameScreenSize === "4:3(vertical)"
            ) {
                let w = sizeLookupMap[selectedGameScreenSize][0];
                let h = sizeLookupMap[selectedGameScreenSize][1];
                setScreenWidth(w);
                setScreenHeight(h);
            }

        } 
    } 

    function updateConvNavSettings(data) {
        setUIConvNav(data);
    }
 

    function passInScreenSize() {
        let pair = [];
        pair.push(screenWidth);
        pair.push(screenHeight);
        return pair;
    }

    function handleModal_GameDataManagerCancel() {
        setDisplayGameDataWindow(!displayGameDataWindow);
    }


    function markNextNeedCloudGameData() {
        setNeedCloudGameData(true);
    }


 

    function triggerToDirectNextFunc() {
        //from preview window: make pieceNum to be the next for PieceSetter and PieceManager...
        //TODO1
        let currentIndex = previewingIndex;
        let len = pieceDataStructure.length;
        if (currentIndex + 1 < len) {
            setPreviewingIndex(currentIndex+1);
    
        } else {
            setPreviewingIndex(len-1);

        }
    }

    function passInUserClickSideIsOnSetter() {
        return isActionOnSetter;
    }

    function triggerRefresh() {
        setFirstTimeEnter(true);
    }


    function resetRmUpdatedSignal() {
        setRmUpdatedSignal(false);
    }

    function passInRmUpdatedSignal() {
        let val = rmUpdatedSignal;
        return val;
    }

    function passInNewGameDataList() {
        return gameDataDesignList;
    }


    //TODO21 refactor to VM
    function getUserConfigFromEmuManager1Gdt(data1) {  //recreate emu data object
        //update data1 to be the new Game-Data-Tracker

                                                console.log("conv-node-editor, getUserConfigFromEmuManager1Gdt-func, from emu-manger... \n", 
                                                data1);
                                                //data1["hp_001"]["current_value"]
        //TODO make dup here

        let tempObj = {};
        let tempObjDup = {};
        {Object.keys(data1).map((currKey) => {
            let name = data1[currKey]["name"];
            let defaultVal = data1[currKey]["default_value"];
            let dataType =data1[currKey]["data_type"];
            let currVal = data1[currKey]["current_value"];

            let obj = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let obj2 = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let keyStr = currKey;
            tempObj[keyStr] = obj;
            tempObjDup[keyStr] = obj2;
        })} 

        setTestPlayerGameData(tempObj);

        setTestPlayerGameDataDup(tempObjDup);
    }


    //TODO21 refactor to VM
    function resetPlayerProfileDataDup() { //recreate emu data object
        let tempObjDup1 = {};
        let tempObjDup2 = {};
        {Object.keys(testPlayerGameData).map((currKey) => {
            let name = testPlayerGameData[currKey]["name"];
            let defaultVal = testPlayerGameData[currKey]["default_value"];
            let dataType = testPlayerGameData[currKey]["data_type"];
            let currVal = testPlayerGameData[currKey]["current_value"];


            let obj1 = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let obj2 = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let keyStr = currKey;

            tempObjDup1[keyStr] = obj1;
            tempObjDup2[keyStr] = obj2;

        })} 

        setTestPlayerGameDataDup(tempObjDup1);
        return tempObjDup2;
    }
    
    function getUserConfigFromEmuManager2Epp(data2) {
        //update data2 to be the new Emu-Player-Profile
        //TODO  //recreate emu data object
        setTestPlayerProfile(data2);
    }
    
    function getUserConfigFromEmuManager3Epa(data3) {
        //update data3 to be the new Emu Player Account
        //TODO  //recreate emu data object
        setTestPlayerAccount(data3);
    }

    function getUserConfigFromEmuManager4Ess(data4) {
        //TODO update data4 to be the new Emu SL slots
         //TODO  //recreate emu data object
    }


    function handleqvCancel() {
        setIsDisplayQview(false);

        resetPlayerProfileDataDup();
    }

    function passInUILanguage() {
        return languageCodeTextOption;
        
    }

    function notUsing() {
        return;
    }

    function resetQuickView () { 
        let arr = [];
        arr.push(previewingIndex);

        let newPPDup = resetPlayerProfileDataDup();
        arr.push(newPPDup);

        return arr;

//TODO5
    } 

    function updateToOuter() { //TODO100 important

        let uiObj = {
            "defaultButton": gameUIDefaultButton,
            "textFrame": gameUITextFrame,
            "backButton": gameUIBackButton,
            "convNav": uiConvNav,
            "logPage": logPageUISettings
        }; 

        //gameUIDefaultButton, gameUITextFrame, gameUIBackButton, uiConvNav, logPageUISettings
        let typeStr = "Conversation";

        let nodeObj = {
            "nodeUISettings": uiObj,
            "nodeContent": pieceDataStructure,
            "nodeKey": clickedNodeKey,
            "chapterKey": chapterKey,
            "nodeType": typeStr
        };
 

        saveCurrNodeEntire(nodeObj, longKey);

    }

    function relieveLoading() {
        setIsLoading(false);
    }

    async function saveAllToCloud() {
        setIsLoading(true);
        updateToOuter();
        await saveBothObjToCloud_release(relieveLoading);
    }

    function initializeNodeBothParts() { //important
                                    console.log("!!!!!!!, init: ",chapterKey, " - ", clickedNodeKey);
        
                                    console.log("!!! conv-editor: initialize piece data... ", initialCurrNodeEverything);

        if (initialCurrNodeEverything === undefined 
            || initialCurrNodeEverything === null 
            || initialCurrNodeEverything.length === 0
            || initialCurrNodeEverything.nodeContent === undefined
            || initialCurrNodeEverything.nodeUISettings === undefined
            ) {
            returnWithWarning();
        } else {
            let nodeContentTemp = initialCurrNodeEverything.nodeContent;
            setPiecedataStructure(nodeContentTemp);
    
            let nodeUITemp = initialCurrNodeEverything.nodeUISettings;
    
            setGameUIDefaultButton(nodeUITemp.defaultButton !== undefined ? nodeUITemp.defaultButton : {})
            setGameUITextFrame(nodeUITemp.textFrame !== undefined ? nodeUITemp.textFrame : {})
            setGameUIBackButton(nodeUITemp.backButton !== undefined ? nodeUITemp.backButton : {})
            setUIConvNav(nodeUITemp.convNav !== undefined ? nodeUITemp.convNav : {})
            setLogPageUISettings(nodeUITemp.logPage !== undefined ? nodeUITemp.logPage: {})
           
        }




    } 

    function returnWithWarning() {
        //setPiecedataStructure([]);

        //alert("Unable to enter for this node: [", clickedNodeKey, "]. ");
        console.log("\t problem at conv-node-editor: ", initialCurrNodeEverything);
        backToGameMaker();
        
        return;


    }


    function notifyRmUpdated(data) {
 //TODO100 update the visual+audio maps here?

 console.log("rm updated... (conv-node-editor) ",  data);
 //passInVisualMap()       passInAudioMap()

//rm-mapping-required: 

                                                    // <Piece_Setter> (changed to be pass-in-strategy)
                                                    // <ConvNodeUI_Setter> (changed to be pass-in-strategy)
// < PreviewWindow_convNodeGameContent> [//TODO105 refactored, to test]
// < PreviewWindow_convNodeUiSetup> [//TODO105 refactored, to test]

// < AllPanels_QuickView_ConvNode > [//TODO105 refactored, to test]


        let audioListTemp = data.audio;
        let visualListTemp = data.visual;

        setAudioList(audioListTemp);
        setVisualList(visualListTemp);

        resetVisualMapFromList(visualListTemp);
        resetAudioMapFromList(audioListTemp);   



    }

    function loadFromOuterLayer() { //resource & pieces
        fetchProjResourceLists();
        initializeNodeBothParts();
        
        fetchGameDataDesignList();

    }



    
//TODO107
    function receiveBgmVol(value) {
        setCurrBgmVol(value);

    }

    function passInBgmVol() {
        return currBgmVol;
    }
    
    function passInDisplayPreviewScreen() {
        return isDisplayNonPmTemp;
    }

    function triggerPreviewScreenOff() {
        setDisplayNonPmTemp(false);
    }

    function triggerPreviewScreenOn() {
        setDisplayNonPmTemp(true);
    }

    function getPmEditingPieceFromSubCompo(piece) {
        setEditingPmPreviewPiece(piece);
    }

    function passInPmEditingPreviewPiece() {
        return editingPmPreviewPiece;
    }

    function triggerPmQuickEditModeOn() {
        setPmQuickEditModeOn(true);
    }

    function triggerPmQuickEditModeOff() {
        setPmQuickEditModeOn(false);

    }

    function openSettingPage() {
        window.alert("This button pops the \"Settings Page\" during an actual game-play.");
    }

    function getPrvwCharaPicFromSubCompo(data) {
        setCharaPicPrvw(data);

    }

    function passInCharaPicPrvw() {
        return charaPicPrvw;
    }

    function updateConvNodeUiPlanToOuter(allPlansMap) {

        saveConvNodeUiPlanFunc(allPlansMap);
    }

    function fetchConvNodeUiPlansFromOuter() {
        let obj = fetchConvNodeUiAllPlansFunc();

        if (obj === undefined) {
            return -1;
        }

        return obj;
    }

    function convUiHoverPreviewPlans(item) {

        setGameUITextFrame(item.textFrame);
        setGameUIDefaultButton(item.defaultButton);
        setGameUIBackButton(item.backButton);
        setUIConvNav(item.convNav);
        setLogPageUISettings(item.logPage);

        
        // "defaultButton"
        // "textFrame"
        // "backButton"
        // "convNav"
        // "logPage"


        //gameUITextFrame
        //gameUIDefaultButton
        //gameUIBackButton
        //logPageUISettings
        //uiConvNav

    }

    function passInUsername() {
        return authEmailName;
    }




    function getUserConfigFromDataMgr1Gdt() {
//TODO5000!!!

    }

    function updateGameDataDesignList() {
    //TODO999 update game-data-design-list

    }



    function startQuickViewing() {
        let obj = {};
        obj["nodeKey"] = longKey;
        obj["nodeType"] = "Conversation";
        obj["entryPointNum"] = previewingIndex;



        //TODO add needed info for q-viewing


            // allPieceContent={pieceDataStructure}

         
            // screenWidth={screenWidth}
            // screenHeight={screenHeight}

            // getAudioMap={passInAudioMap}
            // getVisualMap={passInVisualMap}
        
            // getUILanguage={passInUILanguage}

            // initialEmuGameDataTracker={testPlayerGameDataDup}
                    
            // resetViewing={resetQuickView}
            // openSettingPage={openSettingPage}


        startQuickView_panel2(obj);

//TODO99999 reflect to panel2!
        setIsDisplayQview(true);

    }
    
          

{/* components:

        1. editor- [PieceSetter> or <ConvNodeUISetter>
        2. editor- [PieceManager> or <ConvNodeUISetter>
        3. editor- [PreviewWindow_convNodeGameContent> or <PreviewWindow_convNodeUiSetup>
        4. modal_resource- [Modal_ResourceManagingWindow>
        5. modal_game_data_manager- [Modal_GameDataManager>
        6. modal_emu_manager- [Modal_EmuManager>
        6. quick_view- [AllPanels_QuickView_ConvNode>

*/}



//return(
    return ( 

        <div
            className="textNoSelect"
        >
            

{projectName !== null && 
<>
            <div className="parallelFrame" style={{"marginTop": "-5px"}}>
              

                <div className="topParalBarLeftPart">
                <>
                        <button className="button testEntire"
                            onClick={()=>{
                                startQuickViewing();
                            }}>
                                {quickGameViewText}
                        </button>      
                    </>

              
                </div>



                <div style={{"height": "45px", "width": "900px"}}>
            
                    <button
                        onClick={()=>{
                            saveAllToCloud();
                        }}
                    >{saveToCloudText}</button>

                    <button className={isDisplayGameContentPreview === true ? "topBarTabSelected" : "topBarTab"} onClick={()=>{
                        setIsDisplayGameContentPreview(true); 
                        setGameUISetterOpen(false);
                    }}>
                        {gameContentSetupText}</button>


                    <button className={isDisplayGameContentPreview === false? "topBarTabSelected": "topBarTab"} onClick={()=>{
                        setIsDisplayGameContentPreview(false); 
                        setGameUISetterOpen(true);
                        setPmQuickEditModeOn(false);
                    }}>
                        {gameUIsetupText}</button>

                
                    <>
                        <select value={selectedGameScreenSize} onChange={changeselectedGameScreenSizeSetting}>
                            <option value="" key=""> ----- Select Size and Direction ----- </option>
                            <option value="16:9(horizonal)" key="conv-editor-16:9(horizonal)"> 16:9 (horizontal) </option>
                            <option value="16:9(vertical)" key="conv-editor-16:9(vertical)"> 16:9 (vertical) </option>
                            <option value="4:3(horizonal)" key="conv-editor-4:3(horizonal)"> 4:3 (horizontal) </option>
                            <option value="4:3(vertical)" key="conv-editor-4:3(vertical)"> 4:3 (vertical) </option>

                        </select>
                        <button onClick={()=>{updateGameSizeSetting();}}>{updateText}</button>
                    </>


              
                </div>
             
            </div>

{
            <div 
                className={isDisplayQview === true ? "noScrolling" : ""} 
                style={{
                    "display": "flex",
                    "backgroundColor": "rgb(124, 129, 124)",
                    "height": "652px"
                    
                }}
            >


{/* editor-left-part */}
            
            <div
                    style={{"maxHeight": `${screenHeight+1}px`,  "marginTop": "16px"}}
            >
                {gameUISetterOpen === false &&
                <>
                    {(browseList === false) && 
                        <PieceSetter 
                            pieceNum={previewingIndex+1} 
                            assignPreviewIndex={getUpdatePreviewingIndex} 
                            allPieceData={pieceDataStructure} 
                            updatePieceData={changePieceData} 
                            getAllPieceData={passInAllPieceDataContent} 
                            backToList={returnToList} 
                            gameDataList={gameDataDesignList} 
                            openRm={handleResourceManagerOpen}
                            openGameDataManager={handleModal_GameDataManagerOpen}

                            setIsClickedOnSetters={setIsActionOnSetter}
                            fetchClickedIsOnSetter={passInUserClickSideIsOnSetter}

                            getCurrentPieceNum={passInCurrentPieceNum}
                            fetchRmUpdatedSignal={passInRmUpdatedSignal}
                            respondUpdatedRm={resetRmUpdatedSignal}

                            getVisualList={passInVisualList}
                            getAudioList={passInAudioList}
                            getGameDataDesignList={passInGameDataDesignList}

                            getUILanguage={passInUILanguage}
                            username={userName} 
                            projName={projectName} 
                            sendOutBgmVol={receiveBgmVol}   

                            sendOutPrvwCharaPic={getPrvwCharaPicFromSubCompo}
                        />}
                
                    {(browseList === true) && 
                        <PieceManager 
                            allPieceData={pieceDataStructure} 
                            assignPieceNum={getSelectedPiece} 
                            assignPreviewIndex={getUpdatePreviewingIndex} 
                            updatePieceData={changePieceData} 
                            getAllPieceData={passInAllPieceDataContent}
                            setIsClickedOnSetters={setIsActionOnSetter}
                            fetchClickedIsOnSetter={passInUserClickSideIsOnSetter}
                            getCurrentPieceNum={passInCurrentPieceNum}
                            getScreenSize={passInScreenSize}

                            getUILanguage={passInUILanguage}
                            triggerPreviewScreenOff={triggerPreviewScreenOff}
                            triggerPreviewScreenOn={triggerPreviewScreenOn}
                            sendPmEditingPiece={getPmEditingPieceFromSubCompo}

                            triggerPmQuickEditModeOn={triggerPmQuickEditModeOn}
                            triggerPmQuickEditModeOff={triggerPmQuickEditModeOff}

                    />}  
                
                </>}

                                                                        {/* {(gameUISetterOpen === true && browseList === false) &&  //TODO remove later*/}
                {(gameUISetterOpen === true) && 

                        <ConvNodeUISetter 
                            iniDefaultButtonObj={gameUIDefaultButton} 
                            iniTxtFrameObj={gameUITextFrame} 
                            iniMenuButtonObj={gameUIBackButton}
                            iniConvNavObj={uiConvNav}
                            iniCovLogObj={logPageUISettings}
                            openRm={handleResourceManagerOpen} 
                            updateTextFrameUISettings={updateTextFrameUISettings} 
                            updateDefaultButtonSettings={updateDefaultButtonUISettings} 
                            updateIsDisplayDefaultButtonPreview={updateIsDisplayDefaultButtonPreviewSetting} 
                            updateBackButtonSettings={updateBackButtonUISettings}
                            updateConvNavSettings={updateConvNavSettings}
                            updateConvLogUISettings={updateConvLogUISettings}
                            fetchRmUpdatedSignal={passInRmUpdatedSignal}
                            respondUpdatedRm={resetRmUpdatedSignal}

                            getAudioMap={passInAudioMap}
                            getVisualMap={passInVisualMap}

                            getUILanguage={passInUILanguage}
                            username={userName} 
                            projName={projectName}   
                            
                            updateConvNodeUiPlanToOuter={updateConvNodeUiPlanToOuter}
                            fetchConvNodeUiPlansFromOuter={fetchConvNodeUiPlansFromOuter}
                            convUiHoverPreviewPlans={convUiHoverPreviewPlans}

                    />}
                 
            </div> 



{/* editor-right-part                       */}
{pmQuickEditModeOn === false && <>

    {/* game-content-preview screen */}
            {(isDisplayGameContentPreview === true) && 
                <PreviewWindow_convNodeGameContent
                    getDisplayNonPmTemp={passInDisplayPreviewScreen}
                    getPmEditingPreviewPiece={passInPmEditingPreviewPiece}
                    dataObj={pieceDataStructure[previewingIndex]} 
                    initialAllPieceData={pieceDataStructure}
                    getAllPieceContent={passInAllPieceDataContent}
                    getCurrentPieceNum={passInCurrentPieceNum}
                    getTextFrameUISettings={passInTextFrameUISettings} 
                    getDefaultButtonUISettings={passInDefaultButtonUISettings} 
                    getIsDisplayDefaultButton={passInIsDisplayDefaultButton} 
                    getBackButtonUISettings={passInBackButtonUISettings}
                    getLogPageUISettings={passInLogPageUISettings}
                    getScreenSize={passInScreenSize}
                    triggerToDirectNext={triggerToDirectNextFunc}
                    setIsClickedOnSetters={setIsActionOnSetter}
                    getUIConvNav={passInUIConvNav}

                    getUILanguage={passInUILanguage}

                    getVisualMap={passInVisualMap}
                    getAudioMap={passInAudioMap}
                    //TODO receive bgm-volume

                    getCharaPicPrvw={passInCharaPicPrvw}

                                            //TODO later: se-volume
                                            //TODO later: voiceline-volume

                    
                    username={userName}
                    projName={projectName}
                />
            }

    {/* ui-setup-preview screen */}
            {(isDisplayGameContentPreview === false) && 
                <PreviewWindow_convNodeUiSetup
                    dataObj={pieceDataStructure[previewingIndex]} 
                    initialAllPieceData={pieceDataStructure}
                    getAllPieceContent={passInAllPieceDataContent}
                    getCurrentPieceNum={passInCurrentPieceNum}
                    getTextFrameUISettings={passInTextFrameUISettings} 
                    getDefaultButtonUISettings={passInDefaultButtonUISettings} 
                    getIsDisplayDefaultButton={passInIsDisplayDefaultButton} 
                    getBackButtonUISettings={passInBackButtonUISettings}
                    getLogPageUISettings={passInLogPageUISettings}
                    getScreenSize={passInScreenSize}
                    getUIConvNav={passInUIConvNav}

                    getUILanguage={passInUILanguage}

                    getVisualMap={passInVisualMap}
                    getAudioMap={passInAudioMap}

                    username={userName}
                    projName={projectName}
                />
            }
</>}

 
            </div>
}



{/* loading cover */}
{isLoading === true 
        && <div className="displayBlock modalBackboard">
                    {/* <div className="modalArea"> */}

                    {/* </div> */}
        </div>}


    </>}            

        <br></br>





{/* {firstEnterButtonPressed === false && 
                <div
                
                >


                    <button onClick={()=>{
                        setFirstEnterButtonPressed(true);
                    }}>Load Editor</button>
                </div>
} */}

        </div>
    );
}








    //gameUIDefaultButton =
        // {
        //     "widthMin": gameUIDefaultButtonTemplate["widthMin"],
        //     "widthMax": gameUIDefaultButtonTemplate["widthMax"],
        //     "height": gameUIDefaultButtonTemplate["height"],
        //     "cornerRadius": gameUIDefaultButtonTemplate["cornerRadius"],
        //     "transparency": gameUIDefaultButtonTemplate["transparency"],
        //     "isShape": gameUIDefaultButtonTemplate["isShape"],
        //     "bgColor": gameUIDefaultButtonTemplate["bgColor"],
        //     "picVar": gameUIDefaultButtonTemplate["picVar"],
        //     "textColor": gameUIDefaultButtonTemplate["textColor"],
        //     "margin": gameUIDefaultButtonTemplate["margin"],
        //     "justifyContent": gameUIDefaultButtonTemplate["justifyContent"],
        //     "alignItems": gameUIDefaultButtonTemplate["alignItems"],
        //     "border": gameUIDefaultButtonTemplate["border"],
        //     "textSize": gameUIDefaultButtonTemplate["textSize"],
        //     "groupX": gameUIDefaultButtonTemplate["groupX"],
        //     "groupY": gameUIDefaultButtonTemplate["groupY"],
        //     "horizontalMid": gameUIDefaultButtonTemplate["horizontalMid"],
        //     "verticalMid": gameUIDefaultButtonTemplate["verticalMid"],

        //     "fontName": gameUIDefaultButtonTemplate["fontName"],
        //     "isFontItalic": gameUIDefaultButtonTemplate["isFontItalic"],
        // }


    //gameUITextFrame
        // {
        // "width": gameUITextFrameTemplate["width"],
        // "height": gameUITextFrameTemplate["height"],
        // "positionX": gameUITextFrameTemplate["positionX"],
        // "positionY": gameUITextFrameTemplate["positionY"],
        // "cornerRadius": gameUITextFrameTemplate["cornerRadius"],
        // "transparency": gameUITextFrameTemplate["transparency"],
        // "isShape": gameUITextFrameTemplate["isShape"],
        // "bgColor": gameUITextFrameTemplate["bgColor"],
        // "picVar": gameUITextFrameTemplate["picVar"],
        // "fontName": gameUITextFrameTemplate["fontName"],
        // "textSize": gameUITextFrameTemplate["textSize"],
        // "textColor": gameUITextFrameTemplate["textColor"],
        // "justifyContent": gameUITextFrameTemplate["justifyContent"],
        // "alignItems": gameUITextFrameTemplate["alignItems"],
        // "border": gameUITextFrameTemplate["border"],
        // "horizontalMid": gameUITextFrameTemplate["horizontalMid"],
        // "TextContentArea-x": gameUITextFrameTemplate["TextContentArea-x"],
        // "TextContentArea-y": gameUITextFrameTemplate["TextContentArea-y"],
        // "TextContentArea-w": gameUITextFrameTemplate["TextContentArea-w"],
        // "TextContentArea-h": gameUITextFrameTemplate["TextContentArea-h"],
        // }        

  //gameUIBackButton
        // {
        // "width": gameUIBackButtonTemplate["width"],
        // "height": gameUIBackButtonTemplate["height"],
        // "cornerRadius": gameUIBackButtonTemplate["cornerRadius"],
        // "transparency": gameUIBackButtonTemplate["transparency"],
        // "isShape": gameUIBackButtonTemplate["isShape"],
        // "bgColor": gameUIBackButtonTemplate["bgColor"],
        // "picVar": gameUIBackButtonTemplate["picVar"],
        // "textColor": gameUIBackButtonTemplate["textColor"],
        // "buttonText": gameUIBackButtonTemplate["buttonText"],
        // "textSize": gameUIBackButtonTemplate["textSize"],
        // "borderColor": gameUIBackButtonTemplate["borderColor"],
        // "borderSize": gameUIBackButtonTemplate["borderSize"],
        // "posX": gameUIBackButtonTemplate["posX"],
        // "posY": gameUIBackButtonTemplate["posY"],
        // "fontName": gameUIBackButtonTemplate["fontName"],
        // }

 //uiConvNav
    // {
    //     "buttonAutoIsTextFont": uiConvNavTemplate["buttonAutoIsTextFont"],
    //     "buttonAutoShade0": uiConvNavTemplate["buttonAutoShade0"],
    //     "buttonAutoPicName0": uiConvNavTemplate["buttonAutoPicName0"],
    //     "buttonAutoShade1": uiConvNavTemplate["buttonAutoShade1"],
    //     "buttonAutoPicName1": uiConvNavTemplate["buttonAutoPicName1"],
    //     "buttonAutoFontName": uiConvNavTemplate["buttonAutoFontName"],
    //     "buttonAutoFontItalic": uiConvNavTemplate["buttonAutoFontItalic"],
    //     "buttonAutoDisplayText0": uiConvNavTemplate["buttonAutoDisplayText0"],
    //     "buttonAutoDisplayText1": uiConvNavTemplate["buttonAutoDisplayText1"],
    //     "buttonLogDisplayText": uiConvNavTemplate["buttonLogDisplayText"],
    //     "buttonSetupDisplayText": uiConvNavTemplate["buttonSetupDisplayText"],

    //     "buttonLogIsTextFont": uiConvNavTemplate["buttonLogIsTextFont"],
    //     "buttonLogShade": uiConvNavTemplate["buttonLogShade"],
    //     "buttonLogPicName":  uiConvNavTemplate["buttonLogPicName"],
    //     "buttonLogShade": uiConvNavTemplate["buttonLogShade"],
    //     "buttonLogPicName": uiConvNavTemplate["buttonLogPicName"],
    //     "buttonLogFontName": uiConvNavTemplate["buttonLogFontName"],
    //     "buttonLogFontItalic": uiConvNavTemplate["buttonLogFontItalic"],

    //     "buttonSetupIsTextFont": uiConvNavTemplate["buttonSetupIsTextFont"],
    //     "buttonSetupShade": uiConvNavTemplate["buttonSetupShade"],
    //     "buttonSetupPicName":  uiConvNavTemplate["buttonSetupPicName"],
    //     "buttonSetupShade": uiConvNavTemplate["buttonSetupShade"],
    //     "buttonSetupPicName": uiConvNavTemplate["buttonSetupPicName"],
    //     "buttonSetupFontName": uiConvNavTemplate["buttonSetupFontName"],
    //     "buttonSetupFontItalic": uiConvNavTemplate["buttonSetupFontItalic"],

    //     "textDisplaySpeed": uiConvNavTemplate["textDisplaySpeed"],

    //     "groupX": uiConvNavTemplate["groupX"],
    //     "groupY": uiConvNavTemplate["groupY"],
    //     "groupWidth": uiConvNavTemplate["groupWidth"],
    //     "groupHeight": uiConvNavTemplate["groupHeight"],

    //     "cornerRadius": uiConvNavTemplate["cornerRadius"],
    // }        


 //logPageUISettings
    //     {
    //     "closeButtonIsShape": logPageUISettingsTemplate["closeButtonIsShape"],
    //     "closeButtonShade": logPageUISettingsTemplate["closeButtonShade"],
    //     "closeButtonPicName": logPageUISettingsTemplate["closeButtonPicName"],
    //     "closeButtonPositionX": logPageUISettingsTemplate["closeButtonPositionX"],
    //     "closeButtonPositionY": logPageUISettingsTemplate["closeButtonPositionY"],
    //     "closeButtonWidth": logPageUISettingsTemplate["closeButtonWidth"],
    //     "closeButtonHeight": logPageUISettingsTemplate["closeButtonHeight"],
    //     "closeButtonCornerRadius": logPageUISettingsTemplate["closeButtonCornerRadius"],
    //     "closeButtonBorderSize": logPageUISettingsTemplate["closeButtonBorderSize"],
    //     "closeButtonBorderColor": logPageUISettingsTemplate["closeButtonBorderColor"],
    //     "closeButtonText": logPageUISettingsTemplate["closeButtonText"],
    //     "closeButtonTextColor": logPageUISettingsTemplate["closeButtonTextColor"],
    //     "closeButtonFontName": logPageUISettingsTemplate["closeButtonFontName"],

    //     "bgpIsShape": logPageUISettingsTemplate["bgpIsShape"],
    //     "bgpShade": logPageUISettingsTemplate["bgpShade"],
    //     "bgpPicName": logPageUISettingsTemplate["bgpPicName"],

    //     "groupPosX": logPageUISettingsTemplate["groupPosX"],
    //     "groupPosY": logPageUISettingsTemplate["groupPosY"],
    //     "groupWidth": logPageUISettingsTemplate["groupWidth"],

    //     "groupItemGap": logPageUISettingsTemplate["groupItemGap"],

    //     "groupBgIsShape": logPageUISettingsTemplate["groupBgIsShape"],
    //     "groupBgShade": logPageUISettingsTemplate["groupBgShade"],
    //     "groupBgpName": logPageUISettingsTemplate["groupBgpName"],
        
    //     "groupUnitCornerRadius": logPageUISettingsTemplate["groupUnitCornerRadius"],

    //     "contentTextShade": logPageUISettingsTemplate["contentTextShade"],
    //     "contentTextSize": logPageUISettingsTemplate["contentTextSize"],
    //     "contentTextFont": logPageUISettingsTemplate["contentTextFont"],
    //     "contentPosX": logPageUISettingsTemplate["contentPosX"],
    //     "contentPosY": logPageUISettingsTemplate["contentPosY"],

    //     "speakerTextShade": logPageUISettingsTemplate["speakerTextShade"],
    //     "speakerTextSize": logPageUISettingsTemplate["speakerTextSize"],
    //     "speakerTextFont": logPageUISettingsTemplate["speakerTextFont"],
    //     "speakerPosX": logPageUISettingsTemplate["speakerPosX"],
    //     "speakerPosY": logPageUISettingsTemplate["speakerPosY"],
    // }    