import * as React from 'react';
import { useState, useEffect } from 'react';


export default function PieceManager({allPieceData, assignPieceNum, assignPreviewIndex, updatePieceData, getAllPieceData}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(allPieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [previewPieceNum, setPreviewPieceNum] = useState(0);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);


    useEffect(() => {
        if (firstTimeEnter === true) {
            const allPiece = getAllPieceData();
            console.log("piece manager: allpiece now is = ", allPiece);//TODO test
            setPieceDataLocal(allPiece);
            setFirstTimeEnter(false);
        }
    });

      
    function createNewListItem() {
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        const item = {"num": number, "content": "", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}; 
        let pieceDataArr = pieceDataLocal;
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
        const item = {... pieceDataLocal[index],  "num": number};
        let pieceDataArr = pieceDataLocal;
        pieceDataArr.push(item);
        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);
    }

    function deletePiece(index) {
        console.log("deleting item...", pieceDataLocal[index]);
        //TODO: all later pieces move up by 1?
        //TODO: design effective deleting way
        let newDataLocal = [];
        let j = 0;
        for (; j < index; j++) {
            newDataLocal.push(pieceDataLocal[j]);
        }

        let i = index;
        for (; i < (pieceDataLocal.length - 1); i++) {
            const piece = {...pieceDataLocal[i+1],  "num": i+1};
            newDataLocal.push(piece);
        }

        console.log("updated allPieceData: ", newDataLocal);
        setPieceDataLocal(newDataLocal);
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
        
            {pieceDataLocal.map((item, index) => {

                const currItem = pieceDataLocal[index];
                return (
                    <tr key={index} className={(highlightedPiece === currItem["content"])? "tableItemSelected" : "tableItem"} onClick={()=>{doHighlightItem(currItem["content"]);}}>
                
                    <td>{currItem["num"]}</td>
                    <td>{currItem["speaker_name"]}{(currItem["speaker_name"] === "") ? "" : ":"}{(currItem["speaker_name"] !== "") && <br></br>}{currItem["content"]}</td>
                    <td>
                    <div>
                    <button onClick={()=>{moveItemUpRow(index, currItem["content"]);}}>Move Up</button>
                    <br></br>
                    <button onClick={()=>{moveItemDownRow(index, currItem["content"]);}}>Move Down</button>
                    <br></br>
                    <button onClick={()=>{duplicatePiece(index);}}>Duplicate</button>
                    <button onClick={()=>{deletePiece(index);}}>Delete</button>
                    <br></br>
                    <button onClick={()=>{assignPreviewIndex(index);assignPieceNum(currItem["num"]);}}>Edit</button>
                    <button onClick={()=>{assignPreviewIndex(index);}}>Preview</button>
                    </div>
                    </td>
                </tr>
                );
            })} 

        </tbody>
    </table>
    <button onClick={createNewListItem}>Add New Row</button>

    <br></br><br></br>
    <button onClick={()=>{updatePieceData(pieceDataLocal);}}>Save</button>

        </div>
    );
}