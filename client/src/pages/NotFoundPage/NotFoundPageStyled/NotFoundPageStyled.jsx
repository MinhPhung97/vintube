import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);

  & div {
    width: 250px;
  }

  & button {
    font-size: 24px;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: rgba(255, 0, 0, 0.906);
    color: #fff;
    margin-top: 12px;
    transition: all 0.5;

    &:hover {
      background-color: #4c4b16;
    }
  }
`;

export const Container = styled.div``;
