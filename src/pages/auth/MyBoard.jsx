import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/myBoard';
import { Link } from 'react-router-dom';
import BoardItem from '../../components/Board/BoardItem';
import defaultImage from '../../assets/images/sample/nonImage.jpg';
import Sidebar from '../../components/Sidebar';

const MyBoard = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/mock/myBoard.json')
      .then((response) => response.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <>
      <MyPlanStyles />
      <div className="myboard">
        <Sidebar />
        <div className="my_board_container">
          <h1>나의 게시글</h1>
          <div className="board_items_wrapper">
            {plans.map((plan) => (
              <BoardItem
                key={plan.id}
                board={{
                  boardId: plan.id,
                  title: plan.title,
                  content: plan.content,
                  images: plan.imageUrl ? [plan.imageUrl] : [],
                  location: plan.location,
                  regDate: plan.date,
                  member: { name: plan.author },
                  duration: plan.duration,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBoard;
