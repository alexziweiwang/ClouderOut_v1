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
  }

    return (
        <>
        <div className="chapterManagingArea"> Chapter Management
    <br></br>

    <table>
      <thead>
        <tr>
          <th>Chapter Sequence Number</th>
          <th>Chapter Keyword</th>
          <th>Chapter Title</th>
 
        </tr>

      </thead>
      <tbody>
      {chapterData.map((item, index) => {
        return (<tr value={item} key={index}>
          <td>{index+1}</td>
          <td>{item[0]} </td>
          <td>{item[1]} 
            {(editedLine !== index) && <button onClick={()=>{setEditedLine(index);}}>Edit</button>}
            {(editedLine === index) && 
              <>
              <input value={editingChapterTitle} onChange={(event)=>{setEditingChapterTitle(event.target.value);}}></input>
              <button onClick={()=>{setEditedLine(-1);}}>Cancel</button>
              <button onClick={()=>{setEditedLine(-1); updateChapterDataByLine(index, editingChapterTitle);}}>Save</button>
              </>
            }

          </td>
          <td>
            <button>Select</button>
          </td>
          <td>
            <button>Delete</button>
          </td>
        </tr>);
      })}
      <tr key="newChapter">
        <td>Add New Chapter</td>
        <td>      
            <label>Chapter Key (unchangable):</label>
            <input value={newChapterKeyInput} onChange={(event)=>{setNewChapterKeyInput(event.target.value);}}></input>
        </td>
        <td>      
            <label>Chapter Name (changable):</label>
            <input value={newChapterTitleInput} onChange={(event)=>{setNewChapterTitleInput(event.target.value);}}></input>
        </td>
        <td>
          <button>Add</button>
        </td>
      </tr>
      </tbody>
    </table>


        </div>
        </>
    );
}