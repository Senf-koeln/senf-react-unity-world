/** @format */
import * as React from "react";
import "./App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import MenuSidebar from "./components/MenuSidebar";
import ComponentsSidebar from "./components/ComponentsSidebar";
import styled from "styled-components";
import {
  theme,
  GlobalStyle,
  Icon,
  Button,
  Input,
  OrganizationCard,
  Auth,
} from "senf-atomic-design-system";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";

const unityContext = new UnityContext({
  loaderUrl: "Build/WebGLBuild_v4.loader.js",
  dataUrl: "Build/WebGLBuild_v4.data",
  frameworkUrl: "Build/WebGLBuild_v4.framework.js",
  codeUrl: "Build/WebGLBuild_v4.wasm",
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});
const UnityWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0px;
  background-color: black;
  z-index: 8;
`;
const App = () => {
  const [componentsSidebarOpen, setComponentsSidebarOpen] = useState(false);
  const [objSelected, setIsObjSelected] = useState(true);
  useEffect(function () {
    unityContext.on("isObjActive", function (isActive) {
      setIsObjSelected(isActive);
      if (isActive) {
        console.log("Object depending on Context Menu is Active");
      } else if (!isActive) {
        console.log(
          "Deselection or non Context Menu dependent Object selected"
        );
      }
    });
  }, []);

  function setTag(index) {
    unityContext.send("BuildingManager", "setTag", index); // 0 = Wohnen; 1= Buero; 2 = Kultur
  }

  function deleteObject() {
    unityContext.send("BuildingManager", "DestroyObject");
  }

  function scaleObject(newValue) {
    unityContext.send("BuildingManager", "ScaleSliderUpdate", newValue);
  }

  function rotateObject(newValue) {
    unityContext.send("BuildingManager", "RotateSliderUpdate", newValue);
  }
  //#endregion

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <MenuSidebar
          unityContext={unityContext}
          componentsSidebarOpen={componentsSidebarOpen}
          setComponentsSidebarOpen={setComponentsSidebarOpen}
        />
        <ComponentsSidebar
          unityContext={unityContext}
          componentsSidebarOpen={componentsSidebarOpen}
          setComponentsSidebarOpen={setComponentsSidebarOpen}
        />
        <UnityWrapper>
          <Unity className="unity-canvas" unityContext={unityContext} />
        </UnityWrapper>
      </div>
    </ThemeProvider>
  );
};

export default App;
