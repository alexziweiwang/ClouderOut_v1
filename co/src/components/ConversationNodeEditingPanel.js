import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PieceSetter from './PieceSetter';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import { getProjectGameDataVM } from '../viewmodels/GameDataViewModel';
import PreviewWindow from './PreviewWindow';
import PieceManager from './PieceManager';
import GameUIPreviewWindow from './GameUIPreviewWindow';
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
    const [isDisplayPreview, setIsDisplayPreview] = useState(true);

    const [gameUISetterOpen, setGameUISetterOpen] = useState(false);
    const returnGameMakerButtonText = ["Return To GameMaker!"];
    const showResourceManagerButtonText = ["Resource Manager"]; 
    const buttonLanguageIndex = 0;

    const [pieceDataStructure, setPieceDatastructure] = useState([
            {"num": 1, "content": "a1000", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}, 
            {"num": 2, "content": "b2000", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}, 
            {"num": 3, "content": "c3000", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}, 
            {"num": 4, "content": "d4000", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}, 
            {"num": 5, "content": "e5000", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}
        ]
    ); //TODO testing *Important* later: load from cloud, with all detailed setting info

    const [gameUIisDisplayDefaultButton, setGameUIisDisplayDefaultButton] = useState(false); //TODO fetch frmo cloud-db
    const [gameUIDefaultButton, setGameUIDefaultButton] = useState({}); //TODO fetch from cloud-db
    const [gameUITextFrame, setGameUITextFrame] = useState({}); //TODO fetch from cloud-db

    const [gameData, setGameData] = useState({});
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    useEffect(() => {
        if (firstTimeEnter === true) {
            getGameDataFromCloud();
            setFirstTimeEnter(false);
        }

    });

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
        console.log("!!! in editing-panel: new data now is ...", updatedPieceData);
        setPieceDatastructure(updatedPieceData);
        //TODO update to cloud
    }

    function fetchAllPieceData() {
        return pieceDataStructure;
    }

    function getPreviewingIndex(index) {
        console.log("conv-edit-panel, getPreviewingIndex:" , index); 
        setPreviewingIndex(index);
    }

    function returnToList() {
        setBrowseList(!browseList);
    }

    function updateTextFrameData(data) {
        setGameUITextFrame(data);
    }

    function updateDefaultButtonData(data) {
        setGameUIDefaultButton(data);        
    }

    function updateIsDisplayDefaultButtonPreviewSetting(val) {
        setGameUIisDisplayDefaultButton(val);
    }

    function passInDefaultButtonData() {
        return gameUIDefaultButton;
    }

    function passInTextFrameData() {
        return gameUITextFrame;
    }

    function passInIsDisplayDefaultButton() {
        return gameUIisDisplayDefaultButton;
    }

    return (

        <div>
            <div className="returning_buttons">
                <button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[buttonLanguageIndex]} </button>
                <p>projectName: {state.projectName}</p>
            </div>
            
            <div className="parallelFrame">
                <div className="topParalBarLeftPart">
                    <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>

                </div>
                <div className="topParalBarRightPart">
                    <button className={isDisplayPreview === true ? "topBarTabSelected" : "topBarTab"} onClick={()=>{setIsDisplayPreview(true); setGameUISetterOpen(false);}}>Game Content</button>
                    <button className={isDisplayPreview === false? "topBarTabSelected": "topBarTab"} onClick={()=>{setIsDisplayPreview(false); setGameUISetterOpen(true);}}>Game UI</button>
                </div>
               
            </div>
     
            <div className="parallelFrame">

            {browseList === false && 
                <div>
                    {gameUISetterOpen === false && <PieceSetter pieceNum={pieceNumber} allPieceData={pieceDataStructure} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData} username={uname} projName={projectName} backToList={returnToList} gameDataList={gameData}/>}
                    {gameUISetterOpen === true && <GameUISetter openRm={handleResourceManagerOpen} updateTextFrameSettings={updateTextFrameData} updateDefaultButtonSettings={updateDefaultButtonData} updateIsDisplayDefaultButtonPreview={updateIsDisplayDefaultButtonPreviewSetting}/>}
                </div>
            }

            {browseList === true &&
                <div>                 
                    {gameUISetterOpen === false && <PieceManager allPieceData={pieceDataStructure} assignPieceNum={getSelectedPiece} assignPreviewIndex={getPreviewingIndex} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData}/>}   
                    {gameUISetterOpen === true && <GameUISetter openRm={handleResourceManagerOpen} updateTextFrameSettings={updateTextFrameData} updateDefaultButtonSettings={updateDefaultButtonData} updateIsDisplayDefaultButtonPreview={updateIsDisplayDefaultButtonPreviewSetting}/>}
                </div>
            }
 
            {isDisplayPreview === true && <PreviewWindow dataObj={pieceDataStructure[previewingIndex]}/>}
            {isDisplayPreview === false && 
                <GameUIPreviewWindow getTextFrameData={passInTextFrameData} getDefaultButtonData={passInDefaultButtonData} getIsDisplayDefaultButton={passInIsDisplayDefaultButton}/>
            }

            </div>
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}

        </div>
    );
}
