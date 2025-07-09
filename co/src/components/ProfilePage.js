import * as React from 'react';

import { useState, useEffect } from 'react';

export default function ProfilePage({
    getProfile,
    writeProfile,
    getUsername,

}) {


    const [profileInfo, setProfile] = useState(undefined);
    const [profileEditInput, setProfileEditInput] = useState("");
    

    const [isEditingIntro, setIsEditingIntro] = useState(false);

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (authEmailName !== "_" && firstTimeEnter === true) {
            const profileTemp = getProfile();

                                    console.log("profile from cloud:", profileTemp); //TODO test


            if (profileTemp !== undefined) { // condition of init-status of var...
                
                if (profileTemp["introduction"] !== undefined) {
                    setProfileEditInput(profileTemp["introduction"]);
                } else {
                    setProfileEditInput("...");
                }
                setProfile(profileTemp);

                
                  //if (resBool === true) { //TODO99999
                  //      setFirstTimeEnter(false);
                  //}
                

                setFirstTimeEnter(false);
            }
            
        }

        let unameTemp = getUsername();
        if (unameTemp !== "_") {
            setAuthEmailName(unameTemp);
        }

    });


 


    async function confirmInfoChange() {
        let obj = {}; 
        obj["introduction"] = profileEditInput; 
        setProfile(obj);

        await writeProfile(obj);

        setProfileEditInput("");
    }
 

    
    return (

<>
    <div className="page">

    <div className="dashboard_content" style={{"padding": "10px"}}>
        <div className="profilePage">

            <br></br>
            <table className="noBorder">
                <tbody>

                <tr>
                    <td className="noBorder">Instruction:</td>
                    <td className="noBorder">
                        {profileInfo !== undefined &&
                            <label>{profileInfo["introduction"]}</label>}
                        
                        
                        
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
 
  </div>

</>
    );
}
