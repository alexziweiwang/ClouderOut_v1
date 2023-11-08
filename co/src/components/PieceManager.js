import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData, assignPieceNum}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(pieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp

    function createNewListItem() {
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        const item = {"num": number, "content": ""};
        let pieceDataArr = pieceData;
        pieceDataArr.push(item);
        setPieceDataLocal(pieceDataArr);
    }

    function updateLocalDataToCloud() { //TODO cloud-related
        console.log("TODO: saving to cloud via VM func ... ", pieceDataLocal);
    }
 
    function moveItemUpRow(index) {
        /* switch current item with the previous (smaller) item */
        if (index >= 1) {
            const tempArr = [...pieceDataLocal];
            let itemPrev = tempArr[index-1];
            itemPrev["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index;
            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);

        } else {
            return;
        }
    }

    function moveItemDownRow(index) {
        /* switch current item with the next (larger) item */
        if (index < pieceDataLocal.length - 1) {
            const tempArr = [...pieceDataLocal];
            let itemNext = tempArr[index+1];
            itemNext["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index+2;
            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);

        } else {
            return;
        }
    }

    return (
        <div>
            <button className="buttonRight" onClick={updateLocalDataToCloud}>Save to Cloud</button>
            
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
            {pieceDataLocal.map((itemIndex, index) => {

                const currItem = pieceDataLocal[index];
                return (
                    <tr key={index}>
                
                    <td>{currItem["num"]}</td>
                    <td>{currItem["content"]}</td>
                    <td>
                    <div>
                    <button onClick={()=>{moveItemUpRow(index);}}>Move Up</button>
                    <button>Duplicate</button>
                    <button onClick={()=>{moveItemDownRow(index);}}>Move Down</button>
                    <button>Delete</button>
                    <br></br>
                    <button onClick={()=>{assignPieceNum(currItem["num"]);}}>Edit</button>
    
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