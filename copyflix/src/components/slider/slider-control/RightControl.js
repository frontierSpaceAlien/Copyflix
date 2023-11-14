import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";
import styled from "styled-components";

const RightIcon = styled(Icon)`
  color: white;
  transition: transform 50ms linear;
  transform: scale(${(props) => (props.visible && props.scale ? "4.5" : "4")});
  visibility: ${(props) =>
    props.visible || props.visibleArrow ? "visible" : "hidden"};
`;

const RightButton = styled.button`
  position: absolute;
  display: flex;

  border-radius: 4px;
  background-color: black;
  border: rgba(0, 0, 0, 0);
  opacity: 40%;

  align-items: center;
  justify-content: center;
  width: 4.1%;
  top: 0;
  height: 100%;
  right: -4vw;

  cursor: pointer;
  color: #ffffff;
  z-index: 1;

  &:hover {
    opacity: 60%;
  }
`;

export default function RightControl(props) {
  const { slider, slideChange, onHover } = props;
  const [arrowRightVisible, setArrowRightVisibile] = useState(false);
  const [scale, setScale] = useState(false);

  function onSlideChange() {
    slider?.current?.slickNext();
    slideChange(true);
  }

  function onArrowHover() {
    setArrowRightVisibile(true);
    setScale(true);
  }

  function onArrowExit() {
    setArrowRightVisibile(false);
    setScale(false);
  }

  return (
    <RightButton
      onMouseOver={() => onArrowHover()}
      onMouseOut={() => onArrowExit()}
      onClick={() => onSlideChange()}
    >
      <RightIcon
        visible={arrowRightVisible}
        visibleArrow={onHover}
        scale={scale}
        icon={chevronRight}
      />
    </RightButton>
  );
}
