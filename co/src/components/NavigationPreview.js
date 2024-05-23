import { useState, useEffect } from 'react';


export default function NavigationPreview({initialNavObj, fetchNavObj, fetchPageName}) {
    const screenWidth = 800;
    const screenHeight = 450;


    const [navObj, setNavObj] = useState(initialNavObj);
    const [page, setPage] = useState("");

    useEffect(() => {
        console.log("initial nav-preview: ", initialNavObj); //TODO test
        console.log("Navigation Preview -- "); //TODO test

        let objTemp = fetchNavObj();
  
        setNavObj(objTemp);

        let tempPage= fetchPageName();
        setPage(tempPage);
      
    });


    return (<div className="previewWindow">
        navigation preview area?
        <br></br>
        <br></br>
        {<div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
            >
            main page
            <br></br>
            {navObj["mainPage-story"].toString()}<br></br>
            {navObj["mainPage-shop"].toString()}<br></br>
            {navObj["mainPage-setting"].toString()}<br></br>
            {navObj["mainPage-playerProfile"].toString()} <br></br>
            {navObj["mainPage-entriesHorizontal"].toString()}<br></br>
            {navObj["mainPage-entriesCustom"].toString()}<br></br>
        </div>}
        <br></br>
        {(navObj["isWithSL"]) && <>
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            
            saveload page preview</div>
        <br></br></>}

        {<div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            story page
            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>
        </div>}

        <br></br>
        
        {<div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            setting page
            <br></br>   
            {navObj["settingPage-playSpeed"].toString()}<br></br>
            {navObj["settingPage-bgmVol"].toString()}<br></br>
            {navObj["settingPage-seVol"].toString()}<br></br>
            {navObj["settingPage-entriesHorizontal"].toString()}<br></br>
            {navObj["settingPage-entriesCustom"].toString()} 
        </div>}
        <br></br>


    </div>);
}