import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../style/style.css"

function Login() {
  // React States
  const username = useFormInput('');
  const password = useFormInput('');

  const HandleSubmit = () => {
    
    axios({
      method: "POST",
      data: 'http://localhost:3050/api/login/',
      body:JSON.stringify({username:username,
                            password:password}),
      headers: {"Content-Type":"application/json"}
    }
    ).then((res)=>{
      console.log(res.data)
    })
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
        <div className="input-container">
          <label>Username </label>
          <input type="text" {...username} autoComplete="new-username"/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" {...password} autoComplete="new-password"/>
        </div>
        <div className="button-container">
          <input type="submit" onClick={HandleSubmit}/>
        </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default Login;