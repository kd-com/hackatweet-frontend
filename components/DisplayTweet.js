import styles from "../styles/DisplayTweet.module.scss";
import { useSelector } from "react-redux";
import { API } from '../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faH, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';


function DisplayTweet({ tweet, onDelete, onLike }) {
  const user = useSelector((state) => state.user.value);

  const isOwner = tweet.user?.username === user.username;
  const isLiked = tweet.likes?.includes(user.username); // username stocké dans le store Redux
  const likesCount = tweet.likes?.length ?? 0;

  const formattedDate = new Date(tweet.createdAt).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <img
          src={user.url_profile}
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.authorInfo}>
          <span className={styles.firstname}>{tweet.user?.firstname}</span>
          <span className={styles.username}>@{tweet.user?.username}</span>
        </div>
      </div>

      <p className={styles.tweetContent}>{tweet.content}</p>

      {tweet.hashtags?.length > 0 && (
        <div className={styles.hashtags}>
          {tweet.hashtags.map((tag, i) => (
            <span key={i} className={styles.hashtag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.tweetFooter}>
        <div className={styles.tweetFooterBtn}>
          <button
          className={`${styles.likeBtn} ${isLiked ? styles.liked : ""}`}
          onClick={() => onLike(tweet._id)}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className={styles.likeCount}>{likesCount}</span>
        </button>
          {isOwner && (
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(tweet._id)}
            title="Supprimer"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        </div>
        
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default DisplayTweet;