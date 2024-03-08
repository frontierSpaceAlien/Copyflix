import React, { useState } from "react";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function ModalMenu(props) {
  const { open, close, data, video } = props;
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

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
            url={`https://www.youtube.com/watch?v=${videoUrl.key}`}
          />
        </Box>
      </Modal>
    </div>
  );
}
