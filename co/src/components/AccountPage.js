import * as React from 'react';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';
//TODO1010


export default function AccountPage({}) {

    let name = "/accountpage";

    const navigate = useNavigate();


    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    } 

    const [authEmailName, setAuthEmailName] = useState("_");


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

    function goToNotLoggedInPage() {
      navigate('/notloggedin', { replace: true });

    }



    return (
  <div className="page">
    <Sidebar 
      compName = {name}
      username={state.username}
      getUsername={passInUsername}
    />

    <div className="dashboard_content">
        <div style={{"textAlign": "left", "padding": "10px"}}>
          <table className="noBorder">
       
            <tbody>
              <tr>
                <td className="noBorder">Username: </td>
                <td className="noBorder">(username value)</td>
              </tr>

              <tr>
                <td className="noBorder">Nickname: </td>
                <td className="noBorder">(nickname value) <button>Edit</button></td>
              </tr>

              <tr>
                <td className="noBorder">Email linked: </td>
                <td className="noBorder">(email value) <button>Edit</button></td>
              </tr>

              <tr>
                <td className="noBorder">Phone number linked: </td>
                <td className="noBorder">(phone number value) <button>Edit</button></td>
              </tr>

              <tr>
                <td className="noBorder">Clouder-Credits:</td>
                <td className="noBorder">(credit value <button>Top Up</button></td>
              </tr>
            </tbody>
            

          </table>
     
          <br></br><br></br><br></br><br></br>
          <button>Deactivate Account</button>
        </div>
    </div>
 
  </div>
    );
}
