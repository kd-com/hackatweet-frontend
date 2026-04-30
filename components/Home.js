import styles from "../styles/Home.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { Modal } from "antd";
import Signup from "./Signup";
import Signin from "./Signin";


function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  const handleSignup = (values) => {
    // Traitement de l'inscription
    console.log('Signup values:', values);
    setIsSignupOpen(false);
  };
  const handleSignin = (values) => {
    // Traitement de la connexion
    console.log('Signin values:', values);
    setIsSigninOpen(false);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.bg_left}>
          <div className={styles.logo}>
            <img src="/tweeter.png" alt="Logo" className={styles.logo_img} />
          </div>
        </div>
        <div className={styles.bg_right}>
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src="/tweeter.png" alt="Logo" className={styles.logo_img} />
            </div>
            <h1 className={styles.title}>
              See what's
              <br />
              happening
            </h1>
            <h2>Join Hackatweet today</h2>
            <DynamicButton text="Sign Up" className="bleu" onClick={() => setIsSignupOpen(true)} />
            <h4>Already have an account?</h4>
            <DynamicButton text="Sign In" className="white" onClick={() => setIsSigninOpen(true)} />
          </div>
        </div>
      </main>
      <Modal
        open={isSignupOpen}
        onCancel={() => setIsSignupOpen(false)}
        footer={null}
        centered
        className="my-custom-modal"
      >
        <Signup onFinish={handleSignup} />
      </Modal>
      <Modal
        open={isSigninOpen}
        onCancel={() => setIsSigninOpen(false)}
        footer={null}
        centered
        className="my-custom-modal"
      >
        <Signin onFinish={handleSignin} />
      </Modal>
    </div>
  );
}

export default Home;
