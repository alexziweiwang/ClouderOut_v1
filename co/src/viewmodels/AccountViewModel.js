import { 
    getProfileInfo, 
    getUserDefaultUILang, 
    updateUserDefaultUILang, 
    updateProfileInfo

} from '../models/AccountModel_Firebase';


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
export async function getProfileInfoVM({uname, bkOption}) {
    let profile = {};
    
    if (bkOption === "firebase") {
        profile = await getProfileInfo({uname});
    }
    return profile;
}

export async function updateProfileInfoVM({uname, infoObj, bkOption}) {

    if (infoObj === undefined) {
        return;
    }

    if (bkOption === "firebase") {
        await updateProfileInfo({uname, infoObj});
    }
    
}

// export async function getUserDefaultUILangVM({uname}) {
//     let res = {}
    
//     if (backendFlag === "firebase") {
//         res = await getUserDefaultUILang({uname});
//     }

//     return res;
// }

// export async function updateUserDefaultUILangVM({uname, newUILang}) {
//     if (backendFlag === "firebase") {
//         await updateUserDefaultUILang({uname, newUILang});
//     }
// }
