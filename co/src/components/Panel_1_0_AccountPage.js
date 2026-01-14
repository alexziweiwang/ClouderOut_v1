import * as React from 'react';
import { useState, useEffect } from 'react';


export default function AccountPage({
    getUsername
  
  }) {

    let name = "/accountpage";





    const [nicknameInput, setNicknameInput] = useState("");
    const [emailLinkedInput, setEmailLinkedInput] = useState("");
    const [phonenumberInput, setPhonenumberInput] = useState("");

    const [isNicknameChanging, setIsNicknameChanging] = useState(false);
    const [isEmailLinkedChanging, setIsEmailLinkedChanging] = useState(false);
    const [isPhonenumberChanging, setIsPhonenumberChanging] = useState(false);

    const [accountObj, setAccountObj] = useState(undefined); //TODO set into obj with "nickname", "email", "phone-number" keys

    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {


                                console.log("acount page--\t\tauthEmamilName", authEmailName);

        if (authEmailName !== "_" && firstTimeEnter === true) {

            //if init var is not init-status, then .. set setFirstTimeEnter(false)
                  //if (resBool === true) { //TODO99999
                  //      setFirstTimeEnter(false);
                  //}

                                    //setFirstTimeEnter(false);
        }

        let uname = getUsername();
        setAuthEmailName(uname);


 

    });




    return (
      <>
  {authEmailName !== "_" && <div className="page">


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
                  
                  
                      {isNicknameChanging === false && <button onClick={()=>{setIsNicknameChanging(true);}}>Edit</button>}
                      {isNicknameChanging === true && <>
                        <input onChange={(event)=>{setNicknameInput(event.target.value);}}></input>
                        <button onClick={()=>{setIsNicknameChanging(false);}}>Cancel</button>
                        <button onClick={()=>{
                              //TODO update to cloud: nicknameInput
                        }}>Save</button>
                      </>}
                      
                  </td>
              </tr>

              <tr>
                  <td className="noBorder">Email linked: </td>
                  <td className="noBorder">(email value) 
                      {isEmailLinkedChanging === false && <button onClick={()=>{setIsEmailLinkedChanging(true);}}>Edit</button>}
                      {isEmailLinkedChanging === true && <>
                        <input onChange={(event)=>{setEmailLinkedInput(event.target.value);}}></input>
                        <button onClick={()=>{setIsEmailLinkedChanging(false);}}>Cancel</button>
                        <button onClick={()=>{
                              //TODO update to cloud: emailLinkedInput
                        }}>Save</button>
                      </>}
                  </td>
              </tr>

              <tr>
                  <td className="noBorder">Phone number linked: </td>
                  <td className="noBorder">(phone number value) 
                  
                      {isPhonenumberChanging === false && <button onClick={()=>{setIsPhonenumberChanging(true)}}>Edit</button>}
                      {isPhonenumberChanging === true && <>
                        <input onChange={(event)=>{setPhonenumberInput(event.target.value);}}></input>
                        <button onClick={()=>{setIsPhonenumberChanging(false);}}>Cancel</button>
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
