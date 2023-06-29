import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.form`
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  width: 60vw;
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

export const Content = styled.div``;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.divide};
  padding: 10px;
  margin-top: 8px;
  border-radius: 4px;

  & textarea {
    background-color: ${({ theme }) => theme.bg};
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
  border-radius: 4px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

export const VideoInput = styled.div`
  border-right: 1px solid ${({ theme }) => theme.divide};
  height: 220px;
  width: 100%;

  & label {
    & svg {
      font-size: 120px;
      cursor: pointer;
    }
  }

  & input {
    display: none;
  }

  @media (max-width: 767px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.divide};
  }
`;

export const PreviewVideo = styled.div`
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const VideoPreview = styled.video`
  height: 100%;
  width: 100%;
`;

export const ImgPreview = styled.div`
  height: 220px;
  width: 100%;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  margin: 16px 0;

  & button {
    width: 100%;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.bgDisable};
    border-radius: 2px;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.color};
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
