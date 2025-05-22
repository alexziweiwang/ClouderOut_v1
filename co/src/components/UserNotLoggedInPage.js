
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { userSignUpVM, userLogInVM, userLogOutVM } from '../viewmodels/_UserFirebaseAuthViewModel';

//TODO1090 cloud-db related
import { addNewAccountFolderVM } from '../viewmodels/ProjectManagerViewModel';

import { getAuthFirebase, convertEmailAddr } from '../authtools/firebaseAuthOperations';


export default function UserNotLoggedInPage() {
    const backendOption = "firebase";

    
//sign up or log in here...
    const [isCreateAccountPanel, setIsCreateAccountPanel] = useState(false);

    const [providedUsernameInput, setProvidedUsernameInput] = useState("");
    const [providedPasswordInput, setProvidedPasswordInput] = useState("");
    const [providedEmailInput, setProvidedEmailInput] = useState("");

    const [signUpErrorStr, setSignUpErrorStr] = useState("");

    const navigate = useNavigate();

    
    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            userLogOutVM();
            setFirstTimeEnter(false);
        }

        getAuthFirebase(
            {
              goToNotLoggedInPageFunc: notUsing,
              sendOutEmailName: setAuthEmailName
    
            }
        );
        console.log("not-logged-in-page --\t\tauthEmamilName", authEmailName);
    
    });

    function notUsing() {
        return;
    }

    async function newUserSignUp() {

        await userSignUpVM(
                {
                    email: providedEmailInput, 
                    password: providedPasswordInput,
                    setFunc: setSignUpErrorStr,
                    succInfoFunc: signUpSuccActions
                }   
        );

        
        
        let userIdTemp = convertEmailAddr(providedEmailInput);


        await addNewAccountFolderVM({
            userId: userIdTemp, 
            username: providedUsernameInput,
            bkOption: backendOption
        });
   


    }

    function resetAllInputs() {
        setProvidedUsernameInput("");
        setProvidedPasswordInput("");
        setProvidedEmailInput("");
        setSignUpErrorStr("");
    }

    function signUpSuccActions() {
        resetAllInputs();
        setIsCreateAccountPanel(false);

        alert("Account created!");
    }

    async function existingUserLogIn() {

        //TODO 
        await userLogInVM({
            email: providedEmailInput, 
            password: providedPasswordInput,
            loggedInFunc: loggedInActions
        });
        //username for login

        //if login successful
        //goToUserDashboard(username)
    }

    function loggedInActions(username) {


        goToUserDashboard(username);
    }

    function goToUserDashboard(username) {


        //only if login successful
        navigate('/dashboard', { replace: true, state: { username } }); //

    }

    function switchPanel() {
        setIsCreateAccountPanel(!isCreateAccountPanel);
        userLogOutVM();
    }


    return (
        <div>


            {isCreateAccountPanel === true && <div>
                Sign Up
                <div           
                    style={{
                        "marginTop": "5%",
                        "marginLeft": "30%", 
                    }}
                >
                    <table
                    className="noBorder"
                    >
                        <tbody>
                        <tr>
                            <td className="noBorder" style={{"width": "200px"}}>
                                <label>email: </label>
                            </td>
                            <td className="noBorder" style={{"width": "205px"}}>
                                <input
                                    style={{"width": "200px"}}
                                    onChange={(event)=>{setProvidedEmailInput(event.target.value);}}
                                ></input>
                            </td>
                            <td className="noBorder" 
                                style={{"width": "500px", "color": "red"}}>
                                {signUpErrorStr === "Email already in use." 
                                &&
                                <label>{signUpErrorStr}</label>}
                            </td>
                        </tr>

                        <tr>
                            <td className="noBorder" style={{"width": "205px"}}>
                                <label>password: </label>
                            </td>
                            <td className="noBorder" style={{"width": "200px"}}>
                                <input 
                                    style={{"width": "200px"}}
                                    type="password"
                                    onChange={(event)=>{setProvidedPasswordInput(event.target.value);}}
                                ></input>
                            </td>
                            <td className="noBorder" style={{"width": "500px"}}>
                                
                                <label 
                                style=
                                {{
                                    "color": (signUpErrorStr === "Password should be at least 6 characters." 
                                    ?  "red" 
                                    : "#000000")
                                }}
                                >
                                Password should be at least 6 characters.
                                </label>
                                
                            </td>
                        </tr>
                  

                        </tbody>
                    </table>
                    
                    

                

                    <button
                        onClick={()=>{
                            newUserSignUp();
                        }}
                    >create user</button>

                    <br></br><br></br>
                    <label 
                        className="clickableLink"
                        onClick={()=>{switchPanel();}}
                    >
                        Have an account? Log in!
                    </label>

                </div>
            </div>}

            {isCreateAccountPanel === false && 
            <div>
                Log In
                <div
                    style={{
                        "marginTop": "5%",
                        "marginLeft": "30%", 
                    }}
                >
                <table
                    className="noBorder"
                    >

                    <tbody>
                        <tr>
                            <td className="noBorder">
                                <label>email: </label>
                            </td>
                            <td className="noBorder">
                                <input
                                    onChange={(event)=>{setProvidedEmailInput(event.target.value);}}
                                ></input>
                            </td>
                        </tr>

                        <tr>
                            <td className="noBorder">
                                <label>password: </label>
                            </td>
                            <td className="noBorder">
                                <input 
                                    type="password"
                                    onChange={(event)=>{setProvidedPasswordInput(event.target.value);}}
                                ></input>
                            </td>
                        </tr>

                        </tbody>
                    </table>

                    <button
                        onClick={()=>{
                            existingUserLogIn();
                        }}
                    >log in</button>

                    

                    <br></br><br></br>
                    <label 
                        className="clickableLink"
                        onClick={()=>{switchPanel();}}
                    >
                        New user? Create an account!
                    </label>

                </div>

            </div>}
        </div>
    )

}
