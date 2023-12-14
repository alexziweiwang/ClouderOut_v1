import * as React from 'react';
import { useState } from 'react';

export default function ChapterManager({chapterData, updateChapterData, chosenChapter, updateChosenChapter}) {

    return (
        <>
        <div className="chapterManagingArea"> Chapter Management
    <br></br>

    <table>
      <thead>
        <tr>
          <th>Chapter Sequence Number</th>
          <th>Chapter Title</th>
 
        </tr>

      </thead>
      <tbody>
      {chapterData.map((item, index) => {
        return (<tr value={item} key={index}>
          <td>{index+1}</td>
          <td>{item} </td>
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
            <label>Chapter Name:</label>
            <input></input>
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