import styles from "../styles/Tweets.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import LeftSide from "./LeftSide";
import Feed from "./feed";

function Tweetsdisplay() {
    return (
        <div className={styles.pageContainer}>
            <LeftSide />
            <Feed />


        </div>
    )
    
}
export default Tweetsdisplay;