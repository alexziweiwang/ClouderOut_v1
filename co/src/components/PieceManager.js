import * as React from 'react';
import { useState } from 'react';


export default function PieceManager({pieceData, assignPieceNum, assignPreviewIndex}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(pieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [previewPieceNum, setPreviewPieceNum] = useState(0);
    const [highlightedPiece, setHighlightedPiece] = useState("");

    function createNewListItem() {
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        const item = {"num": number, "content": ""};
        let pieceDataArr = pieceData;
        pieceDataArr.push(item);
        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);
    }

    function updateLocalDataToCloud() { //TODO cloud-related
        console.log("TODO: saving to cloud via VM func ... ", pieceDataLocal);
    }
 
    function moveItemUpRow(index, content) {
        /* switch current item with the previous (smaller) item */
        if (index >= 1) {
            const tempArr = [...pieceDataLocal];
            let itemPrev = tempArr[index-1];
            itemPrev["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index;
            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);
            setHighlightedPiece(content);        


        } else {
            return;
        }
    }

    function moveItemDownRow(index, content) {
        /* switch current item with the next (larger) item */
        if (index < pieceDataLocal.length - 1) {
            const tempArr = [...pieceDataLocal];
            let itemNext = tempArr[index+1];
            itemNext["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index+2;
            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);
            setHighlightedPiece(content);        


        } else {
            return;
        }
    }

    function doHighlightItem(content) {
        setHighlightedPiece(content);        
    }

    function duplicatePiece(index) {
        console.log("duplicate, content = ", pieceDataLocal[index]);
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        const item = {"num": number, "content": pieceDataLocal[index]["content"]};

        let pieceDataArr = pieceData;
        pieceDataArr.push(item);
        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);
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
            {pieceDataLocal.map((item, index) => {

                const currItem = pieceDataLocal[index];
                return (
                    <tr key={index} className={(highlightedPiece === currItem["content"])? "tableItemSelected" : "tableItem"} onClick={()=>{doHighlightItem(currItem["content"]);}}>
                
                    <td>{currItem["num"]}</td>
                    <td>{currItem["content"]}</td>
                    <td>
                    <div>
                    <button onClick={()=>{moveItemUpRow(index, currItem["content"]);}}>Move Up</button>
                    <br></br>
                    <button onClick={()=>{moveItemDownRow(index, currItem["content"]);}}>Move Down</button>
                    <br></br>
                    <button onClick={()=>{duplicatePiece(index);}}>Duplicate</button>
                    <button onClick={()=>{console.log("deleting item...");}}>Delete</button>
                    <br></br>
                    <button onClick={()=>{assignPieceNum(currItem["num"]);}}>Edit</button>
                    <button onClick={()=>{assignPreviewIndex(index);}}>Preview</button>
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