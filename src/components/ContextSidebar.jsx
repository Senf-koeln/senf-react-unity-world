/** @format */

import React, { useEffect, useState } from "react";
import {
  Modal,
  SubNavbar,
  Typography,
  FlexWrapper,
  Button,
  LayerGreyDefault,
  Tag,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 200px;
  border-radius: 18px;
  margin: 10px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  right: ${({ openContextSidebar }) => (openContextSidebar ? "0px" : "-200px")};
  background-color: #f8f8f8;
`;

const tags = [
  { topic: "Wohnen", color: "green", unityCall: 0 },
  { topic: "Büro", color: "green", unityCall: 1 },
  { topic: "Kultur", color: "green", unityCall: 2 },
];

const ContextSidebar = ({ unityContext, openContextSidebar }) => {
  const [topicSelected, setTopicSelected] = useState("");

  const handleTopicSelector = (topic, unityCall) => {
    setTopicSelected(topic);
    console.log(unityCall);
    unityContext.send("BuildingManager", "setTag", unityCall); // 0 = Wohnen; 1= Buero; 2 = Kultur
  };

  return (
    <Wrapper openContextSidebar>
      <FlexWrapper justifyContent="center" margin="20px">
        <Typography variant="h2">Beschreibung hinzufügen </Typography>
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
      </FlexWrapper>
    </Wrapper>
  );
};

export default ContextSidebar;
