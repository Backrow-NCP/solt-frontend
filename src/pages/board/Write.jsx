import React from 'react';
import BoardForm from '../../components/Board/BoardForm';

const Write = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('게시글 작성 완료');
  };

  return (
    <div className="inner">
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        게시글 작성
      </h2>
      <BoardForm onSubmit={handleSubmit} buttonText="작성완료" />
    </div>
  );
};

export default Write;
