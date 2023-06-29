import logo from '~/assets/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {
  Button,
  Container,
  Hr,
  Img,
  Item,
  ItemSpan,
  Login,
  LoginSpan,
  Logo,
  LogoIcon,
  Wrapper,
} from './SideBarStyle/SideBarStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '~/features/themeSlice';

function SideBar({ onClose }) {
  const userCurrent = useSelector((state) => state.userSlice.currentUser);
  const theme = useSelector((state) => state.themeSlice.theme);
  const dispatch = useDispatch();
  //theme
  const handleSetThem = () => {
    dispatch(setTheme());
    onClose();
  };
  return (
    <Wrapper>
      <Link>
        <Logo>
          <LogoIcon>
            <MenuIcon onClick={onClose} />
          </LogoIcon>
          <Img src={logo} />
          <span>Vintube</span>
        </Logo>
      </Link>
      <Container>
        <Link to="/">
          <Item onClick={onClose}>
            <HomeIcon />
            <ItemSpan>Trang chủ</ItemSpan>
          </Item>
        </Link>
        <Link to="/sub-list">
          <Item onClick={onClose}>
            <SubscriptionsIcon />
            <ItemSpan>Kênh đã đăng ký</ItemSpan>
          </Item>
        </Link>
        <Link to="/trend">
          <Item onClick={onClose}>
            <WhatshotIcon />
            <ItemSpan>Thịnh hành</ItemSpan>
          </Item>
        </Link>
        <Hr />
        {!userCurrent && (
          <>
            <Login>
              <LoginSpan>Sign in to like videos, comment, and subscribe.</LoginSpan>
              <Link to="/sign-in">
                <Button>
                  <AccountCircleIcon />
                  Đăng nhập
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Item onClick={handleSetThem}>
          {theme ? (
            <>
              <Brightness4Icon />
              <ItemSpan>Giao diện sáng</ItemSpan>
            </>
          ) : (
            <>
              <DarkModeIcon />
              <ItemSpan>Giao diện tối</ItemSpan>
            </>
          )}
        </Item>
      </Container>
    </Wrapper>
  );
}

export default SideBar;
