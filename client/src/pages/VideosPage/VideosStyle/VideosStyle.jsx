import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 640px auto;
  padding: 0 120px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 30px;
  }
`;

export const Main = styled.div``;

export const VideoWrapper = styled.div``;

export const Video = styled.video`
  width: 100%;
  max-height: 360px;
  object-fit: contain;

  @media (max-width: 576px) {
    max-height: 260px;
  }
`;

export const Heading = styled.h2`
  color: ${({ theme }) => theme.color};
  margin: 16px 0;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const Actions = styled.div``;

export const Channel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin-bottom: 12px;
  }
`;

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 999px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px 0 12px;
  max-width: 160px;
`;

export const ChannelName = styled.span`
  font-size: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 600;
  color: ${({ theme }) => theme.color};

  &:hover {
    cursor: pointer;
  }
`;

export const ChannelFollow = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const Subscribe = styled.button`
  color: ${({ theme }) => theme.bg};
  background-color: ${({ theme }) => theme.color};
  padding: 10px 18px;
  font-weight: 700;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverSubBtn};
  }
`;

export const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Like = styled.button`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.hoverBgSearchIcon};
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-content: center;
  width: 80px;
  padding: 8px 16px;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.divide};
  }
`;

export const SpanLike = styled.span`
  margin-left: 4px;
  font-weight: 800;
`;

export const Dislike = styled.button`
  position: relative;
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.hoverBgSearchIcon};
  padding: 8px 18px;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 1px;
    height: 70%;
    background-color: ${({ theme }) => theme.text};
  }

  &:hover {
    background-color: ${({ theme }) => theme.divide};
  }
`;

export const Desc = styled.div`
  margin-top: 18px;
  padding: 12px;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.borderSearch};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgBtn};
`;

export const ShowMore = styled.button`
  color: ${({ theme }) => theme.color};
  margin-top: 8px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;
`;

export const SkeletonWrapper = styled.div``;

export const SkeletonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const SkeletonInfo = styled.div`
  display: flex;
  align-items: center;

  & div {
    width: 200px;
    margin-left: 8px;
  }
`;

export const Tags = styled.div`
  margin-bottom: 8px;

  & span {
    color: #065fd4;
  }
`;

export const SkeletonAction = styled.div`
  display: flex;
  gap: 10px;
`;
