import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PreviewWindow() {

    console.log("re-rendering @preview window");

    let name = "/previewwindow";
 
    return (
        <div className="previewWindow">
     
            <div className="preveiewArea">
            <p className="plans">
                needed data: game size and direction info setting from the user/author
                <br></br> default:     height: 450px & width: 800px
                <br></br> reads all data for current piece and present here
            </p>
            </div>
            
        </div>
    );
}