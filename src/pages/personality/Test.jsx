import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalityTest from '../../styles/personality/personalityTest';
import Button from '../../components/Button';

function PersonlityTest() {
  const [personalityTestData, setPersonalityTestData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [typeScores, setTypeScores] = useState({});
  const [isStarted, setIsStarted] = useState(false); // 설문 시작 여부 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/personalityTest/getTest/1')
      .then(response => response.json())
      .then(data => setPersonalityTestData(data))
      .catch(error =>
        console.error('Error fetching personality test data:', error)
      );
  }, []);

  if (!personalityTestData) {
    return <div>Loading...</div>;
  }

  // 설문이 완료되었을 때 결과 처리
  if (currentQuestionIndex >= personalityTestData.questions.length) {
    const resultData = Object.keys(typeScores).map(key => ({
      type: key.charAt(0),
      score: typeScores[key],
    }));

    fetch('http://localhost/personalityTest/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Result received:', data);
        navigate('/personalityTest/result', { state: { resultData: data } });
      })
      .catch(error => console.error('Error fetching result:', error));

    return (
      <div>
        <h2>성격 검사를 완료했습니다!</h2>
        <pre>{JSON.stringify(resultData, null, 2)}</pre>
      </div>
    );
  }

  const currentQuestion = personalityTestData.questions[currentQuestionIndex];

  const handleAnswerClick = answer => {
    setTypeScores(prevScores => {
      const { name } = answer.answerType;
      const newScore = (prevScores[name] || 0) + answer.score;
      return { ...prevScores, [name]: newScore };
    });
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  // 설문 시작 버튼 클릭 시 호출되는 함수
  const startTest = () => {
    setIsStarted(true);
  };

  // 진행률 바
  const progressPercentage =
    ((currentQuestionIndex + 1) / personalityTestData.questions.length) * 100;

  return (
    <PersonalityTest>
      <div className="test_inner">
        {/* 설문 진행 상황 표시 */}
        {isStarted && (
          <div className="bar">
            <p>
              {currentQuestionIndex + 1} /{' '}
              {personalityTestData.questions.length}
            </p>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }} // 동적으로 너비 설정
              />
            </div>
          </div>
        )}

        {/* 설문 시작 전이면 시작하기 버튼을 표시 */}
        {!isStarted ? (
          <div className="title">
            <div>
              <p className="test_size_xxs weight_md pt_gy">
                내 유형을 조미료와 비교한다면?
              </p>
              <h2 className="pt_blue weight_b">{personalityTestData.name}</h2>
              <br />
              <p className="test_size_xxs weight_md">
                나의 여행 유형을 알아보고 <br />
                나와 어울리는 여행지를 추천 받아보자!
              </p>
              <br />
            </div>

            <div className="test_main">
              <img
                src="https://kr.object.ncloudstorage.com/solt-objectstorage/board/e6cad11c-36f0-455a-9860-242a14f6ae08"
                alt="여행유형검사"
                style={{ width: '40%', height: 'auto' }} // 이미지 크기 조정
              />
            </div>
            <br />
            <Button size="xxl" color="blue" onClick={startTest}>
              시작하기
            </Button>
          </div>
        ) : (
          <div>
            <div className="question">
              <p className="test_size_lg weight_b">
                Q{currentQuestion.questionId}
              </p>

              <div class="question-image">
                <img
                  src={`https://kr.object.ncloudstorage.com/solt-objectstorage/board/${currentQuestion.image}`}
                  alt="questionImage"
                />
              </div>
              <p className="test_size_md overlay-text">
                {currentQuestion.content}
              </p>
            </div>

            <div className="answerBtn">
              {currentQuestion.answers.map(answer => (
                <Button
                  size="xl"
                  color="blue"
                  key={answer.answerID}
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer.content}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PersonalityTest>
  );
}

export default PersonlityTest;
