import styled from "styled-components";
import great from "Asset/image/great.png";

const Modal = () => {
  return (
    <ModalOuterBox>
      <ModalBox>
        <ThumbsUpImg alt="thumbs-up" src={great} />
        <MessageBox></MessageBox>
        <CloseButton></CloseButton>
      </ModalBox>
    </ModalOuterBox>
  );
};

const ModalOuterBox = styled.div``;

const ModalBox = styled.div``;

const ThumbsUpImg = styled.img``;

const MessageBox = styled.div``;

const CloseButton = styled.button``;
export default Modal;
