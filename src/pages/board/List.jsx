import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardList from '../../components/Board/BoardList';
import BestBoardList from '../../components/Board/BestBoardList';
import Button from '../../components/Button';
import { PlanContainer, ButtonContainer } from '../../styles/board/listPage';

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

  // 데이터 가져오기 함수
  const fetchData = async params => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/boards/list`,
        { params } // 요청 시 파라미터를 포함
      );
      setAllBoardData(response.data); // 전체 데이터 저장
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

  // allBoardData가 존재할 경우 boardData와 pageData 분리
  const { dtoList: boardData, ...pageData } = allBoardData || {};

  const bestBoardData = boardData
    ? boardData.map(item => ({
        ...item,
        size: 10, // size를 10으로 설정
      }))
    : [];

  console.log('bestBoardData 리스트페이지', bestBoardData);

  return (
    <div className="inner">
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>BEST 게시글</h2>

      {bestBoardData.length > 0 && <BestBoardList boardData={bestBoardData} />}

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
          <Button
            color="blue"
            size="lg"
            onClick={() => navigate('/board/write')}
          >
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
