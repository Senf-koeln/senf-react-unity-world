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
import { FormsData } from "../data/Models";

const FormsList = ({ spawnObject }) => {
  return (
    <List
      CardType={ObjectCard}
      loading={false}
      handleButtonClick={spawnObject}
      data={FormsData}
    />
  );
};

export default FormsList;
