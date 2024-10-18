import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ReplyContainer,
  ReplyCount,
  ReplyInput,
  SubmitButton,
  ReplyListContainer,
  ReplyItem,
  ReplyContent,
  ProfileImage,
  ReplyMeta,
  ReplyDate,
  ReplyName,
  SubReplyButton,
  ReplySubmitContainer,
  ReplyEditButton,
  ReplyDeleteButton,
} from '../../styles/board/replySection'; // styled-components를 가져옵니다.
import defaultProfileImage from '../../assets/images/ico/profile.png';

const ReplySection = ({ boardId }) => {
  const [mainInputValue, setMainInputValue] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState([]); // 댓글 상태
  const [visibleReplyInputs, setVisibleReplyInputs] = useState({}); // 각 댓글에 대한 답글 입력 가시성 관리
  const [replyInputValues, setReplyInputValues] = useState({}); // 각 답글 입력 상태 관리
  const [visibleSubReplies, setVisibleSubReplies] = useState({}); // 각 댓글의 가시적인 대댓글 수
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState(boardId.content); // 초기 댓글 내용

  const fetchReplies = async () => {
    try {
      const response = await axios.get('/sampleReplyData.json');
      setComments(response.data.dtoList);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleMainInputChange = e => {
    setMainInputValue(e.target.value);
  };

  const handleMainSubmit = () => {
    if (mainInputValue.trim()) {
      const newReply = {
        replyId: comments.length + 1,
        content: mainInputValue,
        boardId: boardId,
        member: {
          memberId: 0,
          name: '익명',
          birthYear: '2000-01-01T00:00:00.000Z',
          gender: true,
          fileName: 'defaultProfile.jpg',
        },
        parentReplyId: 0,
        regDate: new Date().toISOString(),
        modDate: new Date().toISOString(),
      };
      setComments([...comments, newReply]);
      setMainInputValue(''); // 메인 입력란 초기화
    }
  };

  const handleReplyInputChange = (replyIndex, e) => {
    setReplyInputValues(prev => ({
      ...prev,
      [replyIndex]: e.target.value,
    }));
  };

  const handleReplySubmit = replyIndex => {
    const replyContent = replyInputValues[replyIndex] || ''; // 답글 입력값 가져오기

    if (!replyContent.trim()) {
      console.error('답글 내용이 비어 있습니다.'); // 유효성 검증
      return; // 빈 입력값인 경우 제출하지 않음
    }

    const newSubReply = {
      replyId: comments.length + 1, // 고유 ID 생성
      content: replyContent,
      boardId: boardId,
      member: {
        memberId: 0,
        name: '익명',
        birthYear: '2000-01-01T00:00:00.000Z',
        gender: true,
        fileName: 'defaultProfile.jpg',
      },
      parentReplyId: comments[replyIndex].replyId,
      regDate: new Date().toISOString(),
      modDate: new Date().toISOString(),
    };

    setComments(prevComments => [...prevComments, newSubReply]);
    setReplyInputValues(prev => ({
      ...prev,
      [replyIndex]: '', // 제출 후 답글 입력란 초기화
    }));
    setVisibleReplyInputs(prevState => ({
      ...prevState,
      [replyIndex]: false, // 답글 입력란 숨기기
    }));
  };

  const handleSubReplyClick = index => {
    setVisibleReplyInputs(prevState => ({
      ...prevState,
      [index]: !prevState[index], // 현재 인덱스의 가시성을 토글
    }));
  };

  // 댓글 렌더링
  const renderComments = () => {
    const allReplies = comments.map(comment => ({
      ...comment,
      isSubReply: comment.parentReplyId !== 0,
    }));

    return allReplies.map((reply, index) => {
      if (reply.parentReplyId === 0) {
        return (
          <>
            <ReplyItem key={reply.replyId}>
              <ProfileImage
                src={defaultProfileImage}
                alt={`${reply.member.name}의 프로필`}
              />
              <ReplyContent>
                <ReplyMeta>
                  <ReplyName>{reply.member.name}</ReplyName>{' '}
                  {/* 수정 및 삭제 버튼 추가 */}
                  {reply.member.memberId === 1 && ( // memberId가 1인 경우에만 버튼 표시
                    <div
                      style={{
                        marginRight: 'auto',
                        marginTop: '-1px',
                      }}
                    >
                      <ReplyEditButton
                      // onClick={handleReplyEdit}
                      >
                        수정
                      </ReplyEditButton>
                      <ReplyDeleteButton onClick={handleReplyDelete}>
                        삭제
                      </ReplyDeleteButton>
                    </div>
                  )}
                  <ReplyDate>
                    {new Date(reply.regDate).toLocaleString()}
                  </ReplyDate>
                </ReplyMeta>

                {isEditing ? (
                  <ReplySubmitContainer>
                    <ReplyInput
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)} // 댓글 내용 변경 시 상태 업데이트
                    />
                    <SubmitButton onClick={submitEditedReply}>
                      제출
                    </SubmitButton>
                  </ReplySubmitContainer>
                ) : (
                  <p>{replyContent}</p> // 댓글 내용 표시
                )}

                <SubReplyButton onClick={() => handleSubReplyClick(index)}>
                  답글달기
                </SubReplyButton>

                {visibleReplyInputs[index] && (
                  <ReplySubmitContainer>
                    <ReplyInput
                      type="text"
                      value={replyInputValues[index] || ''}
                      onChange={e => handleReplyInputChange(index, e)}
                      placeholder="답글을 입력하세요..."
                    />
                    <SubmitButton onClick={() => handleReplySubmit(index)}>
                      등록
                    </SubmitButton>
                  </ReplySubmitContainer>
                )}
              </ReplyContent>
            </ReplyItem>
            {renderSubReplies(reply.replyId)}
          </>
        );
      } else {
        return null;
      }
    });
  };

  // 대댓글 렌더링
  const renderSubReplies = parentReplyId => {
    const subReplies = comments.filter(
      subReply => subReply.parentReplyId === parentReplyId
    ); // 대댓글 필터링

    return subReplies.map((subReply, index) => {
      const isLastReply = index === subReplies.length - 1; // 마지막 대댓글 여부 확인

      return (
        <ReplyItem
          key={subReply.replyId}
          style={{
            marginLeft: '30px',
            marginBottom: isLastReply ? '30px' : '20px', // 마지막 대댓글의 경우 마진을 더 줌
            marginTop: '-5px',
          }}
        >
          <ProfileImage
            src={defaultProfileImage}
            alt={`${subReply.member.name}의 프로필`}
          />
          <ReplyContent>
            <ReplyMeta>
              <ReplyName>{subReply.member.name}</ReplyName>{' '}
              {/* 수정 및 삭제 버튼 추가 */}
              {subReply.member.memberId === 1 && ( // memberId가 1인 경우에만 버튼 표시
                <div
                  style={{
                    marginRight: 'auto',
                    marginTop: '-1px',
                  }}
                >
                  <ReplyEditButton
                  // onClick={handleReplyEdit}
                  >
                    수정
                  </ReplyEditButton>
                  <ReplyDeleteButton onClick={handleReplyDelete}>
                    삭제
                  </ReplyDeleteButton>
                </div>
              )}
              <ReplyDate>
                {new Date(subReply.regDate).toLocaleString()}
              </ReplyDate>
            </ReplyMeta>
            {subReply.content}
          </ReplyContent>
        </ReplyItem>
      );
    });
  };

  // const handleReplyEdit = (boardId, content) => {
  //   setIsEditing(boardId.replyId); // 클릭한 댓글의 ID로 수정 모드 활성화
  //   setReplyContent(prev => ({ ...prev, [boardId.replyId]: content })); // 해당 댓글의 내용을 상태에 설정
  // };

  const submitEditedReply = replyId => {
    // Axios PUT 요청으로 수정된 내용을 서버에 전송하는 코드 추가 예정
    console.log('수정된 댓글 내용:', replyContent[replyId]);
    setIsEditing(null); // 수정 모드 비활성화
  };

  const handleReplyDelete = () => {
    // 삭제 기능 구현 예정
  };

  return (
    <ReplyContainer>
      <ReplySubmitContainer className="main-reply-submit">
        <ReplyCount>댓글 {comments.length}개</ReplyCount>
        <ReplyInput
          type="text"
          value={mainInputValue}
          onChange={handleMainInputChange}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton onClick={handleMainSubmit}>등록</SubmitButton>
      </ReplySubmitContainer>

      <ReplyListContainer>
        {renderComments()} {/* 댓글과 대댓글 렌더링 */}
      </ReplyListContainer>
    </ReplyContainer>
  );
};

export default ReplySection;
