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
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [browseList, setBrowseList] = useState(true);
    const [pieceNumber, setPieceNumber] = useState(1); //TODO: this would be the current/"counter of" piece to fetch from db/ds
    const [previewingIndex, setPreviewingIndex] = useState(0);
    const [gameScreenSize, setGameScreenSize] = useState("");

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
        navigate('/gamemaker', { replace: true });
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

    function changeGameScreenSize(event) {
        const input = event.target.value;
        //TODO update information to cloud db
        if (event != null && event.target != null && event.target.value!= null) {
          if (input === "h450_800") {
            console.log("h450_800");
            setGameScreenSize("h450_800");
          } else if (input === "v800_450") {
            console.log("v800_450");
            setGameScreenSize("v800_450");
          } else if (input === "h600_800") {
            console.log("h600_800");
            setGameScreenSize("h600_800");
          } else if (input === "v800_600") {
            console.log("v800_600");
            setGameScreenSize("v800_600");
          } else {
            console.log("not selected!");
          }
        }
      }

    function updateGameSize() {
        console.log("new game size:", gameScreenSize);
        //TODO pop some kind of warning to remind the user
        //TODO design: each node and have one size, and different nodes can have various nodes?

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
             
                <PieceSetter pieceNum={pieceNumber} allPieceData={pieceDataStructure} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData}/>

            </div>}

            {browseList === true &&<div className="pieceManager">
            <button className="buttonRight" onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>

                 <PieceManager allPieceData={pieceDataStructure} assignPieceNum={getSelectedPiece} assignPreviewIndex={getPreviewingIndex} updatePieceData={changePieceData} getAllPieceData={fetchAllPieceData}/>
                <div>
                    <p className="plans">
                    Adjustment area: setting of size & direction for current node 
                    <br></br>should trigger warning if changing, and asking the user to re-organize things after a size/direciton change...
                    <br></br>but this feature is provided so user can utilize the existing node-content
                    </p>

                    <select value={gameScreenSize} onChange={changeGameScreenSize}>
                        <option value="" key=""> ----- Select Size and Direction ----- </option>
                        <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
                        <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
                        <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
                        <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>

                    </select>
                    <button onClick={()=>{updateGameSize();}}>Update</button>
                </div>
            </div>}
            
            <PreviewWindow dataObj={pieceDataStructure[previewingIndex]}/>
            </div>
        
        </div>
    );
}
