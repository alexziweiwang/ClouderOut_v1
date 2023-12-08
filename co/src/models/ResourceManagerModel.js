import db from '../googleCloudConnetions';
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { storage } from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore"; 

export async function submitFile({file, uname, filename}) {
    console.log("step2.RM model submitFile ...", filename); //TODO test
    if (filename === "" || filename === undefined) {
      console.log("returned");//TODO test
      return;
    } else {
      const fileRef = ref(storage, `rm001test/${file}`);
    
      uploadBytes(fileRef, file);
      console.log("file upload complete."); //TODO test
    }
}

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

export async function addToRmFileList({uname, filetitle, fileUrl, fileType}) {
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    /* add filename to resource-manage file-list */
    /* data structure: map <k, v> is <filetitle, fileUrl> */
    const ref = doc(docRef, "projects", "resource_manager");
    let currFileData = await getDoc(ref, "fileRecord");
    let currFileList = currFileData.data().filenames;
    const obj = {"filename": filetitle, "fileurl": fileUrl, "filetype": fileType};

    const duplicatePart = currFileList.filter(item => item.filename === filetitle && item.fileurl === fileUrl);
    
    if (duplicatePart.length === 0) {
      currFileList.push(obj);
    }
    await updateDoc(ref, {filenames: currFileList});
}

export async function fetchUrlByFilename({fullFilename}) {
  console.log("fetchUrlByFilename(): ", fullFilename); //TODO test
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

export async function fetchProjectResourcePairs({userName, projectName}) {
  /* fetch lists of project-resource pairs, by given user-name and project-name */

  const docRef = doc(db, "user_projects", userName);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const ref = doc(docRef, "projects", projectName);
  let visualList = await getDoc(ref, "proj_resource_visual");
  visualList = visualList.data();
  let audioList = await getDoc(ref, "proj_resource_audio");
  audioList = audioList.data();

  const obj = {audio: audioList, visual: visualList};

  return obj;
}

export async function updateProjectResourcePairs({userName, projectName, obj}) {
  const docRef = doc(db, "user_projects", userName);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const projectRef = doc(docRef, "projects", projectName);

  await updateDoc(projectRef, {
    "proj_resource_audio": obj.audio,
    "proj_resource_visual": obj.visual
  });

}