/** @format */

import React from "react";
import {
  FlexWrapper,
  LayerWhiteFirstDefault,
  Typography,
  TertiaryButton,
  Button,
  Icon,
  List,
  ObjectCard,
  Tag,
} from "senf-atomic-design-system";

import Weg from "../assets/surfaces/weg.png";
import Weg_pedestrian from "../assets/surfaces/Weg_Pedestrian.png";
import Weg_Bike from "../assets/surfaces/Weg_Bike.png";
import Weg_Car from "../assets/surfaces/Weg_Car.png";
import Zebrastreifen from "../assets/surfaces/Zebrastreifen.png";

import Img57 from "../assets/surfaces/57.png";

const MarkersList = ({
  setComponentsSidebarOpen,
  unityContext,
  spawnObject,
  startDrawingStreet,
}) => {
  return (
    <React.Fragment>
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(57)}
        data={{
          objectId: 57,
          title: "Gras",
          objectType: "surface",
          imgUrl: Img57,
        }}
      />
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(58)}
        data={{
          objectId: 58,
          title: "Fahrradweg",
          objectType: "surface",
          imgUrl: Weg_Bike,
        }}
      />
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(60)}
        data={{
          objectId: 60,
          title: "Autospur",
          objectType: "surface",
          imgUrl: Weg_Car,
        }}
      />
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(59)}
        data={{
          objectId: 59,
          title: "Fußgängerweg",
          objectType: "surface",
          imgUrl: Weg_pedestrian,
        }}
      />
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(61)}
        data={{
          objectId: 61,
          title: "Zebrastreifen",
          objectType: "surface",
          imgUrl: Zebrastreifen,
        }}
      />

      {/* <List
        CardType={ObjectCard}
        loading={false}
        data={[
          {
            objectId: "sadasd",
            title: "Blumenkübel",
            subTitle: "Kleingarten Sacshen",
            objectType: "Vereine",
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FQO0SOuQBIc9wEjpayU9e%2Flogo%2Flogo?alt=media&token=131ee6fa-19a0-4ee9-b8c0-43909e2373d6",
          },
          {
            objectId: "xyz",
            title: "Blumenkübel 1",
            subTitle: "Kleingarten Sacshen",
            objectType: "Vereine",
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FQO0SOuQBIc9wEjpayU9e%2Flogo%2Flogo?alt=media&token=131ee6fa-19a0-4ee9-b8c0-43909e2373d6",
          },
        ]}
      /> */}
    </React.Fragment>
  );
};

export default MarkersList;
