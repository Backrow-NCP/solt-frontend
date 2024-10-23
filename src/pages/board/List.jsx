import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiNoToken } from '../../config/AxiosConfig';
import BoardList from '../../components/Board/BoardList';
import BestBoardList from '../../components/Board/BestBoardList';
import Button from '../../components/Button';
import { PlanContainer, ButtonContainer } from '../../styles/board/listPage';
import { getToken } from '../../utils/token/tokenUtils';

const List = () => {
  const navigate = useNavigate();
  const [allBoardData, setAllBoardData] = useState(null); // 전체 보드 데이터를 위한 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 요청할 초기값 설정
  const [requestParams, setRequestParams] = useState({
    page: 1, // 기본값: 1페이지
    size: 6, // 기본값: 6개
  });
  const [bestRequestParams, setBestRequestParams] = useState({
    page: 1,
    size: 5,
    order: "l",
  });

  const handleWriteButton = () => {
    if (getToken()) {
      navigate('/board/write');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  // 데이터 가져오기 함수
  const fetchData = async params => {
    try {
      apiNoToken.get(`/boards/list`, { params }) // 요청 시 파라미터를 포함
      .then(res => {
        console.log('전체 게시글:', res.data);
        setAllBoardData(res.data); // 전체 데이터 저장
      }).catch(console.error);
    } catch (err) {
      setError(err);
      console.error('데이터 가져오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 요청
  useEffect(() => {
    fetchData(requestParams);
  }, [requestParams]);

  // 페이지 변경 핸들러
  const onPageChange = newPage => {
    setRequestParams(prevParams => ({
      ...prevParams,
      page: newPage, // 페이지 값만 변경
    }));
  };

  // 다음 그룹으로 이동
  const onNextGroup = () => {
    setRequestParams(prevParams => ({
      ...prevParams,
      page: prevParams.page + 1, // 다음 페이지로 이동
    }));
  };

  // 이전 그룹으로 이동
  const onPrevGroup = () => {
    setRequestParams(prevParams => ({
      ...prevParams,
      page: prevParams.page - 1, // 이전 페이지로 이동
    }));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  const { dtoList: boardData, ...pageData } = allBoardData || {};

  return (
    <div className="inner">
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>BEST 게시글</h2>

      <BestBoardList bestRequestParams={bestRequestParams}/>

      <PlanContainer>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '100px',
            marginBottom: '20px',
          }}
        >
          플랜 자랑하기
        </h2>
        <ButtonContainer>
          <Button color="blue" size="lg" onClick={() => handleWriteButton()}>
            글 작성
          </Button>
        </ButtonContainer>
      </PlanContainer>

      {boardData && (
        <BoardList
          boardData={boardData}
          pageData={pageData}
          onPageChange={onPageChange} // 페이지 변경 핸들러 전달
          onNextGroup={onNextGroup} // 다음 그룹 핸들러 전달
          onPrevGroup={onPrevGroup} // 이전 그룹 핸들러 전달
        />
      )}
    </div>
  );
};

export default List;
