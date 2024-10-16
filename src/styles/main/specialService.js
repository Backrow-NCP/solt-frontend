import styled from 'styled-components';

const SpecialService = styled.section`
  margin-top: 128px;

  h2 {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
  }

  ul {
    gap: 16px;
    margin-top: 35px;

    li {
      flex: 1;
      overflow: hidden;
      border-radius: 32px;

      .cont {
        padding: 30px 40px;
        border: 1px solid #eee;
        border-radius: 32px 32px 0 0;

        h3 {
          margin-top: 18px;
          font-size: 26px;
        }
      }

      .thumb {
        overflow: hidden;
        border-radius: 0 0 32px 32px;

        img {
          width: 100%;
        }
      }
    }
  }

  /* media size */
  @media (max-width: 1650px) {
    h2 {
      font-size: 30px;
    }

    ul li .cont h3 {
      font-size: 24px;
    }
  }

  @media (max-width: 1215px) {
    h2 {
      font-size: 22px;
    }

    ul li .cont {
      padding: 20px 30px;

      h3 {
        margin-top: 10px;
        font-size: 18px;
      }
    }
  }

  @media (max-width: 700px) {
    margin-top: 100px;

    ul {
      flex-direction: column;
      gap: 20px;

      li .cont p {
        font-size: 14px;
      }
    }
  }
`;

export default SpecialService;