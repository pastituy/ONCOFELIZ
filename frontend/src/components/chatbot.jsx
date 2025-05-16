import React, { useEffect, useState } from "react";
import "../styles/chatbot.css";

const OncoFelizChatbot = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    const style = document.createElement("style");
    style.textContent = `
      df-messenger {
        --df-messenger-bot-message: #FFF3E0;
        --df-messenger-button-titlebar-color: #FF8C00;
        --df-messenger-chat-background-color: #ffffff;
        --df-messenger-font-color: #333333;
        --df-messenger-user-message: #FFE0B2;
        --df-messenger-send-icon: #FF6F00;
        --df-messenger-input-box-color: #f7f7f7;
        --df-messenger-input-box-font-color: #333;
        --df-messenger-titlebar-font-color: #fff;
      }
      df-messenger::part(titlebar) {
        font-family: "Segoe UI", sans-serif;
        font-weight: 600;
        font-size: 18px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="chatbot-container">
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      <df-messenger
        intent="WELCOME"
        chat-title="Oncofeliz"
        agent-id="c4f786c7-805f-4c68-b73a-b2beb6775ab9"
        language-code="es"
      ></df-messenger>
    </div>
  );
};

export default OncoFelizChatbot;
