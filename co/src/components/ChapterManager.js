import * as React from 'react';
import { useState } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter, collapseBar}) {

  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editedLine, setEditedLine] = useState(-1);
  const [selectedChpt, setSelectedChpt] = useState("");

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
  
  function handleSelectChapter(str) {
    setSelectedChpt(str);
    updateChosenChapter(str);
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
        let keyStr = item[0];
        return (
        <>
          <li className={selectedChpt === keyStr ? "chapterListItemSelected" : "chapterListItem"} onClick={()=>{handleSelectChapter(keyStr);console.log("selected? ", selectedChpt);}}>             
            {item[0]}:{item[1]}
          </li>

        </>);
        })}

    </ol>

    {<button onClick={()=>{setEditedLine(selectedChpt);}}>Edit</button>}
    {/* <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input> */}
     {/* <button onClick={()=>updateChapterDataByLine(index, editingChapterTitle);}>Save</button>
    <button onClick={()=>{}}>Cancel</button> */}



        </div>

        <div>
          Chapter Revert area
   

        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud</p>
        
        </>
    );
}