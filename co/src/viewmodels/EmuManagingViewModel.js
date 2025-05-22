import {fetchEmuData1Gdt, fetchEmuData2Epp, fetchEmuData3Epa, fetchEmuData4Ess, fetchEmuData5Shp, updateAllSets } from '../models/EmuManagingModel_Firebase';


export async function fetchEmuData1GdtVM({projectName, currUser,  bkOption}) {
    let res = {};
    
    if (bkOption === "firebase") {
        res = await fetchEmuData1Gdt({projectName, currUser});
    }

    return res;
}

export async function fetchEmuData2EppVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchEmuData2Epp({projectName, currUser});
    }

    return res;
}

export async function fetchEmuData3EpaVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchEmuData3Epa({projectName, currUser});
    }

    return res;

}

export async function fetchEmuData4EssVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchEmuData4Ess({projectName, currUser});
    }

    return res;

}

export async function fetchEmuData5ShpVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchEmuData5Shp({projectName, currUser});
    }

    return res;

}

export async function updateAllSetsVM({projectName, currUser, dataObj, bkOption}) {
    if (bkOption === "firebase") {
        await updateAllSets({projectName, currUser, dataObj});
    }

}