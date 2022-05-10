/** @format */

import React, { useEffect } from "react";
import {
  Modal,
  SubNavbar,
  Typography,
  FlexWrapper,
  Button,
  LayerGreyDefault,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Card = styled.div`
  ${(props) => LayerGreyDefault};
  height: 100px;
  width: 100px;
  border-radius: 18px;
  margin: 10px;
`;
const InfoModal = ({ openInfoModal, setOpenInfoModal }) => {
  useEffect(() => {
    if (openInfoModal) {
    } else {
    }
  }, [openInfoModal]);
  return (
    <Modal
      openModal={openInfoModal}
      setOpenModal={setOpenInfoModal}
      zIndex={9999999}
    >
      <SubNavbar
        iconLeft="arrow"
        header="FAQ"
        iconRight="plus"
        iconRightTransform="rotate(45deg)"
      />
      <FlexWrapper justifyContent="center" margin="20px">
        <Typography variant="h2">
          Musical Dome. Raum wird geschaffen – zum Neu erfinden
        </Typography>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Card></Card> <Card></Card> <Card></Card>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="10px"
        width="calc(100% - 20px)"
      >
        <Button variant="primary" text="Los geht's" />
      </FlexWrapper>
    </Modal>
  );
};

export default InfoModal;
