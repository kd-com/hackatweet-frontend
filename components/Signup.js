import React from 'react';
import DynamicButton from "./DynamicButton";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { API } from '../lib/api';


function Signup({ onFinish }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const [signupFirstname, setSignupFirstName] = useState('')
  const [signupUsername, setSignupUserName] = useState('')
  const [signupPassword, setSignupPassWord] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch(API.signup, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword,
        firstname: signupFirstname,
      }),
    });

    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

    const data = await response.json();

    if (data.result) {
      dispatch(login({ username: signupUsername, token: data.token, firstname: signupFirstname }));
      setSignupFirstName('');
      setSignupPassWord('');
      setSignupUserName('');
      router.push('/tweets');
    } else {
      setError(data.error || 'Inscription impossible, réessayez');
    }
  } catch (err) {
    setError('Impossible de contacter le serveur');
    console.error(err);
  }
};

  

  return (
    <div>
        <div>
        <img src="/tweeter.png" alt="Logo" className="logo_img" />
          <h2>Create your Hackatweet account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="First Name" required onChange={(e) => setSignupFirstName(e.target.value)} value={signupFirstname} />
            <input type="text" name="username" placeholder="Username" required onChange={(e) => setSignupUserName(e.target.value)} value={signupUsername} />
            <input type="password" name="password" placeholder="Password" required onChange={(e) => setSignupPassWord(e.target.value)} value={signupPassword}/>
            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
            <DynamicButton text="Sign Up" className="white_confirm"/>
          </form>
        </div>
    </div>
  );
}

export default Signup;
