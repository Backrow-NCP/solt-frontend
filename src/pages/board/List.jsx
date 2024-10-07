import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardList from '../../components/Board/BoardList';
import BestBoardList from '../../components/Board/BestBoardList';
import Button from '../../components/Button';
import { PlanContainer, ButtonContainer } from '../../styles/board/listPage';
import boardData from '../../data/board.json';

const List = () => {
  const navigate = useNavigate();

  return (
    <div className="inner">
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>BEST 게시글</h2>
      <BestBoardList />

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

      <BoardList items={boardData} />
    </div>
  );
};

export default List;
