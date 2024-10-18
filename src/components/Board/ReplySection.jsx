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
} from '../../styles/board/replySection'; // styled-components를 가져옵니다.
import defaultProfileImage from '../../assets/images/ico/profile.png';

const ReplySection = ({ boardId }) => {
  const [mainInputValue, setMainInputValue] = useState(''); // 댓글 입력 상태
  const [replies, setReplies] = useState([]);
  const [visibleReplyInputs, setVisibleReplyInputs] = useState({}); // 각 댓글에 대한 답글 입력 가시성 관리
  const [replyInputValues, setReplyInputValues] = useState({}); // 각 답글 입력 상태 관리

  const fetchReplies = async () => {
    try {
      const response = await axios.get('/sampleReplyData.json');
      setReplies(response.data.dtoList);
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
        replyId: replies.length + 1,
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
      setReplies([...replies, newReply]);
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

    const newReply = {
      replyId: replies.length + 1,
      content: replyContent,
      boardId: boardId,
      member: {
        memberId: 0,
        name: '익명',
        birthYear: '2000-01-01T00:00:00.000Z',
        gender: true,
        fileName: 'defaultProfile.jpg',
      },
      parentReplyId: replies[replyIndex].replyId,
      regDate: new Date().toISOString(),
      modDate: new Date().toISOString(),
    };

    setReplies([...replies, newReply]);
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

  return (
    <ReplyContainer>
      <ReplySubmitContainer className="main-reply-submit">
        <ReplyCount>댓글 {replies.length}개</ReplyCount>
        <ReplyInput
          type="text"
          value={mainInputValue}
          onChange={handleMainInputChange}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton onClick={handleMainSubmit}>등록</SubmitButton>
      </ReplySubmitContainer>

      <ReplyListContainer>
        {replies.map((reply, index) => (
          <ReplyItem key={index}>
            <ProfileImage
              src={defaultProfileImage}
              alt={`${reply.member.name}의 프로필`}
            />
            <ReplyContent>
              <ReplyMeta>
                <ReplyName>{reply.member.name}</ReplyName>{' '}
                <ReplyDate>
                  {new Date(reply.regDate).toLocaleString()}
                </ReplyDate>
              </ReplyMeta>
              {reply.content}
              <br />
              <SubReplyButton onClick={() => handleSubReplyClick(index)}>
                답글달기
              </SubReplyButton>

              {visibleReplyInputs[index] && (
                <ReplySubmitContainer>
                  <ReplyInput
                    // 대댓글태그
                    type="text"
                    value={replyInputValues[index] || ''} // 해당 답글 입력값 가져오기
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
        ))}
      </ReplyListContainer>
    </ReplyContainer>
  );
};

export default ReplySection;
