import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import langDictionary from './_textDictionary';

import { userLogOutVM } from '../viewmodels/_UserFirebaseAuthViewModel';

export default function Sidebar({
    compName, 
    username, 
    getUsername,
    goToDashboard,
    goToAccountPage,
    goToProfilePage,

}) {

    
  //  console.log("sidebar, compName:", compName);
    const navigate = useNavigate();

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


    async function goToLogOutPage() {
        //TODO log out here...

        await userLogOutVM();

        let ans = window.confirm("Are you sure to log out?");
        if (ans) {
            navigate('/notloggedin',  { replace: true });
        }
    }



    return (
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

        <button className="sidebar_options sidebar_options1" onClick={() => {goToLogOutPage()}}>{logOutButtonText}</button>

        </div>
    }

    {(compName === "accountpage" || compName === "/profilepage") && 
    <div className="sidebar1" >
    Welcome, [{displayingUsername}]

        <div> 
            
            <button className="sidebar_options sidebar_options2" onClick={()=>{goToDashboard()}}>← {dashBoardButtonText}</button>
        </div>
        

        </div>
    }

 

    </>
    );
}
