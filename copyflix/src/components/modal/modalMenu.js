import React, { useState } from "react";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaPlay } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";

export default function ModalMenu(props) {
  const { open, close, data, video } = props;
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const style = {
    position: "absolute",
    left: "15%",
    top: "1%",
    paddingBottom: "4%",
    width: "70%",
    height: "fit-content",
    userSelect: "none",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 0px #000000",
    overflow: "hidden",
    backgroundColor: "#181818",
    outline: "none",
  };

  const styleVideo = {
    position: "absolute",
    left: "10%",
    top: "10%",
    width: "80%",
    height: "70%",
    userSelect: "none",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 0px #000000",
    backgroundColor: "black",
    outline: "none",
  };

  const handleOpen = (data) => {
    setOpenVideo(true);
    setVideoUrl(data);
  };

  const handleClose = () => setOpenVideo(false);

  return (
    <div>
      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={close}
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0,0,0, 0.6)" },
          },
        }}
      >
        <Box sx={style}>
          <img
            className="modalImage"
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            alt={"backdropImage"}
          />
          <p className="modalTitle">{data.title}</p>
          <div className="modalButtons">
            <FaPlay
              style={{ marginRight: "6%", marginLeft: "20%" }}
              size={"1.3vw"}
            />
            <p>Play</p>
          </div>
          <div className="modalButtonExtra">
            <BsPlusCircle size={"2.5vw"} className="addList" />
            <BsHandThumbsUp size={"2.5vw"} className="userRate" />
          </div>
          <div className="modalMediaInfo">
            <div className="modalRatings">
              <p className="modalInfo" style={{ color: "#43c662" }}>
                {Math.round(data.vote_average * 10) / 10}/10
              </p>
              <p className="modalInfo" style={{ color: "#A3A3A3" }}>
                {data.original_language === undefined
                  ? ""
                  : data.original_language.toUpperCase()}
              </p>
              <p className="modalInfo" style={{ color: "#A3A3A3" }}>
                {data.release_date}
              </p>
            </div>
            <div className="modalInfoContainer">
              <p className="modalInfo">{data.overview}</p>
            </div>
            <div className="modalCastContainer">
              <p className="modalCast" style={{ color: "#676767" }}>
                Vote Count:
              </p>
              <p className="voteCount">{data.vote_count}</p>
              <p className="modalCast" style={{ color: "#676767" }}>
                Genres:
              </p>
              <p className="genreModal">
                {data.genre_ids === undefined ? "" : data.genre_ids.join(", ")}
              </p>
              <p className="modalCast" style={{ color: "#676767" }}>
                Popularity Score :
              </p>
              <p className="popularityScore">{Math.floor(data.popularity)}</p>
            </div>
          </div>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              marginLeft: "4%",
              fontSize: "1.5vw",
            }}
          >
            Trailer(s)
          </p>
          <div className="modalVideo">
            {video.length < 1 || video === undefined ? (
              <p
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1vw",
                }}
              >
                No Trailers Found
              </p>
            ) : (
              video.map((data) => (
                <div className="thumbnailContainer">
                  <img
                    className="thumbnailImage"
                    src={`https://img.youtube.com/vi/${data.key}/mqdefault.jpg`}
                    alt="Thumbnail"
                    draggable="false"
                    onClick={() => handleOpen(data)}
                  />
                  <div className="play">
                    <FaPlay size={"3vw"} onClick={() => handleOpen(data)} />
                  </div>
                </div>
              ))
            )}
          </div>
          ,
        </Box>
      </Modal>
      {/* SEPARATE THIS INTO ANOTHER FILE */}
      <Modal
        style={{ overflow: "scroll" }}
        open={openVideo}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0,0,0, 0.6)" },
          },
        }}
      >
        <Box sx={styleVideo}>
          <p style={{ color: "white", paddingLeft: "1%" }}>{videoUrl.name}</p>
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            controls={true}
            volume={0.3}
            playing={openVideo}
            url={`https://www.youtube.com/watch?v=${videoUrl.key}`}
          />
        </Box>
      </Modal>
    </div>
  );
}
