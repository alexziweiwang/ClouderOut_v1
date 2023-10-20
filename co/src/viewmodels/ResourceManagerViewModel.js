import { submitFile } from "../models/ResourceManagerModel";

export function submitFileVM({file, uname}) {
    console.log("submitFile VM :::"); //TODO test

    submitFile({file, uname});
}