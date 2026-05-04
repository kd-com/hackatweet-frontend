import styles from "../styles/PublishTweet.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function PublishTweet() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
  return (
    <div className={styles.publishTweet}>
        <h1>Home</h1>
        <form>
            <textarea name="publishtweet" rows="1" cols="100" placeholder="Whats Up ?">
                
            </textarea>
            <div>
                <p>0/280</p>
                <DynamicButton text="Tweet" className="bleu"/>
            </div>
        </form>

      
    </div>
  );
}
export default PublishTweet;