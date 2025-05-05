import { userSignUpVM, userLogInVM } from '../viewmodels/AccountViewModel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function UserNotLoggedInPage() {
//sign up or log in here...
    const [isCreateAccountPanel, setIsCreateAccountPanel] = useState(false);

    const [providedUsernameInput, setProvidedUserNameInput] = useState("");

    const navigate = useNavigate();

    async function newUserSignUp() {
        //TODO await userSignUpVM({email, password})
    }

    async function existingUserLogIn() {

        //TODO await userLogInVM({email, password})
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
                        <tr>
                            <td className="noBorder">
                                <label>email: </label>
                            </td>
                            <td className="noBorder">
                                <input></input>
                            </td>
                        </tr>

                        <tr>
                            <td className="noBorder">
                                <label>password: </label>
                            </td>
                            <td className="noBorder">
                                <input></input>
                            </td>
                        </tr>
                    </table>
                    
                    

                

                    <button
                        onClick={()=>{
                            //TODO
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
                        <tr>
                            <td className="noBorder">
                                <label>email: </label>
                            </td>
                            <td className="noBorder">
                                <input></input>
                            </td>
                        </tr>

                        <tr>
                            <td className="noBorder">
                                <label>password: </label>
                            </td>
                            <td className="noBorder">
                                <input></input>
                            </td>
                        </tr>
                    </table>

                    <button
                        onClick={()=>{
                            //TODO
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
