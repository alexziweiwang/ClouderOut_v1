import { useState, useEffect } from "react";
import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM, updateProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import PicturePreview from './PicturePreview';


export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

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

    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 
    const [clickedFileUrl, setClickedFileUrl] = useState("");
    const [clickedFileName, setClickedFileName] = useState("");
    const [clickedFileType, setClickedFileType] = useState("");
    
    const [visualListFilter, setVisualListFilter] = useState("");
    const [audioListFilter, setAudioListFilter] = useState("");

    const [visualVarPairs, setVisualVarPairs] = useState([]);
    const [audioVarPairs, setAudioVarPairs] = useState([]);

    const [fileLog, setFileLog] = useState([]); // stores filename of un-uploaded files

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchRmFileList();
            fetchProjResourceLists();
            //TODO fetch varPairData of this project, from cloud 
            setFirstTimeEnter(false);
        }
    });

    function updateVarPairDataFunc() {
        //TODO:
        console.log("updateVarPairDataFunc()");
    }


    async function fetchProjResourceLists() {
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        console.log(obj);

        setAudioList(obj.audio);
        setVisualList(obj.visual);
    }

    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    async function submitFile(type, selectedFile) {
        console.log("Window: called ... submitFile"); //TODO
        if (selectedFile === "") {
            console.log("File NOT chosen");
            return;
        }
        console.log("temp selectedFile: ");
        console.log(selectedFile); //TODO testing

        // TODO operations about fileLog, 
        // TODO     if not yet in filelog, add this filename to filelog (1, 3)
        // TODO     if already in filelog, then it's at least the second time submitting (2), remove from filelog

        const fileName = `${username}_${selectedFile.name}`;

        await submitFileVM({file: selectedFile , uname: username, filename: fileName});
        
        console.log("continue to next steps of updating..."); //TODO test

        await updateUploadedFileRecords(username, fileName, type);
    }


    async function itemClicked(item) {
        console.log("item clicked: ");
        console.log(item);

        if (clickedFileName === item["filename"]) { /* reset */
            setClickedFileUrl("");
            setClickedFileName("");
            setClickedFileType("");
            return;
        }
        setClickedFileUrl(item["fileurl"]);
        setClickedFileName(item["filename"]);
        setClickedFileType(item["filetype"]);
        console.log("clicked item: " + item["fileurl"]);
    }

    async function updateUploadedFileRecords(username, fileName, type) {
        let url = await fetchUrlByFilenameVM({fullFilename: fileName});
        console.log("1 uploaded url in window: ", url); //TODO test
        if (url === undefined || url === "") {
            console.log("Error: empty url"); //TODO test
            return;
        }
        await addToRmFileListVM({uname: username, filetitle: fileName, fileUrl: url, fileType: type});
 
        await fetchRmFileList();
    }

    async function fetchRmFileList() { //TODO temp debugging
        const fileList = await getRmFileListVM({uname: username});
        setCloudFileList(fileList.filenames);
        const vList = fileList.filenames.filter((item)=>(item.filetype === "visual"));
        setFileListVisual(vList);
        const aList = fileList.filenames.filter((item)=>(item.filetype === "audio"));
        setFileListAudio(aList);
        console.log("gen list = ", cloudFileList); //TODO test

        console.log("vlist = ", vList); //TODO test
        console.log("alist = ", aList); //TODO test
    }

    return (
      <div className={modalStyleName}>
        <div className="modalArea">

            <div>
            <button onClick={handleRmCancel}> Close </button>

                <div className="parallelFrame">
                    <button className={isTabVisual ? "buttonClicked tabBarVSelected" : "buttonUnclicked tabBar1"} onClick={()=>{setIsTabVisual(true);}}>Tab Visual</button>
                    <button className={!isTabVisual ? "buttonClicked tabBarASelected" : "buttonUnclicked tabBar2"} onClick={()=>{setIsTabVisual(false);}}>Tab Audio</button>
                </div>

                {isTabVisual && 
                <div className="rmTypeAreaV"> 
                <div className="modalContent parallelFrame">
                 
                <div className="areaNote1"> visual area
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <div>
                    <select value={visualListFilter} onChange={(event)=>{setVisualListFilter(event.target.value);}}>
                        <option value="curr" key="currVis">In this project</option>
                        <option value="all" key="allVis">All resources</option>
                        <option value="not" key="notVis">Not in this project</option>
                    </select>
                </div>
                <br></br><br></br>
                
                <div className="orangeArea">
                <ul>
                    {fileListVisual.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{itemClicked(item);}}>{item["filename"]}</li>
                        ))}
                </ul>
                </div>
                <div> New File Upload<br></br>
                    <input 
                        type="file"
                        accept=".png,.jpg,.jpeg,"
                        onChange={(event)=>{submitFile("visual", event.target.files[0]);setFileSelected(event.target.files[0]);}} //TODO improve later
                    /> 
                    <button onClick={()=>{submitFile("visual", fileSelected);}}> Submit </button>
                
                </div>


                </div>
                
                <div className="areaBlue">
                    <div className="rsrcPrevArea">
                        {clickedFileUrl !== "" && <PicturePreview className="paddings" urlList={fileListVisual} selectedUrl={clickedFileUrl} updateVarPairData={updateVarPairDataFunc}/>}
                    </div>
                </div>





                </div>

                </div>}

                {!isTabVisual && 
                <div className="rmTypeAreaA"> 
                <div className="modalContent parallelFrame">
            
                <div className="areaNote2"> audio area
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <div>
                    <select value={audioListFilter} onChange={(event)=>{setAudioListFilter(event.target.value);}}>
                        <option value="curr" key="currAu">In this project</option>
                        <option value="all" key="allAu">All resources</option>
                        <option value="not" key="notAu">Not in this project</option>
                    </select>
                </div>
                <br></br><br></br>
        
                <div className="orangeArea">
                <ul>
                    {fileListAudio.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]["filename"]); itemClicked(item);}}>{item["filename"]}</li>
                    ))}
                </ul>
                </div>
                <div> New File Upload<br></br>
                    <input 
                        type="file"
                        accept=".wav,.mp3,.aac,.m4a"
                        onChange={(event)=>{submitFile("audio", event.target.files[0]);setFileSelected(event.target.files[0]);}} //TODO improve later
                        /> 
                    <button onClick={()=>{submitFile("audio", fileSelected);}}> Submit </button>
                </div>

                </div>
                
                <div className="areaBlue">

                    <div className="rsrcPrevArea">
                        {clickedFileUrl !== "" && <div>audio resource area <br></br>{clickedFileUrl}
                            <br></br>
                            <audio src={clickedFileUrl} controls />

                            <div className="resourceVarPairWindow">Variable Pair management - Audio
                                <br></br>TODO : if var-pair contains this url, provide options to view and edit
                                <br></br>TODO check local-audio-list, element of this url
                                <br></br>
                                <label>Variable Name: </label><input></input>
                                {<button>Add</button>}
                                {<button>Edit</button>}
                           

                            </div>    
                        </div>}      
                    
                    
                    </div>
                    
                </div>





                </div>


                </div>}
          
     
            </div>
            </div>

       
      </div>
    );
  };