import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';

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


        </div>
    );
}
