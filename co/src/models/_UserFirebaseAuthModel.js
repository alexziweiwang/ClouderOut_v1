import  { auth } from '../GoogleCloudConnections'; //TODO23 database
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


//user's account
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
  
  //user's account
  
  export async function userLogIn({email, password, loggedInFunc}) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
                                              //TODO1000 test
      console.log("logged in user: ", user.email);
  
      loggedInFunc(user.email);
  
  
    })
    .catch((error) => {
      const errorCode = error.code;
  
      return errorCode;
    });
  
    return 0;
  
  }
  
  //user's account
  
  export async function userLogOut() {
    signOut(auth).then(() => {
  
                    console.log("user log out action confirmed!");
  
  
      return "logged out.";
    }).catch((error) => {
      let msg = "log-out error: " + error;
      return msg;
    });
  
  
  }