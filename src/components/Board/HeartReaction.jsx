import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'; // ReactDOM import 추가

export function HeartReaction({
  heartSize,
  icon: Icon, // 아이콘을 컴포넌트로 받기
  onSingleClick,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    const handleTap = event => {
      // heartElement를 DOM 노드가 아니라 React 요소로 정의
      const heartElement = document.createElement('div');
      heartElement.style.position = 'absolute';
      heartElement.style.userSelect = 'none';
      heartElement.style.width = `${heartSize}px`;
      heartElement.style.height = `${heartSize}px`;

      const rect = canvasElement.getBoundingClientRect();
      const tapX = event.clientX - rect.left - heartSize / 2;
      const tapY = event.clientY - rect.top - heartSize / 2;

      heartElement.style.left = `${tapX}px`;
      heartElement.style.top = `${tapY}px`;
      heartElement.style.display = 'flex';
      heartElement.style.alignItems = 'center';
      heartElement.style.justifyContent = 'center';
      heartElement.style.fontSize = `${heartSize}px`; // 크기 조정

      // MUI 아이콘을 삽입
      const iconElement = document.createElement('div'); // div로 변경
      const iconNode = document.createElement('div');
      ReactDOM.render(
        <Icon style={{ fontSize: 'inherit', color: 'red' }} />,
        iconNode
      ); // MUI 아이콘을 ReactDOM으로 렌더링

      heartElement.appendChild(iconNode); // iconNode를 heartElement에 추가

      canvasElement.appendChild(heartElement);

      // 애니메이션 적용
      const animationEffect = new KeyframeEffect(
        heartElement,
        [
          { transform: 'scale(1.3)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.1)', opacity: 1 },
          { transform: 'scale(1.1)', opacity: 0 },
          { transform: 'scale(2.2)', opacity: 0 },
        ],
        { duration: 1100, iterations: 1 }
      );

      const animationPlayer = new Animation(animationEffect, document.timeline);
      animationPlayer.play();

      // 애니메이션이 끝난 후 하트를 제거
      setTimeout(() => {
        heartElement.remove();
      }, 1050);
    };

    canvasElement.addEventListener('click', handleTap);

    return () => {
      canvasElement.removeEventListener('click', handleTap);
    };
  }, [Icon, heartSize]); // Icon으로 변경

  return (
    <div ref={canvasRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <button onClick={onSingleClick}>좋아요</button>
    </div>
  );
}
