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

    function fileSelectChange(event) {
        setFileSelected(event.target.files[0]);
    }

    function submitFile() {
        if (fileSelected === "") {
            console.log("File NOT chosen");
            return;
        }
        const url = submitFileVM({file: fileSelected , uname: username});
        const fileName = `${username}_${fileSelected.name}`;
        addToRmFileListVM({uname: username, filetitle: fileName, fileUrl: url});
        fetchRmFileList();
    }

    async function fetchRmFileList() {
        const fileList = await getRmFileListVM({uname: username});
        setCloudFileList(fileList);
        console.log("modalwindow: fileList:"); //TODO test
        console.log(fileList); //TODO test


        // const url = await fetchUrlByFilenameVM({fullFilename: "user002_test_img.jpeg"});
        // console.log("sample, user002_test_img.jpeg = ", url); //TODO test


    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

            <div className="modalContent parallelFrame">
                
           


        <div>

                <div>
                    <button className={isTabVisual ? "buttonClicked tabBarSelected" : "buttonUnclicked tabBar"} onClick={()=>{setIsTabVisual(true);}}>Tab Visual</button>
                    <button className={!isTabVisual ? "buttonClicked tabBarSelected" : "buttonUnclicked tabBar"} onClick={()=>{setIsTabVisual(false);}}>Tab Audio</button>
                </div>
                {isTabVisual && <div className="rmTypeArea"> 
                <div className="modalContent parallelFrame">
                    visual area
                <div className="areaOrange">
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <br></br><br></br>
        
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]);}}>{item}</li>
                    ))}
                </ul>
                </div>
                
                <div className="areaBlue">
                    <input 
                        type="file"
                        onChange={fileSelectChange}
                    /> 
                    <button onClick={submitFile}> Submit </button>
                </div>





                </div>

                </div>}

                {!isTabVisual && <div className="rmTypeArea"> 
                <div className="modalContent parallelFrame">
                audio area
                <div className="areaOrange">
                <button onClick={fetchRmFileList}> Load Resource List </button>
                <br></br><br></br>
        
                <ul>
                    {cloudFileList.map((item, index) => (
                        <li className="clickableListItem" key={index} onClick={()=>{console.log("list clicked.", cloudFileList[index]);}}>{item}</li>
                    ))}
                </ul>
                </div>
                
                <div className="areaBlue">
                    <input 
                        type="file"
                        onChange={fileSelectChange}
                    /> 
                    <button onClick={submitFile}> Submit </button>
                </div>





                </div>


                </div>}
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



            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Close </button>
            </div>
        </div>
      </div>
    );
  };