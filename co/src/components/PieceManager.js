import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './webpage.css';


export default function PieceManager({pieceData, assignPieceNum}) {
    //TODO need a *function (from caller)* that fetches the current "will edit" row/piece number

    let name = "/piecemanager";

    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [pieceTestData, setPieceTestData] = useState({pieceNumber: [], contentList:[]});


    function changeSelectedRow(index) {
        console.log("row selected...", index);
        //TODO: change the currentPieceNum here based on clicked button's index
        //TODO: need the information of "which row" is selected
    }

    function createNewListItem() {
        const num = currentPieceNum+1;
        setCurrentPieceNum(num);
        
        const pList = pieceTestData.pieceNumber;
        pList.push(num);
     
        const cList = pieceTestData.contentList;
        const str = "This is piece" + num; //TODO temp
        cList.push(str);
        
        const newObj = {pieceNumber: pList, contentList: cList};
        setPieceTestData(newObj);
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
            {pieceTestData.pieceNumber.map((itemIndex, index) => {
                return (
                    <tr>
                
                    <td>{pieceTestData.pieceNumber[index]}</td>
                    <td>{pieceTestData.contentList[index]}</td>
                    <td>
                    <div>
                    <button>Move Up</button>
                    <button>Duplicate</button>
                    <button>Move Down</button>
                    <button>Delete</button>
                    <br></br>
                    <button onClick={()=>{changeSelectedRow(itemIndex);assignPieceNum(itemIndex);}}>Edit</button>
    
                    </div>
                    </td>
                </tr>
                );
            })} 

         
        {}
    </table>
    <button onClick={createNewListItem}>Add New Row</button>

        </div>
    );
}