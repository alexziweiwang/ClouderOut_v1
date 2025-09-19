import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { storage } from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, collection, query, where, updateDoc, deleteField  } from "firebase/firestore"; 


/*
List of functions:

submitFile({file, uname, filename}) //upload a file
getRmFileList({uname}) // get rm list in db (not in storage)
addToRmFileList({uname, filetitle, fileUrl, fileType}) // add tp rm list in db (not in storage)
fetchUrlByFilename({fullFilename}) // fetch url by filename, in storage
storeProjectResourceVarPairsToCloud({userName, projectName, obj}) // update car-pair lists

*/

const dir = "/rm001test/";


/**
 * Upload a file to storage
 * 
 * @param {*} file file
 * @param {*} uname usernamae
 * @param {*} filename filename
 * @returns void
 */
export async function uploadFileToCloud({file, uname, filename}) {
    console.log("step2.RM model submitFile ...", filename); //TODO test
    if (filename === "" || filename === undefined) {

                                    console.log("returned");//TODO test

      return;
    } else {
      let filepath = dir + filename;

      const storageRef = ref(storage, filepath);
//TODO900
//TODO3000 change to formal storage path later!!!


      uploadBytes(storageRef, file);

                                    console.log("file upload complete."); //TODO test

    }
}

/**
 * Fetch list of uploaded files in resource-manager (in database)
 * 
 * @param {*} uname username
 * @returns list of uploaded files
 */
export async function getRmFileList({uname}) {
    
//TODO10 test later

    const docRef = doc(db, "user_projects", uname); //new
    if (docRef === undefined) {
      window.alert("docRef does not exist."); //TODO
    }
  
    const docItem = await getDoc(docRef, "filename_records");

    console.log("getRmFileList returning:", docItem.data());
    return docItem.data();


}




/**
 * Add file name to resource-manager file-list (in database)
 * 
 * @param {*} uname username
 * @param {*} filetitle file name title
 * @param {*} fileUrl file url
 * @param {*} fileType file type
 * @returns void
 */
export async function addToRmFileList({uname, filetitle, fileUrl, fileType}) {


const ref = doc(db, "user_projects", uname); //new

let currFileData = await getDoc(ref, "filename_records"); //new

    
    
    let currFileList = currFileData.data().filename_records;
    const obj = {"filename": filetitle, "fileurl": fileUrl, "filetype": fileType};

    const duplicatePart = currFileList.filter(item => item.filename === filetitle && item.fileurl === fileUrl);
    
    if (duplicatePart.length === 0) {
      currFileList.push(obj);
    }

                                        console.log("update file list:", currFileList);//TODO test


    await updateDoc(ref, {filename_records: currFileList});
}

export async function removeFromRmFileList({uname, filetitle}) { // in database
//TODO10 test later


  const ref = doc(db, "user_projects", uname); //new

  //     let currFileData = await getDoc(ref, "fileRecord");
  let currFileData = await getDoc(ref, "filename_records"); //new



  let currFileList = currFileData.data().filename_records;

  // remove the given filename from the list

  const otherPart = currFileList.filter(item => item.filename !== filetitle);

  await updateDoc(ref, {filenames: otherPart});
}




/**
 * Fetch download url of a uploaded file by filename (from storage)
 * 
 * @param {*} fullFilename file name
 * @returns file url
 */
export async function fetchUrlByFilename({fullFilename}) {


                                  console.log("model-fetchUrl By Filename(): ", fullFilename); //TODO test
  

  const storageG = getStorage();

  const filePath = dir + fullFilename;
  const fileRef = ref(storageG, filePath);

  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
                                  console.log("Error:", error);
    });
}

/**
 * Get specific proejct's resource-pair data (in database)
 * 
 * @param {*} userName username
 * @param {*} projectName project name
 * @returns resource-pair data
 */
export async function fetchProjectResourceVarPairs({userName, projectName}) {
  /* fetch lists of project-resource pairs, by given user-name and project-name */
  if (userName === undefined || projectName === undefined) {
    return;
  }

  const ref = doc(db, "user_projects", userName, "projects", projectName);
  
  if (ref === undefined) {
    return;
  }


  let dataObj = await getDoc(ref);

  const obj = {
    "audio": dataObj.data().proj_resource_audio,
    "visual": dataObj.data().proj_resource_visual,
  }


  // const obj = {audio: audioList, visual: visualList};

                       console.log("~~~~~~~ rm-model, fetchProjectResourceVarPairs: ", obj); //TODO test

  return obj;
}

/**
 * Update specific project's resource-pair data (in database)
 * 
 * @param {*} userName username
 * @param {*} projectName project name
 * @param {*} obj resource pair data object
 * @returns void
 */
export async function storeProjectResourceVarPairsToCloud({userName, projectName, obj}) {
//!important, do not remove this function now
                                    console.log("model - storeProjectResourceVarPairsToCloud()");
                                    console.log("userName: ", userName);
                                    console.log("projectName:", projectName);
                                    console.log("obj:", obj);
                            
  const projectRef = doc(db, "user_projects", userName, "projects", projectName);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return;
  }

                                    console.log("model - before updating to cloud db: ", obj); //TODO test
  
  let objContent = obj["obj"];

  await updateDoc(projectRef, {
    "proj_resource_audio": objContent.audio,
    "proj_resource_visual": objContent.visual
  }); 


  //improved
  
                                                  // await updateDoc(projectRef, {
                                                  //   "proj_resource_audio": objContent.audio,
                                                  // });

                                                  // await updateDoc(projectRef, {
                                                  //   "proj_resource_visual": objContent.visual
                                                  // });

}

