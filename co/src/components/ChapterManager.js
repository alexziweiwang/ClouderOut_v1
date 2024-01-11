import * as React from 'react';
import { useState } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter}) {

  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editedLine, setEditedLine] = useState(-1);

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

    return (
        <>
        <div className="chapterManagingArea"> Chapter Management
    <br></br>

    <ol>

      {chapterData.map((item, index) => {
        return (
        <>
          <li className="chapterListItem">             

            
            
            <>{item[0]}:</> 
            {(editedLine !== index) &&<>{item[1]}</>}
            {(editedLine !== index) && <button onClick={()=>{setEditedLine(index);}}>Edit</button>}

            {(editedLine === index) && 
            <>
            <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input>
            <button onClick={()=>{setEditedLine(-1); updateChapterDataByLine(index, editingChapterTitle);}}>Save</button>
            
            </>
            }

          </li>
          <p>
            {(editedLine === index) && 
              <>
              <button onClick={()=>{setEditedLine(-1);}}>Cancel</button>
            </>}
          </p>

        </>);
        })}

    </ol>




        </div>

        <div>
          Chapter Revert area
   

        </div>

        <p className="plans">TODO: improve data design to include chapter editing options </p>
        <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud</p>
        
        </>
    );
}