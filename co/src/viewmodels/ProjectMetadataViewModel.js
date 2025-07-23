import { fetchProjectAllMetadata, updateProjectMetadataSingleField } from '../models/ProjectMetadataModel';

export async function fetchProjectAllMetadataVM({projectName, currUser, backendOption}) {
    if (backendOption === "firease") {
        return await fetchProjectAllMetadata({projectName, currUser});
    } else {
        return {"invalid key": "invalid value"};
    }

}

export async function updateProjectMetadataSingleFieldVM({projectName, currUser, fieldName, contentValue, backendOption}) {
    if (backendOption === "firease") {
        await updateProjectMetadataSingleField({projectName, currUser, fieldName, contentValue});
    } else {
        return {"invalid key": "invalid value"};
    }
}
      