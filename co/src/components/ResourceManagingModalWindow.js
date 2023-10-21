import styles from './webpage.css';
import { useState } from "react";
import { submitFileVM, getRmFileListVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

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
                /> 
                <button onClick={submitFile}> Submit </button>

                <button onClick={() => {getRmFileListVM({uname: username});}}> Load Resource List </button>

                <p className="plans">
                    Allow user to pull the "resource pool" from cloud, and click to choose?
                    <br></br> User can either choose the resource or upload new ones
                    <br></br> Then: add "tag" for each resource for quick filter/search when developing
                    <br></br> Later: add "folder"-like sections for different types/purposes
                </p>
            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Cancel </button>
                <button className="modalControlButton" onClick={handleRmSaveChanges}> Save Changes </button>
            </div>
            
        </div>
      </div>
    );
  };