import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bg};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.text};
  }
`;

export const Container = styled.div``;
