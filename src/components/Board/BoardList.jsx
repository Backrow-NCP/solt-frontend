import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BoardContainer } from '../../styles/board/boardList';
import BoardItem from '../Board/BoardItem';

const BoardList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/sampledata.json'); // 로컬 JSON 파일 경로
        setItems(response.data.dtoList); // 데이터 배열을 상태에 저장
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
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
        {currentItems.map(item => (
          <BoardItem
            key={item.boardId} // boardId를 키로 사용
            title={item.title}
            content={item.content}
            imageUrl={item.images[0]?.fileName || '/sampleImage/nonImage.jpg'}
            location={item.location} // location이 필요하면 추가
            date={new Date(item.regDate).toLocaleDateString()} // 등록일을 원하는 형식으로 포맷
            author={item.member.name} // 작성자 이름
            duration={item.duration} // duration이 필요하면 추가
          />
        ))}
      </BoardContainer>

    </>
  );
};

export default BoardList;
