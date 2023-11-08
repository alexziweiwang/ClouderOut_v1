import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData, assignPieceNum}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(pieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp

    console.log("In [Piece-Manager]:", pieceData); //TODO test

    function createNewListItem() {
        const num = pieceDataLocal.pieceNumber.length+1;
        const pList = pieceDataLocal.pieceNumber;
        pList.push(num);
        let cList = pieceDataLocal.contentList;
        cList.push("");
        const newObj = {pieceNumber: pList, contentList: cList};
        setPieceDataLocal(newObj);
    }

    function updateLocalDataToCloud() { //TODO cloud-related
        console.log("TODO: saving to cloud via VM func ... ", pieceDataLocal);
    }
 
    function moveItemUpRow(index) {
        /* switch current item with the previous (smaller) item */
        if (index > 1) {
            //TODO switch 
        }
    }

    return (
        <div>
            <p className="plans">
            This is piece-manager: 
            <br></br>list of pieces are displayed here organized here
            <br></br> in each piece's quick view: show the speaker + word content
            </p>

            <button onClick={updateLocalDataToCloud}>Save to Cloud</button>
            
            <table>
        <thead>
            <tr>
            <th>Number</th>
            <th>Content</th>
            <th>Operations</th>
            
            </tr>
        </thead>
        <tbody>
        {/* //TODO: after creating testing data, do map for each row in the table */}
            {pieceDataLocal.pieceNumber.map((itemIndex, index) => {
                return (
                    <tr key={itemIndex}>
                
                    <td>{pieceDataLocal.pieceNumber[index]}</td>
                    <td>{pieceDataLocal.contentList[index]}</td>
                    <td>
                    <div>
                    <button onClick={()=>{moveItemUpRow(index);}}>Move Up</button>
                    <button>Duplicate</button>
                    <button>Move Down</button>
                    <button>Delete</button>
                    <br></br>
                    <button onClick={()=>{assignPieceNum(itemIndex);}}>Edit</button>
    
                    </div>
                    </td>
                </tr>
                );
            })} 

        </tbody>
    </table>
    <button onClick={createNewListItem}>Add New Row</button>

        </div>
    );
}