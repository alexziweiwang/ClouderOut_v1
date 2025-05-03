import { userSignUpVM, userLogInVM } from '../viewmodels/AccountViewModel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function UserNotLoggedInPage() {
//sign up or log in here...

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

            <div>
                Sign Up
                <div>
                    <label>email: </label>
                    <input
                    
                    ></input>

                    <label>password: </label>
                    <input
                    ></input>

                    <button
                        onClick={()=>{
                            //TODO
                        }}
                    >create user</button>
                </div>
            </div>

            <div>
                Log In
                <div>
                <label>email: </label>
                    <input
                    
                    ></input>

                    <label>password: </label>
                    <input
                    ></input>

                    <button
                        onClick={()=>{
                            //TODO
                        }}
                    >log in</button>
                </div>

            </div>
        </div>
    )

}
