import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
import UserPool from '../../UserPool';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        console.log(email , password)
    },[email,password])

    const checkHandler = () => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            return alert("invalid email")
        }

        const user = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });
    
        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });
    
        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            console.log("onSuccess: ", data);
            localStorage.setItem("jwt",data.accessToken.jwtToken)
            localStorage.setItem("user",JSON.stringify(data.accessToken.payload))
          },
          onFailure: (err) => {
            console.error("onFailure: ", err);
          },
          newPasswordRequired: (data) => {
            console.log("newPasswordRequired: ", data);
          },
        });
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
        <Button variant="contained" color="primary" onClick={checkHandler}>Login</Button>
      </div>
      
     
    </div>
    </div>
    )
}

export default Login;