
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Tweets() {
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

  return <div>Page des tweets</div>;
}

export default Tweets;