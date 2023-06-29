import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { localService } from '~/services/localService';
import { auth, providerGoogle, providerFacebook } from '~/services/firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import {
  Form,
  Input,
  Wrapper,
  Button,
  Divide,
  Service,
  SignUp,
  Icon,
  Container,
} from './SignInPageStyle/SignInPageStyle';
import { authService } from '~/services/authService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/features/userSlice';
import { useState } from 'react';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fetchSignIn = async () => {
      try {
        const result = await authService.signIn(data);
        dispatch(loginSuccess(result.data));
        localService.set(result.data.access_token);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.message);

        Toast.fire({
          icon: 'error',
          title: error.response.data.message,
        });
      }
    };
    fetchSignIn();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //login = googleAuth
  const handleSignInWithPopupGoogle = async () => {
    signInWithPopup(auth, providerGoogle)
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          img: res.user.photoURL,
        };
        axios;
        authService
          .thirdAuth(userInfo)
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //login = facebookAuth
  const handleSignInWithPopupFacebook = async () => {
    signInWithPopup(auth, providerFacebook)
      .then((res) => {
        const userInfo = {
          name: res.user.providerData[0].displayName,
          email: res.user.providerData[0].email,
          img: res.user.providerData[0].photoURL,
        };
        authService
          .thirdAuth(userInfo)
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //popup thông báo
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return (
    <Wrapper>
      <Container>
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input>
            <Icon>
              <EmailIcon />
            </Icon>
            <input type="text" placeholder="Email" name="email" {...register('email')} />
          </Input>

          <Input>
            <Icon>
              <VpnKeyIcon />
            </Icon>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              {...register('password')}
            />
            <div onClick={handleShowPassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </Input>
          <Button type="submit">Sign In</Button>
        </Form>
        <Divide>
          <span>or</span>
        </Divide>
        <Service>
          <button onClick={handleSignInWithPopupGoogle}>
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button onClick={handleSignInWithPopupFacebook}>
            <FacebookIcon />
            <span>FaceBook</span>
          </button>
        </Service>
        <SignUp>
          Don't you have an account? <Link to="/sign-up">Sign Up</Link>
        </SignUp>
      </Container>
    </Wrapper>
  );
};

export default SignInPage;
