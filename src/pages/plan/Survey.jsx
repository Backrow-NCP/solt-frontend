import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';

// 컴포넌트
import SurveyCommon from '../../styles/plan/survey';
import SurveyCalendar from '../../components/Survey/SurveyCalendar';
import SurveyArea from '../../components/Survey/SurveyArea';
import SurveyKeyword from '../../components/Survey/SurveyKeyword';
import SurveyPlace from '../../components/Survey/SurveyPlace';
import Button from '../../components/Button';
import Loading from './Loading';

import PrevBtn from '../../assets/images/ico/btn_survey_prev.svg';

const Survey = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('여행자');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    setupInterceptors(setIsLoading);
    checkLoginStatus();
  }, []);

  // 로그인 체크 (username)
  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      try {
        const response = await apiClient.get('/members', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 서버에서 받은 memberId가 있는지 확인
        if (response.data && response.data.memberId) {
          setMemberId(response.data.memberId);
        } else {
          console.error('memberId를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('memberId를 가져오는 중 오류가 발생했습니다:', error);
      }
    } else {
      setIsLoggedIn(false);
      setUsername('여행자');
      setMemberId(null);
    }
    setIsLoading(false);
  };

  // 질문
  const questions = [
    { id: 1, type: 'calendar', question: '여행 기간을 선택해 주세요' },
    {
      id: 2,
      type: 'area',
      question: '가고 싶은 지역을 선택해 주세요',
      tip: '베타 버전에서는 서울만 볼 수 있어요 🙂',
    },
    {
      id: 3,
      type: 'keywords',
      question: '마음에 드는 키워드를 선택해 주세요',
      tip: '3개 이상 선택해 주세요',
    },
    {
      id: 4,
      type: 'place',
      question: '꼭 가보고 싶었던 장소가 있었다면 적어주세요',
      tip: '없다면 다음 페이지로 넘어가도 괜찮아요',
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    calendar: null,
    location: '서울특별시',
    keywords: {
      travelStyle: [],
      theme: [],
      environment: [],
    },
    place: [],
  });

  // 날짜 선택
  const handleDateSelect = selectedDates => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      calendar: selectedDates,
    }));
  };

  // 지역 선택
  const handleAreaSelect = selectedArea => {
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
  const handlePlaceSelect = places => {
    const formattedPlaces = places.map(place => ({
      placeName: place.name,
      // addr: place.address,
    }));

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      place: formattedPlaces,
    }));
  };

  // 버튼 비활성화 여부
  const isNextButtonDisabled = () => {
    const questionType = questions[questionIndex].type;

    if (questionType === 'calendar') {
      return !answers.calendar;
    } else if (questionType === 'area') {
      return !answers.area;
    } else if (questionType === 'keywords') {
      const { travelStyle, theme, environment } = answers.keywords;
      return (
        travelStyle.length === 0 ||
        theme.length === 0 ||
        environment.length === 0
      );
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
      case 'area':
        return (
          <SurveyArea
            onAreaSelect={handleAreaSelect}
            selectedArea={answers.area}
          />
        );
      case 'keywords':
        return (
          <SurveyKeyword
            onKeywordSelect={handleKeywordSelect}
            savedKeywords={answers.keywords}
          />
        );
      case 'place':
        return <SurveyPlace onPlaceSelect={handlePlaceSelect} />;
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

  // Axios
  const handleFinish = async () => {
    try {
      // 테마 배열
      const themes = [
        ...answers.keywords.travelStyle.map(item => item.id),
        ...answers.keywords.theme.map(item => item.id),
        ...answers.keywords.environment.map(item => item.id),
      ];

      // 날짜 선택
      const startDate =
        answers.calendar && answers.calendar[0]
          ? answers.calendar[0].toISOString().split('T')[0]
          : null;
      const endDate =
        answers.calendar && answers.calendar[1] !== null
          ? answers.calendar[1]?.toISOString().split('T')[0]
          : startDate;

      const data = {
        title: answers.area || '맞춤 플랜',
        memberId: memberId || 0,
        places: answers.place.map(place => ({
          placeName: place.placeName,
          // "addr": place.addr || "주소 정보 없음",
        })),
        themes: themes,
        location: answers.area || '서울특별시',
        startDate: startDate,
        endDate: endDate,
      };

      console.log('전송할 데이터: ', data);

      // 서버 전송
      const response = await apiClient.post('/plans/recom', data, {
        withCredentials: false,
      });
      response.data.places.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      response.data.routes.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      sessionStorage.setItem('planData', JSON.stringify(response.data));
      console.log('응답: ', response.data);

      // 이동
      navigate('/plan/produce');
    } catch (error) {
      console.error('요청 오류: ', error);
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

  if (isLoading) return <Loading />;

  return (
    <SurveyCommon className="inner">
      <div className="title">
        <h2>
          {username} 님을 위한
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
        {questions[questionIndex].tip && (
          <p className="tip size_sm pt_gy">{questions[questionIndex].tip}</p>
        )}

        {/* 질문 렌더링 */}
        {renderQuestion()}
      </div>

      {/* 버튼 */}
      <div className="button flex">{renderButtons()}</div>
    </SurveyCommon>
  );
};

export default Survey;
