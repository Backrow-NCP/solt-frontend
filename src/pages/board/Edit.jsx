import React from 'react';
import BoardForm from '../../components/Board/BoardForm';

const Edit = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('게시글 수정 완료');
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
      <BoardForm onSubmit={handleSubmit} buttonText="수정완료" />
    </div>
  );
};

export default Edit;
