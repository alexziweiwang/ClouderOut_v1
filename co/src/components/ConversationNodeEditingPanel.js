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

    const returnGameMakerButtonText = ["Return To GameMaker!"];
    const showResourceManagerButtonText = ["Resource Manager"]; 
    const buttonLanguageIndex = 0;

    const [pieceDataStructure, setPieceDatastructure] = useState([
            {"num": 1, "content": "a1000"}, 
            {"num": 2, "content": "b2000"}, 
            {"num": 3, "content": "c3000"}, 
            {"num": 4, "content": "d4000"}, 
            {"num": 5, "content": "e5000"}]
    ); //TODO testing *Important* later: load from cloud

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
        console.log("in editing-panel: new data now is ...", updatedPieceData);
        setPieceDatastructure(updatedPieceData);
    }

    function getPreviewingIndex(index) {
        console.log("conv-edit-panel, getPreviewingIndex:" , index); 
        setPreviewingIndex(index);
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[buttonLanguageIndex]} </button></div>
            
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}
     
            <div className="parallelFrame">
            {browseList === false && <div className="userChoice">
                <button className="switchButton" onClick={()=>{setBrowseList(!browseList)}}>← List</button>
                <br></br>
             
                <PieceSetter pieceNum={pieceNumber} pieceData={pieceDataStructure} updatePieceData={changePieceData}/>
                <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>

            </div>}
            {browseList === true &&<div className="pieceManager">
                 <PieceManager pieceData={pieceDataStructure} assignPieceNum={getSelectedPiece} assignPreviewIndex={getPreviewingIndex}/>
                 <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[buttonLanguageIndex]} </button>

            </div>}
            
            <PreviewWindow dataObj={pieceDataStructure[previewingIndex]}/>
            </div>
        
        </div>
    );
}
