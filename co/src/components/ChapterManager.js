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
    let tempChapterData = chapterData;
    tempChapterData[index][2] = "delete";
    updateChapterData(tempChapterData);
  }
  
  function handleSelectChapter(index) {
    if (selectedChpt === index) {
      setSelectedChpt(-1);
    } else {
      setSelectedChpt(index);
      // updateChosenChapter(index); //TODO change later
    }
    
  }

    return (
      <>
        {isCollapse === false && <div className="listBar">
        <div className="chapterManagingArea"> 
        <div>
          <label>Chapter Management</label>
          <button className="buttonRight" onClick={()=>{setIsCollapse(!isCollapse);}}>Collapse</button>
        </div>
       
    <ol>

      {chapterData.map((item, index) => {
        return (
        <>
          <li className={selectedChpt === index ? "chapterListItemSelected" : "chapterListItem"} 
              onClick={()=>{handleSelectChapter(index);setIsAddNewChapter(false);}}>             
            {item[0]}:{item[1]}
          </li>
          {selectedChpt === index && 
            <>
              <label>*Change Chapter Name*</label><br></br>
              <label>Chapter Name:</label>
              <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input>
              <button onClick={()=>{updateChapterDataByLine(selectedChpt, editingChapterTitle);}}>Save</button>
              <button onClick={()=>{setEditingChapterTitle("");setEditedLine(-1);setSelectedChpt(-1);}}>Cancel</button>
              <br></br>
            </>
          
          }

        </>);
        })}
        <ul className={isAddNewChpater === true ?"chapterListItemSelected" : "chapterListItem"} onClick={()=>{setIsAddNewChapter(!isAddNewChpater);setSelectedChpt(-1);
        }}>
          + New Chapter
        </ul>
        {isAddNewChpater === true && <ul>
          <label>New Chapter Keyname (unchangable): </label><br></br>
          <input value={newChapterKeyInput} onChange={(event)=>{setNewChapterKeyInput(event.target.value);}}></input>
          <label>New Chapter Keyname (editable later): </label><br></br>
          <input value={newChapterTitleInput} onChange={(event)=>{setNewChapterTitleInput(event.target.value);}}></input>
          <br></br>
          <button>Add</button>
        </ul>}
          
        

    </ol>


        </div>

        <div>
          Chapter Revert area
   

        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud</p>
        
        </div>
        }
        <button onClick={()=>{setIsCollapse(false);}}>Chapter Management</button>
      </>
    );
}