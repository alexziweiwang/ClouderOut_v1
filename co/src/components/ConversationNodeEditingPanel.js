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
    const [pieceNumber, setPieceNumber] = useState(0); //TODO: this would be the current/"counter of" piece to fetch from db/ds

    const returnGameMakerButtonText = ["Return To GameMaker!"];
    const showResourceManagerButtonText = ["Resource Manager"]; 

    


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
        setPieceNumber(pieceNumber-1);
    }

    function jumpToNextpiece() {
        console.log("TOOD: jump to next piece..."); //TODO testing
        setPieceNumber(pieceNumber+1);
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
                <br></br> - when entering this node-editing page, pull once from cloud db for list of pieces/slides
                <br></br> *** in VM layer, pull all data once, and always transmit to View with the "ready" data, when editing (unless updated and refreshed) 
                <br></br> - each list item is clickable, and then the editing options provided to the user
                <br></br>
                <br></br> - "Save" button *after* all editing finished (to update to cloud-db)
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
                <button onClick={jumpToPrevPiece} className="pairGroup">Prev Piece</button>
                <button onClick={jumpToNextpiece} className="pairGroup">Next Piece</button>
                <PieceSetter pieceNum={pieceNumber}/>
                <button onClick={jumpToPrevPiece} className="pairGroup">Prev Piece</button>
                <button onClick={jumpToNextpiece} className="pairGroup">Next Piece</button>

            </div>}
            {browseList == true &&<div className="pieceManager">
                <button className="switchButton" onClick={()=>{setBrowseList(!browseList)}}>List/Editing (TEMP) </button>
                 <PieceManager/>
            </div>}
            

            <PreviewWindow/>
            </div>
        
        </div>
    );
}
