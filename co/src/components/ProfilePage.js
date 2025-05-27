import * as React from 'react';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//TODO1090 cloud-db related

import { getProfileInfoVM } from '../viewmodels/AccountViewModel';
//TODO115 collection of cloud-related

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


export default function ProfilePage({}) {
    const backendOption = "firebase"; 
    //TODO5000 speacial: default to use firebase for account folder?
    

    let name = "/profilepage";

    const navigate = useNavigate();

    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    }

    let profile = [];
    const [profileInfo, setProfile] = useState({});
    const [profileEditInput, setProfileEditInput] = useState("");
    
    
    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {


        getAuthFirebase(
            {
              goToNotLoggedInPageFunc: goToNotLoggedInPage,
              sendOutEmailName: setAuthEmailName
  
            }
          );
            
        console.log("profile page--\t\tauthEmamilName", authEmailName);
  


        if (firstTimeEnter === true) {
            const profile = getProfile();
            console.log("profile from cloud:", profile); //TODO test
            if (profileInfo.size > 0) {
                setProfileEditInput(profileInfo["introduction"]);
            }
            setFirstTimeEnter(false);
        }
    });

    async function getProfile() {
        if (username === "default-no-state-username") {
            console.log("Not getting profile -- no state");
            return;
        }
        profile = await getProfileInfoVM({uname: username, bkOption: backendOption});
        console.log("page: ", profile); //TODO test
        setProfile(profile);
    }

    function passInUsername() {
        return username; //TODO1030
    }


    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
  
    }


    
    return (

<>
  {authEmailName !== "_" && <div className="page">
    
    <Sidebar 
        compName = {name}
        username={username}
        getUsername={passInUsername}
    />

    <div className="dashboard_content" style={{"padding": "10px"}}>
        <div className="profilePage">

            <br></br>
            <table className="noBorder">
                <tbody>
                <tr>
                    <td className="noBorder">Username: </td>
                    <td className="noBorder">{authEmailName}</td>
                </tr>

                <tr>
                    <td className="noBorder">Instruction:</td>
                    <td className="noBorder">
                        {profileInfo["introduction"]}
                        <textarea type="text" onChange={(event)=>{
                                setProfileEditInput(event.target.value);
                            }} 
                            value={profileEditInput}
                        ></textarea>
                        <button onClick={()=>{
                            let obj = {}; 
                            obj["username"] = profileInfo["username"]; 
                            obj["introduction"] = "\"" + profileEditInput + "\""; 
                            setProfile(obj);
                            setProfileEditInput("");
                        }}>Change</button>

                    </td>
                </tr>
                </tbody>
            </table>
         
      
        </div>


      
    </div>
 
  </div>}

</>
    );
}
