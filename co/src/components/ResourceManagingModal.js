import styles from './webpage.css';
import { useState } from "react";
import { storage } from '../googleCloudConnetions';
import { ref, uploadBytes } from "firebase/storage";

export default function ResourceManagingModal ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    
    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [fileSelected, setFileSelected] = useState("");

    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    function submitFile() {
        if (fileSelected == "") {
            console.log("File NOT chosen");
            return;
        }

        const username = "user002";
        const fileName = `${username}_${fileSelected.name}`;

        const fileRef = ref(storage, `rm001test/${fileName}`);
        uploadBytes(fileRef, fileSelected);
        console.log("document [", fileName, "] submitted."); //TODO test
    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

            <div className="modalContent">
                TODO... (resource manager)
                <input 
                    type="file"
                    onChange={fileSelectChange}
                > 
                </input>
                <button onClick={submitFile}> Submit </button>
            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Cancel </button>
                <button className="modalControlButton" onClick={handleRmSaveChanges}> Save Changes </button>
            </div>
            
        </div>
      </div>
    );
  };