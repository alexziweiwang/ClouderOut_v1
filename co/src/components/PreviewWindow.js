import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PreviewWindow() {

    console.log("re-rendering @preview window");

    let name = "/previewwindow";
 
    return (
        <div className="previewWindow">
            <p>

                this is preview window...
                <br></br>(line2)
            </p>
            
        </div>
    );
}