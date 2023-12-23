import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getProjectGameDataVM } from '../viewmodels/AccountViewModel';

export default function ProfilePage({}) {

    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    }

    let name = "/profilepage";

    let profile = [];
    const [profileText, setProfile] = useState({});

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);


    useEffect(() => {
        if (firstTimeEnter === true) {
            const profile = getProfile();
            console.log("profile from cloud:", profile); //TODO test
            setFirstTimeEnter(false);
        }
    });

    async function getProfile() {
        if (username === "default-no-state-username") {
            console.log("Not getting profile -- no state");
            return;
        }
        profile = await getProjectGameDataVM({uname: username});
        console.log("page: ", profile); //TODO test
        setProfile(profile);
    }


    return (
  <div className="page">
    <Sidebar compName = {name}/>

    <div className="dashboard_content">

      <p className="plans"> This is Profile Page!  </p>
      <button onClick={getProfile}> Load my profile </button>
      <ul>
                {
                Object.keys(profileText).map((key) => {
                return (
                    <li className="clickableListItem2" key={key}>{key}:               {profileText[key]}</li>
                )
                })}
      </ul>
      
    </div>
 
  </div>
    );
}
