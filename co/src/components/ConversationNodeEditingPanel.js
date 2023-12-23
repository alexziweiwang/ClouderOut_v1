import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PieceSetter from './PieceSetter';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import PreviewWindow from './PreviewWindow';
import PieceManager from './PieceManager';

export default function ConversationNodeEditingPanel() {

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
    console.log("ConversationNodeEditingPanel-state: ", state);//TODO test
    

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [browseList, setBrowseList] = useState(true);
    const [pieceNumber, setPieceNumber] = useState(1); //TODO: this would be the current/"counter of" piece to fetch from db/ds
    const [previewingIndex, setPreviewingIndex] = useState(0);

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

    console.log("current testing piece data is at [ConversationNodeEditingPanel.js]");


    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
    }
    
    function handleResourceManagerSaveChanges() {
        console.log("modal save changes!");
        //TODO update to cloud db
        setDisplayRmModal(false);
    }

    function goToGameMaker() {
        const selected_project_name = projectName;
        let username = uname;
        navigate('/gamemaker', { replace: true, state: { selected_project_name, username } });
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


    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[buttonLanguageIndex]} </button></div>
            <p className="plans"></p>
            
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}
     
            <div className="parallelFrame">

            {browseList === false && <div className="userChoice">
            <button className="buttonRight" onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>
            <br></br>
                <button className="switchButton" onClick={()=>{setBrowseList(!browseList)}}>← List</button>
                <br></br>
             
                <PieceSetter pieceNum={pieceNumber} allPieceData={pieceDataStructure} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData} username={uname} projName={projectName}/>

            </div>}

            {browseList === true &&<div className="pieceManager">
            <button className="buttonRight" onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>

                 <PieceManager allPieceData={pieceDataStructure} assignPieceNum={getSelectedPiece} assignPreviewIndex={getPreviewingIndex} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData}/>

            </div>}
            
            <PreviewWindow dataObj={pieceDataStructure[previewingIndex]}/>
            </div>
        
        </div>
    );
}
