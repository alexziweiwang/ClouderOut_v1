import styles from './webpage.css';
import { useState } from "react";
import { submitFileVM, getRmFileListVM, addToRmFileListVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [fileSelected, setFileSelected] = useState("");
    const [cloudFileList, setCloudFileList] = useState([]);

    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    function submitFile() {
        if (fileSelected == "") {
            console.log("File NOT chosen");
            return;
        }
        submitFileVM({file: fileSelected , uname: username});
        const fileName = `${username}_${fileSelected.name}`;
        addToRmFileListVM({uname: username, filetitle: fileName});
        fetchRmFileList();
    }

    async function fetchRmFileList() {
        const fileList = await getRmFileListVM({uname: username});
        setCloudFileList(fileList);
        console.log("modalwindow: fileList:"); //TODO test
        console.log(fileList); //TODO test
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

                <input 
                    type="file"
                    onChange={fileSelectChange}
                /> 
                <button onClick={submitFile}> Submit </button>

                <p className="plans">
                    TODO: improve to clickable customizable list items & image preview
                </p>

                <p className="plans">
                    Allow user to pull the "resource pool" from cloud, and click to choose?
                    <br></br> User can either choose the resource or upload new ones
                    <br></br> Then: add "tag" for each resource for quick filter/search when developing
                    <br></br> Later: add "folder"-like sections for different types/purposes
                </p>

                    <p className="plans">
                        TODO: for resource-selection, specific for each project
                        <br></br> (list all naming pairs)
                        <br></br>
                        <br></br> create a naming pair
                        <br></br> edit a naming pair
                        <br></br> delete a naming pair
                    </p>
            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Close </button>
            </div>
            
        </div>
      </div>
    );
  };