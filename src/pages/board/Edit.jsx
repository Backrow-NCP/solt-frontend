import React from 'react';
import BoardForm from '../../components/Board/BoardForm';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';

const Edit = () => {
  const handleSubmit = e => {
    e.preventDefault();

    console.log('게시글 수정 완료');
  };
  const location = useLocation();
  const navigate = useNavigate();

  const { content, title, fileName, plan, memberId } = location.state || {};

  console.log('수정페이지 데이터', plan);
  console.log('수정페이지 데이터', memberId);

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

// 해야하는 것: navigate로 넘어왔을 때 기본 값들을 어떻게 렌더링 할것인지
// => boardForm에 데이터를 넘겨주고 섹션마다 value를 두어서 게시글 메인에서 작성페이지로 넘어왔다면
// 아무런 렌더링 안되고 게시글 조회 중 수정페이지로 이동한다면 value값들이 다 들어있는 형식으로

// 제출 시 넘겨줘야할 데이터들? 인가? => 이 경우엔 boardData를 수정페이지에서 전부 받고 제출 시 다시 전부 줘야 함
// 제출 시 수정해야할 데이터들? 인가? => 이 경우에는 데이터를 굳이 넘겨주지 않아도 저절로 렌더링 됨.
