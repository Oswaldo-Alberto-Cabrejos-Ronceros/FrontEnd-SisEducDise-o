import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <ChakraProvider value={defaultSystem}>
    <ThemeProvider>
      {" "}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </ChakraProvider>
);
