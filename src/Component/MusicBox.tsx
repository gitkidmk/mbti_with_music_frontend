import styled, { keyframes } from "styled-components";
import axios from "axios";
import { ReactComponent as ThumbsUp } from "Asset/image/thumbsUp.svg";
import youTube from "Asset/image/youtube.png";
import { useState, useEffect, useRef } from "react";
import useColorThief, { FormatString } from "use-color-thief";

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
  const [stringColor, setStringColor] = useState("#000000");
  const imgRef = useRef<any>();
  // https://lokeshdhakar.com/projects/color-thief/#getting-started
  let googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

  let test_src = googleProxyURL + encodeURIComponent(thumbnailURL);
  type Types = {
    color: any;
    palette: any;
  };
  const { color, palette }: Types = useColorThief(test_src, {
    format: FormatString.hex,
  });

  useEffect(() => {
    console.log("Color:", color);
    let white = 0xffffff;
    if (color !== null) {
      let now_color = parseInt(color.substr(1), 16);
      console.log(white, now_color, white - Number(now_color));
      let str_color = (white - Number(now_color)).toString(16);
      setStringColor("#" + str_color);
    }
  }, [palette, color]);

  return (
    <MusicListBox id={color?.toString()}>
      <YouTubeLinkBox
        id={mouseIsOver.toString()}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        {mouseIsOver && (
          // <YouTubeImage
          //   id={stringColor}
          //   onClick={() =>
          //     window.open(
          //       `https://www.youtube.com/watch?v=${videoId}`,
          //       "_blank"
          //     )
          //   }
          // />
          <YouTubeImage
            title="youtube"
            id="player"
            width="640"
            height="360"
            src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
          ></YouTubeImage>
        )}
        <ThumbnailImgBox>
          <ThumbnailImage alt="thumbnail" src={test_src} ref={imgRef} />
        </ThumbnailImgBox>
        <Title id={stringColor} property={title.length.toString()}>
          <p dangerouslySetInnerHTML={{ __html: title }}></p>
        </Title>
      </YouTubeLinkBox>
      <ThumbsUpBox>
        <ThumbsUp
          fill={stringColor}
          style={{ height: "50px", width: "50px" }}
          onClick={() => thumbsUpMusic(videoId, title, thumbnailURL, mbti)}
        />
        {great_count && (
          <ThumbsUpCount id={stringColor}>{great_count}</ThumbsUpCount>
        )}
      </ThumbsUpBox>
    </MusicListBox>
  );
};

export default MusicBox;

const MusicListBox = styled.div`
  @media screen and (max-width: 300px) {
    min-width: 200px;
  }
  position: relative;
  min-width: 300px;
  height: 320px;
  padding: 10px;
  background-color: ${(props) =>
    `${props.id === "null" ? "#00800030" : props.id}`};
  display: grid;
  grid-template-rows: 230px 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const YouTubeImage = styled.iframe`
  position: absolute;
  width: 300px;
  height: 165px;
  /* z-index: 1; */
  background-color: ${(props) => props.id + "55"};
  background-position: center;
  background-repeat: no-repeat;
`;

const YouTubeLinkBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`;

const ThumbnailImgBox = styled.div`
  width: 100%;
  height: 165px;
  overflow: hidden;
`;
const ThumbnailImage = styled.img`
  width: 100%;
  height: 190px;
  margin-top: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  object-fit: cover;
  object-position: 10% 10%;
`;

const boxSlide = keyframes`
  from {
    left: 100%;
  }
  to {
    left: -100%;
  }
`;

const noSlide = keyframes`
  from {
    margin-left: 0%;
  }
  to {
    margin-left: 0%;
  }
`;

const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  & > p {
    position: relative;
    width: 200px;
    font-size: 13px;
    font-weight: bold;
    padding: 0px 15px 0px 15px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    text-align: center;
    display: table-cell;
    color: ${(props) => props.id};
    animation: ${(props) => (Number(props.property) > 40 ? boxSlide : noSlide)}
      10s infinite linear;
    margin: auto;
  }
`;

const ThumbsUpBox = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ThumbsUpCount = styled.div`
  margin-top: 10px;
  color: ${(props) => props.id};
`;
