import React from "react";
import "./App.css";
import Container from "./views/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { MessagingContextProvider } from "./context/messagingContext";

function App() {
  return (
    <Router>
      <MessagingContextProvider>
        <Container></Container>
      </MessagingContextProvider>
    </Router>
  );
}

export default App;
