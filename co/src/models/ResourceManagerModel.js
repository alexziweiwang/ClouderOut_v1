import db from '../googleCloudConnetions';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"; 

export function submitFile({file, uname}) {
    console.log("RM model ..."); //TODO

    const fileName = `${uname}_${file.name}`;
    const fileRef = ref(storage, `rm001test/${fileName}`);
    uploadBytes(fileRef, file);
    console.log("document [", fileName, "] submitted."); //TODO test

}

export async function getRmFileList({uname}) {
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    const q = query(collection(docRef, "projects"), where("type", "==", "rm"));
    const querySnapshot = await getDocs(q);
  
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " ===> ", doc.data()); //TODO test
        let dataContent = doc.data().filenames;
        console.log(dataContent); //TODO test
    });


}
