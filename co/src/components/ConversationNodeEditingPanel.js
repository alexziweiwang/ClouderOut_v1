import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PieceSetter from './PieceSetter';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_EmuManager from './Modal_EmuManager';


import PreviewWindow_gameContent from './PreviewWindow_gameContent';
import PreviewWindow_uiSetup from './PreviewWindow_uiSetup';
import QuickView_AllPanels_ConvNode from './QuickView_AllPanels_ConvNode';

import PieceManager from './PieceManager';
import GameUISetter from './GameUISetter';
import Modal_GameDataManager from './Modal_GameDataManager';
import langDictionary from './textDictionary';
import uiLangMap from './uiLangMap';


//TODO20 cloud-func (marked)
import { convSingleNodeUpdateToCloudVM, convNodeFetchFromCloudVM } from '../viewmodels/NodeEditingViewModel';


export default function ConversationNodeEditingPanel() {
// TODO here, keeps all sub-component's "unsaved local" data structures
 



    const navigate = useNavigate();
    const {state} = useLocation();
    let nodeName = "";
    let uname = "default-no-state username";
    let projectName = "default-no-state projectname";
    let screenSizeInfo = "default-no-state screenSizeInfo";
    let editorUiLang = "default-no-state uiLang";
    let chapterKey = "defualt-no-state chapterkey";
    let nodeKey = "default-node-state nodekey";
    if (state != null) {
        nodeName = state.clickedNodeKey;
        uname = state.userName;
        projectName = state.selected_project_name;
        screenSizeInfo = state.screenSizeStr;
        editorUiLang = state.uiLang;    
        chapterKey = state.chapterKey;
        nodeKey = state.clickedNodeKey;

    }

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');



    
// console.log("ConversationNodeEditingPanel-state: ", state);//TODO test
 

    const sizeLookupMap = { 
        "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]
    };


    const [isActionOnSetter, setIsActionOnSetter] = useState(true);

    const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
    const [needCloudGameData, setNeedCloudGameData] = useState(true);

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayQview, setIsDisplayQview] = useState(false);
    const [isDisplayEmBool, setDisplayEmBool] = useState(false);


    const [browseList, setBrowseList] = useState(true);
    const [pieceNumber, setPieceNumber] = useState(1); //TODO: this would be the current/"counter of" piece to fetch from db/ds
    const [previewingIndex, setPreviewingIndex] = useState(0);
    const [isDisplayGameContentPreview, setIsDisplayGameContentPreview] = useState(true);

    const [gameUISetterOpen, setGameUISetterOpen] = useState(false);

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

            // {"num": 1, "content": "", "displayTextFrame": false, "speaker_name": "", "bgp_source_varname": "", "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr", "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [{"buttonText": 'a', "conseq": {'hp_001': {"name": "hp_001", "action": "plus", "newVal": "10", "type": "number"}}}], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 2, "content": "b2000222222222222222222222222222222222 ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 3, "content": "sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 4, "content": "d4000!!!!!!! ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            // {"num": 5, "content": "e5000???????????????? ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}
        
        ]
    ); //TODO testing *Important* later: load from cloud, with all detailed setting info

    const [gameUIisDisplayDefaultButton, setGameUIisDisplayDefaultButton] = useState(true); //TODO fetch frmo cloud-db
    const [gameUIDefaultButton, setGameUIDefaultButton] = useState({
        "widthMin": 300,
        "widthMax": 370,
        "height": 20,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": true,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "textColor": "#000000",
        "margin": 5,
        "justifyContent": "start",
        "alignItems": "center",
        "border": "2px solid #000000",
        "textSize": 15,
        "groupX": 200,
        "groupY": 100,
        "horizontalMid": false,
        "verticalMid": false,

        "fontName": "serif",
        "isFontItalic": false,

        "picPair": "" //TODO impl

    }); //TODO fetch from cloud-db

    const [gameUITextFrame, setGameUITextFrame] = useState({"width": 600,
    "height": 200,
    "positionX": 100,
    "positionY": 360,
    "cornerRadius": 0,
    "transparency": 0.7,
    "isShape": true,
    "bgColor": "#a8d1d6",
    "picVar": "",
    "fontName": "serif",
    "textSize": 30,
    "textColor": "#000000",
    "justifyContent": "start",
    "alignItems": "start",
    "border": "2px solid #000000",
    "horizontalMid": false,
    "TextContentArea-x": 10,
    "TextContentArea-y": 10,
    "TextContentArea-w": 580,
    "TextContentArea-h": 180,

    "picPair": "" //TODO impl

}); //TODO fetch from cloud-db

    const [gameUIBackButton, setGameUIBackButton] = useState({"width": 50,
    "height": 50,
    "cornerRadius": 0,
    "transparency": 0.9,
    "isShape": false,
    "bgColor": "#a8d1d6",
    "picVar": "",
    "textColor": "blue",
    "buttonText": "←",
    "textSize": 15,
    "borderColor": "blue",
    "borderSize": 2,
    "posX": 0,
    "posY": 0,
    "fontName": "serif",

    "picPair": "" //TODO impl
    
}); //TODO fetch from cloud-db

    const [uiConvNav, setUIConvNav] = useState({
        "buttonAutoIsTextFont": true,
        "buttonAutoShade0": "#bf8da5",
        "buttonAutoPicName0": "",
        "buttonAutoShade1": "#4a54a1",
        "buttonAutoPicName1": "",
        "buttonAutoFontName": "serif",
        "buttonAutoFontItalic": false,
        "buttonAutoDisplayText0": "Auto-off",
        "buttonAutoDisplayText1": "Auto-on",
        "buttonLogDisplayText": "Log",

        "buttonLogIsTextFont": true,
        "buttonLogShade": "#bf8da5",
        "buttonLogPicName":  "",
        "buttonLogShade": "#4a54a1",
        "buttonLogPicName": "",
        "buttonLogFontName": "serif",
        "buttonLogFontItalic": false,

        "textDisplaySpeed": 2,

        "groupX": 0,
        "groupY": 0,
        "groupWidth": 100,
        "groupHeight": 30,

        "cornerRadius": 0,

    });

    const [logPageUISettings, setLogPageUISettings] = useState({
        "closeButtonIsShape": false,
        "closeButtonShade": "",
        "closeButtonPicName": "",
        "closeButtonPositionX": 3, 
        "closeButtonPositionY": 3, 
        "closeButtonWidth": 50,
        "closeButtonHeight": 30, 
        "closeButtonCornerRadius": 0, 
        "closeButtonBorderSize": 1,
        "closeButtonBorderColor": "grey",  
        "closeButtonText": "Close",
        "closeButtonTextColor": "#000000",
        "closeButtonFontName": "serif",

        "bgpIsShape": false,
        "bgpShade": "",
        "bgpPicName": "",

        "groupPosX": 50,
        "groupPosY": 50,
        "groupWidth": 699,

        "groupItemGap": 10, 

        "groupBgIsShape": false,
        "groupBgShade": "",
        "groupBgpName": "",  
        
        "groupUnitCornerRadius": 0,

        "contentTextShade": "",
        "contentTextSize": 20,
        "contentTextFont": "",
        "contentPosX": 10,
        "contentPosY": 10,

        "speakerTextShade": "",
        "speakerTextSize": 20,
        "speakerTextFont": "",
        "speakerPosX": 10,
        "speakerPosY": 10,

    });


    const [testPlayerGameData, setTestPlayerGameData] = useState({});   //TODO important for holder-in-practice
    const [testPlayerGameDataDup, setTestPlayerGameDataDup] = useState({});   //TODO important for holder-in-practice

    const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                                 //TODO important for holder-in-practice
  
    const [testPlayerAccount, setTestPlayerAccount] = useState({});        

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);


    const [gameDataDesignList, setGameDataDesignList] = useState({});                    /* Important */
 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    const [firstEnterButtonPressed, setFirstEnterButtonPressed] = useState(true);
    
    const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);


    useEffect(() => {
    
        if (projectName === "default-no-state projectname") {
      //      alert("No project selected. Returning to project selection page...");
            goToProjectManagingPanel();
        }


        window.onbeforeunload = () => {
            return "show message";
        }


        if (firstTimeEnter === true) {
            initializeUILang();

            //initialize piece-ds
            initializePiecesFromCloud();



            setFirstTimeEnter(false);
        } 
        



//         console.log("index = ", previewingIndex ,"\ncurr piece info: ", pieceDataStructure[previewingIndex]["stnd_btn_arr"]);
// //TODO1
    
    }); // --- useEffect ends here ---




      
    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function passInGameDataDesignList() {
        return gameDataDesignList;
    }

    function initializeUILang() {
        if (state === undefined || state === null) {
            return;
        } else {
            let uiLangFromOuterCompo = state.uiLang;
            setLanguageCodeTextOption(uiLangFromOuterCompo);
                                console.log("!!initializeUILang(): ", uiLangFromOuterCompo);
        }

    }


    function goToGameMaker() {

        let resp = window.confirm("Are you sure you saved all the changes?");

        if (resp) {
            let stateObj = {selected_project_name: state.projectName, username: state.userName};
            navigate('/editorcontainer', { replace: true, state: stateObj });
        }

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
        console.log("!!! in editing-panel: changePieceData ...", updatedPieceData); //TODO test
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
 

    //TODO21 refactor to VM
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



    // function updateGDataDesignToCloud(gameDataLatest) {

    //     let project = "";
    //     project  = state.selected_project_name;
    //     if (project === "" || project === undefined || project.trim() === "") {
    //         return;
    //     }
    //     let currUser = uname;
    //     updateGameDataDesignVM({projectName: project, uname: currUser, gameData: gameDataLatest});
    
    // } //TODO remove


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

                                                console.log("conv-node-editor, getUserConfigFromEmuManager1Gdt-func, from emu-manger, \ngdt = hp_001 current value is \n", 
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
        return languageCodeTextOption; //TODO20 //navigation-jumpped here, add strategy later
        
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

    async function saveAllToCloud() {
        let uiObj = {
            defaultButton: gameUIDefaultButton,
            textFrame: gameUITextFrame,
            backButton: gameUIBackButton,
            convNav: uiConvNav,
            logPage: logPageUISettings

        }; 
        //TODO31
        //gameUIDefaultButton, gameUITextFrame, gameUIBackButton, uiConvNav, logPageUISettings




        await convSingleNodeUpdateToCloudVM({
            project: state.projectName, 
            username: state.userName, 
            chapterKey: chapterKey, 
            nodeKey: nodeKey, 
            dataObj: pieceDataStructure, 
            uiDataObj: uiObj
        })
            
            
            
        .then((res)=>{
                if (res === "node-update-ok") {
                    alert("Saved to Cloud!")
                } else {
                    alert("Node not exist on cloud!");
                }
            }

        );

    }

    async function initializePiecesFromCloud() {

        let pieceObjTemp = await convNodeFetchFromCloudVM({project: state.projectName, username: state.userName, chapterKey: chapterKey, nodeKey: nodeKey});

        if (pieceObjTemp === undefined || pieceObjTemp === null || pieceObjTemp.length === 0) {
            setPiecedataStructure([]);
            return;
        }

        console.log("initialize piece data... ", pieceObjTemp);


        setPiecedataStructure(pieceObjTemp);

    } 

    

    return (

        <div>
            <div className="returning_buttons">
                <button className="button2" onClick={()=>{goToGameMaker()}}> {returnGameMakerButtonText} </button>
{firstEnterButtonPressed === true &&                
<>
<div style={{"width": "200px", "overflow": "scroll", "textAlign": "left", "padding": "5px", "marginTop": "5px"}}>
                    <label>Project: {state.projectName}</label>
                    <br></br>
                    <label>Node: {state.clickedNodeKey}</label>
                </div>

                <div style={{"minWidth": "200px", "marginTop": "2px"}}>
                    <button className="button testEntire"
                        onClick={()=>{setIsDisplayQview(true);}}>
                            {quickGameViewText}
                    </button>                    
                </div>


                <div className="buttonRight30px parallelFrame" style={{"width": "500px"}}>
                    <button className="rmTab" onClick={()=>{setDisplayGameDataWindow(true);}}>{gameDataManagerText}</button>
                    <button className="rmTab" onClick={() => {setDisplayRmModal(true)}}> {resourceManagerButtonText} </button>
                    <button className="rmTab" onClick={()=>{setDisplayEmBool(true);}}>
                        {emuManagerText}
                    </button>

                    
                            <div>
                                <label>Editor Language</label><br></br>
                                <select value={languageCodeTextOption}
                                    onChange={(event)=>{
                                        let opt = event.target.value;
                                        let askStr = "Are you sure to change editor language to " + uiLangMap[opt] + " ?";
                                        let response = window.confirm(askStr);
                                        if (response) {
                                            setLanguageCodeTextOption(opt);
                                        }

                                    }}
                                >
                                    <option key="lang-Eng" value="en">English</option>
                                    <option key="lang-chn" value="chn">简体中文</option> 
                                </select>
                            </div>
                </div>

</>
}
            </div>

{state!= undefined && firstEnterButtonPressed === true &&
<>
            <div className="parallelFrame" style={{"marginTop": "-5px"}}>
                <div className="topParalBarLeftPart">

              
                </div>



                <div className="topParalBarRightPart" style={{"height": "45px"}}>

                    <button
                        onClick={()=>{saveAllToCloud();}}
                    >{saveToCloudText}</button>

                    <button className={isDisplayGameContentPreview === true ? "topBarTabSelected" : "topBarTab"} onClick={()=>{setIsDisplayGameContentPreview(true); setGameUISetterOpen(false);}}>
                        {gameContentSetupText}</button>
                    <button className={isDisplayGameContentPreview === false? "topBarTabSelected": "topBarTab"} onClick={()=>{setIsDisplayGameContentPreview(false); setGameUISetterOpen(true);}}>
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

{firstEnterButtonPressed === true &&
            <div 
                className={isDisplayQview === true ? "noScrolling" : ""} 
                style={{
                    "display": "flex",
                    "backgroundColor": "rgb(124, 129, 124)",
                    "maxHeight": `${screenHeight+50}px`,
                    "overflow": "scroll"
                }}
            >
            
            {browseList === false && 
                <div
                    style={{"maxHeight": `${screenHeight+1}px`, "overflow": "scroll", "marginTop": "16px"}}
                >
                    {gameUISetterOpen === false && 
                        <PieceSetter 
                            pieceNum={previewingIndex+1} 
                            assignPreviewIndex={getUpdatePreviewingIndex} 
                            allPieceData={pieceDataStructure} 
                            updatePieceData={changePieceData} 
                            getAllPieceData={passInAllPieceDataContent} 
                            username={uname} 
                            projName={projectName} 
                            backToList={returnToList} 
                            gameDataList={gameDataDesignList} 
                            openRm={handleResourceManagerOpen}
                            openGameDataManager={handleModal_GameDataManagerOpen}
                            setIsClickedOnSetters={setIsActionOnSetter}
                            fetchClickedIsOnSetter={passInUserClickSideIsOnSetter}
                            getCurrentPieceNum={passInCurrentPieceNum}
                            fetchRmUpdatedSignal={passInRmUpdatedSignal}
                            respondUpdatedRm={resetRmUpdatedSignal}

                            getUILanguage={passInUILanguage}
                            username={state.userName} 
                            projName={state.projectName}    
                        />}
                    {gameUISetterOpen === true && 
                        <GameUISetter 
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

                            getUILanguage={passInUILanguage}
                            username={state.userName} 
                            projName={state.projectName}    
                    />}
                </div>
            }

            {browseList === true &&
                <div
                    style={{"maxHeight": `${screenHeight+1}px`, "overflow": "scroll", "marginTop": "16px"}}
                >        
                    {gameUISetterOpen === false && 
                        <PieceManager 
                            allPieceData={pieceDataStructure} 
                            assignPieceNum={getSelectedPiece} 
                            assignPreviewIndex={getUpdatePreviewingIndex} 
                            updatePieceData={changePieceData} 
                            getAllPieceData={passInAllPieceDataContent}
                            setIsClickedOnSetters={setIsActionOnSetter}
                            fetchClickedIsOnSetter={passInUserClickSideIsOnSetter}
                            getCurrentPieceNum={passInCurrentPieceNum}

                            getUILanguage={passInUILanguage}
                        />}   
                    {gameUISetterOpen === true && 
                        <GameUISetter 
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

                            getUILanguage={passInUILanguage}
                            username={state.userName} 
                            projName={state.projectName}    
                        />}
                
                </div>
            }

                      
            {isDisplayGameContentPreview === true && 
                <PreviewWindow_gameContent
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

                    
                    username={state.userName}
                    projName={state.projectName}
                />}
            {isDisplayGameContentPreview === false && 
                <PreviewWindow_uiSetup
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

            
                    username={state.userName}
                    projName={state.projectName}
                />
            }

 
            </div>
}


            <div
                style={{
                    "display": isDisplayRmBool === true ? "flex" : "none"
                }}
            >
                                                                {/* {isDisplayRmBool &&  */}
                <Modal_ResourceManagingWindow 
                    isDisplay = {isDisplayRmBool} 
                    handleRmCancel={handleResourceManagerCancel} 
                    handleRmSaveChanges={handleResourceManagerSaveChanges} 
                    refresh={triggerRefresh}

                    getUILanguage={passInUILanguage}    
                    username={state.userName} 
                    projName={state.projectName}                
                    />
                                                                    {/* } */}
            </div>


        

            <div
                style={{
                    "display": displayGameDataWindow === true ? "flex" : "none"
                }}
            >
                <Modal_GameDataManager 
                    isDisplay={displayGameDataWindow}
                    handleGdmCancel={handleModal_GameDataManagerCancel} 
                    resetNeedCloudData={markNextNeedCloudGameData} 

                    getUILanguage={passInUILanguage}
                    username={state.userName} 
                    projName={state.projectName}    
                />   
            </div>
        

           
            {isDisplayQview && <QuickView_AllPanels_ConvNode
                    initialPieceNum={previewingIndex}
                    isDisplay={isDisplayQview}
                    handleQViewCancel={handleqvCancel}
                    allPieceContent={pieceDataStructure}
                    uiData1_textframe={gameUITextFrame} 
                    uiData2_defaultButtonOption={gameUIDefaultButton} 
                    uiData3_ConvNavigation={uiConvNav} 
                    uiData4_logPageSettings={logPageUISettings}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
        
                    getUILanguage={passInUILanguage}
                    username={state.userName} 
                    projName={state.projectName} 
                    initialEmuGameDataTracker={testPlayerGameDataDup}
                    resetViewing={resetQuickView}
            />}
            


            <div
                style={{
                "display": isDisplayEmBool === false ? "none" : "flex",
                }}
            >
                <Modal_EmuManager
                    handleEmCancel={handleEmuManagerCancel}

                    update1Gdt={getUserConfigFromEmuManager1Gdt}
                    update2Epp={notUsing}
                    update3Epa={notUsing}
                    update4Ess={notUsing}
                    update5Shp={notUsing}
                    
                    getUILanguage={passInUILanguage}
                    isForGameMaker={false}

                    username={state.userName} 
                    projName={state.projectName}  

                />
            </div>
    </>}            

        <br></br>


{firstEnterButtonPressed === false && 
                <div
                
                >


                    <button onClick={()=>{
                        setFirstEnterButtonPressed(true);
                    }}>Load Editor</button>
                </div>
}

        </div>
    );
}