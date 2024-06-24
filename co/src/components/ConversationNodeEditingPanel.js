import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PieceSetter from './PieceSetter';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import { getProjectGameDataVM } from '../viewmodels/GameDataViewModel';
import PreviewWindow from './PreviewWindow';
import PieceManager from './PieceManager';
import GameUIOuterPreviewWindow from './GameUIOuterPreviewWindow';
import GameUISetter from './GameUISetter';

export default function ConversationNodeEditingPanel() {
// TODO here, keeps all sub-component's "unsaved local" data structures

    const navigate = useNavigate();
    const {state} = useLocation();
    let nodeName = "";
    let uname = "default-no-state username";
    let projectName = "default-no-state projectName";
    if (state != null) {
        nodeName = state.selectedNode;
        uname = state.userName;
        projectName = state.selected_project_name;
    }
    // console.log("ConversationNodeEditingPanel-state: ", state);//TODO test
    

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [browseList, setBrowseList] = useState(true);
    const [pieceNumber, setPieceNumber] = useState(1); //TODO: this would be the current/"counter of" piece to fetch from db/ds
    const [previewingIndex, setPreviewingIndex] = useState(0);
    const [isDisplayGameContentPreview, setIsDisplayGameContentPreview] = useState(true);
    const [menuType, setMenuType] = useState("");

    const [gameUISetterOpen, setGameUISetterOpen] = useState(false);
    const returnGameMakerButtonText = [" ← Game Maker"];
    const showResourceManagerButtonText = ["Resource Manager"]; 
    const buttonLanguageIndex = 0;

    const [pieceDataStructure, setPieceDatastructure] = useState([
            {"num": 1, "content": "a100012345678987654321", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, "default-none"], "chp_arr": [], "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "", "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_source_link": "", "vl_volume": 100}, 
            {"num": 2, "content": "b2000", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, "default-none"], "chp_arr": [], "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "", "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_source_link": "", "vl_volume": 100}, 
            {"num": 3, "content": "c3000", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, "default-none"], "chp_arr": [], "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "", "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_source_link": "", "vl_volume": 100}, 
            {"num": 4, "content": "d4000", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, "default-none"], "chp_arr": [], "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "", "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_source_link": "", "vl_volume": 100}, 
            {"num": 5, "content": "e5000", "displayTextFrame": true, "speaker_name": "", "bgp_source_varname": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_curr": ["", 0, 0, 60, 120, "default-none"], "chp_arr": [], "clkb_previewing": [], "clkb_arr": [], "stnd_btn_arr": [], "bgm_source_varname": "", "bgm_action": "", "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_varname": "", "vl_source_link": "", "vl_volume": 100}
        ]
    ); //TODO testing *Important* later: load from cloud, with all detailed setting info

    const [gameUIisDisplayDefaultButton, setGameUIisDisplayDefaultButton] = useState(true); //TODO fetch frmo cloud-db
    const [gameUIDefaultButton, setGameUIDefaultButton] = useState({
        "widthMin": 300,
        "widthMax": 370,
        "height": 20,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": false,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "picUrl": "",
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
    "picUrl": "",
    "fontName": "",
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
    "picUrl": "",
    "textColor": "#000000",
    "buttonText": "←",
    "textSize": 15,
    "borderColor": "#000000",
    "borderSize": 2,
    "posX": 0,
    "posY": 0,

    "picPair": "" //TODO impl
    
}); //TODO fetch from cloud-db

    const [selectedGameScreenSize, setSelectedGameScreenSize] = useState("");
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);


    const [gameData, setGameData] = useState({});
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    useEffect(() => {
        if (firstTimeEnter === true) {
            getGameDataFromCloud();
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

    async function getGameDataFromCloud() {
        let isUpdated = true;
        //TODO 
        let gDataMap = {};
        let project = state.projectName;
        let currUser = state.userName;
        gDataMap = await getProjectGameDataVM(({projectName: project, uname: currUser, mostUpdated: isUpdated}));

        // console.log("!!!!!!!!!! firstenter: getGameDataFromCloud(): ");
        // console.log(state); //TODO remove later
        console.log("$$$$$$$$$$$ game data from cloud = ");
        console.log(gDataMap);
        
        //TODO transform to a list  

        setGameData(gDataMap);
    }


    function goToGameMaker() {
        let stateObj = {selected_project_name: state.projectName, username: state.userName};
        navigate('/gamemaker', { replace: true, state: stateObj });
    }

    function handleResourceManagerOpen() {
        setDisplayRmModal(true);
    }


    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
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

    function tempTrigerRmUpdate() {
        console.log("tempTrigerRmUpdate");
        console.log("TODO: resource-managing update");
    }

    function passInCurrentPieceObj() {
        return pieceDataStructure[previewingIndex];
    }

    function passInAllPieceDataContent() {
        return pieceDataStructure;
    }

    function passInCurrentPieceNum() {
        return previewingIndex;
    }

    function fetchMenuType(value) {
        setMenuType(value);
    }

    function passInMenuType() {
        return menuType;
    }

    function changeselectedGameScreenSizeSetting(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
          if (input === "h450_800") {
            console.log("h450_800");
            setSelectedGameScreenSize("h450_800");
          } else if (input === "v800_450") {
            console.log("v800_450");
            setSelectedGameScreenSize("v800_450");
          } else if (input === "h600_800") {
            console.log("h600_800");
            setSelectedGameScreenSize("h600_800");
          } else if (input === "v800_600") {
            console.log("v800_600");
            setSelectedGameScreenSize("v800_600");
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
            if (selectedGameScreenSize === "h450_800") {
              setScreenWidth(800);
              setScreenHeight(450);
          } else if (selectedGameScreenSize === "v800_450") {
              setScreenWidth(450);
              setScreenHeight(800);
          } else if (selectedGameScreenSize === "h600_800") {
              setScreenWidth(800);
              setScreenHeight(600);
          } else if (selectedGameScreenSize === "v800_600") {
              setScreenWidth(600);
              setScreenHeight(800);
          }
        } 
    } 
 
    function passInScreenSize() {
        let pair = [];
        pair.push(screenWidth);
        pair.push(screenHeight);
        return pair;
    }

    return (

        <div>
            <div className="returning_buttons">
                <button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[buttonLanguageIndex]} </button>
                <p>Project Name: {state.projectName}</p>
            </div>

            {state!= undefined  &&<>
            <div className="parallelFrame">
                <div className="topParalBarLeftPart">
                    <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>
                    
                </div>
                <div className="topParalBarRightPart">
                    <button className={isDisplayGameContentPreview === true ? "topBarTabSelected" : "topBarTab"} onClick={()=>{setIsDisplayGameContentPreview(true); setGameUISetterOpen(false);}}>
                        Game Content</button>
                    <button className={isDisplayGameContentPreview === false? "topBarTabSelected": "topBarTab"} onClick={()=>{setIsDisplayGameContentPreview(false); setGameUISetterOpen(true);}}>
                        Game UI</button>

                    <>
                        <select value={selectedGameScreenSize} onChange={changeselectedGameScreenSizeSetting}>
                            <option value="" key=""> ----- Select Size and Direction ----- </option>
                            <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                            <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
                            <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                            <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>

                        </select>
                        <button onClick={()=>{updateGameSizeSetting();}}>Update</button>
                    </>


                </div>
               
            </div>
     
            <div className="parallelFrame">
            
            {browseList === false && 
                <div>
                    {gameUISetterOpen === false && 
                        <PieceSetter pieceNum={previewingIndex+1} assignPreviewIndex={getUpdatePreviewingIndex} allPieceData={pieceDataStructure} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData} username={uname} projName={projectName} backToList={returnToList} gameDataList={gameData} openRm={handleResourceManagerOpen}/>}
                    {gameUISetterOpen === true && 
                        <GameUISetter 
                    iniDefaultButtonObj={gameUIDefaultButton} iniTxtFrameObj={gameUITextFrame} iniMenuButtonObj={gameUIBackButton}
                    openRm={handleResourceManagerOpen} updateTextFrameUISettings={updateTextFrameUISettings} updateDefaultButtonSettings={updateDefaultButtonUISettings} updateIsDisplayDefaultButtonPreview={updateIsDisplayDefaultButtonPreviewSetting} updateBackButtonSettings={updateBackButtonUISettings}
                    sendMenuType={fetchMenuType}
                    />}
                </div>
            }

            {browseList === true &&
                <div>                 
                    {gameUISetterOpen === false && <PieceManager 
                            allPieceData={pieceDataStructure} 
                            assignPieceNum={getSelectedPiece} 
                            assignPreviewIndex={getUpdatePreviewingIndex} 
                            updatePieceData={changePieceData} 
                            getAllPieceData={fetchAllPieceData}/>}   
                    {gameUISetterOpen === true && 
                        <GameUISetter 
                        iniDefaultButtonObj={gameUIDefaultButton} iniTxtFrameObj={gameUITextFrame} iniMenuButtonObj={gameUIBackButton}
                        openRm={handleResourceManagerOpen} updateTextFrameUISettings={updateTextFrameUISettings} updateDefaultButtonSettings={updateDefaultButtonUISettings} updateIsDisplayDefaultButtonPreview={updateIsDisplayDefaultButtonPreviewSetting} updateBackButtonSettings={updateBackButtonUISettings}
                        sendMenuType={fetchMenuType}
                        />}
                
                </div>
            }

                      
            {isDisplayGameContentPreview === true && 
                <PreviewWindow 
                    dataObj={pieceDataStructure[previewingIndex]} 
                    initialAllPieceData={pieceDataStructure}
                    getCurrentPiece={passInCurrentPieceObj} 
                    getAllPieceContent={passInAllPieceDataContent}
                    getCurrentPieceNum={passInCurrentPieceNum}
                    getTextFrameUISettings={passInTextFrameUISettings} 
                    getDefaultButtonUISettings={passInDefaultButtonUISettings} 
                    getIsDisplayDefaultButton={passInIsDisplayDefaultButton} 
                    getBackButtonUISettings={passInBackButtonUISettings}
                    getScreenSize={passInScreenSize}
                />}
            {isDisplayGameContentPreview === false && 
                <GameUIOuterPreviewWindow 
                    dataObj={pieceDataStructure[previewingIndex]} 
                    initialAllPieceData={pieceDataStructure}
                    getAllPieceContent={passInAllPieceDataContent}
                    getCurrentPieceNum={passInCurrentPieceNum}
                    getTextFrameUISettings={passInTextFrameUISettings} 
                    getDefaultButtonUISettings={passInDefaultButtonUISettings} 
                    getIsDisplayDefaultButton={passInIsDisplayDefaultButton} 
                    getBackButtonUISettings={passInBackButtonUISettings}
                    getMenuType={passInMenuType}
                    getScreenSize={passInScreenSize}
                />
            }

 
            </div>
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges} triggerRmUpdate={tempTrigerRmUpdate}/>}
            </>}


        </div>
    );
}