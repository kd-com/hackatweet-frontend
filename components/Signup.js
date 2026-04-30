import React from 'react';
import DynamicButton from "./DynamicButton";

function Signup({ onFinish }) {
  return (
    <div>
        <div>
        <img src="/tweeter.png" alt="Logo" className="logo_img" />
          <h2>Create your Hackatweet account</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            onFinish(values);
          }}>
            <input type="text" name="firstname" placeholder="First Name" required />
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <DynamicButton text="Sign Up" className="white_confirm"/>
          </form>
        </div>
    </div>
  );
}

export default Signup;
