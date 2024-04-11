import * as React from 'react';
import { useState, useEffect } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter, updateLinkingNode, getCurrentChapterNodeList}) {
//TODO get list of all nodes key for each chapter (when needed?)

  const [isCollapse, setIsCollapse] = useState(false);
  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editedLine, setEditedLine] = useState(-1);
  const [selectedChptKey, setSelectedChpt] = useState(-1);
  const [isAddNewChpater, setIsAddNewChapter] = useState(false);
  const [deletedLocalList, setDeletedLocalList] = useState([]);

  const [currChapterNodeList, setCurrChapterNodeList] = useState([]);

  useEffect(() => {
    let fetchedNodeList = getCurrentChapterNodeList(selectedChptKey);
    setCurrChapterNodeList(fetchedNodeList);
    
  });

  function updateChapterDataByLine(index, newTitle) {
    let tempChapterData = chapterData;
    // console.log("tempChapterData[index]: "); //TODO test
    // console.log(index);//TODO test
    console.log(tempChapterData[index]); //TODO test
    tempChapterData[index][1] = newTitle;
    updateChapterData(tempChapterData);
    setEditingChapterTitle("");
    updateChosenChapter(newTitle);
  }

  function addNewChapterLine() {

    //1. not allowing empty chapter key or chapter title
    if (newChapterKeyInput.length < 1 || newChapterTitleInput.length < 1) {
      console.log("warning: can not have empty chapter key or empty chapter title");
      return;
    }

    //2. not allowing duplicate chapter key
    let i = 0;
    for (; i < chapterData.length; i++) {
      let tempKey = chapterData[i][0];
      if (newChapterKeyInput === tempKey) {
        console.log("warning: can not use duplicate chapter key");
        return;
      }
    }

    let tempChapterData = chapterData;
    let line = [newChapterKeyInput, newChapterTitleInput, "display", "", ""];
    tempChapterData.push(line);
    updateChapterData(tempChapterData);
    setNewChapterKeyInput("");
    setNewChapterTitleInput("");
  }

  function hideChapter(index) {
    let deleteListTemp = deletedLocalList;
    deleteListTemp.push(chapterData[index]);
    setDeletedLocalList(deleteListTemp);

    let tempChapterData = chapterData;
    tempChapterData[index][2] = "delete";
    updateChapterData(tempChapterData);
    setSelectedChpt(-1);
  }
  
  function handleSelectChapterKey(item) {
    if (selectedChptKey === item[0]) {
      setSelectedChpt(-1);
    } else {
      setSelectedChpt(item[0]);
      updateChosenChapter(item[0]); // sends chapter-key info
    }
  }

  function revertChapter(keyStr) {
    let i = 0;
    let tempChapterData = chapterData;
    for (; i < tempChapterData.length; i++) {
      if (tempChapterData[i][0] === keyStr) {
        tempChapterData[i][2] = "display";
      }
    }
    updateChapterData(tempChapterData);

    //TODO test 
    //TODO improve: rerender trigger from caller's data structure
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
        <div className="listBar">
        
        <div className="chapterManagingArea"> 
          <label>Chapter Management</label>
  
    <ol>

      {chapterData.map((item, index) => {
        let hide = "display";
        if (chapterData[index][2] === "delete") {
          hide = "hide";
        }
        return (
        <>
        {hide === "display" && <>
          <li className={selectedChptKey === item[0] ? "chapterListItemSelected" : "chapterListItem"} 
              onClick={()=>{handleSelectChapterKey(item);setIsAddNewChapter(false);}}>             
            {item[0]}:{item[1]}
          </li>
          {selectedChptKey === item[0] && 
            <>
              <label>*Change Chapter Name*</label><br></br>
              <label>Chapter Name:</label>
              <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);console.log("changing title: ");console.log(event.target.value);}}></input>
              <button onClick={()=>{updateChapterDataByLine(index, editingChapterTitle);}}>Save</button>
              <button onClick={()=>{setEditingChapterTitle("");}}>Cancel</button>
              <br></br>
              
              <label>*Delete Chapter</label><br></br>
              <button onClick={()=>{hideChapter(index);}}>Delete</button><br></br>
              
              <label>*Starting Node</label><br></br>
              <select>
              
              </select><button onClick={()=>{updateStartingNode();}}>Update</button><br></br>
              
              <label>*Ending Node</label><br></br>
              <select>
              
              </select><button onClick={()=>{updateEndingNode();}}>Update</button><br></br>
            </>
          
          }
          </>}
        </>
        );
        })}
        <ul className={isAddNewChpater === true ?"chapterListItemSelected" : "chapterListItem"} onClick={()=>{
          setIsAddNewChapter(!isAddNewChpater);
          setSelectedChpt(-1);
          updateChosenChapter("");
          console.log("chapterData: ", chapterData); //TODO testing
        }}>
          + New Chapter
        </ul>
        {isAddNewChpater === true && <ul>
          <label>New Chapter Keyname (unchangable): </label><br></br>
          <input value={newChapterKeyInput} onChange={(event)=>{setNewChapterKeyInput(event.target.value);}}></input>
          <br></br>
          <label>New Chapter Keyname (editable later): </label><br></br>
          <input value={newChapterTitleInput} onChange={(event)=>{setNewChapterTitleInput(event.target.value);}}></input>
          <br></br>
          <button onClick={()=>{addNewChapterLine();}}>Add</button>
        </ul>}
          
        

    </ol>

    <button className="shrinkTab" onClick={()=>{setIsCollapse(true);}}>Collapse</button>

    </div>

        <div>
              Chapter Revert area<br></br>
              {deletedLocalList.map((item, index) => {
                return (<label>{item[0]}, {item[1]} <button onClick={()=>{revertChapter(item[0]);}}>Revert</button ></label>);
              })}
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud
          <br></br>TODO feature: insert chapter between existing chapters 
          <br></br>TODO feature: rearrange chapter sequence
        </p>

        </div>
        }


        {isCollapse === true && <button className="chapterManagerSwitch" onClick={()=>{setIsCollapse(false);}}>Chapter Management</button>}
      </>
    );
}