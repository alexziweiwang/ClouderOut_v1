import {  userSignUp, userLogIn, userLogOut } from '../models/_UserFirebaseAuthModel'

export async function userSignUpVM({email, password, setFunc, succInfoFunc}) {
    let msg = await userSignUp({email, password, setFunc, succInfoFunc});
    return msg;
}

export async function userLogInVM({email, password, loggedInFunc}) {
    await userLogIn({email, password, loggedInFunc});
}

export async function userLogOutVM() {
    await userLogOut();
}