import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.divide};
  margin-bottom: 24px;

  @media (max-width: 1023px) {
    padding-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.divide};
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0;
  color: ${({ theme }) => theme.color};
`;

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 16px;
  border-radius: 999px;
  cursor: pointer;
`;

export const NewComment = styled.div`
  display: flex;
  align-items: center;
`;

export const NewCommentBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 6px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  position: relative;
  font-size: 14px;
  width: 100%;
  padding: 12px 0;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.divide};

  &:focus {
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme }) => theme.text};
  }
`;

export const CancelBtn = styled.button`
  color: ${({ theme }) => theme.color};
  padding: 8px 12px;
  background-color: transparent;
  border-radius: 999px;
  cursor: pointer;
  margin-right: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBtn};
  }
`;

export const CommentBtn = styled.button`
  color: ${({ theme }) => theme.bgBtn};
  background-color: ${({ theme }) => theme.bgDisable};
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.hoverDisable};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.bgBtn};
    color: ${({ theme }) => theme.textDisable};
  }
`;

export const Loading = styled.div`
  text-align: center;
`;
