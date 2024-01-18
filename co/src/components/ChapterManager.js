import * as React from 'react';
import { useState } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter}) {

  const [isCollapse, setIsCollapse] = useState(false);
  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editedLine, setEditedLine] = useState(-1);
  const [selectedChpt, setSelectedChpt] = useState(-1);
  const [isAddNewChpater, setIsAddNewChapter] = useState(false);
  const [deletedLocalList, setDeletedLocalList] = useState([]);

  function updateChapterDataByLine(index, newTitle) {
    let tempChapterData = chapterData;
    tempChapterData[index][1] = newTitle;
    updateChapterData(tempChapterData);
    setEditingChapterTitle("");
  }

  function addNewChapterLine() {
    let tempChapterData = chapterData;
    let line = [newChapterKeyInput, newChapterTitleInput];
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
  
  function handleSelectChapter(keyStr) {
    if (selectedChpt === keyStr) {
      setSelectedChpt(-1);
    } else {
      setSelectedChpt(keyStr);
      updateChosenChapter(keyStr); //TODO change later
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

    return (
      <>
        {isCollapse === false && <div className="listBar">
        <div className="chapterManagingArea"> 
        <label>Chapter Management</label>

        <button className="shrinkTab" onClick={()=>{setIsCollapse(true);}}>Collapse</button>

        
       
    <ol>

      {chapterData.map((item, index) => {
        let hide = "display";
        if (chapterData[index][2] === "delete") {
          hide = "hide";
        }
        return (
        <>
        {hide === "display" && <>
          <li className={selectedChpt === item[0] ? "chapterListItemSelected" : "chapterListItem"} 
              onClick={()=>{handleSelectChapter(item[0]);setIsAddNewChapter(false);}}>             
            {item[0]}:{item[1]}
          </li>
          {selectedChpt === item[0] && 
            <>
              <label>*Change Chapter Name*</label><br></br>
              <label>Chapter Name:</label>
              <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input>
              <button onClick={()=>{updateChapterDataByLine(selectedChpt, editingChapterTitle);}}>Save</button>
              <button onClick={()=>{setEditingChapterTitle("");}}>Cancel</button>
              <br></br>
              <label>*Delete Chapter</label><br></br>
              <button onClick={()=>{hideChapter(index);}}>Delete</button>
            </>
          
          }
          </>}
        </>
        );
        })}
        <ul className={isAddNewChpater === true ?"chapterListItemSelected" : "chapterListItem"} onClick={()=>{setIsAddNewChapter(!isAddNewChpater);setSelectedChpt(-1);updateChosenChapter("");
        }}>
          + New Chapter
        </ul>
        {isAddNewChpater === true && <ul>
          <label>New Chapter Keyname (unchangable): </label><br></br>
          <input value={newChapterKeyInput} onChange={(event)=>{setNewChapterKeyInput(event.target.value);}}></input>
          <label>New Chapter Keyname (editable later): </label><br></br>
          <input value={newChapterTitleInput} onChange={(event)=>{setNewChapterTitleInput(event.target.value);}}></input>
          <br></br>
          <button onClick={()=>{addNewChapterLine();}}>Add</button>
        </ul>}
          
        

    </ol>


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
        {isCollapse === true && <button onClick={()=>{setIsCollapse(false);}}>Chapter Management</button>}
      </>
    );
}