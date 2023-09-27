import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function GameMaker() {
    const navigate = useNavigate();

    function goToGameMaker() {
        navigate('/dashboard', { replace: true });
    }
    
    return (
  <div>
    This is GameMaker Component!!
    <button onClick={goToGameMaker}>Return to Dashboard </button>
  </div>
    );
}
