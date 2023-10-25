import styles from './webpage.css';
import { useState } from "react";
import { submitFileVM, getRmFileListVM, fetchUrlByFilenameVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceSelector ({handleRsCancel, handleRsSaveChanges, isDisplay}) {
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

    function itemClicked(index) {
        const fname = cloudFileList[index];
        const fullFName = `${username}_${fname}`;
        fetchUrlByFilenameVM({fullFilename: fullFName});
    }
  
    console.log("Resource Selector !!!!!!!!!!!!"); //TODO test
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

            <div className="modalContent">
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <br></br><br></br>
            
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li key={index} onClick={itemClicked(index)}>{item}</li>
                    ))}
                </ul>

                <p className="plans">
                    Here it shouldn't display resource from cloud storage directly -- but just the list from naming pair (see resource manager)
                
                </p>

                <p className="plans">
                    for each project, specify the user-given-name for one resource, for modularization and reusability.
                    <br></br> for example, character1 might have pic ver.1 in some art style, and if the author wants to change to ver.2 style, they can do this once by "changing source" for the user-specified preveiewArea
                    <br></br> that is, each resource on cloud storage should have a unique variable name, in this project, and later this name can be reassigned to other resource
                </p>

            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRsCancel}> Close </button>
                <button className="modalControlButton" onClick={confirmResource}> Confirm </button>

            </div>
            
        </div>
      </div>
    );
  };