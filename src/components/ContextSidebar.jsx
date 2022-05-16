/** @format */

import React, { useEffect, useState } from "react";
import {
  Modal,
  SubNavbar,
  Typography,
  FlexWrapper,
  Button,
  LayerWhiteFirstDefault,
  LayerGreyDefault,
  Tag,
  RangeSlider,
  Divider,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 360px;
  width: 220px;
  border-radius: 18px;
  margin: 10px;
  padding: 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  right: ${({ openContextSidebar }) => (openContextSidebar ? "0px" : "-200px")};
  background-color: #f8f8f8;

  ${(props) => LayerWhiteFirstDefault}
`;

const tags = [
  { topic: "Wohnen", color: "green", unityCall: 0 },
  { topic: "Büro", color: "green", unityCall: 1 },
  { topic: "Kultur", color: "green", unityCall: 2 },
];

const ContextSidebar = ({
  unityContext,
  openContextSidebar,
  setOpenContextSidebar,
}) => {
  const [topicSelected, setTopicSelected] = useState("");
  const [scaleRangeValue, setScaleRangeValue] = useState(0.0);
  const [rotateRangeValue, setRotateRangeValue] = useState(0);

  // const handleTopicSelector = (topic, unityCall) => {
  //   setTopicSelected(topic);
  //   console.log(unityCall);
  //   unityContext.send("BuildingManager", "setTag", unityCall); // 0 = Wohnen; 1= Buero; 2 = Kultur
  // };

  const setScale = (value) => {
    if (value === "up") {
      const newValue = scaleRangeValue;
      setScaleRangeValue(newValue + 0.5);
      unityContext.send(
        "BuildingManager",
        "ScaleSliderUpdate",
        scaleRangeValue
      );
    } else if (value === "down") {
      const newValue = scaleRangeValue;
      setScaleRangeValue(newValue - 0.5);
      unityContext.send(
        "BuildingManager",
        "ScaleSliderUpdate",
        scaleRangeValue
      );
    }
  };

  const setRotate = (value) => {
    if (value === "up") {
      const newValue = rotateRangeValue;
      setRotateRangeValue(newValue - 5);
      unityContext.send(
        "BuildingManager",
        "RotateSliderUpdate",
        rotateRangeValue
      );
    } else if (value === "down") {
      const newValue = rotateRangeValue;
      setRotateRangeValue(newValue + 5);
      unityContext.send(
        "BuildingManager",
        "RotateSliderUpdate",
        rotateRangeValue
      );
    }
  };

  function deleteObject() {
    unityContext.send("BuildingManager", "DestroyObject");
    setOpenContextSidebar(false);
  }

  function deselect() {
    unityContext.send("BuildingManager", "Deselect");
  }

  return (
    <Wrapper openContextSidebar>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Typography variant="h3">Größe </Typography>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
        gap="10px"
      >
        <Button
          variant="primary"
          icon="minus"
          onClick={() => setScale("down")}
        />
        <Button variant="primary" icon="plus" onClick={() => setScale("up")} />
      </FlexWrapper>

      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Typography variant="h3">Drehen </Typography>
      </FlexWrapper>

      <FlexWrapper
        justifyContent="center"
        gap="10px"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Button
          variant="primary"
          icon="arrow"
          transform="rotate(90deg)"
          onClick={() => setRotate("down")}
        />
        <Button
          variant="primary"
          icon="arrow"
          transform="rotate(270deg)"
          onClick={() => setRotate("up")}
        />
      </FlexWrapper>

      {/* <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Typography variant="h3">Kategorie </Typography>
      </FlexWrapper>
      <FlexWrapper
        gap="10px"
        width="calc(100% - 20px)"
        margin="10px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {tags.map(({ name, color, topic, unityCall }) => (
          <Tag
            color={color}
            text={topic}
            onClick={() => handleTopicSelector(topic, unityCall)}
            active={topicSelected.includes(topic)}
          />
        ))}
      </FlexWrapper> */}
      <Divider margin="20px 0px" />
      <FlexWrapper
        gap="10px"
        width="calc(100% - 20px)"
        margin="10px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Button
          variant="secondary"
          fillWidth={true}
          text="Löschen"
          onClick={deleteObject}
        />
        <Button
          variant="primary"
          fillWidth={true}
          text="OK"
          onClick={deselect}
        />
      </FlexWrapper>
    </Wrapper>
  );
};

export default ContextSidebar;
