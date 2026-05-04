import styles from "../../styles/Hashtag.module.scss";
import { useState, useEffect } from "react";
import LeftSide from "../../components/LeftSide";
import Trends from "../../components/Trends";
import { API } from '../../lib/api';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

function HashtagPage() {
    const router = useRouter();
    const { tag } = router.query;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [hashtag, setHashtag] = useState('');
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState('');

    const searchHashtag = () => {
        if (!hashtag) return;
        router.push(`/hashtags/${hashtag}`);
    };

    useEffect(() => {
        if (!tag) return;

        setHashtag(tag); // sync input avec URL

        fetch(`${API.getHashtag}/${tag}`)
        .then(res => res.json())
        .then(data => {
            if (!data.result) {
                setError("No Tweet found");
                setTweets([]);
            } else {
                setTweets(data.tweets);
                setError('');
            }
        });
    }, [tag]);

    if (!tag) return <p>Loading...</p>;

    return (
        <div className={styles.pageContainer}>
            <LeftSide />

            <div className={styles.hashtagContent}>
                <h2 className={styles.title}>Hashtag</h2>
                <div className={styles.search}>
                    <input 
                        className={styles.searchBar}
                        value={hashtag}
                        onChange={(e) => setHashtag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchHashtag();
                            }
                        }}
                    />
                </div>

                {error && <p>{error}</p>}

                {tweets.map((tweet, i) => (
                    <div className={styles.tweet} key={i}>
                        <div className={styles.user}>
                            <div className={styles.user_info}>
                                <img 
                                    src="/profile_defaut.avif" 
                                    alt="User" 
                                    className={styles.user_img} 
                                />
                                <div className={styles.user_name}>
                                    <h3 className={styles.firstname}>{tweet.user.firstname}</h3>
                                    <p className={styles.username}>@{tweet.user.username}</p>
                                </div>
                            </div>
                        </div>
                        <p className={styles.content}>{tweet.content}</p>
                    </div>
                ))}
            </div>

            <Trends />
        </div>
    );
}

export default HashtagPage;