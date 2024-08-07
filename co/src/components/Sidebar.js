import * as React from 'react';
import { useNavigate} from 'react-router-dom';

export default function Sidebar({compName, username}) {
    console.log("sidebar, compName:", compName);
    const navigate = useNavigate();

    const languageCode = 0;
    const profileButtonText = ["Profile"];
    const accountButtonText = ["Account"];
    const logOutButtonText = ["Log Out"];
    const dashBoardButtonText = ["Dashboard"];
    const newProjectButtonText = ["New Project"];
    const cancelButtonText = ["Cancel"];
    const projectManagerText = ["Project Manager"];
    

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true, state: { username } });
    }

    function backToDashboard() {
        navigate('/dashboard', { replace: true });
    }

    function projectManageNew() {
        navigate('/projectmanagenew', { replace: true, state: { username } });
    }

    function goToAccountPage() {
        navigate('/accountpage',  { replace: true, state: { username } });
    }

    function goToProfilePage() {
        navigate('/profilepage',  { replace: true, state: { username } });
    }


    return (
    <>
    {(compName === "/dashboard") && 
    <div className="sidebar1" > Welcome, {username}!
        <div> 
            <button className="sidebar_options sidebar_options1" onClick={()=>{goToProfilePage()}}>{profileButtonText[languageCode]}</button>
            <button className="sidebar_options sidebar_options1" onClick={()=>{goToAccountPage()}}>{accountButtonText[languageCode]}</button>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <button className="sidebar_options sidebar_options1" onClick={() => {console.log("log out pressed")}}>{logOutButtonText[languageCode]}</button>

        </div>
    }

    {(compName === "/accountpage" || compName === "/profilepage") && 
    <div className="sidebar1" >
        <div> 
            
            <button className="sidebar_options sidebar_options2" onClick={()=>{backToDashboard()}}>← {dashBoardButtonText[languageCode]}</button>
        </div>
        

        </div>
    }

    {(compName === "/projectmanagingpanel") && 
    <div className="sidebar2" >
        <div> 
            <button className="sidebar_options sidebar_options2" onClick={()=>{backToDashboard()}}>← {dashBoardButtonText[languageCode]}</button>
        </div>
        <div>
            <br></br> <br></br> <br></br>
        <button className="sidebar_options sidebar_options2" onClick={()=>{projectManageNew()}}>{newProjectButtonText[languageCode]}</button>

        </div>

        </div>
    }

    {(compName === "/projectmanagenew") && 
    <div className="sidebar2" >
        <div> 
            <button className="sidebar_options sidebar_options2" onClick={()=>{
                goToProjectManagingPanel();
            }}>← {projectManagerText[languageCode]}</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <button className="sidebar_options sidebar_options2" onClick={()=>{
                backToDashboard();
            }}>←← {dashBoardButtonText[languageCode]}</button>
        </div>

        </div>
    }




    </>
    );
}
