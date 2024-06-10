import db from '../GoogleCloudConnetions';
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
 import { storage } from '../GoogleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where, updateDoc, deleteField  } from "firebase/firestore"; 


/*
List of functions:

submitFile({file, uname, filename}) //upload a file
getRmFileList({uname}) // get rm list in db (not in storage)
addToRmFileList({uname, filetitle, fileUrl, fileType}) // add tp rm list in db (not in storage)
fetchUrlByFilename({fullFilename}) // fetch url by filename, in storage
fetchProjectResourceVarPairs({userName, projectName}) // fetch var-pair lists
storeProjectResourceVarPairsToCloud({userName, projectName, obj}) // update car-pair lists


*/


/**
 * Upload a file to storage
 * 
 * @param {*} file file
 * @param {*} uname usernamae
 * @param {*} filename filename
 * @returns void
 */
export async function submitFile({file, uname, filename}) {
    console.log("step2.RM model submitFile ...", filename); //TODO test
    if (filename === "" || filename === undefined) {
      console.log("returned");//TODO test

      return;
    } else {
      const storageRef = ref(storage, `rm001test/${filename}`);

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
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    const q = query(collection(docRef, "projects"), where("type", "==", "rm"));
    const querySnapshot = await getDocs(q);
    let dataContentData;
    querySnapshot.forEach((doc) => {
        dataContentData = doc.data(); 
    });    
    return dataContentData;
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

    const ref = doc(db, "user_projects", uname, "projects", "resource_manager");
    let currFileData = await getDoc(ref, "fileRecord");
    let currFileList = currFileData.data().filenames;
    const obj = {"filename": filetitle, "fileurl": fileUrl, "filetype": fileType};

    const duplicatePart = currFileList.filter(item => item.filename === filetitle && item.fileurl === fileUrl);
    
    if (duplicatePart.length === 0) {
      currFileList.push(obj);
    }

    console.log("update file list:", currFileList);//TODO test
    await updateDoc(ref, {filenames: currFileList});
}

export async function removeFromRmFileList({uname, filetitle}) { // in database
  // in user -> projects -> resource_manager -> filenames
  const ref = doc(db, "user_projects", uname, "projects", "resource_manager");
  let currFileData = await getDoc(ref, "fileRecord");
  let currFileList = currFileData.data().filenames;

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
  console.log("model-fetchUrlByFilename(): ", fullFilename); //TODO test
  const storageG = getStorage();
  const dir = "/rm001test/";
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

  const ref = doc(db, "user_projects", userName, "projects", projectName);
  let visualListSnap = await getDoc(ref, "proj_resource_visual");
  //TODO validate visualListSnap
  let visualList = visualListSnap.data();
  visualList = visualList["proj_resource_visual"];
  let audioListSnap = await getDoc(ref, "proj_resource_audio");
  //TODO validate audioListSnap

  let audioList = audioListSnap.data();
  audioList = audioList["proj_resource_audio"];

  const obj = {audio: audioList, visual: visualList};
                      //console.log("rm-model, fetchProjectResourceVarPairs: ", obj); //TODO test

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

          console.log("model - storeProjectResourceVarPairsToCloud()");
          console.log(userName);
          console.log(projectName);
          console.log(obj);
  
  const projectRef = doc(db, "user_projects", userName, "projects", projectName);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return;
  }

  console.log("VM - before updating to cloud db: ", obj); //TODO test
  
  await updateDoc(projectRef, {
    "proj_resource_audio": obj.audio,
  });

  await updateDoc(projectRef, {
    "proj_resource_visual": obj.visual
  });

}

export async function deleteUploadedFile({username, filename}) {
  // for direct-uploaded file
  // in both storage and db, delete the specified file or file-record

  await removeFromRmFileList();

}
