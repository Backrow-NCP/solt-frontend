import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BoardContainer } from '../../styles/board/boardList';
import Pagination from './Pagination';
import BoardItem from './BoardItem';

const BoardList = () => {
  const [items, setItems] = useState([]);
  const [pageData, setPageData] = useState({}); // 초기값 없이 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards/list`
        );
        const data = response.data;

        setItems(data.dtoList); // 게시글 목록 저장
        setPageData({
          page: data.page,
          size: data.size,
          total: data.total,
          startPage: data.startPage,
          endPage: data.endPage,
          prev: data.prev, // prev 값을 JSON에서 직접 가져오기
          next: data.next, // next 값을 JSON에서 직접 가져오기
        });
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [pageData.page]);

  // 현재 페이지에 해당하는 게시글만 slice로 추출
  const indexOfLastItem = pageData.page * pageData.size;
  const indexOfFirstItem = indexOfLastItem - pageData.size;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = newPage => {
    setPageData(prevData => ({
      ...prevData,
      page: newPage,
      startPage: Math.floor((newPage - 1) / 10) * 10 + 1, // 새로운 startPage 계산
      endPage: Math.min(
        prevData.startPage + 9,
        Math.ceil(prevData.total / prevData.size)
      ), // 새로운 endPage 계산
    }));
  };

  const handleNextGroup = () => {
    setPageData(prevData => ({
      ...prevData,
      startPage: prevData.startPage + 10,
      endPage: Math.min(
        prevData.startPage + 19, // endPage를 startPage + 19로 수정
        Math.ceil(prevData.total / prevData.size)
      ),
    }));
  };

  const handlePrevGroup = () => {
    setPageData(prevData => ({
      ...prevData,
      startPage: Math.max(prevData.startPage - 10, 1),
      endPage: Math.max(prevData.endPage - 10, 10), // 최소 10으로 설정
    }));
  };

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        게시글이 없습니다.
      </h3>
    );
  }

  return (
    <>
      <BoardContainer>
        {currentItems.map(item => (
          <BoardItem
            key={item.boardId}
            item={item}
            boardId={item.boardId} // boardId를 키로 사용
            title={item.title}
            content={item.content}
            imageUrl={item?.images[0]?.fileName || '/sampleImage/nonImage.jpg'}
            location={item.location} // location이 필요하면 추가
            date={new Date(item.regDate).toLocaleDateString()} // 등록일을 원하는 형식으로 포맷
            author={item.member.name} // 작성자 이름
            duration={item.duration} // duration이 필요하면 추가
          />
        ))}
      </BoardContainer>

      <Pagination
        page={pageData.page}
        size={pageData.size}
        total={pageData.total}
        startPage={pageData.startPage}
        endPage={pageData.endPage}
        prev={pageData.prev} // JSON에서 가져온 prev 값
        next={pageData.next} // JSON에서 가져온 next 값
        onPageChange={handlePageChange} // 페이지 변경 핸들러
        onNextGroup={handleNextGroup} // 다음 그룹 핸들러
        onPrevGroup={handlePrevGroup} // 이전 그룹 핸들러
      />
    </>
  );
};

export default BoardList;
