import styles from "../styles/Feed.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API } from '../lib/api';
import DisplayTweet from "./DisplayTweet";
import PublishTweet from "./PublishTweet";


function Feed() {
  const user = useSelector((state) => state.user.value);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch(API.tweetList)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setTweets(data.tweets);
      })
      .catch(() => console.error("Erreur lors du chargement des tweets"));
  }, []);

  // Appelé par PublishTweet quand un tweet est posté avec succès
  const handleTweetPosted = (newTweet) => {
    setTweets((prev) => [newTweet, ...prev]);
  };

  const handleDelete = async (tweetId) => {
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

  return (
    <div className={styles.feed}>
      <PublishTweet onTweetPosted={handleTweetPosted} />

      <div className={styles.tweetList}>
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
  );
}

export default Feed;