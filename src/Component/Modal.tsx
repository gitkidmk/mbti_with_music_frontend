import styled from "styled-components";
import great from "Asset/image/great.png";

const Modal = ({ music_name }: any) => {
  return (
    <ModalOuterBox>
      <ModalBox>
        <ThumbsUpImg alt="thumbs-up" src={great} />
        <MessageBox>
          <MusicName>{music_name}</MusicName> 노래를 이미 추천했어요!
        </MessageBox>
        <CloseButton>OK</CloseButton>
      </ModalBox>
    </ModalOuterBox>
  );
};

const ModalOuterBox = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff9e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  width: 90%;
  height: 200px;
  background: rgba(249, 242, 203, 0.651);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ThumbsUpImg = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const MessageBox = styled.div`
  margin-bottom: 10px;
`;

const MusicName = styled.span`
  font-weight: bold;
`;

const CloseButton = styled.button`
  background-color: rgb(2, 90, 77);
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
export default Modal;
