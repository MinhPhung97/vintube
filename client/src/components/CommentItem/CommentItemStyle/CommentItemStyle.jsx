import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => theme.color};
`;

export const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.div`
  margin-right: 16px;
`;

export const Avatar = styled.img`
  flex: 1;
  height: 40px;
  width: 40px;
  border-radius: 999px;
  background-color: #999;
  cursor: pointer;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 8px;
`;

export const SpanName = styled.span`
  margin-right: 8px;
  font-weight: 500;
`;

export const SpanDate = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
`;

export const Text = styled.span`
  font-size: 14px;
`;

export const ShowMore = styled.div`
  color: ${({ theme }) => theme.text};
  margin-top: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Action = styled.div`
  & button {
    background-color: transparent;
    color: ${({ theme }) => theme.color};

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    margin-left: 8px;
  }
`;
