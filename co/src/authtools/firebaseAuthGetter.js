import { auth } from '../GoogleCloudConnections';
import { onAuthStateChanged } from "firebase/auth";

export function getAuthFirebase() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
       
            const uid = user.uid;


                            console.log("firebase-auth-getter ... uid = ", uid, "\n",user.email);
          
        
        } else {
          return "not-logged-in";
        }
      });


}