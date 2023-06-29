import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const Container = styled.div`
  padding: 0 16px;
  overflow-y: hidden;

  &:hover {
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bg};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colorScrollBar};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;

  & span {
    font-size: 24px;
    color: ${({ theme }) => theme.color};
    font-weight: 700;
  }
`;

export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 999px;
  margin-right: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBtn};
  }
`;

export const Img = styled.img`
  height: 30px;
  margin: 0 4px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 8px;
  margin: 8px 0;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bgBtn};
  }
`;

export const Login = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.borderBtnLogin};
  color: ${({ theme }) => theme.color};
  width: 60%;
  margin-top: 12px;
  background-color: transparent;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.bgBtnLogIn};
    border-color: transparent;
    cursor: pointer;
  }
`;

export const LoginSpan = styled.span`
  max-width: 170px;
  font-size: 14px;
`;

export const LogoSpan = styled.span`
  font-size: 20px;
`;

export const ItemSpan = styled.span`
  margin-left: 8px;
`;

export const Hr = styled.hr`
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.divide};
`;

export const Title = styled.h3`
  font-size: 16px;
`;
