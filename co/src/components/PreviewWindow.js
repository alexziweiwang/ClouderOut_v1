import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PreviewWindow({ dataObj}) {

    console.log("re-rendering @preview window", dataObj);

    let name = "/previewwindow";
 
    return (
        <div className="previewWindow">
     
            <div className="preveiewArea">
                
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


            <p className="plans">
            This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)

            <br></br> TODO: load game-data here, and pass to piece-setter
            <br></br> for "consequence" by some clickable, make sure it updates the game-data
            <br></br> conosider local-version keeping, and syncing to cloud

            <br></br> After fetching the data above, previewer should reflect the adjustment and present this piece (refresh with local data)
            <br></br> also, save and update to db if requested by user.


            </p>

            <p className="plans">
                * idea: provide "game-data-viewer" for authors:
                <br></br> at all points (pieces) of the game, the author can check game-data for that progress to keep track of everything in game
                <br></br> toggle in preview-related component
            </p>


            </div>


           
            
        </div>
    );
}