import React from 'react';
import DynamicButton from "./DynamicButton";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

function Signup({ onFinish }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const [signupFirstname, setSignupFirstName] = useState('')
  const [signupUsername, setSignupUserName] = useState('')
  const [signupPassword, setSignupPassWord] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({username: signupUsername, password: signupPassword, firstname: signupFirstname}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({username: signupUsername, token: data.token}))
          setSignupFirstName('')
          setSignupPassWord('')
          setSignupUserName('');
          router.push('/tweets');
        }
      });
  }

  

  return (
    <div>
        <div>
        <img src="/tweeter.png" alt="Logo" className="logo_img" />
          <h2>Create your Hackatweet account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="First Name" required onChange={(e) => setSignupFirstName(e.target.value)} value={signupFirstname} />
            <input type="text" name="username" placeholder="Username" required onChange={(e) => setSignupUserName(e.target.value)} value={signupUsername} />
            <input type="password" name="password" placeholder="Password" required onChange={(e) => setSignupPassWord(e.target.value)} value={signupPassword}/>
            <DynamicButton text="Sign Up" className="white_confirm"/>
          </form>
        </div>
    </div>
  );
}

export default Signup;
