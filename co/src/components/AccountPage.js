import * as React from 'react';
import Sidebar from './Sidebar';
import { useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';
//TODO1010


export default function AccountPage({goToNotLoggedInPage}) {

    let name = "/accountpage";



    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    } 

    const [authEmailName, setAuthEmailName] = useState("_");


    const [nicknameInput, setNicknameInput] = useState("");
    const [emailLinkedInput, setEmailLinkedInput] = useState("");
    const [phonenumberInput, setPhonenumberInput] = useState("");

    const [nicknameChanging, setNicknameChanging] = useState(false);
    const [emailLinkedChanging, setEmailLinkedChanging] = useState(false);
    const [phonenumberChanging, setPhonenumberChanging] = useState(false);



    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {


        getAuthFirebase(
          {
            goToNotLoggedInPageFunc: goToNotLoggedInPage,
            sendOutEmailName: setAuthEmailName

          }
        );
          
        console.log("acount page--\t\tauthEmamilName", authEmailName);

 
        if (firstTimeEnter === true) {

          

            setFirstTimeEnter(false);
        }

    });

    function passInUsername() {
      return state.username; //TODO1030
    }



    return (
      <>
  {authEmailName !== "_" && <div className="page">
    <Sidebar 
      compName = {name}
      username={state.username}
      getUsername={passInUsername}
    />

    <div className="dashboard_content">
        <div style={{"textAlign": "left", "padding": "10px"}}>
          <table className="noBorder" style={{"width": "1200px"}}>
       
            <tbody>

              <tr style={{"width": "200px"}}>
                  <td className="noBorder" style={{"width": "100px"}}>Username: </td>
                  <td className="noBorder" style={{"width": "500px"}}>(username value)</td>
              </tr>

              <tr>
                  <td className="noBorder">Nickname: </td>
                  <td className="noBorder">(nickname value) 
                  
                  
                      {nicknameChanging === false && <button onClick={()=>{setNicknameChanging(true);}}>Edit</button>}
                      {nicknameChanging === true && <>
                        <input onChange={(event)=>{setNicknameInput(event.target.value);}}></input>
                        <button onClick={()=>{setNicknameChanging(false);}}>Cancel</button>
                        <button onClick={()=>{
                              //TODO update to cloud: nicknameInput
                        }}>Save</button>
                      </>}
                      
                  </td>
              </tr>

              <tr>
                  <td className="noBorder">Email linked: </td>
                  <td className="noBorder">(email value) 
                      {emailLinkedChanging === false && <button onClick={()=>{setEmailLinkedChanging(true);}}>Edit</button>}
                      {emailLinkedChanging === true && <>
                        <input onChange={(event)=>{setEmailLinkedInput(event.target.value);}}></input>
                        <button onClick={()=>{setEmailLinkedChanging(false);}}>Cancel</button>
                        <button onClick={()=>{
                              //TODO update to cloud: emailLinkedInput
                        }}>Save</button>
                      </>}
                  </td>
              </tr>

              <tr>
                  <td className="noBorder">Phone number linked: </td>
                  <td className="noBorder">(phone number value) 
                  
                      {phonenumberChanging === false && <button onClick={()=>{setPhonenumberChanging(true)}}>Edit</button>}
                      {phonenumberChanging === true && <>
                        <input onChange={(event)=>{setPhonenumberInput(event.target.value);}}></input>
                        <button onClick={()=>{setPhonenumberChanging(false);}}>Cancel</button>
                        <button onClick={()=>{
                              //TODO update to cloud: phonenumberInput
                        }}>Save</button>
                      
                      </>}
                        
                  </td>
              </tr>


            </tbody>
            

          </table>
     
          <br></br><br></br><br></br><br></br>
          <button>Deactivate Account</button>
        </div>
    </div>
 
  </div>}

  </>
    );
}
