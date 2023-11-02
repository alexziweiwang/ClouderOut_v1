import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData}) {


    let name = "/piecemanager";
 
    return (
        <div>
            <p className="plans">
            This is piece-manager: 
            <br></br>list of pieces are displayed here organized here
            <br></br> in each piece's quick view: show the speaker + word content
            </p>
            <table>
            <tr>
            <th>Number</th>
            <th>Content</th>
            <th>Operations</th>
            </tr>
            <tr>
                <td>1</td>
                <td></td>
                <td>
                <div>
                <button>Move Up</button>
                <button>Duplicate</button>
                <button>Move Down</button>
                <button>Delete</button>
                <br></br>
                <button>Edit</button>

                </div>
                </td>
            </tr>
        {}
    </table>
    <button>Add New Row</button>

        </div>
    );
}