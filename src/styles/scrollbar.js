import { css } from 'styled-components';

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 5px;
  }
`;