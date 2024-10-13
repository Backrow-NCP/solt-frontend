
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BoardContainer } from '../../styles/board/boardList';
import Pagination from '../../components/Board/Pagination';
import BoardItem from '../Board/BoardItem';

const BoardList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const url = `${process.env.REACT_APP_API_URL}/board/list`;
        // const params = `?page=${currentPage}&size=${itemsPerPage}`;
        // const fullUrl = url + params; // 전체 URL 확인
        // console.log('Fetching data from:', fullUrl); // 전체 URL 로그
        // const response = await axios.get(fullUrl);
        const response = await axios.get('/sampledata.json');
        console.log(response);
        setItems(response.data.dtoList); // 데이터 배열을 상태에 저장
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // currentPage와 itemsPerPage 변경 시 fetchData 호출

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
        {items.map(item => (
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default BoardList;

