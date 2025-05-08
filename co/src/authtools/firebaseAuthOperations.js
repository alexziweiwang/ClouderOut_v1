import { auth } from '../GoogleCloudConnections';
import { onAuthStateChanged } from "firebase/auth";

export function getAuthFirebase() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
       
            const uid = user.uid;
            const email = user.email;

                            console.log("firebase-auth-getter ... uid = ", uid, "\n",user.email);
          
            return email
        } else {

          return "_";
        }

    });


}
