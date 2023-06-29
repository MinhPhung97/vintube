import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f7f9;
`;

export const Container = styled.div`
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  width: auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  & h2 {
    font-size: 28px;
    margin-bottom: 8px;
  }
`;

export const Form = styled.form``;

export const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #157afe;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #a459d1;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  margin-right: 6px;
  background-color: #fff;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 12px 8px;
  margin: 12px 0;

  & input {
    flex: 1;
    font-size: 18px;
    background-color: #f7f7f7;
  }
`;

export const Divide = styled.div`
  position: relative;
  text-align: center;
  margin: 24px 0;

  & span:before {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 1px;
    width: 45%;
    background-color: #ccc;
  }

  & span:after {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    height: 1px;
    width: 45%;
    background-color: #ccc;
  }
`;

export const Service = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #f8e8ee;
    }

    & span {
      margin-left: 8px;
      font-weight: 600;
    }
  }
`;

export const SignUp = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 12px;

  & a {
    font-weight: 600;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 14px;
  margin: 4px 0 12px 0;
  color: red;
`;
