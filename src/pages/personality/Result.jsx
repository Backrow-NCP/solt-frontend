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
  const [showModal, setShowModal] = useState(false); // 모달창 상태 관리

  useEffect(() => {
    if (!resultData) {
      // resultData가 없으면 백엔드에서 데이터를 가져옴
      setIsLoading(true);
      apiClient
        .get(`/personalityTest/result/${resultId}`)
        .then(response => {
          setResultData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching result data:', error);
          setIsLoading(false);
        });
    }
  }, [resultId, resultData]);

  useEffect(() => {
    // Kakao SDK 스크립트 초기화
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity =
      'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('f8c87e98b1681fdfebc8b2c91e9da7ff'); // 카카오 JavaScript 키
      }
    };
    document.head.appendChild(script);
  }, []);

  const initializeKakaoButton = () => {
    if (window.Kakao) {
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: '여행 유형 테스트',
          description: `${resultData.seasoning} - ${resultData.description}`,
          imageUrl: `https://kr.object.ncloudstorage.com/solt-objectstorage/board/${resultData.image}`,
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: `http://localhost:3000/personalityTest/result/${resultData.resultId}`,
              webUrl: `http://localhost:3000/personalityTest/result/${resultData.resultId}`,
            },
          },
          {
            title: '나도 해보기',
            link: {
              mobileWebUrl: 'http://localhost:3000/personalityTest/test',
              webUrl: 'http://localhost:3000/personalityTest/test',
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (resultData) {
      initializeKakaoButton();
    }
  }, [resultData]);

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

  const handleShare = () => {
    const shareLink = 'http://localhost:3000'; // 현재 페이지 링크
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowModal(true); // 링크 복사 후 모달 창 표시
      setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
    });
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
        <Button size="xl" color="white" onClick={handleShare}>
          <img
            src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/1947c4a5-d48e-490f-a0cb-9db7d4060399`}
            alt="ShareButton"
          />
        </Button>
        <a
          id="kakaotalk-sharing-btn"
          href="javascript:;"
          style={{ marginLeft: '10px' }}
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
        </a>
      </div>
      {showModal && (
        <div className="modal">
          <p>링크가 복사되었습니다!</p>
        </div>
      )}
    </PersonalityTest>
  );
}

export default PersonalityResult;
