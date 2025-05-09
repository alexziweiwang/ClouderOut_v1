import { auth } from '../GoogleCloudConnections';
import { onAuthStateChanged } from "firebase/auth";

export function getAuthFirebase({goToNotLoggedInPageFunc}) {

    onAuthStateChanged(auth, (user) => {
        if (user) {
       
            const uid = user.uid;
            const email = user.email;

                            console.log("firebase-auth-getter ... uid = ", uid, "\n",user.email);
          
            return email;
        } else {
console.log("not loggedin");
              goToNotLoggedInPageFunc();
              return "_";
        }

    });


}
