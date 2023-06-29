import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;

  & svg {
    cursor: pointer;
  }

  & svg:nth-child(2) {
    margin-right: 20px;
    font-size: 20px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.borderSearch};
  border-radius: 9999px;
  padding: 0px 12px;
  margin-left: 8px;

  & input {
    flex: 1;
    background-color: transparent;
    padding: 8px 0;
    color: ${({ theme }) => theme.color};
  }
`;
