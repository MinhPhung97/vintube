import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px 60px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  height: 100%;

  @media (max-width: 767px) {
    padding: 8px 0;
  }
`;

export const Avatar = styled.div`
  & img {
    height: 150px;
    width: 150px;
    border-radius: 999px;
    background-color: #ccc;
  }
`;

export const Info = styled.div`
  display: flex;

  @media (max-width: 1024px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Heading = styled.h2`
  font-size: 32px;
`;

export const Name = styled.div``;

export const SpanInfo = styled.span`
  margin-right: 12px;

  & span {
    font-weight: 600;
  }
`;

export const Channel = styled.div`
  margin-top: 12px;
`;

export const Title = styled.div`
  margin-left: 32px;
`;

export const Content = styled.div`
  margin-top: 24px;
`;

export const TabsHeading = styled.div`
  & button {
    color: ${({ theme }) => theme.color};
  }
`;

export const TabsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PrivateTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 80px;
    margin-bottom: 8px;
  }

  @media (max-width: 767px) {
    & svg {
      font-size: 40px;
    }
  }
`;
