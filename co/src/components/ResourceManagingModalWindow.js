import styles from './webpage.css';
import { useState } from "react";
import { submitFileVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
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
        const username = "user002"; //TODO testing
        submitFileVM({file: fileSelected , uname: username});
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