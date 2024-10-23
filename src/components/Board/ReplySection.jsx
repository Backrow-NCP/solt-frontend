import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import Pagination from './Pagination';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';

const ReplySection = ({ boardId }) => {
  const [mainInputValue, setMainInputValue] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState([]); // 댓글 상태
  const [visibleReplyInputs, setVisibleReplyInputs] = useState({}); // 각 댓글에 대한 답글 입력 가시성 관리
  const [replyInputValues, setReplyInputValues] = useState({}); // 각 답글 입력 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState({}); // 초기 댓글 내용 및 수정 댓글 내용 저장
  const [pageData, setPageData] = useState({});
  const indexOfLastItem = pageData.page * pageData.size;
  const indexOfFirstItem = indexOfLastItem - pageData.size;
  const pageSize = 5; // 요청할 사이즈
  const [requestParams, setRequestParams] = useState({
    page: 1, // 기본값: 1페이지
    size: 5, // 기본값: 6개
  });
  useEffect(() => {
    const fetchReplies = async params => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/replies/list/${boardId}`,
          { params: requestParams } // 페이지는 1, 사이즈는 5로 요청
        );
        const data = response.data;
        console.log('불러온 댓글 데이터', data);
        console.log('불러온 댓글 페이지데이터', pageData);

        setComments(data?.dtoList || []);
        setPageData({
          page: data.page,
          size: data.size,
          total: data.total,
          startPage: data.startPage,
          endPage: data.endPage,
          prev: data.prev,
          next: data.next,
        });
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies(); // 페이지 1로 첫 요청
  }, [requestParams, boardId]); // boardId가 변경될 때마다 댓글을 새로 가져옴

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
        parentReplyId: null,
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
        name: '',
        birthYear: '2000-01-01T00:00:00.000Z',
        gender: true,
        fileName: 'defaultProfile.jpg',
      },
      parentReplyId: comments[replyIndex].replyId,
      regDate: new Date().toISOString(),
      modDate: new Date().toISOString(),
    };

    console.log(
      '새로운 답글 테스트 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:',
      newSubReply
    );

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
  const renderComments = size => {
    console.log('댓글 목록:', comments);
    const allReplies = comments.map(comment => ({
      ...comment,
      isSubReply: comment.parentReplyId !== null,
    }));

    let count = 0;

    return allReplies.map((reply, index) => {
      if (reply.parentReplyId === null && count < size) {
        // 부모 댓글인 경우
        count++;
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
                        onClick={() => handleReplyEdit(reply, reply.content)}
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

                {isEditing === reply.replyId ? (
                  <>
                    {console.log('isEditing 모드 실행@@@@@', reply.replyId)}
                    <ReplySubmitContainer>
                      <ReplyInput
                        value={replyContent[reply.replyId]} // 초기값 설정
                        onChange={e =>
                          setReplyContent(prev => ({
                            ...prev,
                            [reply.replyId]: e.target.value,
                          }))
                        } // 댓글 내용 변경 시 상태 업데이트
                      />
                      <SubmitButton
                        onClick={() => submitEditedReply(reply.replyId)}
                      >
                        수정
                      </SubmitButton>
                    </ReplySubmitContainer>
                  </>
                ) : (
                  <p>{reply.content}</p>
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
            {renderSubReplies(reply.replyId, size - count)}
          </>
        );
      } else {
        return null;
      }
    });
  };

  // 대댓글 렌더링
  const renderSubReplies = (parentReplyId, size) => {
    const subReplies = comments.filter(
      subReply => subReply.parentReplyId === parentReplyId
    ); // 대댓글 필터링

    let count = 0;

    return subReplies.map((subReply, index) => {
      if (count < size) {
        // 대댓글 출력 갯수 체크
        count++;
        const isLastReply = index === subReplies.length - 1;
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
                      onClick={() =>
                        handleReplyEdit(subReply, subReply.content)
                      }
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
              {isEditing === subReply.replyId ? (
                <ReplySubmitContainer>
                  <ReplyInput
                    value={replyContent[subReply.replyId] || ''} // 초기값 설정
                    onChange={
                      e =>
                        setReplyContent(prev => ({
                          ...prev,
                          [subReply.replyId]: e.target.value,
                        })) // 대댓글 내용 변경 시 상태 업데이트
                    }
                  />
                  <SubmitButton
                    style={{
                      padding: '6px 10px', // 패딩을 조정하여 버튼 크기 조절
                      fontSize: '13px', // 글자 크기 조절
                    }}
                    onClick={() => submitEditedReply(subReply.replyId)}
                  >
                    수정
                  </SubmitButton>
                </ReplySubmitContainer>
              ) : (
                <p>{subReply.content}</p>
              )}
            </ReplyContent>
          </ReplyItem>
        );
      }
      return null; // 조건에 해당하지 않을 경우 null 반환
    });
  };

  const handleReplyEdit = (reply, content) => {
    if (isEditing === reply.replyId) {
      setIsEditing(null); // 수정 모드 비활성화
    } else {
      setIsEditing(reply.replyId); // 클릭한 댓글의 ID로 수정 모드 활성화
      setReplyContent(prev => ({ ...prev, [reply.replyId]: content })); // 해당 댓글의 내용을 상태에 설정
    }
  };

  const submitEditedReply = replyId => {
    //실제 로직은 axios put
    const updatedContent = replyContent[replyId]; // 수정된 내용 가져오기
    console.log('수정된 댓글 내용:', updatedContent);
    setIsEditing(null); // 수정 모드 비활성화
  };

  const handleReplyDelete = () => {
    // 삭제 기능 구현 예정
  };

  const onPageChange = newPage => {
    setRequestParams(prevParams => ({
      ...prevParams,
      page: newPage, // 페이지 값만 변경
    }));
  };

  // 다음 그룹으로 이동
  const onNextGroup = () => {
    setPageData(prevData => ({
      ...prevData,
      startPage: prevData.startPage + 10,
      endPage: Math.min(
        prevData.startPage + 19, // endPage를 startPage + 19로 수정
        Math.ceil(prevData.total / prevData.size)
      ),
    }));
  };

  // 이전 그룹으로 이동
  const onPrevGroup = () => {
    setPageData(prevData => ({
      ...prevData,
      startPage: Math.max(prevData.startPage - 10, 1),
      endPage: Math.max(prevData.endPage - 10, 10), // 최소 10으로 설정
    }));
  };

  if (!comments.length) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <ReplyContainer>
      <ReplySubmitContainer className="main-reply-submit">
        <ReplyCount>댓글 {pageData?.total}개</ReplyCount>
        <ReplyInput
          type="text"
          value={mainInputValue}
          onChange={handleMainInputChange}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton onClick={handleMainSubmit}>등록</SubmitButton>
      </ReplySubmitContainer>

      <ReplyListContainer>
        {renderComments(pageData.size)} {/* 댓글과 대댓글 렌더링 */}
        <Pagination
          pageData={pageData}
          onPageChange={onPageChange} // 페이지 변경 핸들러
          onNextGroup={onNextGroup} // 다음 그룹 핸들러
          onPrevGroup={onPrevGroup} // 이전 그룹 핸들러
        />
      </ReplyListContainer>
    </ReplyContainer>
  );
};

export default ReplySection;
