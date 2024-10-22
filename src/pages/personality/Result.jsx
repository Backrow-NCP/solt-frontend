import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PersonalityTest from '../../styles/personality/personalityTest';
import Button from '../../components/Button';
import apiClient from '../../config/AxiosConfig';

function PersonalityResult() {
  const { resultId } = useParams(); // URL에서 resultId를 가져옵니다.
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(
    location.state?.resultData || null
  ); // location.state에 데이터가 있으면 사용하고 없으면 null
  const [isLoading, setIsLoading] = useState(!resultData); // 만약 location.state에 resultData가 있으면 로딩 불필요

  useEffect(() => {
    if (!resultData) {
      // resultData가 없으면 백엔드에서 데이터를 가져옴
      setIsLoading(true);
      apiClient
        .get(`/personalityTest/result/${resultId}`)
        .then(response => {
          setResultData(response);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching result data:', error);
          setIsLoading(false);
        });
    }
  }, [resultId, resultData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!resultData) {
    return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>;
  }

  const handleRetry = () => {
    navigate('/PersonalityTest/Test');
  };

  const handleResultAll = () => {
    navigate('/personalityTest/getAllResults');
  };

  return (
    <PersonalityTest>
      <div className="test_inner">
        {/* 시즈닝, 요약 */}
        <div className="result_title">
          <p className="size_xl weight_sb">{resultData.explainSeasoning}</p>
          <h2
            className="pt_blue weight_b"
            style={{ fontSize: '3rem', marginTop: '5px', marginBottom: '10px' }}
          >
            {resultData.seasoning}
          </h2>
          <div className="test_result">
            <img
              src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${resultData.image}`}
              alt="Result"
            />
          </div>
          <div className="result_content size_xl">
            <p className="pt_blue weight_sb">{resultData.description}</p>
            <br />
            <p>{resultData.summary}</p>
          </div>
        </div>
        {/* 여행지 추천 */}

        <h2 style={{ marginTop: '100px', marginBottom: '10px' }}>
          추천 여행지
        </h2>
        <br />
        <div className="result_box">
          <div className="test_flex">
            {resultData.spots.map((spot, index) => (
              <span key={index}>
                <span className="size_xl pt_blue weight_b">
                  {spot.spotName}
                </span>
                {''}
                <span className="size_lg weight_sb"> {spot.country}</span>

                <br />
                <br />
                <div className="spot">
                  <img src={spot.image} alt="recomSpot" />
                </div>
              </span>
            ))}
          </div>
          <br />
          <p className="size_lg">{resultData.recommendation}</p>
        </div>
      </div>
      <br />
      {/* 여행 메이트 추천 */}
      <h2 style={{ marginTop: '100px', marginBottom: '10px' }}>여행 메이트</h2>
      <br />
      <div className="result_box">
        <div className="test_flex">
          <div>
            <p className="size_xl">여행 찰떡궁합😀</p>
            <p className="size_xl weight_b">
              {resultData.matchPersonality.seasoning}💕
            </p>
            <br />

            <div className="test_match">
              <img
                src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${resultData.matchPersonality.image}`}
                alt="Match Personality"
              />
            </div>
          </div>
          <div>
            <p className="size_xl">같이 여행은 좀😔</p>

            <p className="size_xl weight_b">
              {resultData.misMatchPersonality.seasoning}💔
            </p>
            <br />
            <div className="test_match">
              <img
                src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${resultData.misMatchPersonality.image}`}
                alt="Mismatch Personality"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="result_btn">
        <Button size="xl" color="white" onClick={handleResultAll}>
          모든 유형 보기
        </Button>
        <Button size="xl" color="white" onClick={handleRetry}>
          다시 하기
        </Button>
      </div>
    </PersonalityTest>
  );
}

export default PersonalityResult;
