import loading from "Asset/image/loading.svg";
import styled from "styled-components";

const LoadingBox = styled.div`
  width: 100%;
  overflow-y: hidden;
  display: flex;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 100%;
`;

const Loading = () => {
  return (
    <LoadingBox>
      <LoadingImg alt="loading" src={loading} />
    </LoadingBox>
  );
};

export default Loading;
