import styles from "../styles/Trends.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Trends() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
  return (
    <div className={styles.trends}>
      
    </div>
  );
}
export default Trends;