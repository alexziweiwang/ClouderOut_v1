import * as React from 'react';
import { useState, useEffect } from 'react';

export default function ChapterManager({
  initialChapterData, updateChapterData, 
  getChapterDataInfo,
  updateChosenChapterItem, updateLinkingNode,
  addNewChapter, 
  }) {

//TODO3: game-maker level: all chapter's data (each chapter's node list)
//TODO3: add getChapterData (from caller) : "getChapterDataInfo()"

  const languageCode = 0;
  const saveText = ["Save"];
  const cancelText = ["Cancel"];
  const deleteText = ["Delete"];
  const addText = ["Add"];
  const collapseText = ["Collapse"];
  const revertText = ["Revert"];
  const chapterManagementText = ["Chapter Management"];

  
  //TODO other text on UI - localization

  const [isCollapse, setIsCollapse] = useState(false);
  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editedLine, setEditedLine] = useState(-1);
  const [selectedChptKey, setSelectedChpt] = useState(-1);
  const [isAddNewChpater, setIsAddNewChapter] = useState(false);
  const [deletedLocalList, setDeletedLocalList] = useState([]);
  const [isRevertingChapter, setIsRevertingChapter] = useState(false);

  const [chapterData, setChapterData] = useState(initialChapterData);

  useEffect(() => {
    let chapterListTemp = getChapterDataInfo();
    setChapterData(chapterListTemp);
    //TODO update chapterList-local
    
  });

  function updateChapterDataByLine(index, newTitle) {
    let tempChapterData = chapterData;
    tempChapterData[index][1] = newTitle;
    updateChapterData(tempChapterData);
    setEditingChapterTitle("");
  }

  function addNewChapterItem() {

    //1. not allowing empty chapter key or chapter title
    if (newChapterKeyInput.length < 1 || newChapterTitleInput.length < 1) {
      alert("Can not have empty chapter key or empty chapter title");
      return;
    }

    //2. not allowing duplicate chapter key
    let i = 0;
    for (; i < chapterData.length; i++) {
      let tempKey = chapterData[i][0];
      if (newChapterKeyInput === tempKey) {
        alert("Can not use duplicate chapter key.");
        return;
      }
    }

    let tempChapterData = chapterData;
    let line = [newChapterKeyInput, newChapterTitleInput, "display", "", ""];
    tempChapterData.push(line);
    updateChapterData(tempChapterData);
    addNewChapter();
    setNewChapterKeyInput("");
    setNewChapterTitleInput("");
  }

  function hideChapter(index) {
    let askStr = "Are you sure to delete the chapter " + chapterData[index][1] + "?";
    let response = window.confirm(askStr);
    if (response) {
      let deleteListTemp = deletedLocalList;
      deleteListTemp.push(chapterData[index]);
      setDeletedLocalList(deleteListTemp);
  
      let tempChapterData = chapterData;
      tempChapterData[index][2] = "delete";
      updateChapterData(tempChapterData);
      setSelectedChpt(-1);
    }

  }
  
  function handleSelectChapterKey(item) {
    if (selectedChptKey === item[0]) {
      setSelectedChpt(-1);
    } else {
      setSelectedChpt(item[0]);
      updateChosenChapterItem(item[0]); // sends chapter-key info
    }
  }

  function revertChapter(keyStr) {
    let i = 0;
    let tempChapterData = chapterData;
    let tempDeletedLocalList = [];

    for (; i < tempChapterData.length; i++) {
      if (tempChapterData[i][0] === keyStr) {
        tempChapterData[i][2] = "display"; //not including this in the updated-deleted-list
        setSelectedChpt(i);
      } else {
        if (tempChapterData[i][2] === "delete") {
          tempDeletedLocalList.push(tempChapterData[i]);
        }
      }
    }

    // update deletedLocalList
    setDeletedLocalList(tempDeletedLocalList);

    updateChapterData(tempChapterData);
    setIsRevertingChapter(false);

  }

  function updateStartingNode() {
    // TODO by currChapter, get chapterKey from chapterData, or send chapter-key directly
    let nodename = "temp";
    let chapterkey = "temp";
    updateLinkingNode("starting", nodename, chapterkey);
  }

  function updateEndingNode() {
    // TODO by currChapter, get chapterKey from chapterData, or send chapter-key directly
    let nodename = "temp";
    let chapterkey = "temp";
    updateLinkingNode("ending", nodename, chapterkey);
  }

    return (
      <>
        {isCollapse === false && 
        <div className="parallelFrame">
          <div className="listBar" style={{"overflow": "hidden"}}>
              <div className="chapterManagingArea"> 
                        <label>Chapter Management: </label>
                

                  <ul>

                    {chapterData.map((item, index) => {
                      let hide = "display";
                      if (chapterData[index][2] === "delete") {
                        hide = "hide";
                      }
                      let divKey = "div"+index;
                      return (
                      <div key={divKey}>
                      {hide === "display" && <>
                        <li key={index}
                            className={selectedChptKey === item[0] ? "chapterListItemSelected" : "chapterListItem"} 
                            onClick={()=>{handleSelectChapterKey(item);setIsAddNewChapter(false);}}>             
                          {item[0]}: {item[1]}
                        </li>
                        {selectedChptKey === item[0] && 
                          <>
                            <label>*Change Chapter Name*</label><br></br>
                            <label>Chapter Name:</label>
                            <input value={editingChapterTitle} 
                              onChange={(event)=>{
                                setEditingChapterTitle(event.target.value);
                                                console.log("changing title: "); //TODO testing
                                                console.log(event.target.value); //TODO testing
                              }}>
                            </input>
                            <br></br>
                            <button onClick={()=>{setEditingChapterTitle("");}}>{cancelText[languageCode]}</button>
                            <button onClick={()=>{updateChapterDataByLine(index, editingChapterTitle);}}>{saveText[languageCode]}</button>
                            <br></br><br></br><br></br>
                            
                            <label>*Delete Chapter</label><br></br>
                            <button onClick={()=>{hideChapter(index);}}>
                              {deleteText[languageCode]}
                            </button>
                              
                            <br></br>

                          </>
                        
                        }
                        </>}
                      </div>
                      );
                      })}

                      <br></br><br></br>
                      <li 
                        className={isAddNewChpater === true ?"chapterListItemSelected" : "chapterListItem"} 
                        style={{"textDecoration": "underline"}}
                        onClick={()=>{
                          setIsAddNewChapter(!isAddNewChpater);
                          setSelectedChpt(-1);
                          updateChosenChapterItem("");
console.log("chapterData: ", chapterData); //TODO testing
                        }}>
                        + New Chapter
                      </li>
                      {isAddNewChpater === true && 
                      <div>
                        <label>New Chapter Unique-ID-Name (unchangable): </label><br></br>
                        <input value={newChapterKeyInput} onChange={(event)=>{setNewChapterKeyInput(event.target.value);}}></input>
                        <br></br>
                        <label>New Chapter Title (editable later): </label><br></br>
                        <input value={newChapterTitleInput} onChange={(event)=>{setNewChapterTitleInput(event.target.value);}}></input>
                        <br></br>
                        <button onClick={()=>{addNewChapterItem();}}>{addText[languageCode]}</button>
                      </div>}
                        
                      <br></br><br></br>
                      <li 
                        className={isRevertingChapter === true ?"chapterListItemSelected" : "chapterListItem"} 
                        style={{"textDecoration": "underline"}}
                        onClick={()=>{
                          setIsRevertingChapter(!isRevertingChapter);
                        }}>
                        * Revert a Deleted Chapter
                      </li>
                        {isRevertingChapter && <div>
                              {deletedLocalList.map((item, index) => {
                                return (<label key={index}>{item[0]}, {item[1]} 
                                  <button onClick={()=>{revertChapter(item[0]);}}>
                                    {revertText[languageCode]}
                                  </button ></label>);
                              })}

                              {deletedLocalList.length === 0 && <label>(No deleted chapter.)</label>}
                        </div>}


                      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                      <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud
                        <br></br>TODO feature: insert chapter between existing chapters 
                        <br></br>TODO feature: rearrange chapter sequence
                      </p>

                  </ul>

              
                  </div>

                </div>

                  <div>
                    <button className="shrinkTab" onClick={()=>{setIsCollapse(true);}}>{collapseText[languageCode]}</button>
                  </div>     
        </div>
        }


        {isCollapse === true && <button className="chapterManagerSwitch" onClick={()=>{setIsCollapse(false);}}>
          {chapterManagementText[languageCode]}
          </button>}



      </>
    );
}