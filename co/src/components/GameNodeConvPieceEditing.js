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
    const [clickableAdd, setClickableAdd] = useState(false);
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

    function toggleclickableAddOption() {
        setClickableAdd(!clickableAdd);
    }

    function toggleBgMusicAddOption() {
        setBgMusicAdd(!bgMusicAdd);
    }

    function toggleVoicelineAddOption() {
        setVoicelineAdd(!voicelineAdd);
    }

    function collapseAllOptions() {
        setBgPicAdd(false);
        setCharPicAdd(false);
        setSpeakerNameAdd(false);
        setClickableAdd(false);
        setBgMusicAdd(false);
        setVoicelineAdd(false);
    }

    function expandAllOptions() {
        setBgPicAdd(true);
        setCharPicAdd(true);
        setSpeakerNameAdd(true);
        setClickableAdd(true);
        setBgMusicAdd(true);
        setVoicelineAdd(true);
    }

  

    return (
  <div className="userChoice">
            

            <button onClick={toggleSpeakerNameOption}> Speaker Name for Text Setting </button>
            {speakerNameAdd && 
                <div> TODO: speaker name setting area
                    <br></br>content
                </div>}
            {!speakerNameAdd && <div className="textRight">-----------------------------------------------</div>}
            
            <button onClick={toggleBgPicOption}> Background Picture Setting {bgpicAdd}</button>
            {bgpicAdd && 
                <div>
                    TODO: bg pic setting area
                    <br></br>source link
                    <br></br>position
                    <br></br>width
                    <br></br>height
                </div>}
            {!bgpicAdd && <div className="textRight">-----------------------------------------------</div>}

            <button onClick={toggleCharPicOption}> Character Picture Setting </button>
            {charPicAdd && 
                <div>
                    TODO: character pic setting area
                    <br></br>source link
                    <br></br>position
                    <br></br>width
                    <br></br>height
                </div>}
            {!charPicAdd && <div className="textRight">-----------------------------------------------</div>}

            <button onClick={toggleclickableAddOption}> Clickable(customizable button) Setting </button>
            {clickableAdd && 
                <div>TODO: button/clickable-option setting area
                    <br></br>shape/pic_source
                    <br></br>sound effect
                    <br></br>pressed consequence on game data
                </div>}
            {!clickableAdd && <div className="textRight">-----------------------------------------------</div>}

            <button onClick={toggleBgMusicAddOption}>Background Music Setting </button>
            {bgMusicAdd && 
                <div>TODO: bgm setting area
                    <br></br>source link
                    <br></br>is looping
                    <br></br>volume
                </div>}
            {!bgMusicAdd && <div className="textRight">-----------------------------------------------</div>}

            <button onClick={toggleVoicelineAddOption}> Voiceline Setting </button>
            {voicelineAdd && 
                <div>TODO: voiceline setting area
                    <br></br>source link
                    <br></br>volume           
                </div>}
            {!voicelineAdd && <div className="textRight">-----------------------------------------------</div>}


            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
  </div>
    );
}
