import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BoardContainer } from '../../styles/board/boardList';
import Pagination from './Pagination';
import BoardItem from './BoardItem';

const BoardList = () => {
  const [items, setItems] = useState([]);
  const [pageData, setPageData] = useState({
    page: 1,
    size: 6,
    total: 0,
    startPage: 1,
    endPage: 3, // 최대 10개 페이지 보여주도록 설정
    prev: false,
    next: true,
  });
  const { page, size, total, startPage, endPage, prev, next } = pageData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/sampledata.json');
        const data = response.data;

        setItems(data.dtoList); // 게시글 목록 저장
        setPageData(prevData => ({
          ...prevData,
          total: data.total,
          prev: data.page > 1,
          next: data.page * size < data.total,
        }));
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []); // 처음 로드 시 데이터 가져오기

  // 현재 페이지에 해당하는 게시글만 slice로 추출
  const indexOfLastItem = page * size;
  const indexOfFirstItem = indexOfLastItem - size;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = newPage => {
    setPageData(prevData => ({
      ...prevData,
      page: newPage,
      startPage: Math.floor((newPage - 1) / 10) * 10 + 1, // 새로운 startPage 계산
      endPage: Math.min(startPage + 9, Math.ceil(total / size)), // 새로운 endPage 계산
    }));
  };

  const handleNextGroup = () => {
    setPageData(prevData => ({
      ...prevData,
      startPage: prevData.startPage + 10,
      endPage: Math.min(prevData.endPage + 10, Math.ceil(total / size)),
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
        page={page}
        total={Math.ceil(total / size)} // 전체 페이지 수
        startPage={startPage}
        endPage={endPage}
        prev={prev}
        next={next}
        onPageChange={handlePageChange} // 페이지 변경 핸들러
        onNextGroup={handleNextGroup} // 다음 그룹 핸들러
        onPrevGroup={handlePrevGroup} // 이전 그룹 핸들러
      />
    </>
  );
};

export default BoardList;
