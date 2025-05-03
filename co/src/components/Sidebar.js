import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import langDictionary from './_textDictionary';

export default function Sidebar({compName, username}) {
    console.log("sidebar, compName:", compName);
    const navigate = useNavigate();


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
    

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true, state: { username } });
    }

    function backToDashboard() {
        navigate('/dashboard', { replace: true });
    }

    function goToAccountPage() {
        navigate('/accountpage',  { replace: true, state: { username } });
    }

    function goToProfilePage() {
        navigate('/profilepage',  { replace: true, state: { username } });
    }

    function goToLogOutPage() {
        //TODO log out here...
        console.log("log out pressed");

        // "/notloggedin"
    }



    return (
    <>
    {(compName === "/dashboard") && 
    <div className="sidebar1" > Welcome, {username}!
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

    {(compName === "/accountpage" || compName === "/profilepage") && 
    <div className="sidebar1" >
        <div> 
            
            <button className="sidebar_options sidebar_options2" onClick={()=>{backToDashboard()}}>← {dashBoardButtonText}</button>
        </div>
        

        </div>
    }

    {(compName === "/projectmanagingpanel") && 
    <div className="sidebar1" >
        <div> 
            <button className="sidebar_options sidebar_options2" onClick={()=>{backToDashboard()}}>←</button>
        </div>
    
        </div>
    }

  


    </>
    );
}
