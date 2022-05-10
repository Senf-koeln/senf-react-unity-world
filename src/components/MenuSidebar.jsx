/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  FlexWrapper,
  Button,
  Tag,
  RoundedButton,
  Divider,
} from "senf-atomic-design-system";
import logo from "../assets/logo_yellow.png";

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 200px;
  background-color: #f8f8f8;
  z-index: 10;
`;

const RoundedButtonWrapper = styled.div`
  position: relative;
  top: -110px;
  height: 0;

  transform: ${({ componentsSidebarOpen }) =>
    componentsSidebarOpen
      ? "translate(-50%, -50%) rotate(45deg)"
      : "translate(-50%, -50%)"};
  left: ${({ componentsSidebarOpen }) =>
    componentsSidebarOpen ? "600px" : "180px"};
  transition: 0.5s ease-out;
`;
const tags = [
  { name: "Normalview", color: "green", unityCall: "SwitchToNormalView" },
  { name: "Topview", color: "green", unityCall: "SwitchToTopView" },
  { name: "Streetview", color: "green", unityCall: "SwitchToStreetView" },
];
const MenuSidebar = ({
  unityContext,
  componentsSidebarOpen,
  setComponentsSidebarOpen,
  setOpenInfoModal,
}) => {
  const [visibleMarkers, setVisibleMarkers] = useState(true);
  const [activeView, setActiveView] = useState("SwitchToNormalView");

  const switchView = (unityCall) => {
    setActiveView(unityCall);
    unityContext.send("Canvas", unityCall);
  };

  function hideMarkers() {
    setVisibleMarkers(false);
    unityContext.send("Canvas", "HideMarkers");
  }
  function showMarkers() {
    setVisibleMarkers(true);
    unityContext.send("Canvas", "ShowMarkers");
  }

  function restart() {
    unityContext.send("BuildingManager", "restart");
  }

  function handInProposal() {
    unityContext.send("Canvas", "TakeScreenshot");
    unityContext.send("Canvas", "CreateText");
  }

  return (
    <Wrapper>
      <FlexWrapper
        flexDirection="column"
        width="calc(100% - 40px)"
        height="calc(100% - 40px)"
        margin="20px"
        gap="10px"
      >
        <img
          src={logo}
          width="80px"
          style={{ margin: "20px 0px 65px 0px" }}
          alt="logo"
        />

        <FlexWrapper flexDirection="column" gap="10px">
          <Button
            variant="secondary"
            text="Info"
            icon="infoFill"
            onClick={() => setOpenInfoModal(true)}
          />
          <Button variant="secondary" text="Neustart" onClick={restart} />
        </FlexWrapper>

        <Divider margin="30px 0px 30px 0px" />

        <FlexWrapper
          gap="10px"
          width="calc(100% - 20px)"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
        >
          {tags.map(({ name, color, unityCall }) => (
            <Tag
              icon="dot"
              color={color}
              text={name}
              onClick={() => switchView(unityCall)}
              active={unityCall === activeView}
            />
          ))}
          <RoundedButtonWrapper componentsSidebarOpen={componentsSidebarOpen}>
            <RoundedButton
              variant="plus"
              onClick={() => setComponentsSidebarOpen(!componentsSidebarOpen)}
            />
          </RoundedButtonWrapper>
        </FlexWrapper>
        <Divider margin="30px 0px 30px 0px" />

        <Button
          variant="secondary"
          size="small"
          icon={visibleMarkers ? "check" : "dot"}
          text="Marker"
          onClick={visibleMarkers ? showMarkers : hideMarkers}
        />

        <div style={{ marginTop: "auto" }}>
          <FlexWrapper flexDirection="column" gap="10px">
            <br />
            <Button variant="secondary" text="Rückgängig" />
            <Button variant="primary" text="Save" />
          </FlexWrapper>
        </div>
      </FlexWrapper>
    </Wrapper>
  );
};

export default MenuSidebar;
