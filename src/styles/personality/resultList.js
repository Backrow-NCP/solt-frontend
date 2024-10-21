import styled from 'styled-components';

const ResultList = styled.div`
  flex-wrap: nowrap !important;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  text-align: center;

  .result_inner {
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 수평 가운데 정렬 */
  }
  .result-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .result-item {
    background-color: rgba(20, 184, 255, 0.04);
    border-radius: 32px;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s ease-in-out;
  }

  .result-item:hover {
    transform: scale(1.05);
  }

  .result-item h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .result-item p {
    font-size: 0.9em;
    color: #555;
  }

  .result-item img {
    width: 100%;
    height: auto;
    border-radius: 32px;
    margin-top: 10px;
  }

  /* 반응형 웹 설정 */
  @media (max-width: 1200px) {
    .result-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .result-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .result-container {
      grid-template-columns: 1fr;
    }
  }
`;

export default ResultList;
