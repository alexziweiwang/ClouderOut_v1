import { 
    getProfileInfo, 
    getUserDefaultUILang, 
    updateUserDefaultUILang, 
} from '../models/AccountModel';


/**
List of functions:

function getProfileInfoVM({uname})

*/

/**
 * Get profile data
 * 
 * @param {*} uname username
 * @returns profile data
 */
export async function getProfileInfoVM({uname}) {
    const profile = await getProfileInfo({uname});
    return profile;
}


export async function getUserDefaultUILangVM({uname}) {
    let res = await getUserDefaultUILang({uname});
    return res;
}

export async function updateUserDefaultUILangVM({uname, newUILang}) {
    await updateUserDefaultUILang({uname, newUILang});
}
