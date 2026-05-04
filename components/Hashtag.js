import styles from "../styles/Hashtag.module.scss";
import DynamicButton from "./DynamicButton";
import { useState, useEffect } from "react";
import LeftSide from "./LeftSide";
import 

function Hashtag() {
    const [hashtag, setHashtag] = useState('')
    useEffect(() => {
        fetch('http://localhost:3000/articles')
      }, []);

    return (
        <div className={styles.pageContainer}>
            <LeftSide />

            <h2>Hashtag</h2>
            <input onChange={(e) => setHashtag(e.target.value)} value={hashtag}></input>
            <button onClick={() => searchHashtag()}>Search</button>

            <RightSide />
        </div>
    )  
}
export default Hashtag;