import styles from "../styles/Tweets.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import LeftSide from "./LeftSide";
import Feed from "./feed";
import Trends from "./Trends";

function Tweetsdisplay() {
    return (
        <div className={styles.pageContainer}>
            <LeftSide />
            <Feed />
            <Trends />


        </div>
    )
    
}
export default Tweetsdisplay;