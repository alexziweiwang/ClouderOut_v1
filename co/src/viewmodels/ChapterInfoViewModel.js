import { fetchChapterData, updateToCloudChapterData } from '../models/fetchChapterData';


export async function fetchChapterDataVM({projectName, currUser}) {
    
    return await fetchChapterData({projectName, currUser});
}

export async function updateToCloudChapterDataVM({projectName, currUser, dataObj}) {
    await updateToCloudChapterData({projectName, currUser, dataObj});

}