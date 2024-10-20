import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../../../config/AxiosConfig';
import SurveyCommon from '../../../styles/plan/survey';
import SurveyCalendar from '../../../components/Survey/SurveyCalendar';
import Button from '../../../components/Button';
import PrevBtn from '../../../assets/images/ico/btn_survey_prev.svg';

const SurveyEdit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('여행자');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [answers, setAnswers] = useState({
    calendar: null,
  });
  const [planDuration, setPlanDuration] = useState(0);
  const { planId } = useParams();

  useEffect(() => {
    setupInterceptors(setIsLoggedIn);
    getPlanData();
  }, []);

  const getPlanData = () => {
    if (planId) {
      apiClient.get(`/plans/${planId}`).then(res => {
        const fetchedData = res.data;
        sessionStorage.setItem('plan', JSON.stringify(fetchedData));

        const calculatedDuration =
          (new Date(fetchedData.endDate) - new Date(fetchedData.startDate)) /
            (1000 * 60 * 60 * 24) +
          1;

        setPlanDuration(calculatedDuration);
        setUsername(fetchedData?.member?.name || username);
      }).catch(console.error);
    }
  };

  // 날짜 선택
  const handleDateSelect = (selectedDates) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      calendar: selectedDates,
    }));
  };

  // 버튼 비활성화 여부
  const isNextButtonDisabled = () => {
    return !answers.calendar;
  };

  // Axios
  const handleFinish = async () => {
    try {
      const data = {
        startDate: answers.calendar[0],
        endDate: answers.calendar[1],
        memberId: 0,
        title: "여행 일정",
      };

      console.log(data);
      sessionStorage.setItem('surveyData', JSON.stringify(data));

      // const response = await apiClient.post('/plans/recom', data, {
      //   withCredentials: false,
      // });

      // navigate('/plan/produce');
    } catch (error) {
      console.error('서버 요청 오류 발생: ', error);
    }
  };

  // 버튼 렌더링
  const renderButtons = () => {
    return (
      <>
        <button onClick={() => navigate(-1)} className="btn_prev">
          <img src={PrevBtn} alt="이전 페이지" />
        </button>
        <Button size="xxl" color="pink" onClick={handleFinish} disabled={isNextButtonDisabled()}>
          여행 일정 확인하기
        </Button>
      </>
    );
  };

  return (
    <SurveyCommon className="inner">
      <div className="title">
        <h2>
          {username} 님의<br />
          <span className="pt_blue">여행 일정을 조정</span>해 볼게요
        </h2>
        <p className="pt_gy size_md">막막한 계획 짜기, AI 소금이가 대신 해드릴게요!</p>
      </div>

      <div className="survey_box">
        <h3 className="size_xl weight_b">여행 기간을 선택해 주세요</h3>

        {/* 날짜 선택 렌더링 */}
        <SurveyCalendar onDateSelect={handleDateSelect} selectedDates={answers.calendar} planDuration={planDuration} />
      </div>

      {/* 버튼 */}
      <div className="button flex">
        {renderButtons()}
      </div>
    </SurveyCommon>
  );
};

export default SurveyEdit;
