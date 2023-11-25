import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/Theme"
import { MainBody, Container } from "./styles/Global.styled";

// Import components
import Showcase from "./components/Showcase/Showcase";
import MySkills from "./components/Skills/MySkills";
import MyProjects from "./components/Projects/MyProjects";
import Footer from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [IsInLogin,setIsLogin] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <MainBody>
        <Navbar />
        <Container  >
          <Showcase IsInLogin={IsInLogin} setIsLogin={setIsLogin} />
          <MySkills IsInLogin={IsInLogin} setIsLogin={setIsLogin} />
          <MyProjects IsInLogin={IsInLogin} setIsLogin={setIsLogin} />
          <Footer />
        </Container >
      </MainBody>
    </ThemeProvider>
  );
}

export default App;
