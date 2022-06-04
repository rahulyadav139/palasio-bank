import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useFetch = path => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(path, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, [token, path]);
  return {
    loading,
    error,
    profile,
  };
};
export { useFetch };
