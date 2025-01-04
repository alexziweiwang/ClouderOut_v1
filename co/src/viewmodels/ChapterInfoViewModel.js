import { fetchChapterData, updateChapterToCloudData } from '../models/fetchChapterData';


export async function fetchChapterDataVM({projectName, currUser}) {
    
    return await fetchChapterData({projectName, currUser});
}

export async function updateChapterToCloudDataVM({projectName, currUser, dataObj}) {
    await updateChapterToCloudData({projectName, currUser, dataObj});

}