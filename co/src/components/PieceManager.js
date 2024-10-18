import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUISetter from './GameUISetter';
import langDictionary from './textDictionary';


export default function PieceManager({allPieceData, assignPieceNum, assignPreviewIndex, updatePieceData, getAllPieceData, setIsClickedOnSetters, fetchClickedIsOnSetter, getCurrentPieceNum}) {
    const screenWidth = 800;
    const screenHeight =450;
    let languageCodeTextOption = 'en';

    let name = "/piecemanager";

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    let saveToCloudText = textDictItem.saveToCloudText !== undefined ?
        textDictItem.saveToCloudText
        : textDictItemDefault.saveToCloudText;
    
    let manageModeText = textDictItem.manageModeText !== undefined ?
        textDictItem.manageModeText
        : textDictItemDefault.manageModeText;
    
    let viewModeText = textDictItem.viewModeText !== undefined ?
        textDictItem.viewModeText
        : textDictItemDefault.viewModeText;

    let editText = textDictItem.editText !== undefined ?
        textDictItem.editText
        : textDictItemDefault.editText;
        
    let moveUpText = textDictItem.moveUpText !== undefined ?
        textDictItem.moveUpText
        : textDictItemDefault.moveUpText;

    let moveDownText = textDictItem.moveDownText !== undefined ?
        textDictItem.moveDownText
        : textDictItemDefault.moveDownText;
    

    let duplicateText = textDictItem.duplicateText !== undefined ?
        textDictItem.duplicateText
        : textDictItemDefault.duplicateText;
    
    let insertText = textDictItem.insertText !== undefined ?
        textDictItem.insertText
        : textDictItemDefault.insertText;
    
    let deleteText = textDictItem.deleteText !== undefined ?
        textDictItem.deleteText
        : textDictItemDefault.deleteText;
    
    let addNewRowText = textDictItem.addNewRowText !== undefined ?
        textDictItem.addNewRowText
        : textDictItemDefault.addNewRowText;
    

        
    const [pieceDataLocal, setPieceDataLocal] = useState(allPieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [previewPieceNum, setPreviewPieceNum] = useState(0);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    const [isManage, setIsManage] = useState(false);

    useEffect(() => {
        if (firstTimeEnter === true) {
            const allPiece = getAllPieceData();

            setPieceDataLocal(allPiece);
            setFirstTimeEnter(false);
        }

        let isActionOnSetter = fetchClickedIsOnSetter();
        if (isActionOnSetter === false) {
            //fetch action from preview-screen
            //TODO1: update viewing index/num
            let receivedPieceIndex = getCurrentPieceNum();
            doHighlightItem(receivedPieceIndex+1); //TODO1 testing

        }
    });

      
    function createNewListItem() {
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        const item = {"num": number, "content": "", "speaker_name": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": {screenWidth}, "bgp_height": {screenHeight}, "chp_arr": [], "btn_arr": [], "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}; 
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
            setHighlightedPiece(index);   
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
            setHighlightedPiece(index+2);    
        } else {
            return;
        }
    }

    function doHighlightItem(num) {
        setHighlightedPiece(num);                 
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

        const item = {"num": number+1, "content": "", "speaker_name": "", "bgp_pos_x": 0, "bgp_pos_y": 0, "bgp_width": {screenWidth}, "bgp_height": {screenHeight}, "chp_arr": [], "btn_arr": [], "bgm_loop": true, "bgm_volume": 100, "vl_source_link": "", "vl_volume": 100}; 
      
        pieceDataArr.push(item);

        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);
    }

    return (
        <div className="pieceManager" 
            onClick={()=>{
                setIsClickedOnSetters(true);
            }}
        >
            <button onClick={updateLocalDataToCloud}>{saveToCloudText}</button>
            <br></br><br></br><br></br>
            {isManage === false && <button onClick={()=>{setIsManage(!isManage);}}>
                    {manageModeText}
            </button>} 

            {isManage === true && <button onClick={()=>{setIsManage(!isManage);}}>
                    {viewModeText}
            </button>}             
            <table className="pieceTable">
        <thead>
            <tr>
            <th style={{"width": "50px"}}>Editor</th>
            <th style={{"width": "30px"}}>#</th>
            <th className="contentGrid">Content</th>
            {isManage === true && 
                <th style={{"width": "90px"}}>Operations</th>}
            {isManage === true &&   
                <th style={{"width": "60px"}}></th>}
            </tr>
        </thead>
        <tbody>
        
            {pieceDataLocal.map((item, index) => {

                return (
                    <tr key={index} className={
                        
                        (highlightedPiece === item["num"])      
                            ? "tableItemSelected" : "tableItem"} onClick={()=>{
                        doHighlightItem(item["num"]);   
                        assignPreviewIndex(index); //TODO1 check
                        console.log("table row clicked: ", index, "; ", item["num"] );//TODO1 test
                        updatePieceData(pieceDataLocal);}}>
                    <td>
                        <button onClick={()=>{
                            assignPreviewIndex(index); //TODO1 check
                            console.log("table row to edit: ", index, "; ", item["num"] );//TODO1 test

                            assignPieceNum(item["num"]);}}>{editText}</button>
                    </td>
                    <td>{item["num"]}</td>
                    <td className="contentGrid">
                        {item["speaker_name"]}{(item["speaker_name"] === "") ? "" : ":"}{(item["speaker_name"] !== "") && <br></br>}
                    {item["content"]}
                    
                    </td>
                    {isManage === true &&  <td>
                    <div>
                        <button onClick={()=>{moveItemUpRow(index, item["content"]);}}>{moveUpText}</button>
                        <br></br>
                        <button onClick={()=>{moveItemDownRow(index, item["content"]);}}>{moveDownText}</button>
                        <br></br>
                        <button onClick={()=>{duplicatePiece(index);updatePieceData(pieceDataLocal);}}>{duplicateText}</button>
                        <button onClick={()=>{insertNewListItem(index);updatePieceData(pieceDataLocal);}}>{insertText}</button> 
                    </div>
                    
                    </td>}
                    {isManage === true && <td>
                        <button 
                        
                        onClick={()=>{
                            let content = "Are you sure to delete this node: " + item["num"] + ":" + item["content"] + "?";
                            let respondGiven = window.confirm(content);
                            if (respondGiven) {
                                deletePiece(index);
                                updatePieceData(pieceDataLocal);
                            }       
                        }}
                        >{deleteText}</button>
                    </td>}
                </tr>
                );
            })} 

        </tbody>
    </table>
    <button onClick={createNewListItem}>{addNewRowText}</button>
    
        </div>
    );
    
}