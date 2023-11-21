import db from '../googleCloudConnetions';
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { storage } from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"; 

export function submitFile({file, uname}) {
    console.log("RM model ..."); //TODO

    const fileName = `${uname}_${file.name}`;
    const fileRef = ref(storage, `rm001test/${fileName}`);
    uploadBytes(fileRef, file);
    console.log("document [", fileName, "] submitted."); //TODO test
    return fileRef;
}

export async function getRmFileList({uname}) {
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    const q = query(collection(docRef, "projects"), where("type", "==", "rm"));
    const querySnapshot = await getDocs(q);
    let dataContent;
    querySnapshot.forEach((doc) => {
        dataContent = doc.data().filenames; 
    });    
    return dataContent;
}

export async function addToRmFileList({uname, filetitle, fileUrl}) {
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }


    //TODO add filename to resource-manage file-list
    //TODO data structure: map <k, v> is <filetitle, fileUrl>

}

export async function fetchUrlByFilename({fullFilename}) {
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
