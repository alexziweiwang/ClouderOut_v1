import { useState, useEffect } from "react";
import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM } from '../viewmodels/ResourceManagerViewModel';
import { fetchProjectResourceVarPairsVM, updateProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import PicturePreview from './PicturePreview';
import AudioPreview from './AudioPreview';
import ItemVarPairManage from './ItemVarPairManage';


export default function ResourceManagingModalWindow ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [uploadConfirm, setUploadConfirm] = useState(false);
    const [fileSelected, setFileSelected] = useState("");
    const [cloudFileList, setCloudFileList] = useState([]);
    const [isTabVisual, setIsTabVisual] = useState(true);

    const [fileListVisual, setFileListVisual] = useState([]);
    const [fileListAudio, setFileListAudio] = useState([]);

    const [clickedFileUrl, setClickedFileUrl] = useState("");
    const [clickedFileName, setClickedFileName] = useState("");
    const [clickedFileType, setClickedFileType] = useState("");
    
    const [visualListFilter, setVisualListFilter] = useState("all");
    const [audioListFilter, setAudioListFilter] = useState("all");
    const [visualListFilteredList, setVisualListFilteredList] = useState([]);
    const [audioListFilteredList, setAudioListFilteredList] = useState([]);

    const [visualVarPairs, setVisualVarPairs] = useState([]);
    const [audioVarPairs, setAudioVarPairs] = useState([]);

    const [varPairToCloud, setVarPairToCloud] = useState("default");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchRmFileList();
            fetchProjResourceVarPairLists();
            setFirstTimeEnter(false);
        }
    });

    function updateVarPairDataFuncGen(type, url, givenContent, fileType) {
        if (givenContent.length === 0) {
            console.log("empty input in updateVarPairDataFuncGen(), direct return");
            return;
        }
        let updatePart = "";
        let updatePartArr = [];

        if (type === "add") {
            updatePart = {};
            updatePart["url"] = url;
            updatePart["var"] = givenContent;
        } else if (type === "edit") {

            if (fileType === "visual") {
                updatePartArr = visualVarPairs.filter(elem => elem["url"] === url);
            } else if (fileType === "audio") {
                updatePartArr = audioVarPairs.filter(elem => elem["url"] === url);
            } else {
                return;
            }
            updatePart = updatePartArr[0];
            updatePart["var"] = givenContent;
        } else {
            return;
        }

        let other = [];
        if (fileType === "visual") {
            other = visualVarPairs.filter(e => e["url"] !== url);
        } else if (fileType === "audio") {
            other = audioVarPairs.filter(e => e["url"] !== url);
        } else {
            return;
        }
        
        other.push(updatePart);

        let object = {};
        if (fileType === "visual") {
            setVisualVarPairs(other);
            object["visual"] = other;
            object["audio"] = audioVarPairs;
        } else if (fileType === "audio") {
            setAudioVarPairs(other);
            object["audio"] = other;
            object["visual"] = visualVarPairs;
        } else {
            return;
        }

        const info = {};
        info["userName"] = username;
        info["projectName"] = projName;
        info["obj"] = object;

        setVarPairToCloud(info);
    }

    async function updateVarPairToCloud() {
        await updateProjectResourceVarPairsVM(varPairToCloud);
        setVarPairToCloud("default");
    }

    async function fetchProjResourceVarPairLists() {
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        console.log(obj);

        setVisualVarPairs(obj.visual);
        setAudioVarPairs(obj.audio);
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

        const fileName = `${username}_${selectedFile.name}`;

        await submitFileVM({file: selectedFile , uname: username, filename: fileName});
        
        console.log("continue to next steps of updating..."); //TODO test

        await updateUploadedFileRecords(username, fileName, type);
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
        if (visualListFilter !== "allVis") {
            setVisualListFilteredList(vList);
        }
        const aList = fileList.filenames.filter((item)=>(item.filetype === "audio"));
        setFileListAudio(aList);
        if (audioListFilter !== "allAu") {
            setAudioListFilteredList(aList);
        }
                                // console.log("raw-rsrc ...gen list = ", cloudFileList); //TODO test

                                // console.log("raw-rsrc vlist = ", vList); //TODO test
                                // console.log("raw-rsrc alist = ", aList); //TODO test
    }

    function changeVisFilter(type) {
        if (type === "all") {
            setVisualListFilteredList(fileListVisual);
            return;
        }

        let inList = [];
        let notInList = [];

        inList = fileListVisual.map((item, index) => {
            let i = 0;
                                        console.log("item: ");
                                        console.log(item);
            for(; i < visualVarPairs.length; i++) {
                if (visualVarPairs[i]["url"] === item["fileurl"]) {
                                        console.log("...... adding in-project item:");
                                        console.log(item);
                    inList.push(item);
                                        console.log(" now list: ");
                                        console.log(inList);
                    
                }
            }
        });
  
        console.log("~~~ in list (vis): ");
        console.log(inList);
        console.log("~~~ TODO ... not in list (vis): ");
        console.log(notInList);

        // visual: in-this-project = currVis, all-resources = allVis, not-in-this-project = notVis
        if (type === "curr") { // in-this-project
            // TODO if var-pair contains this item's url, then it's in-this-project
            setVisualListFilteredList(inList); 
            console.log("filter: in vis...");
        } else if (type === "not") { // not-in-this-project
            // TODO if var-pair does not contain this item's url, then it's not-in-this-project
            setVisualListFilteredList(notInList); 
            console.log("filter: not in vis...");
        } else if (type !== "all") { // unexpected input
            return;
        }
    }

    function changeAuFilter(type) {
        if (type === "allAu") {
            setAudioListFilteredList(fileListAudio);
            return;
        }

        let listAudioFiltered = fileListAudio;

        // audio: in-this-project = currAu, all-resources = allAu, not-in-this-project = notAu */
        if (type === "currAu") { // in-this-project
            // TODO if var-pair contains this item's url, then it's in-this-project
            // TODO setAudioListFilteredList(); 
            console.log("filter: in au");
        } else if (type === "notAu") { // not-in-this-project
            // TODO if var-pair does not contain this item's url, then it's not-in-this-project
            // TODO setAudioListFilteredList(); 
            console.log("filter: not in au");
        } else if (type !== "allAu") { // unexpected input
            return;
        }
    }

    return (
      <div className={modalStyleName}>
        <div className="modalArea">

            <div>
            <button onClick={()=>{
                if (varPairToCloud !== "default") {
                    console.log("!!! please save to cloud first");
                } else {
                    handleRmCancel(); 
                }
            }}> Close </button>

                <div className="parallelFrame">
                    <button className={isTabVisual ? "buttonClicked tabBarVSelected" : "buttonUnclicked tabBar1"} onClick={()=>{
                                setIsTabVisual(true);
                                setUploadConfirm(false); 
                                setClickedFileUrl("");
                                setClickedFileName("");
                                setClickedFileType("");
                    }}>Tab Visual</button>
                    <button className={!isTabVisual ? "buttonClicked tabBarASelected" : "buttonUnclicked tabBar2"} onClick={()=>{
                                setIsTabVisual(false); 
                                setUploadConfirm(false); 
                                setClickedFileUrl("");
                                setClickedFileName("");
                                setClickedFileType("");
                    }}>Tab Audio</button>

                    <button className="buttonRight" onClick={()=>{updateVarPairToCloud();}}>Save To Cloud</button>
                </div>

                {isTabVisual && 
                <div className="rmTypeAreaV"> 
                <div className="modalContent parallelFrame">
         
                <div className="areaNote1"> visual area
                <button onClick={fetchRmFileList}> Load Resource List </button>
                
                <br></br>
                <select value={visualListFilter} onChange={(event)=>{setVisualListFilter(event.target.value); changeVisFilter(event.target.value);}}>
                        <option value="curr" key="currVis">In this project</option>
                        <option value="all" key="allVis">All resources</option>
                        <option value="not" key="notVis">Not in this project</option>
                </select>
                
                <div className="rsrcListArea">
                <ul>
                    {visualListFilteredList.map((item, index) => (
                        <li className="clickableListItem5" key={index} onClick={()=>{itemClicked(item);}}>{item["filename"]}</li>
                    ))}
                </ul>
                </div>


                <div className="uploadArea"> New File Upload <br></br>
                    {uploadConfirm === false && <input 
                        type="file"
                        accept=".png,.jpg,.jpeg,"
                        onChange={(event)=>{setFileSelected(event.target.files[0]);}}
                    />}
                    {uploadConfirm === true && <label>File Chosen: {fileSelected.name}</label>}
                    {uploadConfirm === true && <button onClick={()=>{setFileSelected(""); setUploadConfirm(false);}}>Cancel</button>}
                    {uploadConfirm === false && <button onClick={()=>{submitFile("visual", fileSelected); setUploadConfirm(true);}}> Confirm </button>}
                    {uploadConfirm === true && <button onClick={()=>{submitFile("visual", fileSelected); setFileSelected(""); setUploadConfirm(false);}}> Submit </button>}
                </div>


                </div>
                
                <div className="areaBlue">
                    {clickedFileUrl !== "" && <PicturePreview className="paddings" urlList={visualListFilteredList} selectedUrl={clickedFileUrl}/>}
                    {clickedFileUrl !== "" && <ItemVarPairManage className="paddings" varPairInfo={visualVarPairs} selectedUrl={clickedFileUrl} updateVarPairDataFunction={updateVarPairDataFuncGen} fileType="visual"/>}
                </div>


                </div>
                </div>}

                {!isTabVisual && 
                <div className="rmTypeAreaA"> 
                <div className="modalContent parallelFrame">
            
                <div className="areaNote2"> audio area
                <button onClick={fetchRmFileList}> Load Resource List </button>
               
                <br></br>
                <select value={audioListFilter} onChange={(event)=>{setAudioListFilter(event.target.value); changeAuFilter(event.target.value);}}>
                        <option value="curr" key="currAu">In this project</option>
                        <option value="all" key="allAu">All resources</option>
                        <option value="not" key="notAu">Not in this project</option>
                </select>
                
                <div className="rsrcListArea">
                <ul>
                    {fileListAudio.map((item, index) => (
                        <li className="clickableListItem5" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]["filename"]); itemClicked(item);}}>{item["filename"]}</li>
                    ))}
                </ul>
                </div>
                <div className="uploadArea"> New File Upload <br></br>
                    {uploadConfirm === false &&  <input 
                        type="file"
                        accept=".wav,.mp3,.aac,.m4a"
                        onChange={(event)=>{setFileSelected(event.target.files[0]);}}
                        /> }
                    {uploadConfirm === true && <label>File Chosen: {fileSelected.name}</label>}
                    {uploadConfirm === true && <button onClick={()=>{setFileSelected(""); setUploadConfirm(false);}}>Cancel</button>}
                    {uploadConfirm === false && <button onClick={()=>{submitFile("audio", fileSelected); setUploadConfirm(true);}}> Confirm </button>}
                    {uploadConfirm === true && <button onClick={()=>{submitFile("audio", fileSelected); setFileSelected(""); setUploadConfirm(false);}}> Submit </button>}
                </div>

                </div>
                
                <div className="areaBlue">
                    {clickedFileUrl !== "" && <AudioPreview className="paddings" urlList={fileListAudio} selectedUrl={clickedFileUrl}/>}
                    {clickedFileUrl !== "" && <ItemVarPairManage className="paddings" varPairInfo={audioVarPairs} selectedUrl={clickedFileUrl} updateVarPairDataFunction={updateVarPairDataFuncGen} fileType="audio"/>}
                </div>

                </div>


                </div>}
          
     
            </div>
            </div>

       
      </div>
    );
  };