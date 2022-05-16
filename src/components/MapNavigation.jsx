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
  height: 125px;
  width: 65px;
  border-radius: 18px;
  margin: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99999;
  right: ${({ openContextSidebar }) => (openContextSidebar ? "0px" : "-200px")};
  background-color: #f8f8f8;
  display: flex;

  ${(props) => LayerWhiteFirstDefault}
`;

const MapNavigation = ({ unityContext }) => {
  const [zoomvalue, setZoomValue] = useState(1);
  // float zoomvalue is added or subtracted from current cam FOV. positive value means zooming out, negative value zoom in. 2 might be a good value. I set boundaries for FOV in Unity, can ony be between 21 and 60
  function zoomOut() {
    const newZoomvalue = zoomvalue + 2;
    setZoomValue(newZoomvalue);
    unityContext.send("BuildingManager", "zoom", newZoomvalue);
  }

  function zoomIn() {
    const newZoomvalue = zoomvalue - 2;
    setZoomValue(newZoomvalue);
    unityContext.send("BuildingManager", "zoom", newZoomvalue);
  }

  return (
    <Wrapper openContextSidebar>
      <FlexWrapper
        gap="10px"
        width="calc(100% - 20px)"
        margin="5px 10px 10px 10px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Button variant="primary" onClick={zoomIn}>
          <svg
            width="266"
            height="266"
            viewBox="0 0 266 266"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M255.638 220.397l-62.003-47.746a106.424 106.424 0 0 0 21.883-64.821C215.518 48.316 167.273.07 107.759.07S0 48.316 0 107.83c0 59.513 48.245 107.759 107.759 107.759a106.433 106.433 0 0 0 64.822-21.884l47.745 61.838a28.62 28.62 0 0 0 4.476 4.476c10.942 8.515 26.714 6.548 35.229-4.394 8.515-10.941 6.548-26.713-4.393-35.228zM24.868 107.83c0-45.78 37.111-82.892 82.891-82.892 45.78 0 82.892 37.112 82.892 82.892 0 45.779-37.112 82.891-82.892 82.891-45.78 0-82.892-37.112-82.892-82.891z"
              fill="#000"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M149.764 95.633c5.275.613 9.372 5.099 9.372 10.537 0 5.439-4.097 9.925-9.372 10.538l-1.237.071H116.7v31.828c0 5.438-4.098 9.924-9.372 10.537l-1.237.072c-5.439 0-9.925-4.098-10.538-9.372l-.071-1.237v-31.828H63.654c-5.438 0-9.924-4.097-10.537-9.372l-.072-1.237c0-5.438 4.098-9.924 9.373-10.537l1.236-.072h31.828V63.734c0-5.439 4.097-9.925 9.372-10.538l1.237-.071c5.438 0 9.924 4.097 10.537 9.372l.072 1.237v31.827h31.827l1.237.072z"
              fill="#000"
            />
          </svg>
        </Button>

        <Button variant="primary" onClick={zoomOut}>
          {" "}
          <svg
            id="Ebene_1"
            data-name="Ebene 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 265.08 265.05"
          >
            <path
              d="M255.64,220.32l-62-47.74a106.53,106.53,0,0,0,21.88-64.82A107.76,107.76,0,1,0,107.76,215.52a106.48,106.48,0,0,0,64.82-21.89l47.75,61.84A28.69,28.69,0,0,0,224.8,260a25.11,25.11,0,0,0,30.84-39.63ZM107.76,190.65a82.89,82.89,0,1,1,82.89-82.89h0A82.89,82.89,0,0,1,107.76,190.65Z"
              transform="translate(0 0)"
            />
            <path
              d="M148,95.24H64a11,11,0,0,0,0,22h84a11,11,0,0,0,0-22Z"
              transform="translate(0 0)"
            />
          </svg>
        </Button>
      </FlexWrapper>
    </Wrapper>
  );
};

export default MapNavigation;
