import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData, assignPieceNum}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(pieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp


    function createNewListItem() {
        const num = currentPieceNum+1;
        setCurrentPieceNum(num);
        const pList = pieceDataLocal.pieceNumber;
        pList.push(num);
        const cList = pieceDataLocal.contentList;
        const newObj = {pieceNumber: pList, contentList: cList};
        setPieceDataLocal(newObj);
    }
 
    return (
        <div>
            <p className="plans">
            This is piece-manager: 
            <br></br>list of pieces are displayed here organized here
            <br></br> in each piece's quick view: show the speaker + word content
            </p>

            <button onClick={()=>{console.log("TODO: saving to cloud via VM func ... ");}}>Save to Cloud</button>
            
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
                    <button>Move Up</button>
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