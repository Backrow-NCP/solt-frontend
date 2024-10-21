import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultList from '../../styles/personality/resultList';

const PersonalityResultList = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // DB에서 데이터를 가져오는 API 호출 부분
    fetch('http://localhost/personalityTest/getAllResults')
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleImageClick = resultId => {
    navigate(`/personalityTest/result/${resultId}`); // 클릭 시 이동할 경로 설정
  };

  return (
    <ResultList>
      <div className="result_inner">
        <div className="result-container">
          {results.map(result => (
            <div
              onClick={() => handleImageClick(result.resultId)} // 클릭 이벤트 핸들러 추가
              style={{ cursor: 'pointer' }} // 이미지에 마우스 커서가 포인터로 변경되도록 스타일 추가
              key={result.resultId}
              className="result-item"
            >
              <h3>{result.seasoning}</h3>
              <img
                src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${result.image}`}
                alt={result.result}
              />
            </div>
          ))}
        </div>
      </div>
    </ResultList>
  );
};

export default PersonalityResultList;
