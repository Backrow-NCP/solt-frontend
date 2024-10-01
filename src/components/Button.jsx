import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  position: relative;
  padding: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '10px 18px';
      case 'lg':
        return '11px 20px';
      case 'xl':
        return '16px 20px';
      case 'xxl':
        return '20px 118px';
      default:
        return '10px 15px';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '14px';
      case 'lg':
        return '18px';
      case 'xl':
        return '20px';
      case 'xxl':
        return '24px';
      default:
        return '16px';
    }
  }};
  border-radius: ${({ size }) => (size === 'xxl' ? '16px' : '8px')};
  background-color: ${({ color }) => {
    switch (color) {
      case 'black':
        return '#121212';
      case 'white':
        return '#fff';
      case 'grey':
        return '#999';
      case 'blue':
        return '#14B8FF';
      case 'pink':
        return '#F78C9F';
      default:
        return '#121212';
    }
  }};
  color: ${({ color }) => (color === 'white' ? '#121212' : '#fff')};
  border: ${({ color }) => (color === 'white' ? '1px solid #999' : 'none')};
  text-align: center;
  line-height: 1;
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background-color: ${({ color }) => {
      switch (color) {
        case 'black':
          return '#999';
        case 'white':
          return '#f1f1f1';
        case 'grey':
          return '#121212';
        case 'blue':
          return 'rgba(20, 184, 255, 0.7)';
        case 'pink':
          return 'rgba(247, 140, 159, 0.7)';
        default:
          return '#999';
      }
    }};
  }

  &:disabled {
    background-color: #ddd !important;
    color: #fff !important;
    pointer-events: none;
    cursor: default;
  }

  /* 미디어 쿼리 */
  @media (max-width: 1215px) {
    padding: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '8px 14px';
        case 'lg':
          return '10px 16px';
        case 'xl':
          return '12px 18px';
        case 'xxl':
          return '15px 100px';
        default:
          return '8px 12px';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '11px';
        case 'lg':
          return '14px';
        case 'xl':
          return '16px';
        case 'xxl':
          return '20px';
        default:
          return '13px';
      }
    }};
    border-radius: ${({ size }) => (size === 'xxl' ? '16px' : '8px')};
  }

  @media (max-width: 700px) {
    padding: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '6px 12px';
        case 'lg':
          return '8px 14px';
        case 'xl':
          return '10px 16px';
        case 'xxl':
          return '12px 80px';
        default:
          return '6px 10px';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '10px';
        case 'lg':
          return '12px';
        case 'xl':
          return '14px';
        case 'xxl':
          return '18px';
        default:
          return '12px';
      }
    }};
  }
`;

export default Button;