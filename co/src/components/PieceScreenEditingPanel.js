import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function PieceScreenEditingPanel() {
    const navigate = useNavigate();

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }

    return (

        <div>
            <div class="returning_buttons"><button class="button" onClick={goToGameMaker}> Return To GameMaker! </button></div>
            
            <p className="plans">This is piece/screen editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)
            </p>


        </div>
    );
}
