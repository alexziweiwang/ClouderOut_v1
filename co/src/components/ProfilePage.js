import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getProjectInfoVM } from '../viewmodels/AccountViewModel';

export default function ProfilePage({}) {

    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    }

    let name = "/profilepage";

    let profile = [];
    const [profileInfo, setProfile] = useState({});
    const [profileEditInput, setProfileEditInput] = useState("");
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);


    useEffect(() => {
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
        profile = await getProjectInfoVM({uname: username});
        console.log("page: ", profile); //TODO test
        setProfile(profile);
    }

    return (
  <div className="page">
    
    <Sidebar compName = {name}/>

    <div className="dashboard_content" style={{"padding": "10px"}}>
        <div className="profilePage">

            <br></br>
            <table className="noBorder">
                <tbody>
                <tr>
                    <td className="noBorder">Username: </td>
                    <td className="noBorder">{profileInfo["username"]}</td>
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
 
  </div>
    );
}
