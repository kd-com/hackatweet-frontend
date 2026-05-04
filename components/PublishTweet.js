import styles from "../styles/PublishTweet.module.scss";
import DynamicButton from "./DynamicButton";
import { useState } from "react";
import { API } from '../lib/api';
import { useSelector } from "react-redux";


function PublishTweet({ onTweetPosted }) {
  const user = useSelector((state) => state.user.value);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const charCount = content.length;
  const isOverLimit = charCount > 280;
  const isEmpty = !content.trim();

  const handleChange = (e) => {
    setContent(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty || isOverLimit) return;

    try {
      const res = await fetch(API.publishTweet, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (data.result) {
        setContent("");
        onTweetPosted && onTweetPosted(data.tweet); // remonte le tweet au Feed
      } else {
        setError(data.error || "Impossible de poster le tweet");
      }
    } catch {
      setError("Impossible de contacter le serveur");
    }
  };

  return (
    <div className={styles.publishTweet}>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.composeRow}>
          <img
            src="/profile_defaut.avif"
            alt="avatar"
            className={styles.avatar}
          />
          <textarea
            name="publishtweet"
            rows="3"
            placeholder="Whats Up ?"
            value={content}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.footer}>
          <span className={`${styles.counter} ${isOverLimit ? styles.over : charCount > 260 ? styles.warn : ""}`}>
            {charCount}/280
          </span>
          <DynamicButton
            text="Tweet"
            className="bleu"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default PublishTweet;