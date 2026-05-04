import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // <-- Utilise next/router
import DisplayTweet from "../../components/DisplayTweet";
import { API } from "../../lib/api";

function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query; // Récupère le paramètre tag de l'URL
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);

  useEffect(() => {
    if (!tag) return; // Attend que tag soit disponible

    const fetchTweetsByHashtag = async () => {
      try {
        const response = await fetch(`${API.tweetList}/hashtag/${tag}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        if (data.result && Array.isArray(data.tweets)) {
          setTweets(data.tweets);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchTweetsByHashtag();
  }, [tag]);

  const updateLikedTweet = async (tweetId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API.tweetList}/like/${tweetId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLikedTweets(prev =>
          prev.includes(tweetId)
            ? prev.filter(id => id !== tweetId)
            : [...prev, tweetId]
        );
      }
    } catch (error) {
      console.error("Erreur like :", error);
    }
  };

  if (!tag) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="hashtag-page">
      <h1>#{tag}</h1>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <DisplayTweet
            key={tweet._id}
            tweetId={tweet._id}
            content={tweet.content}
            firstname={tweet.user?.firstname || "Utilisateur"}
            username={tweet.user?.username || "unknown"}
            createdAt={tweet.createdAt}
            isLiked={likedTweets.includes(tweet._id)}
            updateLikedTweet={updateLikedTweet}
          />
        ))
      ) : (
        <p>Aucun tweet avec le hashtag <strong>#{tag}</strong>.</p>
      )}
    </div>
  );
}

export default HashtagPage;