import {fetchEmuData1Gdt, fetchEmuData2Epp, fetchEmuData3Epa, fetchEmuData4Ess, updateAllSets } from '../models/EmuManagingModel';


export async function fetchEmuData1GdtVM({projectName, currUser}) {
    let res = await fetchEmuData1Gdt({projectName, currUser});
    return res;
}

export async function fetchEmuData2EppVM({projectName, currUser}) {
    let res = await fetchEmuData2Epp({projectName, currUser});
    return res;
}

export async function fetchEmuData3EpaVM({projectName, currUser}) {
    let res = await fetchEmuData3Epa({projectName, currUser});
    return res;

}

export async function fetchEmuData4EssVM({projectName, currUser}) {
    let res = await fetchEmuData4Ess({projectName, currUser});
    return res;

}

export async function updateAllSetsVM({projectName, currUser, dataObj}) {
    await updateAllSets({projectName, currUser, dataObj});
}