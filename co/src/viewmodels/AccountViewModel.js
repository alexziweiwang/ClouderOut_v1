import { getProjectInfo, getUserDefaultUILang, updateUserDefaultUILang } from '../models/AccountModel';


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