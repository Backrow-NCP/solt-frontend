import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import planData from '../../mock/planProduce.json'; // 임시 데이터
import SurveyCommon from '../../styles/plan/survey';

import SurveyCalendar from './SurveyCalendar';
import SurveyArea from './SurveyArea';
import SurveyKeyword from './SurveyKeyword';
import SurveyPlace from './SurveyPlace';
import Button from '../../components/Button';

import PrevBtn from '../../assets/images/ico/btn_survey_prev.svg';

const Survey = () => {
  const navigate = useNavigate();

  // 질문
  const questions = [
    { id: 1, type: 'calendar', question: '여행 기간을 선택해 주세요' },
    { id: 2, type: 'area', question: '가고 싶은 지역을 선택해 주세요', tip: '베타 버전에서는 서울만 볼 수 있어요 🙂' },
    { id: 3, type: 'keywords', question: '마음에 드는 키워드를 선택해 주세요', tip: '3개 이상 선택해 주세요' },
    { id: 4, type: 'place', question: '꼭 가보고 싶었던 장소가 있었다면 적어주세요', tip: '없다면 다음 페이지로 넘어가도 괜찮아요' },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    calendar: null,
    area: '서울특별시',
    keywords: {
      travelStyle: [],
      theme: [],
      environment: [],
    },
    place: [],
  });

  // 날짜 선택
  const handleDateSelect = (selectedDates) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      calendar: selectedDates,
    }));
  };

  // 지역 선택
  const handleAreaSelect = (selectedArea) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      area: selectedArea,
    }));
  };

  // 키워드 선택
   const handleKeywordSelect = useCallback(keywords => {
      setAnswers(prevAnswers => ({
         ...prevAnswers,
         keywords: {
            travelStyle: keywords.travelStyle,
            theme: keywords.theme,
            environment: keywords.environment,
         },
        }));
      }, []);

  // 장소 선택 핸들러 추가
  const handlePlaceSelect = (places) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      place: places,
    }));
  };

  // 버튼 비활성화 여부
   const isNextButtonDisabled = () => {
      const questionType = questions[questionIndex].type;

      if (questionType === 'calendar') {
         return !answers.calendar;
      } else if (questionType === 'keywords') {
         const { travelStyle, theme, environment } = answers.keywords;
         return travelStyle.length === 0 || theme.length === 0 || environment.length === 0;
      }
      return false;
   };

  // 질문 렌더링
  const renderQuestion = () => {
    const question = questions[questionIndex];

    switch (question.type) {
      case 'calendar':
        return (
          <SurveyCalendar onDateSelect={handleDateSelect} selectedDates={answers.calendar} />
        );
      case 'area':
        return (
          <SurveyArea onAreaSelect={handleAreaSelect} selectedArea={answers.area} />
        );
      case 'keywords':
        return (
          <SurveyKeyword onKeywordSelect={handleKeywordSelect} savedKeywords={answers.keywords} />
        );
      case 'place':
        return (
          <SurveyPlace onPlaceSelect={handlePlaceSelect} />
        );
      default:
        return null;
    }
  };

  // 버튼 핸들러
  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };
  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };
  const handleFinish = async () => {
    try {
      const data = {
        calendar: answers.calendar,
        area: answers.area,
        keywords: answers.keywords,
        place: answers.place,
      };

      const response = await axios.post('/api/survey', data);
      console.log('응답 ', response.data);

      navigate('/plan/produce');
    } catch (error) {
      console.log('데이터 오류 발생', error);
      navigate('/plan/produce');
    }
  };

  // 버튼 렌더링
  const renderButtons = () => {
    if (questionIndex === 0) {
      return (
        <Button
          size="xxl"
          color="blue"
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          다음 페이지
        </Button>
      );
    } else if (questionIndex === questions.length - 1) {
      return (
        <>
          <button onClick={handlePrev} className="btn_prev">
            <img src={PrevBtn} alt="이전 페이지" />
          </button>
          <Button size="xxl" color="pink" onClick={handleFinish}>
            여행 일정 확인하기
          </Button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handlePrev} className="btn_prev">
            <img src={PrevBtn} alt="이전 페이지" />
          </button>
          <Button
            size="xxl"
            color="blue"
            onClick={handleNext}
            disabled={isNextButtonDisabled()}
          >
            다음 페이지
          </Button>
        </>
      );
    }
  };

  return (
    <SurveyCommon className="inner">
      <div className="title">
        <h2>
            {planData.member.name} 님을 위한<br />
          <span className="pt_blue">맞춤 여행 일정</span>을 만들어 볼게요
        </h2>
        <p className="pt_gy size_md">막막한 계획 짜기, AI 소금이가 대신 해드릴게요!</p>
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
        <h3 className="size_xl weight_b">{questions[questionIndex].question}</h3>
        {questions[questionIndex].tip && (
          <p className="tip size_sm pt_gy">{questions[questionIndex].tip}</p>
        )}

        {/* 질문 렌더링 */}
        {renderQuestion()}
      </div>

      {/* 버튼 */}
      <div className="button flex">
        {renderButtons()}
      </div>
    </SurveyCommon>
  );
};

export default Survey;