import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
import useCollapse from 'react-collapsed';


export default function ConversationNodeEditingPanel() {
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }
    console.log("this node is : " + nodeName); //TODO

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> Return To GameMaker! </button></div>
            
            <p className="plans">This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)
            </p>

            <p className="plans">
                TODO: Add table-like or other solutions for scrolling/switching between slides/pieces for this node
            </p>

            <p className="plans">
                required input data:
                <br></br> - background picture [0..1]: source link, position, width, height
                <br></br> - character picture [0..n]: source link, position, width, height

                <br></br> - text content (on UI) [0..1]: content
                <br></br> - test speaker name [0..1]: content

                <br></br> - button/clickable item [0..n]: shape/pic_source, sound effect, pressed_consequence on game data

                <br></br> - background music [0..1]: source link, loop or not, volumne
                <br></br> - voiceline [0..1]: source link, volumne

            </p>

            <p className="plans">
                After fetching the data above, previewer should reflect the adjustment and present this piece
                <br></br> also, save and update to db if requested by user.
            </p>

            <p className="plans">
                TODO think about the preview solution
            </p>

        </div>
    );
}
