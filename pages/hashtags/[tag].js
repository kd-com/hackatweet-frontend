import styles from "../../styles/Hashtag.module.scss";
import { useState, useEffect } from "react";
import LeftSide from "../../components/LeftSide";
import Trends from "../../components/Trends";
import DisplayTweet from "../../components/DisplayTweet";
import { API } from "../../lib/api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [hashtag, setHashtag] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  const searchHashtag = () => {
    if (!hashtag) return;
    router.push(`/hashtags/${hashtag}`);
  };

  useEffect(() => {
    if (!tag) return;

    setHashtag(tag); // sync input avec URL

    fetch(`${API.getHashtag}/${tag}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setError("No Tweet found");
          setTweets([]);
        } else {
          setTweets(data.tweets);
          setError("");
        }
      });
  }, [tag]);const handleDelete = async (tweetId) => {
    try {
      const res = await fetch(`${API.deleteTweet}/${tweetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.result) {
        setTweets((prev) => prev.filter((t) => t._id !== tweetId));
      }
    } catch {
      console.error("Erreur lors de la suppression");
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const res = await fetch(`${API.likeTweet}/${tweetId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();

      if (data.result) {
        setTweets((prev) =>
          prev.map((tweet) => {
            if (tweet._id !== tweetId) return tweet;
            const alreadyLiked = tweet.likes.includes(user.username);
            return {
              ...tweet,
              likes: alreadyLiked
                ? tweet.likes.filter((id) => id !== user.username)
                : [...tweet.likes, user.username],
            };
          })
        );
      }
    } catch {
      console.error("Erreur lors du like");
    }
  };

  if (!tag) return <p>Loading...</p>;

  return (
    <div className={styles.pageContainer}>
      <LeftSide />

      <div className={styles.hashtagContent}>
        <h2 className={styles.title}>Hashtag</h2>
        <form className={styles.search}>
          <input
            className={styles.searchBar}
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHashtag();
              }
            }}
          />
        </form>

        {error && <p>{error}</p>}

        {/* {tweets.map((tweet, i) => (
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
                ))} */}
        <div className={styles.feed}>
          {tweets.length === 0 ? (
            <p className={styles.empty}>Aucun tweet pour l'instant…</p>
          ) : (
            tweets.map((tweet) => (
              <DisplayTweet
                key={tweet._id}
                tweet={tweet}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))
          )}
        </div>
      </div>

      <Trends />
    </div>
  );
}

export default HashtagPage;
