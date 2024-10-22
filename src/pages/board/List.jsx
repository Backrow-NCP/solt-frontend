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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards/list`,
          { params: requestParams } // 요청 시 파라미터를 포함
        );

        setAllBoardData(response.data); // 전체 데이터 저장
      } catch (err) {
        setError(err);
        console.error('데이터 가져오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestParams]); // requestParams가 변경될 때마다 데이터 재요청

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  // allBoardData가 존재할 경우 boardData와 pageData 분리
  console.log('allData', allBoardData);
  const { dtoList: boardData, ...pageData } = allBoardData || {};
  console.log('boardData', boardData);
  console.log('pageData', pageData);

  return (
    <div className="inner">
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>BEST 게시글</h2>
      {boardData && <BestBoardList boardData={boardData} />}

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

      {boardData && <BoardList boardData={boardData} pageData={pageData} />}
    </div>
  );
};

export default List;
