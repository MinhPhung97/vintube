import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../services/firebase';
import {
  Container,
  Content,
  Header,
  ImgPreview,
  Item,
  ItemFile,
  Label,
  PreviewVideo,
  SubmitBtn,
  VideoInput,
  VideoPreview,
  Wrapper,
} from './UploadPageStyled/UploadPageStyled';
import { videoService } from '../../services/videoService';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';

function UploadPage() {
  const [video, setVideo] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const navigate = useNavigate();
  const currenUser = useSelector((state) => state.userSlice.currentUser);

  // % upload file
  const [videoPerc, setVideoPerc] = useState(0);
  const [imgPerc, setImgPerc] = useState(0);

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState(undefined);

  const dispatch = useDispatch();

  const handleTags = (e) => {
    //loại bỏ khoảng trắng trước sau của các tag nhập vào
    const tagsArray = e.target.value.split(',').map((item) => {
      return item.trim();
    });

    //loại bỏ các phần tử rỗng '' trong mảng
    const arrayNotEmpty = tagsArray.filter((item) => item !== '');

    setTags(arrayNotEmpty);
  };

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //firebase - upload file
  const uploadFile = (file, type) => {
    //khởi tạo storage firebase
    const storage = getStorage(app);

    //tạo biến file là thời gian tính theo milliseconds từ năm 1970
    // (/[^A-Z0-9]+/gi, '_') loại bỏ khoảng trắng và ký tự đặc biệt
    const fileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9]+/gi, '_');

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        type === 'videoUrl' ? setVideoPerc(Math.round(progress)) : setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return {
              ...prev,
              [type]: downloadURL,
            };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      inputs.videoUrl == undefined ||
      inputs.imgUrl == undefined ||
      inputs.title == undefined ||
      inputs.desc == undefined ||
      tags == []
    ) {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng nhập đủ các trường!',
      });
    } else {
      try {
        const res = await videoService.uploadVideo({ ...inputs, tags });

        Toast.fire({
          icon: 'success',
          title: 'Upload thành công!',
        });

        navigate(`/profile/${currenUser._id}`);
      } catch (error) {
        console.log(error);
      }
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

  //handle preview video
  const previewFile = (e) => {
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes('video')) {
        setVideo(e.target.files[0]);
        setPreviewVideo(readerEvent.target.result);
      } else if (selectedFile.type.includes('image')) {
        setImg(e.target.files[0]);
        setPreviewImg(readerEvent.target.result);
      }
    };
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <h3>Tải video lên</h3>
        </Header>
        <Content>
          <ItemFile>
            <VideoInput>
              <Label>
                <label htmlFor="video">
                  <AddIcon />
                </label>
                <label htmlFor="video">Chọn video</label>
              </Label>
              <input type="file" name="video" id="video" accept="video/*" onChange={previewFile} />
            </VideoInput>
            <PreviewVideo>
              {previewVideo && <VideoPreview src={previewVideo} controls autoPlay></VideoPreview>}
            </PreviewVideo>
          </ItemFile>
          <ItemFile>
            <VideoInput>
              <Label>
                <label htmlFor="img">
                  <AddIcon />
                </label>
                <label htmlFor="img">Chọn ảnh cover</label>
              </Label>
              <input type="file" name="img" id="img" accept="image/*" onChange={previewFile} />
            </VideoInput>
            <ImgPreview>{previewImg && <img src={previewImg} alt="" />}</ImgPreview>
          </ItemFile>

          <Item>
            <label>Tiêu đề (bắt buộc)</label>
            <textarea
              rows="4"
              placeholder="Nhập tiêu đề để mô tả video của bạn."
              onChange={handleInput}
              name="title"
            />
          </Item>
          <Item>
            <label>Tags</label>
            <textarea
              rows="3"
              placeholder="Thêm tag để tìm kiếm video của bạn dễ dàng hơn, mỗi tag ngăn bởi dấu ',' ."
              onChange={handleTags}
              name="tags"
            />
          </Item>
          <Item>
            <label>Mô tả</label>
            <textarea
              name="desc"
              rows="10"
              placeholder="Giới thiệu về video của bạn."
              onChange={handleInput}
            />
          </Item>
          <SubmitBtn>
            <button onClick={handleUpload}>Tải lên</button>
          </SubmitBtn>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default UploadPage;
