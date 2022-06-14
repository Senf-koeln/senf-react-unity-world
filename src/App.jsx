/** @format */
import React, { useEffect, useState } from "react";
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
  RoundedButton,
} from "senf-atomic-design-system";
import { ThemeProvider } from "styled-components";
import InfoModal from "./components/InfoModal";
import ContextSidebar from "./components/ContextSidebar";
import MapNavigation from "./components/MapNavigation";
import DrawContext from "./components/DrawContext";
import SaveModal from "./components/SaveModal";

const unityContext = new UnityContext({
  loaderUrl: "WebGLBuild_v5/touch_build.loader.js",
  dataUrl: "WebGLBuild_v5/touch_build.data",
  frameworkUrl: "WebGLBuild_v5/touch_build.framework.js",
  codeUrl: "WebGLBuild_v5/touch_build.wasm",
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

const Sidebars = styled.div`
  position: fixed;
  top: 0;
  left: ${({
    musicDomeDeleted,
    openInfoModal,
    openDrawContext,
    openSaveModal,
  }) =>
    musicDomeDeleted && !openInfoModal && !openDrawContext && !openSaveModal
      ? "0px"
      : "-600px"};
  z-index: 99;
  transition: 0.5s;
`;

const DeleteButtonWrapper = styled.div`
  position: fixed;

  display: ${({ musicDomeDeleted, openInfoModal }) =>
    musicDomeDeleted || openInfoModal ? "none" : "block"};
  top: 40px;
  left: calc(50vw + 177px);
  z-index: 999999;
  transform: scale(1.4) rotate(45deg);

  animation: deletebuttonAnimation 3s;

  @keyframes deletebuttonAnimation {
    0% {
      transform: scale(0) rotate(45deg);
    }
    80% {
      transform: scale(0) rotate(45deg);
    }

    100% {
      transform: scale(1.4) rotate(45deg);
    }
  }
`;
const App = () => {
  const [activeView, setActiveView] = useState("SwitchToNormalView");
  const [componentsSidebarOpen, setComponentsSidebarOpen] = useState(false);
  const [objSelected, setIsObjSelected] = useState(false);
  const [openContextSidebar, setOpenContextSidebar] = useState(false);
  const [openDrawContext, setOpenDrawContext] = useState(false);

  const [openInfoModal, setOpenInfoModal] = useState(true);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  function restart() {
    var answer = window.confirm(
      "Bist du sicher, dass du neustarten möchtest? Die Änderungen gehen dabei verloren"
    );
    if (answer) {
      unityContext.send("BuildingManager", "restart");
      setIsMusicDomeDeleted(false);
      setOpenInfoModal(true);
      setSaved(false);
      setOpenSaveModal(false);

      //some code
    } else {
      //some code
    }
  }

  function startDrawingStreet() {
    //Solang gezeichnet wird, dafür sorgen, dass die kamera perspektive nicht gewechselt werden kann
    unityContext.send("DrawManager", "StartDrawing");
    setActiveView("SwitchToTopView");
    setOpenDrawContext(true);

    // setTimeout(() => {
    //   setComponentsSidebarOpen(false);
    // }, 200);
  }

  function stopDrawingStreet() {
    unityContext.send("DrawManager", "StopDrawing");
    setOpenDrawContext(false);
  }

  function deleteMusicDome() {
    unityContext.send("BuildingManager", "musicDomeDeletion");
  }

  //bool ob music dome delete me gedrückt wurde
  const [musicDomeDeleted, setIsMusicDomeDeleted] = useState(false);
  useEffect(function () {
    unityContext.on("isMusicDomeDeleted", function (isDeleted) {
      if (isDeleted) {
        setIsMusicDomeDeleted(isDeleted);
        setTimeout(() => {
          setComponentsSidebarOpen(true);
        }, 500);
      }
    });
  }, []);

  //im isObjectActive listener den String Objecttype ergänzt Werte: "Form", "Model" oder "Marker"
  const [Object, setObject] = useState("");
  useEffect(function () {
    unityContext.on("isObjActive", function (isActive, objecttype) {
      setIsObjSelected(isActive);
      setObject(objecttype);
      if (isActive) {
        setOpenContextSidebar(true);

        console.log("Object depending on Context Menu is Active " + objecttype);
      } else if (!isActive) {
        setOpenContextSidebar(false);

        console.log(
          "Deselection or non Context Menu dependent Object selected"
        );
      }
    });
  }, []);

  function handInProposal() {
    const element = document.createElement("a");
    const file = new Blob(
      ["email:\n\n" + email + "\n\n\n" + "Beschreibung:\n\n" + description],
      {
        type: "text/plain",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = `senf-3d-game-img1${Date.now()}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    setTimeout(() => {
      unityContext.send("BuildingManager", "SwitchToTopView");

      const data = unityContext.takeScreenshot("image/jpeg", 1.0);
      if (data !== null) {
        const src = data;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.responseType = "blob";
        xhr.onload = downloadImageToLocal;
        xhr.send();
      }
    }, 100);

    setTimeout(() => {
      unityContext.send("BuildingManager", "SwitchToNormalView");

      const data1 = unityContext.takeScreenshot("image/jpeg", 1.0);
      if (data1 !== null) {
        const src = data1;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.responseType = "blob";
        xhr.onload = downloadImageToLocal;
        xhr.send();
      }
    }, 600);

    setTimeout(() => {
      unityContext.send("BuildingManager", "SwitchToStreetView");

      const data2 = unityContext.takeScreenshot("image/jpeg", 1.0);
      if (data2 !== null) {
        const src = data2;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.responseType = "blob";
        xhr.onload = downloadImageToLocal;
        xhr.send();
      }
    }, 1000);

    unityContext.send("BuildingManager", "setTextInput");
    setTimeout(() => {
      setSaved(true);
    }, 1000);
  }

  function downloadImageToLocal() {
    let dlLink = document.createElement("a");

    const dataUrl = URL.createObjectURL(this.response);
    dlLink.href = dataUrl;

    const fileName = `senf-3d-game-img1${Date.now()}.${this.response.type.replace(
      "image/",
      ""
    )}`;
    dlLink.download = fileName;

    document.body.insertAdjacentElement("beforeEnd", dlLink);
    dlLink.click();
    dlLink.remove();

    // setTimeout(function () {
    //   window.URL.revokeObjectURL(dataUrl);
    // }, 1000);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Sidebars
        musicDomeDeleted={true}
        openInfoModal={openInfoModal}
        openDrawContext={openDrawContext}
        openSaveModal={openSaveModal}
      >
        <MenuSidebar
          unityContext={unityContext}
          activeView={activeView}
          setActiveView={setActiveView}
          componentsSidebarOpen={componentsSidebarOpen}
          setComponentsSidebarOpen={setComponentsSidebarOpen}
          setOpenInfoModal={setOpenInfoModal}
          restart={restart}
          setOpenSaveModal={setOpenSaveModal}
        />
        <ComponentsSidebar
          unityContext={unityContext}
          componentsSidebarOpen={componentsSidebarOpen}
          musicDomeDeleted={true}
          openInfoModal={openInfoModal}
          openDrawContext={openDrawContext}
          openSaveModal={openSaveModal}
          setComponentsSidebarOpen={setComponentsSidebarOpen}
          startDrawingStreet={startDrawingStreet}
        />
      </Sidebars>
      <UnityWrapper>
        <Unity className="unity-canvas" unityContext={unityContext} />
      </UnityWrapper>

      <InfoModal
        unityContext={unityContext}
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
      />

      {openContextSidebar && (
        <ContextSidebar
          unityContext={unityContext}
          openContextSidebar={openContextSidebar}
          setOpenContextSidebar={setOpenContextSidebar}
        />
      )}

      {openDrawContext && (
        <DrawContext
          unityContext={unityContext}
          stopDrawingStreet={stopDrawingStreet}
        />
      )}

      {!openInfoModal && <MapNavigation unityContext={unityContext} />}

      <SaveModal
        unityContext={unityContext}
        openSaveModal={openSaveModal}
        setOpenSaveModal={setOpenSaveModal}
        handInProposal={handInProposal}
        setDescription={setDescription}
        setEmail={setEmail}
        setOpenContextSidebar={setOpenContextSidebar}
        saved={saved}
        restart={restart}
      />
    </ThemeProvider>
  );
};

export default App;
