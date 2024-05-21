import { useState, useEffect } from 'react';


export default function NavigationPreview({initialNavObj, fetchNavObj}) {

    const [navObj, setNavObj] = useState(initialNavObj);

    useEffect(() => {
        console.log("initial nav-preview: ", initialNavObj); //TODO test
        console.log("Navigation Preview -- "); //TODO test

        let objTemp = fetchNavObj();
        console.log("nav-preview... navObj? ", objTemp);
  
        setNavObj(objTemp);
      
    });


    return (<div className="previewWindow">
        navigation preview area?
        <br></br>
        {navObj["isWithSL"].toString()} <br></br>

        {navObj["mainPage-story"].toString()}<br></br>
        {navObj["mainPage-shop"].toString()}<br></br>
        {navObj["mainPage-setting"].toString()}<br></br>
        {navObj["mainPage-playerProfile"].toString()} <br></br>
        {navObj["mainPage-entriesHorizontal"].toString()}<br></br>
        {navObj["mainPage-entriesCustom"].toString()}<br></br>
        {navObj["settingPage-playSpeed"].toString()}<br></br>
        {navObj["settingPage-bgmVol"].toString()}<br></br>
        {navObj["settingPage-seVol"].toString()}<br></br>
        {navObj["settingPage-entriesHorizontal"].toString()}<br></br>
        {navObj["settingPage-entriesCustom"].toString()}
    </div>);
}