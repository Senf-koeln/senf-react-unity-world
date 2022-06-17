/** @format */

import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Typography,
  FlexWrapper,
  Button,
  LayerGreyDefault,
} from "senf-atomic-design-system";
import styled from "styled-components";
import CelebrateImg from "../assets/celebrateImage.png";
const Card = styled.div`
  ${(props) => LayerGreyDefault};
  height: 160px;
  width: 160px;
  border-radius: 18px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 15px;
`;
const SaveModal = ({
  unityContext,
  openSaveModal,
  setOpenSaveModal,
  handInProposal,
  setDescription,
  setName,
  setOpenContextSidebar,
  saved,
  restart,
}) => {
  useEffect(() => {
    if (openSaveModal) {
      unityContext.send("BuildingManager", "setTextInput");
      setOpenContextSidebar(false);
    }
  }, [openSaveModal]);

  return (
    <Modal
      openModal={openSaveModal}
      setOpenModal={() => setOpenSaveModal(false)}
      zIndex={9999999}
      size="m"
      overflow="hidden"
      backgroundColor="#f1ecdc"
    >
      {!saved ? (
        <React.Fragment>
          <FlexWrapper
            justifyContent="center"
            margin="40px 40px 0px 40px"
            width="calc(100%  - 80px)"
            height="calc(100% - 80px)"
          >
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Erzähle uns mehr zu deinem Entwurf...
            </Typography>
          </FlexWrapper>

          <div style={{ margin: "20px", width: "calc(100% - 40px)" }}>
            <form></form>

            <Input
              placeholder="Beschreibung hinzufügen..."
              type="textarea"
              columns={28}
              rows={12}
              id="myInput"
              receiveValue={(inputValue) => setDescription(inputValue)}

              // onChange={(event) => setDescription(event.target.value)}
            />
            <br />
            <Input
              label="Name"
              placeholder="Max Mustermann"
              type="text"
              receiveValue={(inputValue) => setName(inputValue)}

              // onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <FlexWrapper
            justifyContent="center"
            margin="10px"
            width="calc(100% - 20px)"
          >
            <Button
              variant="primary"
              text="Speichern"
              onClick={handInProposal}
              loading={false}
            />
          </FlexWrapper>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FlexWrapper
            justifyContent="center"
            margin="40px 40px 0px 40px"
            width="calc(100%  - 80px)"
            height="calc(100% - 80px)"
          >
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Danke für deinen Entwurf!
            </Typography>
          </FlexWrapper>
          <FlexWrapper
            justifyContent="center"
            margin="40px 40px 0px 40px"
            width="calc(100%  - 80px)"
            height="calc(100% - 80px)"
          >
            <img src={CelebrateImg} width="300px" />
          </FlexWrapper>
          <FlexWrapper
            justifyContent="center"
            margin="10px"
            width="calc(100% - 20px)"
            gap="10px"
          >
            <Button
              variant="primary"
              text="Zurück zum Entwurf"
              onClick={() => setOpenSaveModal(false)}
              loading={false}
            />
            <Button
              variant="primary"
              text="Neustarten"
              onClick={restart}
              loading={false}
            />
          </FlexWrapper>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default SaveModal;
