import { userSignUpVM, userLogInVM } from '../viewmodels/AccountViewModel';

export default function UserNotLoggedInPage() {
//sign up or log in here...

    

    async function newUserSignUp() {
        //TODO await userSignUpVM({email, password})
    }

    async function existingUserLogIn() {

        //TODO await userLogInVM({email, password})
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
