import { useState, useEffect } from "react";
import { getRmFileListVM, updateProjectResourcePairsVM } from '../viewmodels/ResourceManagerViewModel';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';

export default function ResourceSelector ({handleRsCancel, handleRsSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboardLighter";
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboardLighter";
    } else {
        modalStyleName = "displayNone modalBackboardLighter";
    }

    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchRmFileList();
            setFirstTimeEnter(false);
        }
    });

    const [cloudFileList, setCloudFileList] = useState([]);
    const [clickedFileUrl, setClickedFileUrl] = useState("");
    const [clickedFileName, setClickedFileName] = useState("");
    const [clickedFileType, setClickedFileType] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    const [visualList, setVisualList] = useState([]);
    const [audioList, setAudioList] = useState([]);

    const [isAddNewPair, setIsAddNewPair] = useState(false);

    const [projectRsrcAudioList, setProjectRsrcAudioList] = useState([]); //TODO fetch from cloud!!
    const [projectRsrcVisualList, setProjectRsrcVisualList] = useState([]); //TODO fetch from cloud!!

    const [localAudioList, setLocalAudioList] = useState([]); //local list
    const [localVisualList, setLocalVisualList] = useState([]); //local list

    const [tempVarName, setTempVarName] = useState("");

    const [isRmOpen, setIsRmOpen] = useState(false);

    async function fetchRmFileList() {
        let fileList = await getRmFileListVM({uname: username});
        fileList = fileList.filenames;
        setCloudFileList(fileList);
        const audioList = fileList.filter((item) => (item.filetype === "audio"));
        setAudioList(audioList);
        const visualList = fileList.filter((item) => (item.filetype === "visual"));
        setVisualList(visualList);
        console.log("curr gen list:", fileList); //TODO test
    }

    async function confirmResource() {
        /* update cloud db */
        const tempObj = {audio: localAudioList, visual: localVisualList};
        //TODO 
        console.log("Resource-selector: Updating the db data structure...", tempObj); //TODO test
        
        await updateProjectResourcePairsVM({userName: username, projectName: projName, obj: tempObj});
    }

    async function itemClicked(item) {
        if (clickedFileName === item["filename"]) { /* reset */
            setClickedFileUrl("");
            setClickedFileName("");
            setClickedFileType("");
            return;
        }
        setClickedFileUrl(item["fileurl"]);
        setClickedFileName(item["filename"]);
        setClickedFileType(item["filetype"]);
    }
  
    function handleTempVarChange(event) {
        setTempVarName(event.target.value);
    }

    function handleResourceManagerCancel() {
        setIsRmOpen(false);
    }
    
    function handleResourceManagerSaveChanges() {
        setIsRmOpen(false);
        //TODO: save changes onto cloud db
    }

    return (
      <div className={modalStyleName}>

        <div className="modalArea2">
            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRsCancel}> Close </button>
                <button className="modalControlButton" onClick={confirmResource}> Confirm </button>

            </div>

            <div className="modalContent scrollableArea">
       
                <div>

                {/* <button onClick={fetchRmFileList}> Load Resource List </button> */}
                <br></br><br></br>
                <div className="parallelFrame rsrcSelectorArea" > 
                
                <div>
                <div>
                    <div className="varPairArea">
                        Variable Pairs in This Project
                        
                        <button onClick={()=>{
                            console.log("projectRsrcVisualList: ", projectRsrcVisualList);
                            console.log("projectRsrcAudioList: ", projectRsrcVisualList);
                        }}>Check list content</button>
                        <br></br>
                        <label>Visual Resource</label>
                        <div>
                        {<><select>
                            {projectRsrcVisualList.map((item, index) => {
                                return (<option value={item["var"]} key={index}>
                                    {item["var"]}
                                </option>);
                            })}
                        </select>
                        <select>
                            {visualList.map((item, index) => {
                                return (<option value={item["filename"]} key={index}>
                                    {item["filename"]}
                                </option>);
                            })}
                        </select>
                        <button>Update</button></>}

                        <ul>    
                        {projectRsrcVisualList.map((item, index) => {
                                return (<li className="clickableListItem2" key={index} onClick={()=>{ itemClicked(item["content"]);}}> 
                                    {item["var"]} = {item["content"]["filename"]}                                    
                                    <button onClick={()=>{
                                        let tempList = projectRsrcVisualList;
                                        tempList = tempList.filter((elem) => (elem["content"]["filename"] !== item["content"]["filename"]));
                                        setProjectRsrcVisualList(tempList);
                                        let tempLocalArr = localVisualList.filter((elem) => (elem !== item["content"]["filename"]));
                                        setLocalVisualList(tempLocalArr);
                                    }}>Remove</button>
                                    
                                </li>);
                        })}
                         </ul>
                        </div>

                        <div>
                        <br></br>
                        <label>Audio Resource</label>
                        <br></br>
                        {<><select>
                            {projectRsrcAudioList.map((item, index) => {
                                return (<option value={item["var"]} key={index}>
                                    {item["var"]}
                                </option>);
                            })}
                        </select>
                        <select>
                            {audioList.map((item, index) => {
                                return (<option value={item["filename"]} key={index}>
                                    {item["filename"]}
                                </option>);
                            })}
                        </select>
                        <button>Update</button></>}
                        
                        <ul>
                        {projectRsrcAudioList.map((item, index) => {
                                return (<li className="clickableListItem2" key={index} onClick={()=>{ itemClicked(item["content"]);}}>
                                    {item["var"]}= {item["content"]["filename"]}                                    
                                    <button onClick={()=>{
                                        let tempList = projectRsrcAudioList;
                                        tempList = tempList.filter((elem) => (elem["content"]["filename"] !== item["content"]["filename"]));
                                        setProjectRsrcAudioList(tempList);
                                        console.log("");
                                        let tempLocalArr = localAudioList.filter((elem) => (elem !== item["content"]["filename"]));
                                        setLocalAudioList(tempLocalArr);
                                    }}>Remove</button>
                                </li>);
                        })}
                        </ul>
                    </div>
                       
                    </div>

                </div>


                <div className="rsrcListArea">

                {isRmOpen && <ResourceManagingModalWindow isDisplay = {isRmOpen} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}

                <button onClick={()=>{setIsRmOpen(!isRmOpen);}}>Resource Manager</button>
                <br></br>
                <label>New Variable Name:</label>
                <input value={tempVarName} onChange={handleTempVarChange}></input>
                <br></br><br></br>
                <label>Visual Resource</label>
                <ul>
                    {visualList.map((item, index) => (
                        <li key={index} className={clickedFileName === item["filename"] ? "tableItemSelected" :  "tableItem"} onClick={() => {
                            itemClicked(item);
                        }}>
                            
                            <label>{item["filename"]}</label>      
                            
                            <button onClick={()=>{
                                let obj = {var: tempVarName, content: item};                                
                                projectRsrcVisualList.push(obj);  
                                let value = {var: tempVarName, name: item["filename"]};
                                localVisualList.push(value);                                                         
                                setTempVarName("");
                                }}>Add
                            </button>
                                                                   
                        </li>
                    ))}
                </ul>
                <br></br>
                <label>Audio Resource</label>
                <ul>
                    {audioList.map((item, index) => (
                        <li key={index} className={clickedFileName === item["filename"] ? "tableItemSelected" :  "tableItem"} onClick={() => {
                            itemClicked(item);
                        }}>
                            <label>      {item["filename"]}</label>
                            
                            <button onClick={()=>{
                                let obj = {var: tempVarName, content: item};                 
                                projectRsrcAudioList.push(obj);  
                                let value = {var: tempVarName, name: item["filename"]};
                                localAudioList.push(value);                                           
                                setTempVarName("");
                            }}>Add
                            </button>
                            
                        </li>
                    ))}
                </ul>

                </div>


                </div>
                <div className="rsrcPrevArea">
                    {(clickedFileType === "audio") && 
                        <div>audio resource area {clickedFileUrl}
                        </div>
                    }
                    {(clickedFileType === "visual") && 
                        <div>visual resource area {clickedFileUrl}
                            <div>
                                <img src={clickedFileUrl} alt="preview_audio" />
                            </div>
                        </div>
                    }                    
                    
                </div>
                
                </div>

                </div>              

            </div>
            
        </div>
      </div>
    );
  };