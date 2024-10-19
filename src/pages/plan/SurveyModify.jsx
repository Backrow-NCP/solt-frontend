import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyCommon from '../../styles/plan/survey';

import SurveyCalendar from './SurveyCalendar';
import Button from '../../components/Button';

import axios from 'axios';

const SurveyModify = () => {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  // 회원 이름
  const [userName, setUserName] = useState('');
  const [planDuration, setPlanDuration] = useState(0);

  useEffect(() => {
    console.log(answers.calendar);
    setUserName('소금');
    axios
      .get(`http://localhost/plans/${surveyId}`)
      .then(response => {
        const fetchedData = response.data;
        sessionStorage.setItem('plan', JSON.stringify(fetchedData));

        const calculatedDuration =
          (new Date(fetchedData.endDate) - new Date(fetchedData.startDate)) /
            (1000 * 60 * 60 * 24) +
          1;

        setPlanDuration(calculatedDuration);
        setUserName(fetchedData?.member?.name || '소금'); // memberData에서 firstName을 설정
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
      });
  }, []);

  // 질문
  const questions = [
    { id: 1, type: 'calendar', question: '여행 기간을 선택해 주세요' },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    calendar: null,
  });

  // 날짜 선택
  const handleDateSelect = selectedStartDate => {
    const endDate = new Date(selectedStartDate);
    endDate.setDate(endDate.getDate() + planDuration - 1); // Automatically set end date

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      calendar: { start: selectedStartDate, end: endDate },
    }));
  };

  // 버튼 비활성화 여부
  const isNextButtonDisabled = () => {
    const questionType = questions[questionIndex].type;
    if (questionType === 'calendar') {
      return !answers.calendar;
    }
    return false;
  };

  // 질문 렌더링
  const renderQuestion = () => {
    const question = questions[questionIndex];

    switch (question.type) {
      case 'calendar':
        return (
          <SurveyCalendar
            onDateSelect={handleDateSelect}
            selectedDates={answers.calendar}
          />
        );
      default:
        return null;
    }
  };

  // 버튼 핸들러
  const handleFinish = async () => {
    try {
      const data = {
        calendar: answers.calendar,
      };

      // const response = await axios.post('/api/survey', data);
      // console.log('응답 ', response.data);

      navigate(`/plan/produce/${surveyId}`);
    } catch (error) {
      console.log('데이터 오류 발생', error);
      navigate(`/plan/produce/${surveyId}`);
    }
  };

  // 버튼 렌더링
  const renderButtons = () => {
    return (
      <Button
        size="xxl"
        color="pink"
        onClick={handleFinish}
        disabled={isNextButtonDisabled()}
      >
        여행 일정 확인하기
      </Button>
    );
  };

  return (
    <SurveyCommon className="inner">
      <div className="title">
        <h2>
          {userName} 님을 위한
          <br />
          <span className="pt_blue">맞춤 여행 일정</span>을 만들어 볼게요
        </h2>
        <p className="pt_gy size_md">
          막막한 계획 짜기, AI 소금이가 대신 해드릴게요!
        </p>
      </div>

      <div className="survey_box">
        {/* 질문 타이틀 영역 */}
        <div className="pagination">
          {questions.map((question, index) => (
            <span
              key={index}
              className={`${index === questionIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>
        <h3 className="size_xl weight_b">
          {questions[questionIndex].question}
        </h3>

        {/* 질문 렌더링 */}
        {renderQuestion()}
      </div>

      {/* 버튼 */}
      <div className="button flex">{renderButtons()}</div>
    </SurveyCommon>
  );
};

export default SurveyModify;
