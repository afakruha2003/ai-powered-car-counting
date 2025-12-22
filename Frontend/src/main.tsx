
  import { createRoot } from "react-dom/client";
  import { Capacitor } from "@capacitor/core";
  import { StatusBar, Style } from "@capacitor/status-bar";
  import { SplashScreen } from "@capacitor/splash-screen";
  import App from "./App.tsx";
  import "./index.css";

  // Initialize Capacitor plugins
  const initCapacitor = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        // Set status bar style
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: "#3D5AFE" });
        
        // Hide splash screen after app is ready
        await SplashScreen.hide();
      } catch (error) {
        console.log("Capacitor plugins not available:", error);
      }
    }
  };

  // Initialize app
  initCapacitor();

  createRoot(document.getElementById("root")!).render(<App />);
  