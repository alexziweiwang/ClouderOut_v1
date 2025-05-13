import { auth } from '../GoogleCloudConnections';
import { onAuthStateChanged } from "firebase/auth";

export function getAuthFirebase({goToNotLoggedInPageFunc, sendOutEmailName}) {

    onAuthStateChanged(auth, (user) => {
        if (user) {
       
            const uid = user.uid;
            const email = user.email;

//TODO2000 convert raw-email to email-string here?

            sendOutEmailName(email);


      //                      console.log("firebase-auth-getter ... uid = ", uid, "\n",user.email);
            return email;
        } else {

                                                              console.log("not loggedin");


              goToNotLoggedInPageFunc();
              return "_";
        }

    });


}


export function convertEmailAddr(emailStr) {
    let str = emailStr.replace("@", "_");
    str = str.replace(/\./g, "_");

    return str;
}