import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';


export default function PieceManager({
    allPieceData, assignPieceNum, assignPreviewIndex, 
    updatePieceData, getAllPieceData, 
    setIsClickedOnSetters, fetchClickedIsOnSetter, getCurrentPieceNum,
    getScreenSize,

    getUILanguage,
    
}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(600);


    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');
    
    const newEmptyPieceTemplate = {
        "num": -1, 
        "content": "", 
        "speaker_name": "", 
        "bgp_pos_x": 0, 
        "bgp_pos_y": 0, 
        "bgp_width": {screenWidth}, 
        "bgp_height": {screenHeight}, 
        "chp_arr": [], 
        "btn_arr": [], 
        "bgm_loop": true, 
        "bgm_volume": 100, 
        "vl_source_link": "", 
        "vl_volume": 100
    }; 


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

    let enterEditorText = textDictItem.enterEditorText !== undefined ?
        textDictItem.enterEditorText
        : textDictItemDefault.enterEditorText;

    let contentsText = textDictItem.contentsText !== undefined ?
        textDictItem.contentsText
        : textDictItemDefault.contentsText;

    let operationsText = textDictItem.operationsText !== undefined ?
        textDictItem.operationsText
        :textDictItemDefault.operationsText;
    
    
    const [renderCounter, setRenderCounter] = useState(0);

        
    const [pieceDataLocal, setPieceDataLocal] = useState(allPieceData);
 
    const [currentPieceNum, setCurrentPieceNum] = useState(0); //TODO temp
    const [previewPieceNum, setPreviewPieceNum] = useState(0);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        if (firstTimeEnter === true) {
            // if (allPieceData === undefined || allPieceData === null || allPieceData.length === 0) {
            //     setPieceDataLocal([]);
            // }
           
            setFirstTimeEnter(false);
        }

        const allPiece = getAllPieceData();
                                        console.log("pm __ got allPiece = ", allPiece);
        allPiece.sort((a, b) => a.num - b.num);
        setPieceDataLocal(allPiece);
        

        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);

        let isActionOnSetter = fetchClickedIsOnSetter();
        if (isActionOnSetter === false) {
            //fetch action from preview-screen
            //TODO1: update viewing index/num
            let receivedPieceIndex = getCurrentPieceNum();
            doHighlightItem(receivedPieceIndex+1); //TODO1 testing

        }

        //TODO getScreenSize and update both w and h
        
    });

 
    function updateRenderCounter() {
        console.log("updateRenderCounter!");
        setRenderCounter((renderCounter+1) % 100);
    }

      
    function createNewListItem() {
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        
        const item = newEmptyPieceTemplate;
        item["num"] = number;
          
        let pieceDataArr = pieceDataLocal;
        pieceDataArr.push(item);
        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);

        //TODO notify outside layer

    }

    function insertNewListItem(preIndex) {
        const number = preIndex+1;
        setCurrentPieceNum(number);

        const item = newEmptyPieceTemplate;
        item["num"] = number+1;

        let pieceDataArr = [];
        let j = 0;
        for (; j < number; j++) {
            pieceDataArr.push(pieceDataLocal[j]);
        }
              
        pieceDataArr.push(item);

        for (; j < pieceDataLocal.length; j++) {
            const piece = {...pieceDataLocal[j],  "num": j+2};
            pieceDataArr.push(piece);
        }

        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);
    }


    function updateLocalDataToCloud() { //TODO cloud-related
        console.log("TODO: saving to cloud via VM func ... ", pieceDataLocal);
    }
 
    function moveItemUpRow(index, content) { //TODO111
        /* switch current item with the previous (smaller) item */
        if (index >= 1) {
            const tempArr = [...pieceDataLocal];
            let itemPrev = tempArr[index-1];
            itemPrev["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index;

            setHighlightedPiece(index); 

            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);

            updatePieceData(tempArr);

            updateRenderCounter();  

        }
    }

    function moveItemDownRow(index, content) { //TODO111
        /* switch current item with the next (larger) item */
        if (index < pieceDataLocal.length - 1) {
            const tempArr = [...pieceDataLocal];
            let itemNext = tempArr[index+1];
            itemNext["num"] = index+1;
            let itemCurr = tempArr[index];
            itemCurr["num"] = index+2;

            setHighlightedPiece(index+2);  

            tempArr.sort((a, b) => a.num - b.num);
            setPieceDataLocal(tempArr);

            updatePieceData(tempArr);

            updateRenderCounter();  
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

        //TODO111 make it inserted to the immediate-next piece?
        

        updatePieceData(pieceDataArr);
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

        updatePieceData(newDataLocal);

    }

   




    return (
        <div className="pieceManager pieceEditingLeftArea" 
            onClick={()=>{
                setIsClickedOnSetters(true);
            }}
        >
            <button onClick={updateLocalDataToCloud}>{saveToCloudText}</button>
            <br></br><br></br><br></br>
                 
            <table className="pieceTable">
        <thead>
            <tr>
            <th style={{"width": "50px"}}>{enterEditorText}</th>
            <th style={{"width": "30px"}}>#</th>
            <th className="contentGrid">{contentsText}</th>
            {<th style={{"width": "90px"}}>{operationsText}</th>}
            {<th style={{"width": "60px"}}></th>}
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
                    {<td>
                    <div>
                        <button onClick={()=>{moveItemUpRow(index, item["content"]);}}>{moveUpText}</button>
                        <br></br>
                        <button onClick={()=>{moveItemDownRow(index, item["content"]);}}>{moveDownText}</button>
                        <br></br>
                        <button onClick={()=>{duplicatePiece(index);}}>{duplicateText}</button>
                        <button onClick={()=>{insertNewListItem(index);}}>{insertText}</button> 
                    </div>
                    
                    </td>}
                    {<td>
                        <button 
                        
                        onClick={()=>{
                            let content = "Are you sure to delete this node: " + item["num"] + ":" + item["content"] + "?";
                            let respondGiven = window.confirm(content);
                            if (respondGiven) {
                                deletePiece(index);
                            }       
                        }}
                        >{deleteText}</button>
                    </td>}
                </tr>
                );
            })} 

        </tbody>
    </table>
    <button onClick={()=>{createNewListItem();}}>{addNewRowText}</button>
    
        </div>
    );
    
}