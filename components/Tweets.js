import styles from "../styles/Tweets.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import LeftSide from "./LeftSide";

function Tweetsdisplay() {
    return (
        <div className={styles.pageContainer}>
            <LeftSide />

        </div>
    )
    
}
export default Tweetsdisplay;