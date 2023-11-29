import { useState } from "react";
import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [fileSelected, setFileSelected] = useState("");
    const [cloudFileList, setCloudFileList] = useState([]);
    const [isTabVisual, setIsTabVisual] = useState(true);
    const [fileListVisual, setFileListVisual] = useState([]);
    const [fileListAudio, setFileListAudio] = useState([]);


    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    async function submitFile(type) {
        if (fileSelected === "") {
            console.log("File NOT chosen");
            return;
        }
        await submitFileVM({file: fileSelected , uname: username});
        const fileName = `${username}_${fileSelected.name}`;
        const url = "gs://clouderout001.appspot.com/" + "rm001test/" + fileName; //TODO test, change file folder later, file url
        await addToRmFileListVM({uname: username, filetitle: fileName, fileUrl: url, fileType: type}).then(fetchRmFileList());
    }

    async function fetchRmFileList() { //TODO temp debugging
        const fileList = await getRmFileListVM({uname: username});
        setCloudFileList(fileList.filenames);
        console.log("modalwindow: fileList:"); //TODO test
        console.log(fileList); //TODO test

    }

    function getAudioList() {
        console.log("getting audio file list...");
        //TODO filter on local file list
        fetchRmFileList(); //TODO temp, all items
    }

    function getVisualList() {
        console.log("getting visual file list...");
        //TODO filter on local file list
        fetchRmFileList(); //TODO temp, all items
    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

     
                
        
            <div>

                <div>
                    <button className={isTabVisual ? "buttonClicked tabBarVSelected" : "buttonUnclicked tabBar"} onClick={()=>{setIsTabVisual(true);}}>Tab Visual</button>
                    <button className={!isTabVisual ? "buttonClicked tabBarASelected" : "buttonUnclicked tabBar"} onClick={()=>{setIsTabVisual(false);}}>Tab Audio</button>
                </div>
                {isTabVisual && 
                <div className="rmTypeAreaV"> 
                <div className="modalContent parallelFrame">
                 
                <div className="areaOrange"> visual area
                <button onClick={getVisualList}> Load Resource List </button>
                <br></br><br></br>
        
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]["filename"]);}}>{item["filename"]}</li>
                        ))}
                </ul>
                </div>
                
                <div className="areaBlue">
                    <input 
                        type="file"
                        accept=".png,.jpg,.jpeg,"
                        onChange={fileSelectChange}
                    /> 
                    <button onClick={()=>{submitFile("visual")}}> Submit </button>
                </div>





                </div>

                </div>}

                {!isTabVisual && 
                <div className="rmTypeAreaA"> 
                <div className="modalContent parallelFrame">
            
                <div className="areaOrange"> audio area
                <button onClick={getAudioList}> Load Resource List </button>
                <br></br><br></br>
        
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]["filename"]);}}>{item["filename"]}</li>
                    ))}
                </ul>
                </div>
                
                <div className="areaBlue">
                    <input 
                        type="file"
                        accept=".wav,.mp3,.aac,.m4a"
                        onChange={fileSelectChange}
                    /> 
                    <button onClick={()=>{submitFile("audio")}}> Submit </button>

                    <p className="plans">
                    TODO: improve to clickable customizable list items & image preview?
                </p>

                <p className="plans">
                    TODO: refactor to fetch from cloud when only needed...
                </p>

                <p className="plans">
                    Allow user to pull the "resource pool" from cloud, and click to choose?
                    <br></br> User can either choose the resource or upload new ones
                    <br></br> Then: add "tag" for each resource for quick filter/search when developing
                    <br></br> Later: add "folder"-like sections for different types/purposes
                </p>

                </div>





                </div>


                </div>}
          
     
            </div>
            </div>



            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Close </button>
            </div>
       
      </div>
    );
  };