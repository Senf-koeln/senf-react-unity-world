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
  height: ${({ objectType }) => (objectType ? "455px" : "335px")};
  width: 200px;
  border-radius: 18px;
  margin: 10px;
  padding: 10px;
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
  objectType,
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
      const newValue = scaleRangeValue + 0.5;
      setScaleRangeValue(newValue);
      unityContext.send("BuildingManager", "ScaleSliderUpdate", newValue);
    } else if (value === "down") {
      const newValue = scaleRangeValue - 0.5;
      setScaleRangeValue(newValue);
      unityContext.send("BuildingManager", "ScaleSliderUpdate", newValue);
    }
  };

  const setRotate = (value) => {
    if (value === "up") {
      const newValue = rotateRangeValue - 5;
      setRotateRangeValue(newValue);
      unityContext.send("BuildingManager", "RotateSliderUpdate", newValue);
    } else if (value === "down") {
      const newValue = rotateRangeValue + 5;
      setRotateRangeValue(newValue);
      unityContext.send("BuildingManager", "RotateSliderUpdate", newValue);
    }
  };

  function scaleStreetWidth(value) {
    unityContext.send("BuildingManager", "ScaleStreetWidth", value);
  }

  function scaleStreetLength(value) {
    unityContext.send("BuildingManager", "ScaleStreetLength", value);
  }

  function deleteObject() {
    unityContext.send("BuildingManager", "DestroyObject");
    setOpenContextSidebar(false);
  }

  function deselect() {
    unityContext.send("BuildingManager", "Deselect");
    setOpenContextSidebar(false);
  }

  return (
    <Wrapper openContextSidebar objectType={objectType}>
      {objectType === "Street" ? (
        <React.Fragment>
          <FlexWrapper
            justifyContent="center"
            margin="20px"
            width="calc(100% - 40px)"
          >
            <Typography variant="h3">Länge ändern </Typography>
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
            <Button
              variant="primary"
              icon="plus"
              onClick={() => setScale("up")}
            />
          </FlexWrapper>
          <FlexWrapper
            justifyContent="center"
            margin="20px"
            width="calc(100% - 40px)"
          >
            <Typography variant="h3">Breite ändern </Typography>
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
            <Button
              variant="primary"
              icon="plus"
              onClick={() => setScale("up")}
            />
          </FlexWrapper>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
            <Button
              variant="primary"
              icon="plus"
              onClick={() => setScale("up")}
            />
          </FlexWrapper>
        </React.Fragment>
      )}

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
      <Divider margin="20px 0px 10px 0px" />
      <FlexWrapper
        gap="10px"
        width="calc(100% - 0px)"
        margin="0px"
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
