import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';
import { emptyConvNodeSinglePieceTemplate } from './_dataStructure_DefaultObjects';
import { defaultScreenWidth, defaultScreenHeight } from './_dataStructure_DefaultObjects';

export default function PieceManager({
    allPieceData, 
    assignPieceNum, 
    assignPreviewIndex,
    
    
    updatePieceData, getAllPieceData, 
    setIsClickedOnSetters, fetchClickedIsOnSetter, getCurrentPieceNum,
    getScreenSize,
    
    triggerPreviewScreenOff,
    triggerPreviewScreenOn,
    sendPmEditingPiece,

    triggerPmQuickEditModeOn,
    triggerPmQuickEditModeOff,
    
    getUILanguage,
    
}) {
    const [screenWidth, setScreenWidth] = useState(defaultScreenWidth);
    const [screenHeight, setScreenHeight] = useState(defaultScreenHeight);

    const [groupEditModeOn, setGroupEditModeOn] = useState(false);
    const [groupMoving, setGroupMoving] = useState(false);


    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');
    
  


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

    const [hintTextAreaOverflow, setHintTextAreaOverflow] = useState(false);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        if (firstTimeEnter === true) {
            // if (allPieceData === undefined || allPieceData === null || allPieceData.length === 0) {
            //     setPieceDataLocal([]);
            // }
           
            setFirstTimeEnter(false);
        }



        const allPiece = getAllPieceData();
                                        console.log("pm __ got allPiece (from conv-editor-layer) = ", allPiece);
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
        
        
        
        if (groupEditModeOn === true) {
            setHighlightedPiece("");
        }
    });

 
    function updateRenderCounter() {
        console.log("updateRenderCounter!");
        setRenderCounter((renderCounter+1) % 100);
    }

      
    function actAppendNewPiece() { //TODO111
        const number = pieceDataLocal.length+1;
        setCurrentPieceNum(number);
        
        const item = {};
        Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
            item[currKey] = emptyConvNodeSinglePieceTemplate[currKey];
        });

        item["num"] = number;
          
        let pieceDataArr = pieceDataLocal;
        pieceDataArr.push(item);
        pieceDataArr.sort((a, b) => a.num - b.num);
        setPieceDataLocal(pieceDataArr);

        updatePieceData(pieceDataArr);

                                                        //TODO notify outside layer
    }

    function actInsertNewPiece(preIndex) { //TODO111

        const number = preIndex+1;
        //setCurrentPieceNum(number);

        const item = {};
        Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
            item[currKey] = emptyConvNodeSinglePieceTemplate[currKey];
        });
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

    function actDuplicatePiece(index) { //TODO111
        let tempArr = actInsertNewPiece(index);
        
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
 
    function actMoveItemUpRow(index) { //TODO111
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

    function actMoveItemDownRow(index) { //TODO111
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

    function actDeletePiece(index) {//TODO111
       


       
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


                            // function checkRowLengthOverflow(content) {
                            //     let boolVal = false;
                            //     let arr = content.match(/[^\r\n]+/g);
                            //     arr.forEach(
                            //         (element) => {
                            //             if (element.length > 36) {
                            //                 boolVal = true;
                            //             }          
                            //         }
                            //     );

                            //     return boolVal;
                            // }



    return (
        <div 
            className={groupEditModeOn === false ? 
                "pieceManager pieceEditingLeftArea" 
                : "pieceManagerQuickGroup pieceManagerQuickEdit"}
            onClick={()=>{
                setIsClickedOnSetters(true);
            }}
        >
        
        {groupEditModeOn === true && 
            <>
            <div>

                <button
                    onClick={()=>{
                        setGroupEditModeOn(false);
                        triggerPmQuickEditModeOff();
                    }}
                > ⇇
                </button>
               {/* back button  */}

            </div>

   
            </>
        }

    <div>   
        <div>
            {groupEditModeOn === false && <button 
                className="buttonRight80"
                onClick={()=>{
                    setGroupEditModeOn(true);
                    triggerPmQuickEditModeOn();
                }}    
            >
                Group Edit ⇉
            </button>}
            
        </div>
        <br></br>
            <table className={groupEditModeOn === false ? "pieceTable" : "pieceTableQuickGroup"}>
        <thead>
            <tr>
            {groupEditModeOn === false && <th style={{"width": "70px"}}>Editor</th>}
            <th style={{"width": "30px"}}>#</th>
            <th 
            
            className={groupEditModeOn === false ? "contentGrid" : "contentGridQuickGroup"}
            
            >{contentsText}</th>
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
                    
                    {groupEditModeOn === false && <td
                        className="tableEditorGrid"
                        onClick={()=>{

                            doHighlightItem(item["num"]);   
                            assignPreviewIndex(index); //TODO1 check
                            
                       
                            assignPieceNum(item["num"]); 

                        }}
                    >
             
                        Edit
                    </td>}
                    <td
                        onClick={()=>{
                            if (groupEditModeOn === false) {
                                doHighlightItem(item["num"]);   
                                assignPreviewIndex(index); //TODO1 check
                            }
                        }}
                    >{item["num"]}</td>


        {/* content-grid */}
                    <td className="contentGrid"
                        onClick={()=>{
                            if (chosenEditingPiece !== (index+1)) {
                                if (groupEditModeOn === false) {
                                    doHighlightItem(item["num"]);   
                                    assignPreviewIndex(index); //TODO1 check
                                }
                            }
                        }}
                    >
                    
                    {(groupEditModeOn === false || groupMoving === true) && 
                    <>
                    {/*
                    <button
                        onClick={()=>{
                                        if (groupEditModeOn === false) { //enter group-edit-mode
                                            setGroupEditModeOn(true);
                                            triggerPmQuickEditModeOn();
                                        }
                                        if (groupMoving === true) { //allow editing on the text-area
                                            setGroupMoving(false);
                                        }

                        }}
                    >
                        {groupEditModeOn === false && <label>Group Edit</label>}
                        {groupEditModeOn === true && <label>Edit</label>} 

                    </button>
                    */}
                    
                    
                    <br></br>
                 
                    <label>  
                        {item["speaker_name"]}{(item["speaker_name"] === "") ? "" : ":"}{(item["speaker_name"] !== "") && <br></br>}
                    {item["content"]}
                    </label>
                    </>}

                    {(groupEditModeOn === true && groupMoving === false) &&
                        <>
                            <input
                                defaultValue={item["speaker_name"]}
                                onChange={(event)=>{
                                    
                                    let val = event.target.value;

                                    let pieceArrTemp = pieceDataLocal;
                                    pieceArrTemp[index]["speaker_name"] = val;
                                    setPieceDataLocal(pieceArrTemp);
                                }}
                            ></input>
                            <br></br><br></br>
                            <textarea
                                wrap="off"
                                maxLength="160"
                                rows="10" cols="36"
                                defaultValue={item["content"]}
                                onChange={(event)=>{
                                    let val = event.target.value;

                                    let pieceArrTemp = pieceDataLocal;
                                    pieceArrTemp[index]["content"] = val;
                                    setPieceDataLocal(pieceArrTemp);

                                                    //TODO: temp removed
                                                    // let isLineTooLong = checkRowLengthOverflow(val);
                                                    // setHintTextAreaOverflow(isLineTooLong);
                                }}
                                onBlur={()=>{
                                    if (hintTextAreaOverflow === true) {
                                        alert("Please adjust content -- one or multiple line(s) too long");
                                    }
                                }}                            
                            ></textarea>
                            <br></br><br></br>


                            
                        </>
                    }

                    </td>

        {/* operation grid */}
                     <td
                        onClick={()=>{
                            if (groupEditModeOn === false) {
                                doHighlightItem(item["num"]);   
                                assignPreviewIndex(index); //TODO1 check
                            }
                        }}                    
                    >
                    {
                    <div>
                        <button onClick={()=>{setGroupMoving(true);actMoveItemUpRow(index);}}>{moveUpText}</button>
                        <br></br>
                        <button onClick={()=>{setGroupMoving(true);actMoveItemDownRow(index);}}>{moveDownText}</button>
                        <br></br>
                        <button onClick={()=>{setGroupMoving(true);actDuplicatePiece(index);}}>{duplicateText}</button>
                        <button onClick={()=>{setGroupMoving(true);actInsertNewPiece(index);}}>{insertText}</button> 
                    </div>}
                    
                    </td>
                    <td>
                        {<button 
                        
                        onClick={()=>{
                            if (pieceDataLocal.length <= 1) {
                                alert("Node can not be empty!");
                            } else {
                                let content = "Are you sure to delete this piece: " + item["num"] + ":" + item["content"] + "?";
                                let respondGiven = window.confirm(content);
                                if (respondGiven) {
                                    setGroupMoving(true);
                                    actDeletePiece(index);
                                }   
                            }
    
                        }}
                        >{deleteText}</button>}
                    </td>
                </tr>
                );
            })} 

        </tbody>
    </table>
    {
    <button onClick={()=>{actAppendNewPiece();}}>{addNewRowText}</button>
    }
        
        {groupEditModeOn === true && 
            <>
            <div>
                <br></br><br></br><br></br>
                <button
                    onClick={()=>{
                        setGroupEditModeOn(false);
                        triggerPmQuickEditModeOff();
                    }}
                > ⇇
                </button>
               {/* back button  */}

            </div>

   
            </>
        }

    </div>

 
    
        </div>
    );
    
}