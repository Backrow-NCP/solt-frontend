import React from 'react';
import BoardForm from '../../components/Board/BoardForm';

const Write = () => {
  const handleSubmit = async formData => {
    try {
      const response = await fetch('http://localhost:3000/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('서버에서 에러가 발생했습니다.');
      }

      const result = await response.json();
      console.log('게시글 작성 완료:', result);
      // 성공 시 다른 페이지로 이동하거나 알림 메시지를 보여줄 수 있습니다.
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
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
