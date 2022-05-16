/** @format */

import React, { useState, useEffect } from "react";
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
import { ModelsData } from "../data/Models";

const tags = [
  { objectType: "Alle" },
  { objectType: "Infrastruktur" },
  { objectType: "Mobiliar" },
  { objectType: "Natur" },
  { objectType: "Gebäude" },
  { objectType: "Spielen" },
  { objectType: "Sport" },
];

const ModelsList = ({ spawnObject }) => {
  const [models, setModels] = useState([]);
  const [objectTypeSelected, setObjectTypeSelected] = useState([
    "Infrastruktur",
    "Mobiliar",
    "Natur",
    "Gebäude",
    "Spielen",
    "Sport",
  ]);

  useEffect(() => {
    if (ModelsData) {
      console.log(objectTypeSelected);
      const NewModels = ModelsData.filter(({ objectType }) =>
        objectTypeSelected.includes(objectType)
      );
      console.log(NewModels);

      if (NewModels) {
        setModels(NewModels);
      }

      // setModels(
      //   ModelsData.filter(({ objectType }) =>
      //     objectTypeSelected.includes(objectType)
      //   )
      // );
    }

    console.log(models);
  }, [ModelsData, objectTypeSelected]);

  const handleobjectTypeelector = (objectType) => {
    const index = objectTypeSelected.indexOf(objectType);
    if (objectType === "Alle") {
      setObjectTypeSelected([
        "Infrastruktur",
        "Mobiliar",
        "Natur",
        "Gebäude",
        "Spielen",
        "Sport",
      ]);
    } else if (objectTypeSelected.length === 6) {
      setObjectTypeSelected([objectType]);
    } else if (index === -1) {
      setObjectTypeSelected(objectTypeSelected.concat(objectType));
    } else {
      const newobjectType = objectTypeSelected.filter(
        (item) => item !== objectType
      );

      if (newobjectType.length === 0) {
        setObjectTypeSelected([
          "Infrastruktur",
          "Mobiliar",
          "Natur",
          "Gebäude",
          "Spielen",
          "Sport",
        ]);
      } else {
        setObjectTypeSelected(...[newobjectType]);
      }
    }
  };

  return (
    <React.Fragment>
      <FlexWrapper
        gap="10px"
        width="calc(100% - 20px)"
        margin="10px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {tags.map(({ objectType }) => (
          <Tag
            text={objectType}
            onClick={() => handleobjectTypeelector(objectType)}
            active={
              (objectTypeSelected.includes(objectType) &&
                objectTypeSelected.length !== 6) ||
              (objectTypeSelected.length === 6 && objectType === "Alle")
            }
          />
        ))}
      </FlexWrapper>
      {models && (
        <List
          CardType={ObjectCard}
          loading={false}
          handleButtonClick={spawnObject}
          data={models}
        />
      )}
    </React.Fragment>
  );
};

export default ModelsList;
