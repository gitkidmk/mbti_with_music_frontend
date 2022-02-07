import loading from "Asset/image/loading.svg";
import styled from "styled-components";

const LoadingImg = styled.img`
  width: 100%;
`;

const Loading = () => {
  return <LoadingImg alt="loading" src={loading} />;
};

export default Loading;
