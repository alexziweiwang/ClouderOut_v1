import * as React from 'react';
import { useNavigate} from 'react-router-dom';

export default function Sidebar(props) {
    console.log(props.compName);
    const navigate = useNavigate();

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function backToDashboard() {
        navigate('/dashboard', { replace: true });
    }

    function projectManageNew() {
        navigate('/projectmanagenew', { replace: true });
    }

    function goToAccountPage() {
        navigate('/accountpage', { replace: true });
    }

    function goToProfilePage() {
        navigate('/profilepage', { replace: true });
    }


    return (
    <>
    {(props.compName === "/dashboard") && 
    <div className="sidebar1" > Welcome, user ___ ! 1223123
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

    {(props.compName === "/accountpage") && 
    <div className="sidebar1" >
        <div> 
            
            <button className="sidebar_options" onClick={backToDashboard}>← Dashboard</button>
        </div>
        

        </div>
    }

    {(props.compName === "/projectmanagingpanel") && 
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

    {(props.compName === "/projectmanagenew") && 
    <div className="sidebar2" >
        <div> 
        <button className="sidebar_options" onClick={goToProjectManagingPanel}>Cancel</button>
        </div>

        </div>
    }




    </>
    );
}
