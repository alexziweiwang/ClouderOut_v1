import {fetchProjectList} from '../models/ProjectManagerModel';

import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; 

/* Returns list of project names according to given parameter: untrashed or trashed */
export async function fetchProjectListVM(isTrashed) {
    
    const res = await fetchProjectList();
    //"res" contains both "untrashed" and "trashed" proj-names
    let resUntrashedArr = [];
    let resTrashedArr = [];
    res.forEach((doc) => {
        if (doc.data().trashed == false) {
            resUntrashedArr.push(doc.id);
        } else {
            resTrashedArr.push(doc.id);
        }
    });

    if (isTrashed == true) {
        return resTrashedArr;
    } else {
        return resUntrashedArr;
    }

}


