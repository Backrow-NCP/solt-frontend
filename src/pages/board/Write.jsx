import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate
import BoardForm from '../../components/Board/BoardForm';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';
import { getMemberId, getToken } from '../../utils/token/tokenUtils'; // getToken 추가
import { FoodBank } from '@mui/icons-material';

const Write = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null); // 상태 관리

  useEffect(() => {
    setupInterceptors(setLoading);

    const token = getToken(); // 토큰 확인
    if (!token) {
      alert('로그인이 필요합니다.'); // 알림 메시지

      return; // 더 이상 실행하지 않도록 리턴
    }

    const memberId = getMemberId(); // 회원 ID 가져오기
    fetchPlanDetails(memberId); // 회원 ID를 사용하여 플랜 상세 정보를 요청
    console.log(planData);
  }, []);

  const fetchPlanDetails = async memberId => {
    try {
      const response = await apiClient.get(`/plans/list/${memberId}`);
      if (response.status === 200) {
        const { dtoList } = response.data;
        console.log('DTO List: ', dtoList);
        console.log('현재 멤버아이디: ', memberId);
        console.log('planData:', planData);
        if (dtoList.length > 0) {
          // dtoList의 모든 데이터 구조를 planData로 설정
          const planDetails = dtoList.map(plan => ({
            planId: plan.planId,
            endDate: plan.endDate,
            startDate: plan.startDate,
            title: plan.title,
            location: plan.location,
          }));
          setPlanData(planDetails); // 상태 업데이트
        }
      } else {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }
    } catch (error) {
      console.error('플랜 상세 정보 가져오기 오류:', error);
    }
  };

  const handleSubmit = async formData => {
    try {
      console.log('formData 받아오기 테스트', formData);

      // 전역 변수로 API URL 관리
      const response = await apiClient.post(
        `${process.env.REACT_APP_API_URL}/boards`,
        formData // formData를 POST 요청으로 전송
      );
      console.log(formData);

      console.log(response);

      if (response.status !== 200) {
        throw new Error('서버에서 에러가 발생했습니다.');
      }

      alert('게시글 작성이 완료되었습니다.');
      navigate('/board/List'); // 게시글 메인 페이지로 이동
      console.log('작성 완료된 formData', formData);
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="inner">
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        게시글 작성
      </h2>
      {planData ? (
        <BoardForm
          onSubmit={handleSubmit}
          buttonText="작성완료"
          planData={planData}
        />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Write;
