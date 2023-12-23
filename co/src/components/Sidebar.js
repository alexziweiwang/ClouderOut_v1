import * as React from 'react';
import { useNavigate} from 'react-router-dom';

export default function Sidebar({compName, username}) {
    console.log("sidebar, compName:", compName);
    const navigate = useNavigate();

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
            <button className="sidebar_options" onClick={goToProjectManagingPanel}>My Projects</button>
            <button className="sidebar_options" onClick={goToProfilePage}>Profile</button>
            <button className="sidebar_options" onClick={goToAccountPage}>Account</button>
        </div>
        
        <br></br>
        <br></br>
        <br></br>

        <button className="sidebar_options" onClick={() => {console.log("log out pressed")}}>Log Out</button>

        </div>
    }

    {(compName === "/accountpage" || compName === "/profilepage") && 
    <div className="sidebar1" >
        <div> 
            
            <button className="sidebar_options" onClick={backToDashboard}>← Dashboard</button>
        </div>
        

        </div>
    }

    {(compName === "/projectmanagingpanel") && 
    <div className="sidebar2" >
        <div> 
            <button className="sidebar_options" onClick={backToDashboard}> ← Dashboard</button>
        </div>
        <div>
            <br></br> <br></br> <br></br>
        <button className="sidebar_options" onClick={projectManageNew}> New Project</button>

        </div>

        </div>
    }

    {(compName === "/projectmanagenew") && 
    <div className="sidebar2" >
        <div> 
        <button className="sidebar_options" onClick={goToProjectManagingPanel}>Cancel</button>
        </div>

        </div>
    }




    </>
    );
}
