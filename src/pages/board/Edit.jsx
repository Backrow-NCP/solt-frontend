import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardForm from '../../components/Board/BoardForm';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';
import { getMemberId } from '../../utils/token/tokenUtils';

const Edit = isEditMode => {
  const location = useLocation(); // 게시글 수정 시 기존 데이터를 받음
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null); // 플랜 데이터 상태 관리

  // location.state에서 기존 게시글 데이터 추출
  const { content, title, fileName, plan } = location.state || {};

  console.log('4개 !@#!@#', content, title, fileName, plan);

  // 현재 사용자 ID를 얻어서 플랜 데이터를 불러오기
  useEffect(() => {
    setupInterceptors(setLoading);
    const memberId = getMemberId(); // 현재 로그인된 사용자 ID 가져오기
    fetchPlanDetails(memberId); // 해당 사용자 ID로 플랜 정보 가져오기
  }, []);

  const fetchPlanDetails = async memberId => {
    try {
      const response = await apiClient.get(`/plans/list/${memberId}`);
      if (response.status === 200) {
        const { dtoList } = response.data;
        if (dtoList.length > 0) {
          const planDetails = dtoList.map(plan => ({
            planId: plan.planId,
            endDate: plan.endDate,
            startDate: plan.startDate,
            title: plan.title,
            location: plan.location,
          }));
          setPlanData(planDetails); // 플랜 데이터 상태 업데이트
        }
      } else {
        throw new Error('플랜 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('플랜 상세 정보 가져오기 오류:', error);
    }
  };

  const handleSubmit = async formData => {
    try {
      // 수정 요청을 위한 API 호출
      const response = await apiClient.put(
        `${process.env.REACT_APP_API_URL}/boards/${location.state.boardId}`, // 기존 게시글 ID로 수정 요청
        formData // 수정할 데이터
      );

      if (response.status !== 200) {
        throw new Error('게시글 수정 중 서버에서 에러가 발생했습니다.');
      }

      alert('게시글 수정이 완료되었습니다.');
      navigate('/board/List'); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const PlanData = {
    planId: plan.planId,
    startDate: plan.startDate,
    endDate: plan.endDate,
    title: plan.title,
    location: plan.location,
  };

  return (
    <div className="inner">
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        게시글 수정
      </h2>
      {/* BoardForm에 기존 데이터를 전달하여 기본값을 설정 */}
      {planData ? (
        <BoardForm
          onSubmit={handleSubmit}
          buttonText="수정완료"
          EditModeContent={content} // 기존 게시글 내용 전달
          EditModeTitle={title} // 기존 제목 전달
          EditModeFileName={fileName} // 기존 파일명 전달
          EditModePlanData={planData} // 플랜 데이터 전달
          isEditMode={true}
        />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Edit;
