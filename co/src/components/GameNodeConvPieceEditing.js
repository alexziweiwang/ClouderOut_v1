import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function GameNodeConvPieceEditing() {
    const navigate = useNavigate();

    console.log("re-rendering: game node conv... @piece editing");

    let name = "/gamenodeconvpiece";

    const [bgpicAdd, setBgPicAdd] = useState(false);
    const [charPicAdd, setCharPicAdd] = useState(false);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(false);
    const [buttonAdd, setButtonAdd] = useState(false);
    const [bgMusicAdd, setBgMusicAdd] = useState(false);
    const [voicelineAdd, setVoicelineAdd] = useState(false);

    function toggleBgPicOption() {
        setBgPicAdd(!bgpicAdd);
    }

    function toggleCharPicOption() {
        setCharPicAdd(!charPicAdd);
    }

    function toggleSpeakerNameOption() {
        setSpeakerNameAdd(!speakerNameAdd);
    }

    function toggleButtonAddOption() {
        setButtonAdd(!buttonAdd);
    }

    function toggleBgMusicAddOption() {
        setBgMusicAdd(!bgMusicAdd);
    }

    function toggleVoicelineAddOption() {
        setVoicelineAdd(!voicelineAdd);
    }

  

    return (
  <div>
            <button onClick={toggleBgPicOption}>Add Background Picture</button>
            {bgpicAdd && <div>TODO: bg pic setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleCharPicOption}>Add Character Picture</button>
            {charPicAdd && <div>TODO: character pic setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleSpeakerNameOption}>Add Speaker Name for Text</button>
            {speakerNameAdd && <div> TODO: speaker name setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleButtonAddOption}>Add Button</button>
            {buttonAdd && <div>TODO: button/clickable-option setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleBgMusicAddOption}>Add bgm</button>
            {bgMusicAdd && <div>TODO: bgm setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleVoicelineAddOption}>Add voiceline</button>
            {voicelineAdd && <div>TODO: voiceline setting area</div>}

  </div>
    );
}
