import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px 60px;

  @media (max-width: 767px) {
    margin: 0;
  }
`;
