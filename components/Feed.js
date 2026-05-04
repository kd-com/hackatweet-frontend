import styles from "../styles/Feed.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Feed() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
  return (
    <div className={styles.feed}>
      
    </div>
  );
}
export default Feed;