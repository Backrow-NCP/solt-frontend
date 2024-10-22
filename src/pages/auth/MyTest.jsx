import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import MyPersonalityTestStyles from '../../styles/auth/myPersonalityTest';
import apiClient from '../../config/AxiosConfig';
import { getMemberId } from '../../utils/token/tokenUtils';

const MyTest = () => {
  const [username, setUsername] = useState(''); // 사용자 이름만 관리
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const memberId = getMemberId();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername); // 사용자 이름 설정
    } else {
      navigate('/login');
    }
    if (memberId) {
      apiClient
        .get('/personalityTestLog/list', {
          params: { memberId }, // memberId를 쿼리 파라미터로 전송
        })
        .then(response => setResults(response.data)) // 응답 데이터 저장
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [memberId]);

  const handleImageClick = resultId => {
    navigate(`/personalityTest/result/${resultId}`); // 클릭 시 이동할 경로 설정
  };

  // 날짜 배열을 포맷팅하는 함수
  const formatDate = regDateArray => {
    if (!regDateArray || regDateArray.length < 3) return ''; // 데이터가 없을 때를 대비한 처리
    const [year, month, day] = regDateArray;
    return `${String(year).slice(2)}.${String(month).padStart(2, '0')}.${String(
      day
    ).padStart(2, '0')}`;
  };

  return (
    <>
      <MyPersonalityTestStyles />
      <div className="mytest">
        <Sidebar className="sidebar" />
        <div className="my-test-container">
          <h2>{username}님의 여행 유형검사 </h2>

          {results.length === 0 ? (
            <p
              onClick={() => navigate('/personalityTest/test')}
              style={{
                cursor: 'pointer',
                fontSize: '26px',
                textAlign: 'center',
              }}
            >
              <span className="pt_blue" style={{ marginTop: '200px' }}>
                여행 유형검사
              </span>
              를 해보세요!
            </p>
          ) : null}

          <div className="result_inner">
            <div className="result-container">
              {results.length > 0 &&
                results.map(
                  (
                    item // item에서 result를 참조
                  ) => (
                    <div
                      onClick={() => handleImageClick(item.result.resultId)} // 클릭 이벤트 핸들러 추가
                      style={{ cursor: 'pointer' }} // 이미지에 마우스 커서가 포인터로 변경되도록 스타일 추가
                      key={item.logId} // logId를 key로 사용
                      className="result-item"
                    >
                      <h3>{item.result.seasoning}</h3>
                      <p className="pt_gy" style={{ textAlign: 'right' }}>
                        {formatDate(item.regDate)}
                      </p>
                      <img
                        src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${item.result.image}`} // 이미지 URL
                        alt={item.result.result} // alt 텍스트에 result 사용
                      />
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTest;
