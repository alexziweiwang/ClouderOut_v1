import styles from './webpage.css';
import { useState } from "react";
import { submitFileVM, getRmFileListVM, addToRmFileListVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceSelector ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [cloudFileList, setCloudFileList] = useState([]);

    async function fetchRmFileList() {
        const fileList = await getRmFileListVM({uname: username});
        setCloudFileList(fileList);
        console.log("modalwindow: fileList:"); //TODO test
        console.log(fileList); //TODO test
    }

    function confirmResource() {
        console.log("choosing this resource...");
    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

            <div className="modalContent">
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <br></br><br></br>
            
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li key={index} onClick={()=>{console.log("list clicked.")}}>{item}</li>
                    ))}
                </ul>

            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Close </button>
                <button className="modalControlButton" onClick={confirmResource}> Confirm </button>

            </div>
            
        </div>
      </div>
    );
  };