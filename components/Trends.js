import styles from "../styles/Trends.module.scss";
import DynamicButton from "./DynamicButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from '../lib/api';
import { useRouter } from 'next/router';


function Trends() {
    const [trends, setTrends] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch(`${API.getTrends}`)
        .then(res => res.json())
        .then(data => {
            if (!data.result) {
                setError("No Trends found");
                setTrends([]);
            } else {
                setTrends(data.trends);
                setError('');
            }
        });
    }, []);

  return (
    <div className={styles.trends}>
      

      {error && <p>{error}</p>}

      {trends.map((trend, i) => (
        <div 
          key={i}
          onClick={() => router.push(`/hashtags/${trend.hashtag}`)}
          style={{ cursor: "pointer" }}
        >
          <p>#{trend.hashtag}</p>
          <span>{trend.count} tweet(s)</span>
        </div>
      ))}

    </div>
  );
}
export default Trends;