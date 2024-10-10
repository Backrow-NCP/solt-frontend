import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate
import BoardForm from '../../components/Board/BoardForm';
import axios from 'axios';

const Write = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async formData => {
    try {
      const response = await axios.post(
        'http://localhost:3001/boards',
        formData
      );

      if (response.status !== 201) {
        throw new Error('서버에서 에러가 발생했습니다.');
      }

      alert('게시글 작성이 완료되었습니다.');
      navigate('/board/List'); // 게시글 메인 페이지로 이동
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
      <BoardForm onSubmit={handleSubmit} buttonText="작성완료" />
    </div>
  );
};

export default Write;
