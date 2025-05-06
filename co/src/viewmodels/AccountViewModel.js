import { getProjectInfo, getUserDefaultUILang, updateUserDefaultUILang, userSignUp, userLogIn } from '../models/AccountModel';


/**
List of functions:

function getProjectInfoVM({uname})

*/

/**
 * Get profile data
 * 
 * @param {*} uname username
 * @returns profile data
 */
export async function getProjectInfoVM({uname}) {
    const profile = await getProjectInfo({uname});
    return profile;
}


export async function getUserDefaultUILangVM({uname}) {
    let res = await getUserDefaultUILang({uname});
    return res;
}

export async function updateUserDefaultUILangVM({uname, newUILang}) {
    await updateUserDefaultUILang({uname, newUILang});
}

export async function userSignUpVM({email, password, setFunc, succInfoFunc}) {
    let msg = await userSignUp({email, password, setFunc, succInfoFunc});
    return msg;
}

export async function userLogInVM({email, password}) {
    await userLogIn({email, password});
}