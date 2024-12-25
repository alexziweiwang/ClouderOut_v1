import { convNodeUpdateToCloud } from '../models/NodeEditingModel';

export async function convNodeUpdateToCloudVM({project, username, dataObj}) {
    convNodeUpdateToCloud({project, username, dataObj});
}