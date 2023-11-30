import { useState, useEffect } from "react";
import { getRmFileListVM, fetchUrlByFilenameVM } from '../viewmodels/ResourceManagerViewModel';

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

    async function fetchRmFileList() {
        let fileList = await getRmFileListVM({uname: username});
        fileList = fileList.filenames;
        setCloudFileList(fileList);
        const audioList = fileList.filter((item) => (item.filetype == "audio"));
        setAudioList(audioList);
        const visualList = fileList.filter((item) => (item.filetype == "visual"));
        setVisualList(visualList);
        console.log("curr gen list:", fileList); //TODO test
    }

    function confirmResource() {
        console.log("choosing this resource...", clickedFileName);
    }

    async function audioItemClicked(index) {
        if (clickedFileName == audioList[index]["filename"]) { /* reset */
            console.log("repeat"); //TODO test
            setClickedFileUrl("");
            setClickedFileName("");
            setClickedFileType("");
            return;
        }
        setClickedFileUrl(audioList[index]["fileurl"]);
        setClickedFileName(audioList[index]["filename"]);
        setClickedFileType("audio");
    }

    async function visualItemClicked(index) {
        if (clickedFileName == visualList[index]["filename"]) { /* reset */
            console.log("repeat"); //TODO test
            setClickedFileUrl("");
            setClickedFileName("");
            setClickedFileType("");
            return;
        }
        setClickedFileUrl(visualList[index]["fileurl"]);
        setClickedFileName(visualList[index]["filename"]);
        setClickedFileType("visual");
    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea2">

            <div className="modalContent scrollableArea">
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <br></br><br></br>
                <div className="parallelFrame"> 
                <div className="rsrcListArea">
                <label>Visual Resource</label>
                <ul>
                    {visualList.map((item, index) => (
                        <li key={index} className={clickedFileName === item["filename"] ? "tableItemSelected" :  "tableItem"} onClick={() => {
                            visualItemClicked(index);
                        }}>{item["filename"]}</li>
                    ))}
                </ul>
                <br></br>
                <label>Audio Resource</label>
                <ul>
                    {audioList.map((item, index) => (
                        <li key={index} className={clickedFileName === item["filename"] ? "tableItemSelected" :  "tableItem"} onClick={() => {
                            audioItemClicked(index);
                        }}>{item["filename"]}</li>
                    ))}
                </ul>


                </div>
                <div className="rsrcPrevArea">
                    {(clickedFileType == "audio") && 
                        <div>audio resource area</div>
                    }
                    {(clickedFileType == "visual") && 
                        <div>visual resource area</div>
                    }                    
                    
                </div>
                
                </div>

                <p className="plans">For loaded list: consider option of prewviewing this resource? (the same with ResourceManagingModalWindow)</p>

                <p className="plans">
                    Here it shouldn't display resource from cloud storage *directly* -- but just the list from naming pair (see resource manager)
                        <br></br> idea: 
                        <br></br>section1: adding resource-link (from resource pool) for project-wise naming and actual resource url
                        <br></br> (*** db consideration: this link is in range of the entire proejct, thus consider to put it at the project-layer in database)
                        <br></br> (data structure: [k, v]: [resource-name, url] -- an array of all of these pairs)
                        <br></br> when creating these link-pairs, the urls are fetched, and stored as value of the pair
                        <br></br> TODO: consider the assigning of fetched url to variable by UI operations
                        <br></br>
                </p>
                <div>
                    <button>Add New Pair</button>
                <p className="plans">
                        <br></br>section2: selecting resource name for *this field* ...
                        <br></br> uesr-flow: defualt panel shows resource-naming selection, and "add new" is at the corner for newly added resource-link, then the main panel get refreshed with the new resource-linking
                        <br></br>[note: there is no limitaiton on multiple names pointing to the same resource, because it is flexible for later change and adjustment]

                        <br></br> Idea: resource preview should be separate?
                        <br></br> visual (pictures) and audio (bgm/sound effect/voiceline) preview in different sections
                        <br></br> TODO: think about separation trategy
                        <br></br> such as containing a tag(visual or audio), etc.?
                </p>
                </div>

                <p className="plans">
                    for each project, specify the user-given-name for one resource, for modularization and reusability.
                    <br></br> for example, character1 might have pic ver.1 in some art style, and if the author wants to change to ver.2 style, they can do this once by "changing source" for the user-specified preveiewArea
                    <br></br> that is, each resource on cloud storage should have a variable name in this project, and later this name can be reassigned to other resource
                </p>

                <p className="plans">
                        TODO: for resource-selection, specific for each project
                        <br></br> (list all naming pairs)
                        <br></br>
                        <br></br> create a naming pair
                        <br></br> edit a naming pair
                        <br></br> delete a naming pair
                        <br></br>
                        <br></br> This would be done in resource selector?

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