import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
import UserPool from '../../UserPool';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';

const Login = () => {

  

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_ZZyVbmvop',
    userPoolWebClientId: '7pi0gfju680corf5ilcq9jerja',
  }
});

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        console.log(email , password)
    },[email,password])


    let cognitoUser = CognitoUser; // Track authentication flow state in this object
        
    async function signIn(email) {
      cognitoUser = await Auth.signIn(email);
    }


    async function answerCustomChallenge(password) {

    // Send the answer to the User Pool
    // This will throw an error if it’s the 3rd wrong answer
    cognitoUser = await Auth.sendCustomChallengeAnswer(cognitoUser, password);

    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
        // This will throw an error if the user is not yet authenticated:
        await Auth.currentSession();
    } catch {
        console.log('Apparently the user did not enter the right code');
    }

}




    const sendOTPHandler = async () => {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      {
          return alert("invalid email")
      }

      signIn(email);
    }


    const checkHandler = () => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            return alert("invalid email")
        }

      answerCustomChallenge(password);

    
        // const user = new CognitoUser({
        //   Username: email,
        //   Pool: UserPool,
        // });
    
        // const authDetails = new AuthenticationDetails({
        //   Username: email,
        //   Password: password,
        // });
    
        // user.authenticateUser(authDetails, {
        //   onSuccess: (data) => {
        //     console.log("onSuccess: ", data);
        //     localStorage.setItem("jwt",data.accessToken.jwtToken)
        //     localStorage.setItem("user",JSON.stringify(data.accessToken.payload))
        //   },
        //   onFailure: (err) => {
        //     console.error("onFailure: ", err);
        //   },
        //   newPasswordRequired: (data) => {
        //     console.log("newPasswordRequired: ", data);
        //   },
        // });


    // <<============using jwt in the backend==================>>
    //fetch("http://localhost:4000/signin",{                   
    //   method:"post",
    //   headers:{
    //       "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //     email:email,
    //     password:password
          
    //   })
    //   }).then(res=>res.json())
    //   .then(data=>{
    //       console.log(data)
    //       if(data.error){
    //       console.log(data.error);
    //       alert(data.error);
    //       }
    //       else{
    //         console.log(data)
    //           localStorage.setItem("jwt",data.token)
    //           localStorage.setItem("user",JSON.stringify(data.user))
              
    //           
    //       }
    //   }).catch(err=>{
    //       console.log(err);
    //   })

   
    }

    return (
        <div className="Logincontainer">
        <div className="cardComponent">
       
        <div>
        <div className="Logintext">
          Login
        </div>
        
      </div>
      <div className="textfields">
      <TextField id="standard-basic" style={{width:"30vw"}} label="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="textfields">
      <TextField id="standard-basic" style={{width:"30vw"}} label="password"
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      </div>
      <div>
      <Button variant="contained" color="primary" onClick={sendOTPHandler}>send</Button>
        <Button variant="contained" color="primary" onClick={checkHandler}>Login</Button>
      </div>
      
     
    </div>
    </div>
    )
}

export default Login;