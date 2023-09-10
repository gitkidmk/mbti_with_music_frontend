import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotNormalPage = () => {
  const navigate = useNavigate();
  return (
    <NFPDiv>
      <Title>
        <p>비정상적인 접근이에요 🤪</p>
      </Title>
      <HomeButton onClick={() => navigate("/")}>Home으로 GoGo</HomeButton>
    </NFPDiv>
  );
};

export default NotNormalPage;

const NFPDiv = styled.div`
  @media screen and (max-width: 768px) {
    grid-template-rows: 150px 350px 2fr;
  }
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 150px 500px 2fr;
  justify-items: center;
  align-items: center;
`;

const Title = styled.div`
  width: 90%;
  font-weight: bold;
  height: 50px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  flex-direction: column;
`;

const HomeButton = styled.div`
  width: 80%;
  font-weight: bold;
  height: 50px;
  font-size: 25px;
  color: white;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  background-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  cursor: pointer;
  &:hover {
    font-size: 28px;
  }
`;
