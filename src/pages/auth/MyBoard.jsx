import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/myBoard';
import { Link } from 'react-router-dom';
import BoardItem from '../../components/Board/BoardItem';
import defaultImage from '../../assets/images/sample/nonImage.jpg';

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
      <div className="main-container">
        <nav className="sidebar">
          <Link to="/auth/mypage">
            <h2 className="size_lg weight_sb">마이페이지</h2>
          </Link>
          <ul>
            <li>
              <Link to="/auth/myplan" className="size_sm">
                나의 플랜
              </Link>
            </li>
            <li>
              <Link to="/auth/myboard" className="size_sm weight_b pt_blue">
                내가 쓴 게시글
              </Link>
            </li>
          </ul>
        </nav>

        <div className="my-board-container">
          <h1>나의 게시글</h1>
          <div className="board-items-wrapper">
            {plans.map((plan) => (
              <BoardItem
                key={plan.id}
                title={plan.title}
                content={plan.content}
                imageUrl={plan.imageUrl ? require(`../../assets/images/sample/${plan.imageUrl}`) : defaultImage}
                location={plan.location}
                date={new Date(plan.date).toLocaleDateString()}
                author={plan.author}
                duration={plan.duration}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBoard;
