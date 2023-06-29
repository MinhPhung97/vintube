import { styled } from 'styled-components';

const checkType = (props) => {
  if (props.type === 'sm' || props.type === 'search') {
    return 'grid';
  } else {
    return 'flex';
  }
};

const changeLayoutSearchMobile = (props) => {
  if (props.type === 'search') return 'none';
};

export const Wrapper = styled.div`
  display: ${checkType};
  flex-direction: column;
  grid-template-columns: ${(props) => (props.type === 'sm' ? '168px auto' : '360px auto')};
  gap: 8px;
  margin: 12px 0;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 767px) {
    grid-template-columns: ${changeLayoutSearchMobile};
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const Header = styled.div`
  border-radius: 12px;
  background-color: #999;
  height: ${(props) => (props.type === 'sm' ? '94px' : '202px')};
  margin-right: ${(props) => (props.type === 'search' ? '12px' : '0')};
  width: 100%;
`;

export const Content = styled.div`
  display: ${(props) => (props.type === 'search' ? 'block' : 'flex')};
  /* margin: ${(props) => (props.type === 'sm' ? '0' : '0px 0')};  */

  @media (max-width: 767px) {
    padding: 0 8px;
  }
`;

export const Avatar = styled.img`
  display: ${(props) => (props.type === 'sm' ? 'none' : 'block')};
  width: 36px;
  height: 36px;
  background-color: #ccc;
  border-radius: 999px;
  margin-right: 8px;
  background-color: #999;
`;

export const Title = styled.div`
  margin-left: ${(props) => (props.type === 'sm' ? '4px' : '0')};
`;

export const ChannelName = styled.div`
  font-size: ${(props) => (props.type === 'sm' ? '14px' : '16px')};
  margin: ${(props) => (props.type === 'sm' ? '8px 0' : '2px 0')};
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.color};
  }

  @media (max-width: 767px) {
    margin: 0;
  }
`;

export const SpanView = styled.span`
  font-size: ${(props) => (props.type === 'sm' ? '12px' : '14px')};
  color: ${({ theme }) => theme.text};
`;

export const SpanTime = styled.span`
  font-size: ${(props) => (props.type === 'sm' ? '12px' : '14px')};
  color: ${({ theme }) => theme.text};
`;

export const Span = styled.span`
  margin: 0 4px;
  font-weight: 900;

  &:before {
    content: ' \\00B7';
    color: ${({ theme }) => theme.color};
  }
`;

export const Heading = styled.h3`
  font-size: ${(props) => (props.type === 'sm' ? '16px' : '20px')};
  color: ${({ theme }) => theme.color};
  font-weight: 700;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;
