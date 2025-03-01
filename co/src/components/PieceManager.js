import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';


export default function PieceManager({
    allPieceData, assignPieceNum, assignPreviewIndex, 
    updatePieceData, getAllPieceData, 
    setIsClickedOnSetters, fetchClickedIsOnSetter, getCurrentPieceNum,
    getScreenSize,
    
    triggerPreviewScreenOff,
    triggerPreviewScreenOn,
    sendPmEditingPiece,

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

    const [chosenEditingPiece, setChosenEditingPiece] = useState(-1);
    const [chosenEditingContent, setChosenEditingContent] = useState("");
    const [chosenEditingSpeaker, setChosenEditingSpeaker] = useState("");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        if (firstTimeEnter === true) {
            // if (allPieceData === undefined || allPieceData === null || allPieceData.length === 0) {
            //     setPieceDataLocal([]);
            // }
           
            setFirstTimeEnter(false);
        }

        const allPiece = getAllPieceData();
                    //                    console.log("pm __ got allPiece (from conv-editor-layer) = ", allPiece);
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

      
    function appendNewPiece() {
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

    function insertNewPiece(preIndex) {

        const number = preIndex+1;
        //setCurrentPieceNum(number);

        const item = newEmptyPieceTemplate;
        item["num"] = number+1;

        let pieceDataArr = [];
        let j = 0;
        for (; j < number; j++) {
            pieceDataArr.push(pieceDataLocal[j]);
        }
              
        pieceDataArr.push(item);

        for (; j < pieceDataLocal.length; j++) {
            const piece = pieceDataLocal[j];
            piece["num"] = piece["num"]+1;
            
            pieceDataArr.push(piece);
        }

        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);

        return pieceDataArr;
    }

    function duplicatePiece(index) {
        let tempArr = insertNewPiece(index);
        
        let pieceDataArr = tempArr;
        pieceDataArr[index+1] = makeDupPiece(pieceDataArr, index, index+1);
        pieceDataArr[index+1]["num"] = pieceDataLocal[index]["num"]+1;

        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);
    }

    function makeDupPiece(arr, sourceIndex, targetIndex) {
        let sourceObj = arr[sourceIndex];
        //arr[targetIndex]
        Object.keys(sourceObj).map((currKey) => {
            let val = sourceObj[currKey];
            arr[targetIndex][currKey] = val;
        });

        return arr[targetIndex];
    }
 
    function moveItemUpRow(index) { //TODO111
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

    function moveItemDownRow(index) { //TODO111
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

                                    console.log("deleted. updated allPieceData: ", newDataLocal);
        setPieceDataLocal(newDataLocal);
        setNonClickced();

        updatePieceData(newDataLocal);

    }

    function setNonClickced() {
        setHighlightedPiece(1);
        assignPreviewIndex(0);
                                    console.log("\t\t\treset: make preview the first piece.")
//TODO111
    }

    function resetChosenEditingPiece() {
        setChosenEditingPiece(-1);
        setChosenEditingContent("");
        setChosenEditingSpeaker("");        
    }

    function changePieceContentSpeaker(index) {
        let pieceDataArr = pieceDataLocal;
        pieceDataArr[index]["content"] = chosenEditingContent;
        pieceDataArr[index]["speaker_name"] = chosenEditingSpeaker;


        resetChosenEditingPiece();
        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);
    }

   




    return (
        <div className="pieceManager pieceEditingLeftArea" 
            onClick={()=>{
                setIsClickedOnSetters(true);
            }}
        >
                 
            <table className="pieceTable">
        <thead>
            <tr>
            <th style={{"width": "70px"}}>Editor</th>
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
                            ? "tableItemSelected" : "tableItem"} 
                        >
                    <td
                        onClick={()=>{
                            doHighlightItem(item["num"]);   
                            assignPreviewIndex(index); //TODO1 check
                        }}
                    >
                        <button onClick={()=>{
                            assignPreviewIndex(index); //TODO1 check
                            console.log("table row to edit: ", index, "; ", item["num"] );//TODO1 test

                            assignPieceNum(item["num"]);}}>Details</button>
                    </td>
                    <td
                        onClick={()=>{
                            doHighlightItem(item["num"]);   
                            assignPreviewIndex(index); //TODO1 check
                        }}
                    >{item["num"]}</td>


        {/* content-grid */}
                    <td className="contentGrid"
                        onClick={()=>{
                            if (chosenEditingPiece !== (index+1)) {
                                doHighlightItem(item["num"]);   
                                assignPreviewIndex(index); //TODO1 check
                            }
                        }}
                    >
                  

                     
                    <label>  {item["speaker_name"]}{(item["speaker_name"] === "") ? "" : ":"}{(item["speaker_name"] !== "") && <br></br>}
                    {item["content"]}
                    </label>

                    </td>


                    {<td
                        onClick={()=>{
                            doHighlightItem(item["num"]);   
                            assignPreviewIndex(index); //TODO1 check
                        }}                    
                    >
                    <div>
                        <button onClick={()=>{moveItemUpRow(index);}}>{moveUpText}</button>
                        <br></br>
                        <button onClick={()=>{moveItemDownRow(index);}}>{moveDownText}</button>
                        <br></br>
                        <button onClick={()=>{duplicatePiece(index);}}>{duplicateText}</button>
                        <button onClick={()=>{insertNewPiece(index);}}>{insertText}</button> 
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
    <button onClick={()=>{appendNewPiece();}}>{addNewRowText}</button>
    
        </div>
    );
    
}