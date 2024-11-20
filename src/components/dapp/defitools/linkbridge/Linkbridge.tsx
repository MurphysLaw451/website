import React, { useEffect } from "react";
import imageLinkbridge from '@public/defitools/linkbridge.svg'

const Linkbridge = () => {
  useEffect(() => {
    const initializeWidget = () => {
      const widgetContainer = document.getElementById("debridgeWidget");
      if (widgetContainer) {
        widgetContainer.innerHTML = ""; // Clear container
        console.log("Initializing deBridge widget...");
        if (window.deBridge) {
            window.deBridge.widget({
                v: "1",
                element: "debridgeWidget",
                title: "Linkbridge",
                description: "Create wrapped tokens on all major chains",
                width: "600",
                height: "800",
                r: "30661",
                supportedChains: JSON.stringify({
                  inputChains: {
                    "1": "all",
                    "10": "all",
                    "56": "all",
                    "100": "all",
                    "137": "all",
                    "1088": "all",
                    "7171": "all",
                    "8453": "all",
                    "42161": "all",
                    "43114": "all",
                    "59144": "all",
                    "7565164": "all",
                    "245022934": "all",
                  },
                  outputChains: {
                    "1": "all",
                    "10": "all",
                    "56": "all",
                    "100": "all",
                    "137": "all",
                    "1088": "all",
                    "7171": "all",
                    "8453": "all",
                    "42161": "all",
                    "43114": "all",
                    "59144": "all",
                    "7565164": "all",
                    "245022934": "all",
                  },
                }),
                inputChain: 56,
                outputChain: 1,
                inputCurrency: "",
                outputCurrency: "",
                address: "",
                showSwapTransfer: true,
                amount: "",
                outputAmount: "",
                isAmountFromNotModifiable: false,
                isAmountToNotModifiable: false,
                lang: "en",
                logo:"",
                mode: "deport",
                isEnableCalldata: false,
                styles: "eyJhcHBCYWNrZ3JvdW5kIjoiIzA3MTIxOSIsIm1vZGFsQmciOiIjMDcxMjE5IiwiY2hhcnRCZyI6IiMxNjM0NDgiLCJib3JkZXJDb2xvciI6IiMwZjIzMzAiLCJ0b29sdGlwQmciOiIjMTYzNDQ4IiwidG9vbHRpcENvbG9yIjoiIzg0OGU4ZCIsImZvcm1Db250cm9sQmciOiIjMTYzNDQ4IiwiY29udHJvbEJvcmRlciI6IiMwZjIzMzAiLCJwcmltYXJ5IjoiIzBmOTc4ZSIsInNlY29uZGFyeSI6IiMwZjIzMzAiLCJmb250Q29sb3IiOiIjODQ4ZThkIiwicHJpbWFyeUJ0bkJnIjoiIzBmOTc4ZSIsInByaW1hcnlCdG5UZXh0IjoiIzBmMjMzMCIsInNlY29uZGFyeUJ0bkJnIjoiIzBmMjMzMCIsInNlY29uZGFyeUJ0blRleHQiOiIjODQ4ZThkIiwic2Vjb25kYXJ5QnRuT3V0bGluZSI6IiMwZjIzMzAiLCJidG5Gb250U2l6ZSI6MTYsImJ0bkZvbnRXZWlnaHQiOjIwMCwiZGVzY3JpcHRpb25Gb250U2l6ZSI6IjE2In0=",
                theme: "dark",
                isHideLogo: false,
                disabledWallets: [],
                disabledElements: ["Points"],
              });
          console.log("Widget initialized successfully.");
        } else {
          console.error("deBridge is not available on the window object.");
        }
      } else {
        console.error("Widget container (#debridgeWidget) not found.");
      }
    };

    const scriptSelector = 'script[src="https://app.debridge.finance/assets/scripts/widget.js"]';
    if (!document.querySelector(scriptSelector)) {
      console.log("Adding deBridge script...");
      const script = document.createElement("script");
      script.src = "https://app.debridge.finance/assets/scripts/widget.js";
      script.async = true;
      script.onload = initializeWidget;
      script.onerror = () => console.error("Failed to load deBridge script.");
      document.body.appendChild(script);
    } else {
      console.log("deBridge script already loaded. Initializing widget...");
      initializeWidget();
    }

    return () => {
      const widgetContainer = document.getElementById("debridgeWidget");
      if (widgetContainer) widgetContainer.innerHTML = ""; // Clean up
    };
  }, []);

  return (

    <div style={{ padding: "20px" }}>
        {/* Add your content (logo, title, etc.) here */}
        <h1 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "left", display: "flex", alignItems: "central" }}>
            <img
                src={imageLinkbridge.src} // Use the logo's src
                alt="Linkbridge Logo"
                style={{
                    margin: "0 auto",
                    width: "550px", // Set a fixed width for larger size
                    height: "auto", // Maintain aspect ratio
                    marginBottom: "20px", // Add spacing below the logo
                }}
            />
        
        </h1>
    
        {/* Widget Container */}

      <div
        id="debridgeWidget"
        style={{
          width: "500px",
          height: "700px",
          margin: "0 auto",
          borderRadius: "8px",
        }}
      ></div>
    </div>
    );
    
  
};

export default Linkbridge;
