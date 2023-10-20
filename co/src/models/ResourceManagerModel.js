import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../googleCloudConnetions';


export function submitFile({file, uname}) {
    console.log("RM model ..."); //TODO

    const fileName = `${uname}_${file.name}`;
    const fileRef = ref(storage, `rm001test/${fileName}`);
    uploadBytes(fileRef, file);
    console.log("document [", fileName, "] submitted."); //TODO test
}