import styles from "../styles/LeftSide.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { logout, updateProfileImage } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import Link from 'next/link';
import { API } from '../lib/api';

function LeftSide() {
    const dispatch = useDispatch();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useSelector((state) => state.user.value);
    const changeProfileImage = (img) => {
      console.log("CLICK IMAGE :", img);
      fetch(`${API.updateProfile}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ url_profile: img }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          dispatch(updateProfileImage(data.user.url_profile));
          setIsProfileOpen(false);
        } else {
          console.error(data.error);
        }
      })
      .catch(err => {
        console.error("Erreur :", err);
      });
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleProfile = (values) => {
    setIsProfileOpen(false);
  };

  return (
    <div className={styles.leftside}>
      <div className={styles.logo}>
        <Link href="/tweets"><img src="/tweeter.png" alt="Logo" className={styles.logo_img} /></Link>
      </div>
      <div className={styles.user}>
        <div className={styles.user_info}>
            <img src={user.url_profile} alt="User" className={styles.user_img} onClick={() => setIsProfileOpen(true)}/>
            <div className={styles.user_name}>
                <h3>{user.firstname}</h3>
                <p>@{user.username}</p>
                <DynamicButton text="Log out" className="logout" onClick={() => handleLogout()}/>
            </div>            
        </div>
        
      </div>
      <Modal
        open={isProfileOpen}
        onCancel={() => setIsProfileOpen(false)}
        footer={null}
        centered
        className={styles.modal}
      >
        Choose your avatar :
        <div className={styles.profiles}>
          <img src="/profile_defaut.avif" alt="User" className={styles.user_img} onClick={() => changeProfileImage("/profile_defaut.avif")}/>
          <img src="/profile_red.png" alt="User" className={styles.user_img} onClick={() => changeProfileImage("/profile_red.png")}/>
          <img src="/profile_violet.avif" alt="User" className={styles.user_img} onClick={() => changeProfileImage("/profile_violet.avif")}/>
          <img src="/profile_yellow.jpg" alt="User" className={styles.user_img} onClick={() => changeProfileImage("/profile_yellow.jpg")}/>
        </div>
      </Modal>
    </div>
  );
}
export default LeftSide;
