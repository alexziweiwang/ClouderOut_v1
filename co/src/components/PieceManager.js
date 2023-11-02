import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData}) {
    //TODO need a *function (from caller)* that fetches the current "will edit" row/piece number

    let name = "/piecemanager";

    const [currentPieceNum, setCurrentPieceNum] = useState(1);

    function changeSelectedRow() {
        console.log("row selected...");
        //TODO: change the currentPieceNum here based on clicked button's index
        //TODO: need the information of "which row" is selected
    }
 
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

        {/* //TODO: after creating testing data, do map for each row in the table */}
            {
            <tr>
                <td>{currentPieceNum}</td>
                <td></td>
                <td>
                <div>
                <button>Move Up</button>
                <button>Duplicate</button>
                <button>Move Down</button>
                <button>Delete</button>
                <br></br>
                <button onClick={()=>{changeSelectedRow();}}>Edit</button>

                </div>
                </td>
            </tr>}
        {}
    </table>
    <button>Add New Row</button>

        </div>
    );
}