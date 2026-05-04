import styles from "../styles/Hashtag.module.scss";
import { useState } from "react";
import LeftSide from "./LeftSide";
import Trends from "./Trends";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

function Hashtags() {
    const [hashtag, setHashtag] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const searchHashtag = () => {
        if (!hashtag) return;
        router.push(`/hashtags/${hashtag}`);
    }

    return (
        <div className={styles.pageContainer}>
            <LeftSide />
            <div>
                <h2>Hashtag</h2>

                <input 
                    onChange={(e) => setHashtag(e.target.value)} 
                    value={hashtag}
                />

                <button onClick={searchHashtag}>Search</button>
            </div>
            <Trends />
        </div>
    )  
}

export default Hashtags;