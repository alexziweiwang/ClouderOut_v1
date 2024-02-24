import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUISetter from './GameUISetter';

export default function PieceManager({allPieceData, assignPieceNum, assignPreviewIndex, updatePieceData, getAllPieceData}) {

    let name = "/piecemanager";
    const [pieceDataLocal, setPieceDataLocal] = useState(allPieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [previewPieceNum, setPreviewPieceNum] = useState(0);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    const [isManage, setIsManage] = useState(false);

    const [guiAreaDisplay, setGuiAreaDisplay] = useState(false);


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

    function insertNewListItem(preIndex) {
        const number = preIndex+1;
        setCurrentPieceNum(number);
        let pieceDataArr = [];
        let j = 0;
        for (; j < number; j++) {
            pieceDataArr.push(pieceDataLocal[j]);
        }
    
        for (; j < pieceDataLocal.length; j++) {
            const piece = {...pieceDataLocal[j],  "num": j+2};
            pieceDataArr.push(piece);
        }

        const item = {"num": number+1, "content": "", "speaker_name": "", "bgp_source_link": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": 800, "bgp_height": 450, "chp_arr": [], "btn_arr": [], "bgm_source_link": "", "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}; 
      
        pieceDataArr.push(item);

        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);
    }

    return (
        <div className="pieceManager">
            <button onClick={updateLocalDataToCloud}>Save to Cloud</button>
            <br></br><br></br><br></br>
            {isManage === false && <button onClick={()=>{setIsManage(!isManage);}}>
                    Manage Mode
            </button>} 

            {isManage === true && <button onClick={()=>{setIsManage(!isManage);}}>
                    View Mode
            </button>}             
            <table>
        <thead>
            <tr>
            <th>Editor</th>
            <th>Number</th>
            <th>Content</th>
            {isManage === true && 
            <th>Operations</th>}
            </tr>
        </thead>
        <tbody>
        
            {pieceDataLocal.map((item, index) => {

                const currItem = pieceDataLocal[index];
                return (
                    <tr key={index} className={(highlightedPiece === currItem["content"])? "tableItemSelected" : "tableItem"} onClick={()=>{doHighlightItem(currItem["content"]);assignPreviewIndex(index);updatePieceData(pieceDataLocal);}}>
                    <td>
                        <button onClick={()=>{assignPreviewIndex(index);assignPieceNum(currItem["num"]);}}>Edit</button>
                    </td>
                    <td>{currItem["num"]}</td>
                    <td>{currItem["speaker_name"]}{(currItem["speaker_name"] === "") ? "" : ":"}{(currItem["speaker_name"] !== "") && <br></br>}{currItem["content"]}</td>
                    {isManage === true &&  <td>
                    <div>
                        <button onClick={()=>{moveItemUpRow(index, currItem["content"]);}}>Move Up</button>
                        <br></br>
                        <button onClick={()=>{moveItemDownRow(index, currItem["content"]);}}>Move Down</button>
                        <br></br>
                        <button onClick={()=>{duplicatePiece(index);updatePieceData(pieceDataLocal);}}>Duplicate</button>
                        {/* <button onClick={()=>{assignPreviewIndex(index);updatePieceData(pieceDataLocal);}}>Preview</button> //TODO reconsider whether pieceData-updating needed*/}                    
                        <button onClick={()=>{insertNewListItem(index);updatePieceData(pieceDataLocal);}}>Insert</button> 
                    </div>
                    
                    </td>}
                    <td>
                        <button onClick={()=>{deletePiece(index);updatePieceData(pieceDataLocal);}}>Delete</button>
                    </td>
                </tr>
                );
            })} 

        </tbody>
    </table>
    <button onClick={createNewListItem}>Add New Row</button>

            <br></br><br></br><br></br>
    
    <button onClick={()=>{setGuiAreaDisplay(!guiAreaDisplay);}}>Game UI Settings Options</button>
    {guiAreaDisplay === true && <GameUISetter/>}
        </div>
    );
    
}