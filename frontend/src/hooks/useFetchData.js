import { useState, useEffect, useCallback } from 'react';
import { sendHttpRequest } from '../web/meals';

export default function useFetchData(request, initialData=null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      setError(null);
      try {
        const resData = await sendHttpRequest(request, data);
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [request]
  );

  useEffect(() => {
    if (request.method == 'get') {
      sendRequest();
    }
  }, [request, sendRequest]);

  return {
    data,
    isLoading,
    error,
    clearData,
    sendRequest,
  };
}