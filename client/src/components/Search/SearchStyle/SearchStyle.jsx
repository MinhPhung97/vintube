import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 9999px;
  height: 40px;
  width: 500px;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: auto;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 9999px;
  height: 40px;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: auto;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const SearchContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.borderSearch};

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.borderSearch};
  }
`;

export const Input = styled.input`
  font-size: 16px;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
`;

export const SearchIcons = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgSearchIcon};
  padding: 0 20px;
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.borderSearch};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBgSearchIcon};
  }
`;
