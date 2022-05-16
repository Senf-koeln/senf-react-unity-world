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
  height: 70px;
  width: 420px;
  border-radius: 18px;
  margin: 10px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 99999;
  right: ${({ openContextSidebar }) => (openContextSidebar ? "0px" : "-200px")};
  background-color: #f8f8f8;

  ${(props) => LayerWhiteFirstDefault}
`;

const DrawContext = ({ unityContext, stopDrawingStreet }) => {
  return (
    <Wrapper openContextSidebar>
      <FlexWrapper
        justifyContent="space-between"
        alignItems="center"
        margin="10px 10px 10px 20px"
        width="calc(100% - 30px)"
        height="calc(100% - 20px)"
      >
        <Typography variant="h3">Weg einzeichnen</Typography>

        <Button
          variant="primary"
          fillWidth={true}
          text="Fertig"
          onClick={stopDrawingStreet}
        />
      </FlexWrapper>
    </Wrapper>
  );
};

export default DrawContext;
