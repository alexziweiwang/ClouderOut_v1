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
          <th></th>
          <th></th>   
        </tr>

      </thead>
      <tbody>
      {chapterData.map((item, index) => {
        return (<tr value={item} key={index}>
          <td>{index+1}</td>
          <td>{item} </td>
          <td>
            <button>Edit</button>
            <button>Move Up</button>
            <button>Move Down</button>
          </td>
          <td>
            <button>Delete</button>
          </td>
        </tr>);
      })}
      </tbody>
    </table>

        <div>
            Add New Chapter: 
            <br></br>
            <label>Chapter Name:</label>
            <input></input>
            <button>Add</button>

         </div>

        </div>
        </>
    );
}