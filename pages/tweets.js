
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Tweets from '../components/Tweets';

function TweetsPage() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    if (!user.token) {
      router.replace('/');
    }
  }, [user, router]);

  if (!user.token) {
    return null; // ou un loader
  }

  return <Tweets />;
}

export default TweetsPage;