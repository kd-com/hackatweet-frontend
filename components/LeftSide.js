import styles from "../styles/LeftSide.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { logout } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
function LeftSide() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const handleLogout = () => {
        dispatch(logout());
    }
  return (
    <div className={styles.leftside}>
      <div className={styles.logo}>
        <img src="/tweeter.png" alt="Logo" className={styles.logo_img} />
      </div>
      <div className={styles.user}>
        <div className={styles.user_info}>
            <img src="/profile_defaut.avif" alt="User" className={styles.user_img} />
            <div className={styles.user_name}>
                <h3>{user.firstname}</h3>
                <p>@{user.username}</p>
                <DynamicButton text="Log out" className="logout" onClick={() => handleLogout()}/>
            </div>            
        </div>
        
      </div>
    </div>
  );
}
export default LeftSide;
