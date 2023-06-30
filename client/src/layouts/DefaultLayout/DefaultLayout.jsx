import Header from '~/components/Header/Header.jsx';
import { Container, Wrapper } from './DefaultLayoutStyle/DefaultLayoutStyle';

const DefaultLayout = ({ Component }) => {
  return (
    <Wrapper id="app">
      <Container>
        <Header />
        {Component}
      </Container>
    </Wrapper>
  );
};

export default DefaultLayout;
