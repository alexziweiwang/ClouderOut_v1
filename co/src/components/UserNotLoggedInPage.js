import { userSignUpVM, userLogInVM } from '../viewmodels/AccountViewModel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function UserNotLoggedInPage() {
//sign up or log in here...
    const [isCreateAccountPanel, setIsCreateAccountPanel] = useState(false);

    const [providedUsernameInput, setProvidedUsernameInput] = useState("");
    const [providedPasswordInput, setProvidedPasswordInput] = useState("");
    const [providedEmailInput, setProvidedEmailInput] = useState("");

    const navigate = useNavigate();

    async function newUserSignUp() {
        //TODO 
        await userSignUpVM(
            {
                email: providedEmailInput, 
                password: providedPasswordInput
            }   
        );

    }

    async function existingUserLogIn() {

        //TODO 
        await userLogInVM({
            email: providedEmailInput, 
            password: providedPasswordInput
        });
        //username for login

        //if login successful
        //goToUserDashboard(username)
    }

    function goToUserDashboard(username) {
        //only if login successful
        navigate('/dashboard', { replace: true, state: { username } }); //

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
                        
                        <tr>
                            <td className="noBorder">
                                <label>username: </label>
                            </td>
                            <td className="noBorder">
                                <input
                                    onChange={(event)=>{setProvidedUsernameInput(event.target.value);}}
                                ></input>
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
                        onClick={()=>{setIsCreateAccountPanel(false);}}
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
                        onClick={()=>{setIsCreateAccountPanel(true);}}
                    >
                        New user? Create an account!
                    </label>

                </div>

            </div>}
        </div>
    )

}
