import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/myBoard';
import { Link } from 'react-router-dom';
import BoardItem from '../../components/Board/BoardItem';
import defaultImage from '../../assets/images/sample/nonImage.jpg';
import Sidebar from '../../components/Sidebar';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';
import { getMemberId } from '../../utils/token/tokenUtils';

const MyBoard = () => {
  const [loading, setLoading] = useState(false);
  const [boardData, setBoardData] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    setupInterceptors(setLoading);
    const memberId = getMemberId(); // 회원 ID 가져오기
    fetchBoardDetails(memberId); // 회원 ID를 사용하여 플랜 상세 정보를 요청
  }, []); // 빈 배열을 주면 컴포넌트가 처음 마운트될 때만 실행됨

  const fetchBoardDetails = async memberId => {
    setLoading(true); // 로딩 시작
    try {
      const response = await apiClient.get(`/boards/list/${memberId}`);

      if (response.status === 200) {
        const { dtoList } = response.data;
        console.log('DTO List: ', dtoList);

        if (dtoList.length > 0) {
          const boardDetails = dtoList.map(board => ({
            boardId: board.boardId,
            endDate: board.plan.endDate,
            startDate: board.plan.startDate,
            member: board.member,
            title: board.title,
            image: board.images,
            location: board.plan?.location,
            regDate: board.regDate,
            plan: board.plan,
            likeCount: board.likeCount,
            modDate: board.modDate,
          }));
          setBoardData(boardDetails); // 상태 업데이트
        }
      } else {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }
    } catch (error) {
      console.error('플랜 상세 정보 가져오기 오류:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  console.log('board', boardData);

  return (
    <>
      <MyPlanStyles />
      <div className="myboard">
        <Sidebar />
        <div className="my_board_container">
          <h1>나의 게시글</h1>
          <div className="board_items_wrapper">
            {loading ? (
              <p>로딩 중...</p> // 로딩 중 상태 표시
            ) : (
              boardData.map(board => {
                return (
                  <BoardItem
                    key={board.boardId} // 고유 ID 사용
                    board={board}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBoard;
