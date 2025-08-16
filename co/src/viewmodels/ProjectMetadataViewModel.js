import { fetchProjectAllMetadata, updateProjectMetadataSingleField, fetchProjectMetadataSingleField, updateProjectAllMetadata } from '../models/ProjectMetadataModel';

export async function fetchProjectAllMetadataVM({projectName, currUser, bkOption}) {
    if (bkOption === "firebase") {
        return await fetchProjectAllMetadata({projectName, currUser});
    } else {
        return {"invalid key": "invalid value"};
    }
}

export async function fetchProjectMetadataSingleFieldVM({projectName, currUser, fieldName, bkOption}) {
    if (bkOption === "firebase") {
        return await fetchProjectMetadataSingleField({projectName, currUser, fieldName});
    } else {
        return {"invalid key": "invalid value"};
    }
}

export async function  updateProjectAllMetadataVM({projectName, currUser, dataObj, bkOption}) {
    if (bkOption === "firebase") {
        await updateProjectAllMetadata({projectName, currUser, dataObj});
    }

}

export async function updateProjectMetadataSingleFieldVM({projectName, currUser, fieldName, contentValue, bkOption}) {

    if (bkOption === "firebase") {
        await updateProjectMetadataSingleField({projectName, currUser, fieldName, contentValue});
    } else {

        return {"invalid key": "invalid value"};
    }
}

    //example obj(for metadata): 
                                // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"

                                // sizeDirection:  "h450_800"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"