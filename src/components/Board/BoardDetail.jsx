import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/sampleData.json`);

        const boardData = response.data.dtoList.find(
          item => item.boardId === parseInt(boardId)
        );
        setBoard(boardData);
      } catch (error) {
        console.error('게시물 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  if (!board) {
    return <h3>게시물 정보를 불러오는 중입니다...</h3>;
  }

  return (
    <div className="board-detail">
      <h2>{board.title}</h2>
      <p>{board.content}</p>
      <p>작성자: {board.member.name}</p>
      <img
        src={board.images[0]?.fileName || '/sampleImage/nonImage.jpg'}
        alt="게시물 이미지"
      />
      <p>위치: {board.location}</p>
      <p>기간: {board.duration}</p>
      <p>등록일: {new Date(board.regDate).toLocaleDateString()}</p>
      <p>좋아요: {board.likeCount}</p>
    </div>
  );
};

export default BoardDetail;
