/** @format */

import React, { useEffect, useState } from "react";
import {
  Modal,
  SubNavbar,
  Typography,
  FlexWrapper,
  Button,
  LayerGreyDefault,
} from "senf-atomic-design-system";
import styled from "styled-components";
import Img1 from "../assets/interface-icons/Start-Icon_1.png";
import Img2 from "../assets/interface-icons/Start-Icon_2.png";
import Img3 from "../assets/interface-icons/Start-Icon_3.png";

const Card = styled.div`
  ${(props) => LayerGreyDefault};
  height: 160px;
  width: 160px;
  border-radius: 18px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;
const InfoModal = ({ unityContext, openInfoModal, setOpenInfoModal }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function () {
    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });
  }, []);

  function startgame() {
    // unityContext.send("BuildingManager", "startGame");
    unityContext.send("BuildingManager", "setTextInput");

    setOpenInfoModal(false);
  }
  return (
    <Modal
      openModal={openInfoModal}
      setOpenModal={isLoaded ? startgame : null}
      zIndex={9999999}
      size="m"
      overflow="hidden"
    >
      {/* <SubNavbar iconRight="plus" iconRightTransform="rotate(45deg)" /> */}
      <FlexWrapper
        justifyContent="center"
        margin="40px 40px 0px 40px"
        width="calc(100%  - 80px)"
        height="calc(100% - 80px)"
      >
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Gestalte die Blücherstraße nach deinen Vorstellungen
        </Typography>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        <Typography variant="p" style={{ textAlign: "center" }}>
          Die Stadt der Zukunft soll von allen mitgestaltet werden! Durch
          vielfältige und niedrigschwellige Angebote können diverse Vorschläge
          in zukünftige Planungen implementiert werden. Dieses Spiel soll dir
          dabei helfen, deine Vorstellungen und Wünsche zu visualisieren und
          spielerisch an stadtplanerischen Prozessen teilzunehmen.
          <br />
          <br />
          Am Beispiel der Blücherstraße kannst du das Spiel jetzt testen. Zeig
          uns, was du dir wünschen würdest!
        </Typography>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="20px"
        width="calc(100% - 40px)"
      >
        {/* <Card>
          <img src={Img1} width="80px" />
          <Typography variant="buttonSm" style={{ textAlign: "center" }}>
            Platz schaffen
          </Typography>
        </Card>{" "} */}
        <Card>
          <img src={Img2} width="80px" />

          <Typography variant="buttonSm" style={{ textAlign: "center" }}>
            Objekte einsetzen
          </Typography>
        </Card>{" "}
        <Card>
          {" "}
          <img src={Img3} width="80px" />
          <Typography variant="buttonSm" style={{ textAlign: "center" }}>
            Abspeichern
          </Typography>
        </Card>
      </FlexWrapper>
      <FlexWrapper
        justifyContent="center"
        margin="10px"
        width="calc(100% - 20px)"
      >
        <Button
          variant="primary"
          text="Los geht's"
          onClick={startgame}
          loading={!isLoaded}
        />
      </FlexWrapper>
    </Modal>
  );
};

export default InfoModal;
