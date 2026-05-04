import React from 'react';
import DynamicButton from "./DynamicButton";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { API } from '../lib/api';

function Signin() {
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
    const [signinUsername, setSigninUserName] = useState('');
    const [signinPassword, setSigninPassWord] = useState('');
    const [signinFirstname, setSigninFirstName] = useState();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch(API.signin, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signinUsername, password: signinPassword }),
    });

    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

    const data = await response.json();

    if (data.result) {
      dispatch(login({ username: signinUsername, token: data.token, firstname: data.firstname }));
      setSigninPassWord('');
      setSigninUserName('');
      router.push('/tweets');
    } else {
      setError('Identifiants incorrects');
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
          <h2>Connect to your Hackatweet account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required required onChange={(e) => setSigninUserName(e.target.value)} value={signinUsername} />
            <input type="password" name="password" placeholder="Password" required onChange={(e) => setSigninPassWord(e.target.value)} value={signinPassword} />
            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
            <DynamicButton text="Sign In" className="white_confirm"/>
          </form>
        </div>
    </div>
  );
}

export default Signin;
