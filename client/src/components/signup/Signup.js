import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
import UserPool from '../../UserPool';
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

        UserPool.signUp(email,password,[],null,(err,data)=>{
          if(err){
            console.error(err);
          }
          console.log(data);
        })
   

   
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