import * as React from 'react';

import { useState, useEffect } from 'react';

//TODO1090 cloud-db related

import { getProfileInfoVM, updateProfileInfoVM } from '../viewmodels/AccountViewModel';
//TODO115 collection of cloud-related


export default function ProfilePage({
    getProfile,

    getUsername,
}) {

    const [backendOption, setBackendOption] = useState("firebase"); //firebase / local?
    //speacial: default to use firebase for account folder?
    

    let name = "/profilepage";

    let profile = [];
    const [profileInfo, setProfile] = useState({});
    const [profileEditInput, setProfileEditInput] = useState("");
    

    const [isEditingIntro, setIsEditingIntro] = useState("");

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {


        let uname = getUsername();
        setAuthEmailName(uname);
        console.log("profile page--\t\tauthEmamilName", authEmailName);
  


        if (firstTimeEnter === true) {
            const profile = getProfile();
            console.log("profile from cloud:", profile); //TODO test
            if (profileInfo.size > 0) {
                setProfileEditInput(profileInfo["introduction"]);
                setProfile(profile);
            }
            setFirstTimeEnter(false);
        }
    });


 


    async function confirmInfoChange() {
        let obj = {}; 
        obj["username"] = authEmailName; 
        obj["introduction"] = profileEditInput; 
        setProfile(obj);

        await updateProfileInfoVM({
            uname: authEmailName, 
            infoObj: obj, 
            bkOption: backendOption
        })

        setProfileEditInput("");
    }
 

    
    return (

<>
  {authEmailName !== "_" && <div className="page">

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
                        <label>{profileInfo["introduction"]}</label>
                        
                        
                        
                        {isEditingIntro === true && <>
                            <textarea type="text" onChange={(event)=>{
                                    setProfileEditInput(event.target.value);
                                }} 
                                value={profileEditInput}
                            ></textarea>
                       
                            <button onClick={()=>{
                                confirmInfoChange();
                                setIsEditingIntro(false);
                            }}>Confirm</button>
                            
                            <button onClick={()=>{
                                setIsEditingIntro(false);               
                            }}>Cancel</button>

                        </>}

                        {isEditingIntro === false && <>
                            <button onClick={()=>{
                                setIsEditingIntro(true);

                            }}>Edit</button>
  
                        </>}
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
