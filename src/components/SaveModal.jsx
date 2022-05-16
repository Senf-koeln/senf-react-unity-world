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
}) => {
  useEffect(() => {
    if (openSaveModal) {
      unityContext.send("BuildingManager", "setTextInput");
    }
  }, [openSaveModal]);

  return (
    <Modal
      openModal={openSaveModal}
      setOpenModal={() => setOpenSaveModal(false)}
      zIndex={9999999}
      size="m"
    >
      <FlexWrapper
        justifyContent="center"
        margin="40px 40px 0px 40px"
        width="calc(100%  - 80px)"
        height="calc(100% - 80px)"
      >
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Zukunft gestalten. Räume neu erschaffen.
        </Typography>
      </FlexWrapper>

      <div style={{ margin: "20px", width: "calc(100% - 40px)" }}>
        <form></form>

        <Input
          label="Beschreibung hinzufügen"
          note="a note for extra info"
          placeholder="Schreibe ein paar Sätze zu deinem Vorschlag..."
          type="textarea"
          columns={28}
          rows={12}
          id="myInput"
          receiveValue={(inputValue) => setDescription(inputValue)}

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
    </Modal>
  );
};

export default SaveModal;
