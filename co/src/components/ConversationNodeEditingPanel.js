import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PieceSetter from './PieceSetter';
import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import { getProjectGameDataDesignVM, updateGameDataDesignVM, getChapterDataVM  } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';

import PreviewWindow_gameContent from './PreviewWindow_gameContent';
import PreviewWindow_uiSetup from './PreviewWindow_uiSetup';
import QuickView_AllPanels_ConvNode from './QuickView_AllPanels_ConvNode';

import PieceManager from './PieceManager';
import GameUISetter from './GameUISetter';
import Modal_GameDataManager from './Modal_GameDataManager';
import langDictionary from './textDictionary';
//TODO fetch navigation(all game type) data from cloud?

export default function ConversationNodeEditingPanel() {
// TODO here, keeps all sub-component's "unsaved local" data structures
 
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    let languageCodeTextOption = 'en';


    const navigate = useNavigate();
    const {state} = useLocation();
    let nodeName = "";
    let uname = "default-no-state username";
    let projectName = "default-no-state projectName";
    let screenSizeInfo = "default-no-state screenSizeInfo";
    if (state != null) {
        nodeName = state.selectedNode;
        uname = state.userName;
        projectName = state.selected_project_name;
        screenSizeInfo = state.screenSizeStr;
    }


    
console.log("ConversationNodeEditingPanel-state: ", state);//TODO test
 

    const sizeLookupMap = { 
        "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]};


    const [audioList, setAudioList] = useState([]); //TODO for sound effect -- future feature
    const [visualList, setVisualList] = useState([]); 
  
    async function fetchProjResourceLists() {

                                                        console.log("conv-editing panel: fetchProjResourceLists()"); //TODO test
      /* fetch from cloud db */

      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
                                                       
                                                        console.log("conv-editing panel: obj from cloud (resource list):"); //TODO test
                                                        console.log(obj); //TODO test

      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }


    const [isActionOnSetter, setIsActionOnSetter] = useState(true);

    const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
    const [needCloudGameData, setNeedCloudGameData] = useState(true);

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayQview, setIsDisplayQview] = useState(false);

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




    const [pieceDataStructure, setPieceDatastructure] = useState([
            {"num": 1, "content": "sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1-sample_content_1", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr", "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            {"num": 2, "content": "b2000222222222222222222222222222222222 ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            {"num": 3, "content": "sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3-sample_content_3", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            {"num": 4, "content": "d4000!!!!!!! ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}, 
            {"num": 5, "content": "e5000???????????????? ...", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "",  "bgp_action": "maintainBgp", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, 1], "chp_arr": [], "chp_action": "maintainCharPicArr",  "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "maintainBgm", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_volume": 100}
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

    // "buttonAutoIsTextFont": true,
    // "buttonAutoShade0": "#bf8da5",
    // "buttonAutoPicName0": "",
    // "buttonAutoShade1": "#4a54a1",
    // "buttonAutoPicName1": "",
    // "buttonAutoFontName": "serif",
    // "buttonAutoFontItalic": false,

    // "buttonLogIsTextFont": true,
    // "buttonLogShade": "#bf8da5",
    // "buttonLogPicName":  "",
    // "buttonLogShade": "#4a54a1",
    // "buttonLogPicName": "",
    // "buttonLogFontName": "serif",
    // "buttonLogFontItalic": false,

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

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);


    const [gameDataDesignList, setGameData] = useState({});                    /* Important */
 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);


    useEffect(() => {
        if (firstTimeEnter === true) {
            getGameDataFromCloud();
            fetchProjResourceLists();

            setFirstTimeEnter(false);
        }
        
        if (projectName === "default-no-state projectName") {
            alert("No project selected. Returning to project selection page...");
            goToProjectManagingPanel();
          }
    
    });
      
    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function passInGameDataDesignList() {
        return gameDataDesignList;
    }

    async function getGameDataFromCloud() {
        let isUpdated = true;
        //TODO 
        let gDataMap = {};
        let project = state.projectName;
        let currUser = state.userName;
        gDataMap = await getProjectGameDataDesignVM(({projectName: project, uname: currUser, mostUpdated: isUpdated}));

        // console.log("!!!!!!!!!! firstenter: getGameDataFromCloud(): ");
        // console.log(state); //TODO remove later

        
        // console.log("Conv-editing-:$$$$$$$$$$$ game data from cloud = ");
        // console.log(gDataMap);
        

        //TODO transform to a list  

        setGameData(gDataMap);
    }


    function goToGameMaker() {
        let stateObj = {selected_project_name: state.projectName, username: state.userName};
        navigate('/editorcontainer', { replace: true, state: stateObj });


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
        setRmUpdatedSignal(true);
        
    }
    
    function handleResourceManagerSaveChanges() {
        console.log("modal save changes!");
        //TODO update to cloud db
        setDisplayRmModal(false);
    }

    function switchListEditor() {
        setBrowseList(!browseList);
    }

    function getSelectedPiece(num) {
        setPieceNumber(num);
        let tempArr = pieceDataStructure;
        tempArr.sort((a, b) => a.num - b.num);
        setPieceDatastructure(tempArr);
        switchListEditor();
    }

    function changePieceData(updatedPieceData) {
        console.log("!!! in editing-panel: changePieceData ...", updatedPieceData); //TODO test
        setPieceDatastructure(updatedPieceData);
        //TODO update to cloud
    }

    function fetchAllPieceData() {
        return pieceDataStructure;
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
        return pieceDataStructure;
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

    async function fetchGameDataFromCloud() {

        console.log("!!! This is for project: ", projectName);
        let project  = projectName;
        console.log("checking2 on project ... [", project, "]");
        if (project === undefined || project === null || project === "" || project.trim() === "") {
          return;
        }
        const isUpdated = true;
        let currUser = uname;
        const gdataTestResult = await getProjectGameDataDesignVM({projectName: project, uname: currUser, mostUpdated: isUpdated});
     
        if (gdataTestResult === undefined) {
          console.log("Error: no game_data in this project...");
          return;
        }
        console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
        setGameData(gdataTestResult);
  }


    function updateGDataDesignToCloud(gameDataLatest) {

        let project = "";
        project  = state.selected_project_name;
        if (project === "" || project === undefined || project.trim() === "") {
            return;
        }
        let currUser = uname;
        updateGameDataDesignVM({projectName: project, uname: currUser, gameData: gameDataLatest});
    
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

    function passInAudioList() {
        return audioList;  //for previewing
    }

    function passInVisualList() {
        return visualList; //for previewing
    }

    function handleqvCancel() {
        setIsDisplayQview(false);
    }

    function passInUILanguage() {
        return 'en'; //TODO20 //navigation-jumpped here, add strategy later
        
    }
    

    return (

        <div>
            <div className="returning_buttons">
                <button className="button2" onClick={()=>{goToGameMaker()}}> {returnGameMakerButtonText} </button>
                <p><label>Conversational Game Node - Project Name: {state.projectName}</label></p>
                <button className="button testEntire"
                    onClick={()=>{setIsDisplayQview(true);}}>
                        {quickGameViewText}
                </button>
                <div className="buttonRight30 parallelFrame">
                    <button className="rmTab" onClick={()=>{setDisplayGameDataWindow(true);}}>{gameDataManagerText}</button>
                    <button className="rmTab" onClick={() => {setDisplayRmModal(true)}}> {resourceManagerButtonText} </button>
                </div>

            </div>

            {state!= undefined  &&<>
            <div className="parallelFrame" style={{"marginTop": "-5px"}}>
                <div className="topParalBarLeftPart">

              
                </div>


                <div className="topParalBarRightPart" style={{"height": "45px"}}>
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
                            getAllPieceData={fetchAllPieceData} 
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
                            fetchNewGameDataList={passInNewGameDataList}
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
                            getAllPieceData={fetchAllPieceData}
                            setIsClickedOnSetters={setIsActionOnSetter}
                            fetchClickedIsOnSetter={passInUserClickSideIsOnSetter}
                            getCurrentPieceNum={passInCurrentPieceNum}
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
                    passInAudioList={passInAudioList}
                    passInVisualList={passInVisualList}
                />
            }

 
            </div>
            {isDisplayRmBool && 
                <Modal_ResourceManagingWindow 
                    isDisplay = {isDisplayRmBool} 
                    handleRmCancel={handleResourceManagerCancel} 
                    handleRmSaveChanges={handleResourceManagerSaveChanges} 
                    refresh={triggerRefresh}

                    getUILanguage={passInUILanguage}                    
                    />}
            </>}

            {displayGameDataWindow && 
                        
                <Modal_GameDataManager 
                    isDisplay={displayGameDataWindow}
                    handleGdmCancel={handleModal_GameDataManagerCancel} 
                    initialGameData={gameDataDesignList} 
                    resetNeedCloudData={markNextNeedCloudGameData} 
                    updateGameDataDesignToCloud={updateGDataDesignToCloud}

                    getUILanguage={passInUILanguage}
                />   
    
        

                    
            } 
         

            {isDisplayQview && <QuickView_AllPanels_ConvNode
                initialPieceNum={previewingIndex}
                isDisplay={isDisplayQview}
                handleQViewCancel={handleqvCancel}
                allPieceContent={pieceDataStructure}
                uiData1_textframe={gameUITextFrame} 
                uiData2_buttonOption={gameUIDefaultButton} 
                uiData3_ConvNavigation={uiConvNav} 
                uiData4_logPageSettings={logPageUISettings}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                visualList={visualList}
                audioList={audioList}
                initialGameDataDesignList={gameDataDesignList}
                getGameDataDesignList={passInGameDataDesignList}

                getUILanguage={passInUILanguage}
            />}

        <br></br>
        </div>
    );
}