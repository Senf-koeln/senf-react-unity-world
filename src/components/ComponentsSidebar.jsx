/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FlexWrapper,
  LayerWhiteFirstDefault,
  Typography,
  TertiaryButton,
  Button,
  Icon,
  List,
  ObjectCard,
  Divider,
} from "senf-atomic-design-system";
import ModelsList from "./ModelsList";
import FormsList from "./FormsList";
import MarkersList from "./MarkersList";

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 400px;
  background-color: #fed957;
  z-index: 9;
  left: ${({ componentsSidebarOpen }) =>
    componentsSidebarOpen ? "200px" : "-600px"};
  transition: 0.5s;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  ${(props) =>
    props.active ? LayerWhiteFirstDefault : LayerWhiteFirstDefault};
`;
const ComponentsSidebar = ({
  unityContext,
  componentsSidebarOpen,
  setComponentsSidebarOpen,
}) => {
  const [order, setOrder] = useState(1);

  const spawnObject = (value) => {
    console.log(value);
    unityContext.send("BuildingManager", "SpawnObject", value);

    setTimeout(() => {
      setComponentsSidebarOpen(false);
    }, 200);
  };

  return (
    <Wrapper componentsSidebarOpen={componentsSidebarOpen}>
      <FlexWrapper width="calc(100% - 40px)" margin="20px">
        <FlexWrapper flexDirection="column" alignItems="center">
          <Circle active={order === 1} onClick={() => setOrder(1)}>
            <Icon icon="bulb" transform="scale(1.5)" />
          </Circle>
          <Typography variant="bodyBg">Modelle</Typography>
        </FlexWrapper>
        <FlexWrapper flexDirection="column" alignItems="center">
          <Circle active={order === 2} onClick={() => setOrder(2)}>
            <Icon icon="bulb" transform="scale(1.5)" />
          </Circle>
          <Typography variant="bodyBg">Formen</Typography>
        </FlexWrapper>
        <FlexWrapper flexDirection="column" alignItems="center">
          <Circle active={order === 3} onClick={() => setOrder(3)}>
            <Icon icon="bulb" transform="scale(1.5)" />
          </Circle>
          <Typography variant="bodyBg">Marker</Typography>
        </FlexWrapper>
      </FlexWrapper>
      <Divider margin="20px" width="calc(100% - 40px)" color="#f8f8f8" />

      {order === 1 ? (
        <ModelsList spawnObject={spawnObject} />
      ) : order === 2 ? (
        <FormsList spawnObject={spawnObject} />
      ) : (
        <MarkersList spawnObject={spawnObject} />
      )}
    </Wrapper>
  );
};

export default ComponentsSidebar;
