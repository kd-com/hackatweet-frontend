import styles from "../styles/DisplayTweet.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link"; // <-- Utilise next/link

function DisplayTweet(props) {
  const handleLikedTweet = () => {
    if (props.tweetId) props.updateLikedTweet(props.tweetId);
  };

  // Fonction pour séparer le texte et les hashtags
  const formatContentWithHashtags = () => {
    if (!props.content) return [];

    const parts = [];
    const regex = /#(\w+)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(props.content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          value: props.content.substring(lastIndex, match.index),
        });
      }
      parts.push({
        type: "hashtag",
        value: match[0],
        tag: match[1],
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < props.content.length) {
      parts.push({
        type: "text",
        value: props.content.substring(lastIndex),
      });
    }

    return parts;
  };

  const getFormattedDate = () => {
    if (!props.createdAt) return "il y a quelques instants";
    try {
      const date = new Date(props.createdAt);
      return isNaN(date.getTime())
        ? "date invalide"
        : formatDistanceToNow(date, { locale: fr, addSuffix: true });
    } catch {
      return "date invalide";
    }
  };

  return (
    <div className={styles.displayTweet}>
      <div className={styles.userDisplay}>
        <img
          src="/profile_defaut.avif"
          alt={`${props.firstname || "Utilisateur"} ${props.username || ""}`}
          className={styles.user_img}
        />
        <p>
          {props.firstname || "Utilisateur"}
          <span>
            @{props.username || "unknown"} - {getFormattedDate()}
          </span>
        </p>
      </div>
      <p className={styles.content}>
        {formatContentWithHashtags().map((part, index) => (
          part.type === "hashtag" ? (
            <Link
              key={index}
              href={`/hashtag/${part.tag}`} // <-- Utilise href pour Next.js
              className={styles.hashtag}
            >
              {part.value}
            </Link>
          ) : (
            <span key={index}>{part.value}</span>
          )
        ))}
      </p>
      <div className={styles.actions}>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLikedTweet}
          className={`${styles.like} ${props.isLiked ? styles.liked : ""}`}
        />
      </div>
    </div>
  );
}

export default DisplayTweet;