import { styled } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 60px;

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
  }
`;

export const SkeletonWrapper = styled.div``;

export const SkeletonContent = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const SkeletonTitle = styled.div`
  margin-left: 12px;
`;
