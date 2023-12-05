import { useState, useEffect } from "react";
import { getRmFileListVM, fetchUrlByFilenameVM, fetchProjectResourcePairsVM } from '../viewmodels/ResourceManagerViewModel';

export default function ResourceSelector ({handleRsCancel, handleRsSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
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

    function confirmResource() {
        console.log("choosing this resource...", clickedFileName);
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

    return (
      <div className={modalStyleName}>

        <div className="modalArea2">

            <div className="modalContent scrollableArea">
       
                <div>

                {/* <button onClick={fetchRmFileList}> Load Resource List </button> */}
                <br></br><br></br>
                <div className="parallelFrame rsrcSelectorArea" > 
                
                <div>
                <div>
                    <button onClick={() => {setIsAddNewPair(!isAddNewPair);}}>Add New Pair</button>
                    {isAddNewPair && 
                    <div>
                        Form Area...
                        <button>Confirm</button>
                    </div>}
                    <div className="varPairArea">
                        Variable pair area
                        <p className="plans">
                            TODO: load list:
                            <br></br>cloud db field array name: project_resource
                        </p>

                        <ul>


                       

                        {projectRsrcVisualList.map((item, index) => {
                                return (<li className="clickableListItem2" key={index} onClick={()=>{ itemClicked(item["content"]);}}> 
                                    {item["var"]}= {item["content"]["filename"]}                                    
                                    <button onClick={()=>{
                                        let tempList = projectRsrcVisualList;
                                        tempList = tempList.filter((elem) => (elem["content"]["filename"] !== item["content"]["filename"]));
                                        setProjectRsrcVisualList(tempList);
                                        let tempLocalArr = localVisualList.filter((elem) => (elem !== item["content"]["filename"]));
                                        setLocalVisualList(tempLocalArr);
                                    }}>Remove</button>
                                    
                                </li>);
                        })}

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


                <div className="rsrcListArea">
                
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
                            {!localVisualList.includes(item["filename"]) &&
                            <button onClick={()=>{
                                let obj = {var: tempVarName, content: item};                                
                                projectRsrcVisualList.push(obj);  
                                localVisualList.push(item["filename"]);                                                         
                                setTempVarName("");
                                }}>Add
                            </button>}
                            
                            {localVisualList.includes(item["filename"]) &&
                            <button onClick={()=>{
                                if (tempVarName === "") {return;}
                                let obj = {var: tempVarName, content: item};  
                                let temArr = projectRsrcVisualList.filter((elem) => (elem["filename"] !== item["filename"]));               
                                temArr.push(obj); 
                                setProjectRsrcVisualList(temArr);                               
                                let tempLocal = localVisualList.filter((elem) => (elem["filename"] !== item["filename"])); 
                                tempLocal.push(item["filename"]);
                                setLocalVisualList(tempLocal);                        
                                setTempVarName("");
                            }}>
                                Update
                            </button>}
                                        
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
                            {!localAudioList.includes(item["filename"]) && 
                            <button onClick={()=>{
                                let obj = {var: tempVarName, content: item};                 
                                projectRsrcAudioList.push(obj);  
                                localAudioList.push(item["filename"]);                          
                                setTempVarName("");
                            }}>Add
                            </button>}
                            
                            {localAudioList.includes(item["filename"]) &&
                            <button onClick={()=>{
                                if (tempVarName === "") {return;}
                                let obj = {var: tempVarName, content: item};  
                                let temArr = projectRsrcAudioList.filter((elem) => (elem["filename"] !== item["filename"]));               
                                temArr.push(obj); 
                                setProjectRsrcAudioList(temArr);                               
                                let tempLocal = localAudioList.filter((elem) => (elem["filename"] !== item["filename"])); 
                                tempLocal.push(item["filename"]);
                                setLocalAudioList(tempLocal);                        
                                setTempVarName("");
                            }}>
                                Update
                            </button>}
                              

                        </li>
                    ))}
                </ul>

                </div>


                </div>
                <div className="rsrcPrevArea">
                    {(clickedFileType === "audio") && 
                        <div>audio resource area {clickedFileUrl}</div>
                    }
                    {(clickedFileType === "visual") && 
                        <div>visual resource area {clickedFileUrl}</div>
                    }                    
                    
                </div>
                
                </div>

                </div>              
                <p className="plans">
                    for each project, specify the user-given-name for one resource, for modularization and reusability.
                    <br></br> for example, character1 might have pic ver.1 in some art style, and if the author wants to change to ver.2 style, they can do this once by "changing source" for the user-specified preveiewArea
                    <br></br> that is, each resource on cloud storage should have a variable name in this project, and later this name can be reassigned to other resource
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