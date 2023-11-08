import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PreviewWindow({previewPieceNum}) {

    console.log("re-rendering @preview window", previewPieceNum);

    let name = "/previewwindow";
 
    return (
        <div className="previewWindow">
     
            <div className="preveiewArea">
                <label> Previewing ... {previewPieceNum} </label>
            <p className="plans">
                needed data: game size and direction info setting from the user/author
                <br></br> default:     height: 450px & width: 800px
                <br></br> reads all data for current piece and present here
            </p>

            <p className="plans">
                required input data: "Edit on Piece"

                <br></br> - [optional] background picture [0..1]: source link, position, width, height
                <br></br> - [optional] character picture [0..n]: source link, position, width, height

                <br></br> - text content (on UI) [0..1]: content
                <br></br> - [optional] test speaker name [0..1]: content

                <br></br> - [optional] button/clickable item [0..n]: shape/pic_source, sound effect, pressed_consequence on game data

                <br></br> - [optional] background music [0..1]: source link, loop or not, volume
                <br></br> - [optional] voiceline [0..1]: source link, volume

            </p>
            </div>
            
        </div>
    );
}