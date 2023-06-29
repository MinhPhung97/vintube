import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

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
  ErrorMessage,
} from './SignUpPageStyle/SignUpPageStyle';
import { authService } from '~/services/authService';

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const fetchSignUp = async () => {
      try {
        const res = await authService.signUp(data);

        res.status === 200 && navigate('/sign-in');

        Toast.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
        });

        reset();
      } catch (error) {
        console.log(error.response.data.message);

        Toast.fire({
          icon: 'error',
          title: error.response.data.message,
        });
      }
    };
    fetchSignUp();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input>
            <Icon>
              <PersonIcon />
            </Icon>
            <input
              type="text"
              placeholder="Full name"
              name="name"
              {...register('name', {
                required: true,
                validate: {
                  checkLength: (value) => value.length <= 10,
                  matchPattern: (value) => /^[^\s]+(\s+[^\s]+)*$/.test(value),
                },
              })}
            />
          </Input>

          <ErrorMessage>
            {errors.name?.type === 'required' && (
              <p className="errorMsg">Tên không được để trống!</p>
            )}
            {errors.name?.type === 'checkLength' && (
              <p className="errorMsg">Tên nhiều nhất 10 ký tự!</p>
            )}
            {errors.name?.type === 'matchPattern' && (
              <p className="errorMsg">Không để khoảng trắng ở đầu!</p>
            )}
          </ErrorMessage>

          <Input>
            <Icon>
              <EmailIcon />
            </Icon>
            <input
              type="text"
              placeholder="Email"
              name="email"
              {...register('email', {
                required: 'Email không được để trống!',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email không hợp lệ',
                },
              })}
            />
          </Input>
          <ErrorMessage>
            {' '}
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </ErrorMessage>
          <Input>
            <Icon>
              <VpnKeyIcon />
            </Icon>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              {...register('password', {
                required: true,
                validate: {
                  checkLength: (value) => value.length <= 8,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value),
                },
              })}
            />
            <div onClick={handleShowPassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </Input>
          <ErrorMessage>
            {errors.password?.type === 'required' && (
              <p className="errorMsg">Mật khẩu không được để trống!</p>
            )}
            {errors.password?.type === 'checkLength' && (
              <p className="errorMsg">Mật khẩu phải tối đa 8 ký tự!</p>
            )}
            {errors.password?.type === 'matchPattern' && (
              <p className="errorMsg">
                Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường, chữ số và ký tự đặc biệt!
              </p>
            )}
          </ErrorMessage>
          <Button type="submit">Sign Up</Button>
        </Form>
        <Divide>
          <span>or</span>
        </Divide>
        <Service>
          <button>
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button>
            <FacebookIcon />
            <span>FaceBook</span>
          </button>
        </Service>
        <SignUp>
          Do you already have an account? <Link to="/sign-in">Sign In</Link>
        </SignUp>
      </Container>
    </Wrapper>
  );
};

export default SignUpPage;
