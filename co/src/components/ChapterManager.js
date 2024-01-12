import * as React from 'react';
import { useState } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter, collapseBar}) {

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
        <div className="chapterManagingArea"> 
        <div>
          <label>Chapter Management</label>
          <button className="buttonRight" onClick={()=>{}}>Collapse</button>
        </div>
       
    <ol>

      {chapterData.map((item, index) => {
        return (
        <>
          <li className={selectedChpt === index ? "chapterListItemSelected" : "chapterListItem"} onClick={()=>{handleSelectChapter(index);}}>             
            {item[0]}:{item[1]}
          </li>

        </>);
        })}
        <ul className={isAddNewChpater === true ? "chapterListItemSelected" : "chapterListItem"} onClick={()=>{setIsAddNewChapter(!isAddNewChpater);setSelectedChpt(-1);
        }}>
          + New Chapter
        </ul>
        {isAddNewChpater === true && <ul className={isAddNewChpater === true ? "chapterListItemSelected" : "chapterListItem"}>...</ul>}
          
        

    </ol>

    {(selectedChpt !== -1) && 
    <>
      <button onClick={()=>{setEditedLine(selectedChpt);}}>Edit</button>
      {(editedLine !== -1) && 
      <>
      <br></br>
      <label>Chapter Name:</label>
      <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input>
      <button onClick={()=>{updateChapterDataByLine(selectedChpt, editingChapterTitle);}}>Save</button>
      <button onClick={()=>{setEditingChapterTitle("");setEditedLine(-1);}}>Cancel</button>
      </>}
    </>}




        </div>

        <div>
          Chapter Revert area
   

        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud</p>
        
        </>
    );
}