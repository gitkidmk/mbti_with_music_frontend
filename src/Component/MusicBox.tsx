import styled from "styled-components";
import axios from "axios";
import great from "Asset/image/great.png";
import youTube from "Asset/image/youtube.png";
import { useState } from "react";
// import useImageColor from "use-image-color";

// thumbsUpMusic store에 넣기?

async function thumbsUpMusic(
  music_id: string,
  music_name: string,
  thumbnail: string,
  mbti_name: string
) {
  try {
    await axios.post("/music/thumbs-up", {
      music_id: music_id,
      music_name: music_name,
      thumbnail: thumbnail,
      mbti_name: mbti_name,
    });
    console.log("send-perfect");
  } catch (error) {
    console.error(error);
  }
}

const MusicBox = ({
  title,
  description,
  thumbnailURL,
  videoId,
  mbti,
  great_count,
}: any) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  // const { colors } = useImageColor(thumbnailURL, { cors: true, colors: 5 });
  // console.log(colors);

  async function tryFunction() {
    try {
      await axios.get(thumbnailURL);
      console.log("send-perfect");
    } catch (error) {
      console.error(error);
    }
  }

  tryFunction();

  return (
    <MusicListBox>
      <YouTubeLinkBox
        id={mouseIsOver.toString()}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        <ThumbnailImage alt="thumbnail" src={thumbnailURL} />
        {/* <Title
          className="title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Title> */}
        <Description
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Description>
        {mouseIsOver && (
          <YouTubeImage
            id={mouseIsOver.toString()}
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${videoId}`,
                "_blank"
              )
            }
          />
        )}
      </YouTubeLinkBox>
      <ThumbsUpBox id={mouseIsOver.toString()}>
        <ThumbsUpImage
          alt="thumbs-up-image"
          src={great}
          onClick={() => thumbsUpMusic(videoId, title, thumbnailURL, mbti)}
        />
        {great_count && <ThumbsUpCount>{great_count}</ThumbsUpCount>}
      </ThumbsUpBox>
    </MusicListBox>
  );
};

export default MusicBox;

const MusicListBox = styled.div`
  width: 90%;
  height: 100px;
  background-color: #00800030;
  display: grid;
  grid-template-columns: 6fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: black;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 10px;
  height: 120px;
`;
const YouTubeImage = styled.div`
  position: absolute;
  width: 75%;
  height: 120px;
  z-index: 1;
  background-color: rgb(207, 231, 207, 0.8);
  background-image: url(${youTube});
  background-position: center;
  background-repeat: no-repeat;
`;

const YouTubeLinkBox = styled.div`
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 2fr;
  display: grid;
  width: 100%;
  height: 100%;
`;
const ThumbnailImage = styled.img`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;
const Title = styled.p`
  height: 100%;
  font-size: 13px;
  font-weight: bold;
  padding: 0px 15px 0px 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  height: 40%;
  font-size: 10px;
  padding: 0px 15px 0px 15px;
  display: flex;
  align-items: center;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  text-overflow: ellipsis;
`;

const ThumbsUpBox = styled.div`
  opacity: ${(props) => `${props.id === "true" ? 1 : 1}`};
  width: 100%;
  height: 100%;
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ThumbsUpImage = styled.img`
  height: 20%;
`;

const ThumbsUpCount = styled.div`
  margin-top: 10px;
`;
