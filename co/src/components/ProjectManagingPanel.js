import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }
    
    return (
  <div>
    This is ProjectManagerPanel Component!!
    <button onClick={goToGameMaker}> Go To GameMaker! </button>

  </div>
    );
}
