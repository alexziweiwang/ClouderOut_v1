import  { db, auth } from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

/**
 * Get project data by username.
 * 
 * @param {*} uname username
 * @returns fetched profiled data
 */
export async function getProjectInfo({uname}) {
    // fetch account information according to provided username
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    let profile = [];
    if (!docSnap.exists()) {
      return;
    }
    profile = docSnap.data();
    return profile;

}

export async function getUserDefaultUILang({uname}) {
  const docRef = doc(db, "user_projects", uname);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }
  let profile = docSnap.data();
  if (profile === undefined) {
    return "";
  } else {
    return profile.default_ui_language;
  }

}

export async function updateUserDefaultUILang({uname, newUILang}) {
  const docRef = doc(db, "user_projects", uname);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  await updateDoc(docSnap, {default_ui_language: newUILang});


}

export async function userSignUp({email, password, setFunc, succInfoFunc}) {
  let errorCode = "ok";
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

                                        //TODO1000 test
                                        console.log("user created successfully!!    ", user.email);

    setFunc("");  
    succInfoFunc();                                  
    return "ok";
  })
  .catch((error) => {
    errorCode = error.code;
                          console.log("sign up error: [", errorCode, "]\n", typeof(errorCode));
    if (errorCode.includes("weak-password")) {
      setFunc("Password should be at least 6 characters.");
    } else if (errorCode.includes("email-already-in-use")) {
      setFunc("Email already in use.");
    } 
  });
}

export async function userLogIn({email, password}) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
                                            //TODO1000 test
    console.log("logged in user: ", user.email);
  })
  .catch((error) => {
    const errorCode = error.code;

    return errorCode;
  });

  return 0;

}