import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
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

    const returnGameMakerButtonText = ["Return To GameMaker!"];
    const showResourceManagerButtonText = ["Resource Manager"]; 

    const pieceDataStructure = {}; //TODO testing
    


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

    function jumpToPrevPiece() {
        console.log("TOOD: jump to previous piece..."); //TODO testing
        if (pieceNumber > 1) {
            setPieceNumber(pieceNumber-1);
        } else {
            setPieceNumber(1);
        }
    }

    function jumpToNextpiece() {
        console.log("TOOD: jump to next piece..."); //TODO testing
        if (pieceNumber < 1000000) { //TODO change later: fetch pieceDataGroup's length
            setPieceNumber(pieceNumber+1);
        } else {
            setPieceNumber(999999);
        }
    }

    function switchListEditor() {
        setBrowseList(!browseList);
    }

    function getSelectedPiece(num) {
        setPieceNumber(num);
        console.log("!!! from piece-manager:" , num);//TODO test
        switchListEditor();
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[0]} </button></div>
            
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}
            <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[0]} </button>

            <p className="plans">This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)
            </p>

            <p className="plans">
                TODO: Add a list for scrolling/switching between slides/pieces for this node
                <br></br> - TODO: add testing data
                <br></br> - each list item is clickable, and then the editing options provided to the user
                <br></br> options: [move up], [move down], [duplicate] ,[remove]
                <br></br> important!! think about efficient ways for changing/keeping the index(sequence)
                <br></br> indexing-idea: not chaning like bubble-sort?
            </p>

            <p className="plans">
                TODO: load game-data here, and pass to piece-setter
                <br></br>for "consequence" by some clickable, make sure it updates the game-data
                <br></br>conosider local-version keeping, and syncing to cloud
            </p>


            <p className="plans">
                TODO: think about "switching"/"moving rows" feature 
                <br></br> each row would have an serial number, and switching would just switch the row number, and then sort again?
            </p>

            <p className="plans">
                After fetching the data above, previewer should reflect the adjustment and present this piece (refresh with local data)
                <br></br> also, save and update to db if requested by user.
            </p>

            
            <div className="parallelFrame">
            {browseList == false && <div className="userChoice">
                <button className="switchButton" onClick={()=>{setBrowseList(!browseList)}}>← List</button>
                <br></br>
                <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
                <button onClick={jumpToNextpiece} className="pairGroup"> → </button>
                <PieceSetter pieceNum={pieceNumber}/>
                <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
                <button onClick={jumpToNextpiece} className="pairGroup"> → </button>

            </div>}
            {browseList == true &&<div className="pieceManager">
                <button className="switchButton" onClick={()=>{switchListEditor();}}>List/Editing (TEMP) </button>
                 <PieceManager pieceData={pieceDataStructure} assignPieceNum={getSelectedPiece}/>
            </div>}
            

            <PreviewWindow/>
            </div>
        
        </div>
    );
}
