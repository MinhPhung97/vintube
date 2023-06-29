import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '~/assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Menu, MenuItem } from '@mui/material';
import SideBar from '~/components/SideBar/SideBar';
import UploadIcon from '@mui/icons-material/Upload';
import Search from '../Search/Search';
import SearchIcon from '@mui/icons-material/Search';

import {
  Button,
  Container,
  Wrapper,
  DivEmpty,
  ButtonContent,
  Logo,
  Img,
  SearchWrapper,
  LogoIcon,
  Profile,
  SearchIconMobile,
} from './HeaderStyle/HeaderStyle';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { localService } from '~/services/localService';
import { logout } from '~/features/userSlice';
import SearchMobile from '../SearchMobile/SearchMobile';
import Swal from 'sweetalert2';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathName = useLocation();
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCurrent = useSelector((state) => state.userSlice.currentUser);

  //Drawer
  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  //drop down profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //logout
  const handleLogout = () => {
    //check vị trí hiện tại có phải ở profile hay không
    //nếu phải navigate ra sign-in còn không thì reload lại trang
    if (pathName.pathname.split('/')[1] === 'profile') {
      navigate('/sign-in');
    } else {
      navigate(0);
    }
    setAnchorEl(null);
    localService.remove();
    dispatch(logout());
  };

  //search mobile
  const handleSearchMobile = () => {
    setShowSearchMobile(!showSearchMobile);
  };

  //handle navigate upload
  const handleNavigateUpload = () => {
    if (userCurrent !== null) {
      navigate('/upload');
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng đăng nhập!',
      });
    }
  };

  //thông báo
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return (
    <Wrapper>
      {showSearchMobile ? (
        <SearchMobile handleSearchMobile={handleSearchMobile} />
      ) : (
        <Container>
          <Logo>
            <LogoIcon onClick={handleToggleDrawer}>
              <MenuIcon />
            </LogoIcon>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Img src={logo} />
              <span>Vintube</span>
            </NavLink>
          </Logo>
          <SearchWrapper>
            <Search />
          </SearchWrapper>
          <DivEmpty />
          <ButtonContent>
            <SearchIconMobile onClick={handleSearchMobile}>
              <SearchIcon />
            </SearchIconMobile>

            <Button onClick={handleNavigateUpload}>
              <UploadIcon />
              <span>Tải lên</span>
            </Button>

            {userCurrent === null ? (
              <>
                <Link to="/sign-in">
                  <Button>
                    <AccountCircleIcon />
                    <span>Đăng nhập</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Profile>
                <div
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <img
                    src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                    alt=""
                  />
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={`/profile/${userCurrent._id}`}>Kênh của bạn</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <div>Đăng xuất</div>
                  </MenuItem>
                </Menu>
              </Profile>
            )}
          </ButtonContent>
        </Container>
      )}

      <Drawer anchor={'left'} open={openDrawer} onClose={handleToggleDrawer}>
        <SideBar onClose={handleToggleDrawer} />
      </Drawer>
    </Wrapper>
  );
};

export default Header;
