import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';

export default function Sidebar({
    compName, 
    getUsername,
    goToDashboard,
    goToAccountPage,
    goToProfilePage,
    goToNotLoggedInPage

}) {

    const [displayingUsername, setDisplayingName] = useState("");

    let languageCodeTextOption = 'en';

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const profileButtonText = textDictItem.profileButtonText !== undefined ?
            textDictItem.profileButtonText
            : textDictItemDefault.profileButtonText;

    const accountButtonText = textDictItem.accountButtonText !== undefined ?
            textDictItem.accountButtonText
            : textDictItemDefault.accountButtonText;

    const logOutButtonText = textDictItem.logOutButtonText !== undefined ?
            textDictItem.logOutButtonText
            : textDictItemDefault.logOutButtonText;

    const dashBoardButtonText = textDictItem.dashBoardButtonText !== undefined ?
            textDictItem.dashBoardButtonText
            : textDictItemDefault.dashBoardButtonText;
    
    useEffect(() => {
        let unameTemp = getUsername();
        setDisplayingName(unameTemp);
    });


    return (
<>

    {
    displayingUsername !== "_"
    &&    
    <>
    
    {(compName === "dashboard") && 
    <div className="sidebar1" > 
    Welcome, [{displayingUsername}]

        <div> 
            <button className="sidebar_options sidebar_options1" onClick={()=>{goToProfilePage()}}>{profileButtonText}</button>
            <button className="sidebar_options sidebar_options1" onClick={()=>{goToAccountPage()}}>{accountButtonText}</button>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <button className="sidebar_options sidebar_options1" onClick={() => {goToNotLoggedInPage()}}>{logOutButtonText}</button>

        </div>
    }

    {(compName === "accountpage" || compName === "profilepage") && 
    <div className="sidebar1" >
    Welcome, [{displayingUsername}]

        <div> 
            
            <button className="sidebar_options sidebar_options2" onClick={()=>{goToDashboard()}}>← {dashBoardButtonText}</button>
        </div>
        

        </div>
    }

 

    </>
    
    }
    </>
    );
}
