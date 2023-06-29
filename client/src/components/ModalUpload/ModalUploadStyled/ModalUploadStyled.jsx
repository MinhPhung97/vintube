import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgModal};
  color: ${({ theme }) => theme.color};
  height: 70vh;
  width: 60vw;
`;

export const Container = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.divide};
  padding: 10px;

  & button {
    color: ${({ theme }) => theme.color};
  }
`;

export const Content = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bgModal};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colorScrollBar};
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.divide};
  padding: 10px;
  margin-top: 8px;
  border-radius: 4px;

  & textarea {
    background-color: ${({ theme }) => theme.bgModal};
    color: ${({ theme }) => theme.color};
    margin-top: 4px;
  }
`;

export const ItemFile = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.divide};
  padding: 10px;
  border-radius: 4px;
`;

export const VideoFile = styled.div`
  & input {
    margin-top: 6px;
  }
`;

export const ImgFile = styled.div`
  & input {
    margin-top: 6px;
  }
`;

export const SubmitBtn = styled.div`
  text-align: right;
  margin-top: 8px;

  & button {
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.bgDisable};
    border-radius: 2px;
    font-weight: 500;
    font-size: 18px;
  }
`;
