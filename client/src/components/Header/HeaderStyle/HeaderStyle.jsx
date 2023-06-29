import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px 24px;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  z-index: 999;

  @media (max-width: 767px) {
    padding: 8px 4px;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.bgSearchMobile};
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.borderBtnLogin};
  color: ${({ theme }) => theme.color};
  margin-left: 12px;
  background-color: transparent;

  & span {
    margin-left: 4px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgBtnLogIn};
    border-color: transparent;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    margin: 0 12px;
  }
`;

export const SearchIconMobile = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  @media (max-width: 767px) {
  }
`;

export const DivEmpty = styled.div``;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & span {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
  }

  @media (max-width: 767px) {
    & span {
      font-size: 18px;
    }
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
  margin: 0 4px;
  height: 30px;

  @media (max-width: 767px) {
    height: 32px;
  }
`;

export const Profile = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 999px;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 999px;
  }

  & img {
    height: 100%;
    width: 100%;
    margin-left: 8px;
    border-radius: 999px;

    cursor: pointer;
  }

  @media (max-width: 767px) {
    margin-right: 4px;
    margin-left: 4px;
    height: 32px;
    width: 32px;

    & img {
      margin-left: 0px;
    }
  }
`;
