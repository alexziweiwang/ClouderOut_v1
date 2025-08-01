import { useState, useEffect } from "react";

//TODO1090 cloud-db related
import { submitFileVM, getRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM, removeFromRmFileListVM } from '../viewmodels/ResourceManagerViewModel';
// import { fetchProjectResourceVarPairsVM, storeProjectResourceVarPairsToCloudVM } from '../viewmodels/ResourceManagerViewModel';

//TODO6000 offline mode prep


import PicturePreview from './PicturePreview';
import AudioPreview from './AudioPreview';
import ItemVarPairManage from './ItemVarPairManage';
import langDictionary from './_textDictionary';


//TODO: some operations in this component aim to change these lists: visual-list and audio-list (for this project)!
//TODO consider update-operation here or in the outer-component
//TODO99999

//operations aim to do file-pair-matching in this compo (either shared link or storage-upload): rm-file-list (for all projects)


//fetch data from cloud, and update to outer-layer when user-changed...
export default function Modal_ResourceManagingWindow ({
    handleRmCancel, 
    getProjectResourceVarPairs,
    
    triggerRmUpdate, 
    
    languageCodeTextOption,
    projName,
    username,
    editorMode,            //"offline_half"       "offline_full"        "online_cloud"  
    backendOption,

    getLocalProjectDataRsrcMgr,

    updateVarPairToCloud_p2Layer,


}) {

    // const [backendOption, setBackendOption] = useState("firebase");    
    

    //TODO at previous layer, keep unsaved-local setting data locally, so that switching doesn't trigger cloud-db operations


    let modalStyleName = "displayBlock modalBackboard";


    const GoogleDrivePrefix = "https://drive.google.com/thumbnail?id=";
    const [googleDriveFileSharedLink, setGoogleDriveFileSharedLink] = useState("");
    const [googleDriveFileId, setGoogleDriveFileId] = useState("");
    const [googleDriveFileDisplayLink, setGoogleDriveFileDisplayLink] = useState("");


    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];
    let closeText = textDictItem.closeText !== undefined ? 
            textDictItem.closeText 
            : textDictItemDefault.closeText;
    let visualResourceText = textDictItem.visualResourceText !== undefined ? 
            textDictItem.visualResourceText 
            : textDictItemDefault.visualResourceText;
    let audioResourceText = textDictItem.audioResourceText !== undefined ? 
            textDictItem.audioResourceText
            : textDictItemDefault.audioResourceText;
    let loadResourceListText = textDictItem.loadResourceListText !== undefined ?
            textDictItem.loadResourceListText
            : textDictItemDefault.loadResourceListText;
    let cancelText = textDictItem.cancelText !== undefined ?
            textDictItem.cancelText
            : textDictItemDefault.cancelText;
    let confirmText = textDictItem.confirmText !== undefined ? 
            textDictItem.confirmText
            : textDictItemDefault.confirmText;
    let submitText = textDictItem.submitText !== undefined ? 
            textDictItem.submitText
            : textDictItemDefault.submitText;
    let previewText = textDictItem.previewText !== undefined ? 
            textDictItem.previewText
            : textDictItemDefault.previewText;
    let addText = textDictItem.addText !== undefined ? 
            textDictItem.addText
            : textDictItemDefault.addText;
    let saveToCloudText = textDictItem.saveToCloudText !== undefined ?
            textDictItem.saveToCloudText
            : textDictItemDefault.saveToCloudText;
    let newFileUploadText = textDictItem.newFileUploadText !== undefined ?
            textDictItem.newFileUploadText
            : textDictItemDefault.newFileUploadText;
    let allResourcesText = textDictItem.allResourcesText !== undefined ?
            textDictItem.allResourcesText
            : textDictItemDefault.allResourcesText;
    let inThisProjectText = textDictItem.inThisProjectText !== undefined ?
            textDictItem.inThisProjectText
            : textDictItemDefault.inThisProjectText;
    let notInThisProjectText = textDictItem.notInThisProjectText !== undefined ?
            textDictItem.notInThisProjectText
            : textDictItemDefault.notInThisProjectText;

//TODO15

   

    const [isSourceByUpload, setIsSourceByUpload] = useState(false);

    const [uploadConfirm, setUploadConfirm] = useState(false);
    const [fileSelected, setFileSelected] = useState("");
    const [cloudFileList, setCloudFileList] = useState([]);
    const [isTabVisual, setIsTabVisual] = useState(true);

    const [usersAllFileListVisual, setUsersAllFileListVisual] = useState(undefined); // all of this user's files(visual)
    const [usersAllFileListAudio, setUsersAllFileListAudio] = useState(undefined); // all of this user's files(audio)

    const [clickedFileUrl, setClickedFileUrl] = useState(""); //TODO refactor
    const [clickedFileName, setClickedFileName] = useState("");
    const [clickedFileType, setClickedFileType] = useState("");
    
    const [visualListFilter, setVisualListFilter] = useState("all");
    const [audioListFilter, setAudioListFilter] = useState("all");
    const [visualListFilteredList, setVisualListFilteredList] = useState([]);
    const [audioListFilteredList, setAudioListFilteredList] = useState([]);

    const [visualVarPairs, setVisualVarPairs] = useState(undefined);
    const [audioVarPairs, setAudioVarPairs] = useState(undefined);

    const [varPairToCloud, setVarPairToCloud] = useState("default");

    const [cloudUpdated, setCloudUpdated] = useState(false); //TODO15 


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
                                        console.log("ResourceManager-ModalWindow: First Enter!");
            if (usersAllFileListVisual === undefined || usersAllFileListAudio === undefined) {
                initFetchPrep(username);

            }


            setFirstTimeEnter(false);
        }

        if (visualVarPairs === undefined || audioVarPairs === undefined) {
            prepProjResourceVarPairLists();
            
        }


    });

    async function initFetchPrep(usernameTemp) {

            console.log("init ... ");
            await fetchRmFileList(usernameTemp);
        
    }

    function markDataChanged() {
        setCloudUpdated(true)  // when add, delete, edit
//TODO100
    }

    function resetDataUpdatedFalse() {
        setCloudUpdated(false);
    }

    //TODO22 for all operations on resource: 
    function storeNewVarPairDataFuncGen(action, url, givenContent, fileType) {
        markDataChanged();

        if (action === "delete") {
            let updatePartArr = [];
            let object = {};
            
            if (fileType === "visual" && visualVarPairs !== undefined) {
                updatePartArr = visualVarPairs.filter(elem => elem["url"] !== url);
                setVisualVarPairs(updatePartArr);
                object["visual"] = updatePartArr;
                object["audio"] = audioVarPairs;
            } else if (fileType === "audio" && audioVarPairs !== undefined) {
                updatePartArr = audioVarPairs.filter(elem => elem["url"] !== url);
                setAudioVarPairs(updatePartArr);
                object["audio"] = updatePartArr;
                object["visual"] = visualVarPairs;
            } else {
                return;
            }
    
            const info = {};
            info["userName"] = username;
            info["projectName"] = projName;
            info["obj"] = object;
    
            

            let userResponse = window.confirm("Save to cloud?"); //TODO15 
            if (userResponse) {
                console.log("saving to cloud...");
                
                setVarPairToCloud(info);
//TODO save to cloud-db

                alert("Changes saved to cloud!");
            } //TODO15 

        } else { // not delete (add or edit)
            if (givenContent.length === 0) {
                console.log("empty input in store_NewVarPairData_FuncGen(), direct return");//TODO 
                return;
            }
            let updatePart = "";
            let updatePartArr = [];
    
            if (action === "add") {
                updatePart = {};
                updatePart["url"] = url;
                updatePart["var"] = givenContent;
            } else if (action === "edit") {
    
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

            let userResponse = window.confirm("Save to cloud?"); //TODO15 
            if (userResponse) {
                console.log("saving to cloud... info = ", info);
                
                setVarPairToCloud(info);
            }
        }

    }

    async function updateVarPairToCloud_local() { //TODO test and debug
        if (varPairToCloud !== "default") {

            if (editorMode === "online_cloud") {


                await updateVarPairToCloud_p2Layer(varPairToCloud);
            }


            setVarPairToCloud("default");
        }

        resetDataUpdatedFalse();
    }

    function prepProjResourceVarPairLists() {
        /* fetch from cloud db */
        //TODO99999   

        let obj = {};
        obj = getProjectResourceVarPairs(); 
   
        if (obj === undefined || obj === null || obj["visual"] === undefined || obj["audio"] === undefined) {
            return;
        }  
        
        
        if  (Object.keys(obj).length === 0) {
            setVisualVarPairs([]);
            setAudioVarPairs([]);

        } else{
                if (obj.visual !== undefined) {
                    setVisualVarPairs(obj.visual);
                } else {
                    setVisualVarPairs([]);
                }

                if (obj.audio !== undefined) {
                    setAudioVarPairs(obj.audio);
                } else {
                    setAudioVarPairs([]);
                }
        }


  
    }

    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    async function submitFile(type, selectedFile) {
                                                                console.log("rmWindow -- submitFile"); //TODO
        if (selectedFile === "") {
                                                                console.log("\trmWindow --File NOT chosen"); //TODO
            return;
        }

        const fileName = `${username}_${selectedFile.name}`;

        if (editorMode === "online_cloud") {

            await submitFileVM({
                file: selectedFile , 
                uname: username, 
                filename: fileName,
                bkOption: backendOption //TODO999
            });
            
            await updateUploadedFileRecords(username, fileName, type);

        }
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

    async function updateUploadedFileRecords(fileName, type) {
        let url = "";

        if (editorMode === "online_cloud") {


                url = await fetchUrlByFilenameVM({
                    fullFilename: fileName,
                    bkOption: backendOption //TODO999
                });

                
                                                    console.log("rmWindow -- 1 uploaded url in window: ", url); //TODO test
                if (url === undefined || url === "") {
                                                    console.log("\trmWindow -- Error: empty url"); //TODO test
                    return;
                }


                await addToRmFileListVM({
                    uname: username, 
                    filetitle: fileName, 
                    fileUrl: url, 
                    fileType: type,
                    bkOption: backendOption //TODO999
                });
        
                await fetchRmFileList(username);
        }

    }

    async function updateGoogleDriveFileRecords(type, addedFileName) {

        if (editorMode === "online_cloud") {

            await addToRmFileListVM({
                uname: username, 
                filetitle: addedFileName, 
                fileUrl: googleDriveFileDisplayLink, 
                fileType: type,
                bkOption: backendOption //TODO999
            });
            
            await fetchRmFileList(username);

        }
    }

    async function fetchRmFileList(authUsername) { //TODO temp debugging
        let fileList = {};

        if (editorMode === "online_cloud") {

                fileList = await getRmFileListVM({
                    uname: authUsername,
                    bkOption: backendOption //TODO999
                });
                if (fileList === undefined || fileList === null) {
                    return;
                }

                setCloudFileList(fileList.filename_records);
                const vList = fileList.filename_records.filter((item)=>(item.filetype === "visual"));
                setUsersAllFileListVisual(vList);
                if (visualListFilter !== "allVis") {
                    setVisualListFilteredList(vList);
                }
                const aList = fileList.filename_records.filter((item)=>(item.filetype === "audio"));
                setUsersAllFileListAudio(aList);
                if (audioListFilter !== "allAu") {
                    setAudioListFilteredList(aList);
                }
                                        console.log("rmWindow --raw-rsrc ...gen list = ", cloudFileList); //TODO test

                                        console.log("rmWindow --raw-rsrc vlist = ", vList); //TODO test
                                        console.log("rmWindow --raw-rsrc alist = ", aList); //TODO test

            }
    }

    function changeVisFilter(type) {
        if (type === "all") {
            setVisualListFilteredList(usersAllFileListVisual);
            return;
        }

        let inList = [];
        let notInList = [];

        usersAllFileListVisual.map((item, index) => {
            let i = 0;
            for(; i < visualVarPairs.length; i++) {
                if (visualVarPairs[i]["url"] === item["fileurl"]) {

                    inList.push(item);  
                }
            }
        });

        let j = 0;
        for (; j < usersAllFileListVisual.length; j++) {
            if (!inList.includes(usersAllFileListVisual[j])) {
                notInList.push(usersAllFileListVisual[j]);
            }
        }
  
        // visual: in-this-project = currVis, all-resources = allVis, not-in-this-project = notVis
        if (type === "curr") { // in-this-project
            setVisualListFilteredList(inList); 
                                                console.log("rmWindow -- changeVisFilter: in vis...");//TODO 
        } else if (type === "not") { // not-in-this-project
            setVisualListFilteredList(notInList); 
                                                console.log("rmWindow -- changeVisFilter: not in vis...");//TODO 
        } else if (type !== "all") { // unexpected input
            return;
        }
    }

    function changeAuFilter(type) {
        if (type === "all") {
            setAudioListFilteredList(usersAllFileListAudio);
            return;
        }

        let inList = [];
        let notInList = [];

        usersAllFileListAudio.map((item, index) => {
            let i = 0;
            for(; i < audioVarPairs.length; i++) {
                if (audioVarPairs[i]["url"] === item["fileurl"]) {
                    inList.push(item);  
                }
            }
        });

        let j = 0;
        for (; j < usersAllFileListAudio.length; j++) {
            if (!inList.includes(usersAllFileListAudio[j])) {
                notInList.push(usersAllFileListAudio[j]);
            }
        }

                                                                console.log("rmWindow -- in list: ");//TODO 
                                                                console.log(inList);//TODO 

                                                                console.log("rmWindow -- not in the list: ");//TODO 
                                                                console.log(notInList);//TODO 

        // audio: in-this-project = currAu, all-resources = allAu, not-in-this-project = notAu */
        if (type === "curr") { // in-this-project
            setAudioListFilteredList(inList); 
                                                                    console.log("rmWindow --filter: in au");//TODO 
        } else if (type === "not") { // not-in-this-project
            setAudioListFilteredList(notInList); 
                                                                    console.log("rmWindow --filter: not in au");//TODO 
        } else if (type !== "all") { // unexpected input
            return;
        }
    }

    async function removeOneResource() {
        let userResponse = window.confirm("Are you sure to delete this resource from all projects?");
        if (userResponse) {

            if (editorMode === "online_cloud") {

                await removeFromRmFileListVM({
                    uname: username, 
                    filetitle: clickedFileName,
                    bkOption: backendOption //TODO999
                });
                await fetchRmFileList(username);
            }
            //update resource's var-pair list
            let emptyObj = {};
            storeNewVarPairDataFuncGen("delete", clickedFileUrl, emptyObj, clickedFileType);
            setClickedFileName("");
            setClickedFileType("");
            setClickedFileUrl("");
        }

    }

    function handleSaveToCloud() {
        updateVarPairToCloud_local();

        let temp = {
            "audio": audioVarPairs,
            "visual": visualVarPairs
        }
        triggerRmUpdate(temp);

    }


    return (
      <div className={modalStyleName}>
        <div>

        <div className="modalContent">

 

        <div className="modalArea">


            <div style={{}}>


                <div className="parallelFrame">
                    <button className={isTabVisual ? "buttonClicked tabBarVSelected" : "buttonUnclicked tabBar1"} onClick={()=>{
                                setIsTabVisual(true);
                                setUploadConfirm(false); 
                                setClickedFileUrl("");
                                setClickedFileName("");
                                setClickedFileType("");
                    }}>{visualResourceText}</button>
                    <button className={!isTabVisual ? "buttonClicked tabBarASelected" : "buttonUnclicked tabBar2"} onClick={()=>{
                                setIsTabVisual(false); 
                                setUploadConfirm(false); 
                                setClickedFileUrl("");
                                setClickedFileName("");
                                setClickedFileType("");
                    }}>{audioResourceText}</button>

                    <button className="" 
                        onClick={()=>{
                         
                            handleSaveToCloud();
                         
                        }}
                    >
                            {saveToCloudText}
                    </button>
                    <button className="buttonRight cursor_pointer modalClose" onClick={()=>{
                            if (cloudUpdated === true) { //TODO15 
                                let resp = window.confirm("Are you sure you would like to exit without saving to cloud?");
                                if (!resp) {
                                    return;
                                }
                            }
                            handleRmCancel();
                            setClickedFileUrl("");
                            resetDataUpdatedFalse(); //TODO15 
                        
                        
                        }}>
                        {closeText}
                    </button>
                </div>

                {isTabVisual && 
                <div className="rmTypeAreaV"> 
                <div className="modalContent parallelFrame">
         
                <div className="areaNote1">
                <button className="loadResourceBtn" onClick={fetchRmFileList}> 
                    {loadResourceListText}
                </button>
                
                <br></br>
                <select value={visualListFilter} onChange={(event)=>{
                    setVisualListFilter(event.target.value); 
                    changeVisFilter(event.target.value);}}
                >
                        <option value="curr" key="currVis">{inThisProjectText}</option>
                        <option value="all" key="allVis">{allResourcesText}</option>
                        <option value="not" key="notVis">{notInThisProjectText}</option>
                </select>
                
                {visualListFilteredList.length > 0 && <div className="rsrcListArea">
                    <ul>
                        {visualListFilteredList.map((item, index) => (
                        <li className="clickableListItem6" key={index} onClick={()=>{itemClicked(item);}}>
                            {item["filename"]}</li>
                        ))}
                    </ul>
                </div>}

                <br></br><br></br>
                <label> Add a New Picture: </label> <br></br>
                <div  style={{"textAlign": "left", "padding": "3px"}}>
                
                
                {/* <input 
                    type="radio" 
                    value={isSourceByUpload} 
                    checked={isSourceByUpload} 
                    onChange={()=>{setIsSourceByUpload(true);}}></input> 
                    <label onClick={()=>{setIsSourceByUpload(true);}}>
                        {newFileUploadText}
                    </label>
                     */}
                <br></br>
                {isSourceByUpload && <div className="uploadArea">
                    {uploadConfirm === false && <input 
                        type="file"
                        accept=".png,.jpg,.jpeg,"
                        onChange={(event)=>{setFileSelected(event.target.files[0]);}}
                    />}
                    {uploadConfirm === true && <label>File Chosen: {fileSelected.name}</label>}
                    
                    {uploadConfirm === true && <button 
                        onClick={()=>{
                            setFileSelected(""); 
                            setUploadConfirm(false);
                        }}
                    >{cancelText}</button>}
                    
                    {uploadConfirm === false && <button 
                        onClick={()=>{
                            submitFile("visual", fileSelected); 
                            setUploadConfirm(true);
                        }}
                    > {confirmText} </button>}
                    
                    {uploadConfirm === true && <button 
                        onClick={()=>{
                            submitFile("visual", fileSelected); 
                            setFileSelected(""); 
                            setUploadConfirm(false);
                        }}
                    > {submitText} </button>}
                </div>}
                
                {/* <input type="radio" 
                    value={isSourceByUpload} 
                    checked={!isSourceByUpload} 
                    onChange={()=>{setIsSourceByUpload(false);}}></input>  
                 */}
                    <label 
                        onClick={()=>{setIsSourceByUpload(false);}}>
                        From Google Drive
                    </label>

                {!isSourceByUpload && <div className="uploadArea" style={{"color": "#000000"}}>
                Enter a public sharing link from Google Drive...
                <br></br><label style={{"fontStyle": "italic"}}>Example: https://drive.google.com/file/d/[some characters]/view?usp=sharing</label>
                <br></br>
                    <input value={googleDriveFileSharedLink} onChange={(event)=>{setGoogleDriveFileSharedLink(event.target.value);}}></input>
                    <button onClick={()=>{
                        //parse and extract id, update id-var for this resource
                        let arr = googleDriveFileSharedLink.split("/");
                        let i = 0;
                        for (; i < arr.length; i++) {
                            if (arr[i] == "d" && (i+1) < arr.length) {
                                setGoogleDriveFileId(arr[i+1]);
                                //TODO update the url of this GoogleDrive resource
                                let temp = GoogleDrivePrefix + arr[i+1]
                                setGoogleDriveFileDisplayLink(temp);
                                i = arr.length;
                            }
                        }
                                                                        // console.log("arr: ");//TODO 
                                                                        // console.log(arr);//TODO 
                        
                        setClickedFileName("");
                        setClickedFileType("");
                        setClickedFileUrl("");
                    }}>{previewText}</button>

                    <br></br><button onClick={()=>{
                        updateGoogleDriveFileRecords("visual", googleDriveFileId);
                        setGoogleDriveFileId("");
                        setGoogleDriveFileSharedLink("");
                    }}>{addText}</button>
                </div>}
                </div>

                </div>

{/* visual resource-previewing area */}

                <div className="areaBlue" style={{}}>
                    {clickedFileUrl !== "" && 
                        <PicturePreview className="paddings" 
                            urlList={visualListFilteredList} 
                            selectedUrl={clickedFileUrl} 
                            removeFileFromAll={removeOneResource}/>}
                    {clickedFileUrl !== "" && 
                        <ItemVarPairManage className="paddings" 
                            varPairInfo={visualVarPairs} 
                            selectedUrl={clickedFileUrl} 
                            storeNewVarPairDataFunction={storeNewVarPairDataFuncGen} 
                            fileType="visual" 
                            saveToCloudFunc={updateVarPairToCloud_local}
                        />}
                
                    {(googleDriveFileId !== "" && clickedFileUrl === "") && <img 
                        className="picResource" 
                        src= {GoogleDrivePrefix+googleDriveFileId}
                        alt="GoogleDriveResourcePreview"
                    />}

                </div>


                </div>
                </div>}

                {!isTabVisual && 
                <div className="rmTypeAreaA"> 
                <div className="modalContent parallelFrame">
{/* audio resource-selecting area */}
            
                <div className="areaNote2">
                    <button className="loadResourceBtn" onClick={fetchRmFileList}> 
                        {loadResourceListText}
                    </button>
                    
                    <br></br>
                    <select value={audioListFilter} onChange={(event)=>{setAudioListFilter(event.target.value); changeAuFilter(event.target.value);}}>
                            <option value="curr" key="currAu">{inThisProjectText}</option>
                            <option value="all" key="allAu">{allResourcesText}</option>
                            <option value="not" key="notAu">{notInThisProjectText}</option>
                    </select>
                
                    {audioListFilteredList.length > 0&& <div className="rsrcListArea">
                        <ul>
                            {audioListFilteredList.map((item, index) => (
                            <li className="clickableListItem6" key={index} onClick={()=>{
                                                                console.log("rmWindow --list clicked.", cloudFileList[index]["filename"]); //TODO 
                                itemClicked(item);
                            
                            }}>{item["filename"]}</li>
                            ))}
                        </ul>
                    </div>
                    }
                    {/* <div className="uploadArea"> {newFileUploadText} <br></br>
                        {uploadConfirm === false &&  
                        <input 
                            type="file"
                            accept=".wav,.mp3,.aac,.m4a"
                            onChange={(event)=>{setFileSelected(event.target.files[0]);}}
                            /> }
                        {uploadConfirm === true && <label>File Chosen: {fileSelected.name}</label>}
                        {uploadConfirm === true && <button onClick={()=>{setFileSelected(""); setUploadConfirm(false);}}>{cancelText}</button>}
                        {uploadConfirm === false && <button onClick={()=>{submitFile("audio", fileSelected); setUploadConfirm(true);}}>{confirmText}</button>}
                        {uploadConfirm === true && <button onClick={()=>{submitFile("audio", fileSelected); setFileSelected(""); setUploadConfirm(false);}}>{submitText}</button>}
                    </div> */}

                </div>
                

{/* audio resource-previewing area */}
                <div className="areaBlue" style={{}}>
                    {clickedFileUrl !== "" && <AudioPreview className="paddings" urlList={audioListFilteredList} selectedUrl={clickedFileUrl}/>}
                    {clickedFileUrl !== "" && <ItemVarPairManage className="paddings" varPairInfo={audioVarPairs} selectedUrl={clickedFileUrl} storeNewVarPairDataFunction={storeNewVarPairDataFuncGen} fileType="audio" saveToCloudFunc={updateVarPairToCloud_local}/>}
                </div>

                </div>


                </div>}
          
     
            </div>
            </div>

       
        </div>
      </div>
      </div>
    );
  };