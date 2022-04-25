import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundPage = ({ err_type }: any) => {
  const navigate = useNavigate();
  return (
    <NFPDiv>
      <Title>
        {err_type === "404" ? (
          "페이지 주소를 확인해주세요! 👀"
        ) : (
          <>
            <p>서버 에러가 발생했어요...😢</p>
            <br></br>
            <p style={{ fontSize: "15px" }}>
              <span
                style={{
                  fontStyle: "oblique",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigator.clipboard.writeText(e.currentTarget.ariaValueText!);
                  window.alert("복사되었습니다!");
                }}
              >
                mkkang6123@gmail.com
              </span>
              으로 연락해주세요!
            </p>
          </>
        )}
      </Title>
      <HomeButton onClick={() => navigate("/")}>Home으로 GoGo</HomeButton>
    </NFPDiv>
  );
};

export default NotFoundPage;

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
