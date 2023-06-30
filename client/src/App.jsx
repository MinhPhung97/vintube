import './App.css';
import routers from '~/routers/routers.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './components/Themes/Themes';
import { useSelector } from 'react-redux';
import ScrollToTop from './hooks/scrollToTop';

function App() {
  const theme = useSelector((state) => {
    return state.themeSlice.theme;
  });
  return (
    <>
      <ThemeProvider theme={theme === true ? lightTheme : darkTheme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {routers.map((item, index) => {
              return <Route key={index} path={item.path} element={item.component} />;
            })}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
