import { useSelector } from 'react-redux';

const useSend = () => {
  const token = useSelector(state => state.auth.token);

  const sendData = async (path, body) => {
    let data, error, status;
    try {
      const res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      status = res.status;

      console.log(typeof status);

      data = await res.json();
    } catch (err) {
      error = err;
    }
    return { data, error, status };
  };

  return { sendData };
};
export { useSend };
