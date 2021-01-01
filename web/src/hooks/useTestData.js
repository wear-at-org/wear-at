import { useCallback, useEffect, useState } from 'react';
import Axios from 'api';

const useTestData = () => {
  const [testData, setTestData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const error = useCallback(
    (msg, e) => console.log(msg, e),
    [],
  );

  const refreshTestData = useCallback(() => {
    setIsLoaded(false);
  }, []);

  useEffect(() => {
    const handleDataChange = (data) => {
      if (data && Array.isArray(data)) setTestData(data);
      else setTestData([]);
    };

    const getTestData = async () => {
      if (isLoaded === false) {
        Axios.get('breeds/list/all')
          .then(({ data }) => {
            console.log('data', data);
            setIsLoaded(true);
            handleDataChange(data);
          })
          .catch((e) => {
            console.error('[getTestData] Error ::', e);
            error(
              '서버에서 데이터를 가져오는데 실패하였습니다. 다시 시도해주세요.',
              e,
            );
          });
      }
    };

    getTestData();
  }, [testData, isLoaded, error]);

  return [testData, refreshTestData];
};
export default useTestData;
