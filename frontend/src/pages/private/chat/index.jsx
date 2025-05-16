import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import BlogPreview from "./components/blogPreview";
const API_KEY =
  "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";

const CancerNewsChat = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem("cancer-chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    localStorage.setItem("cancer-chat", JSON.stringify(responses));
  }, [responses]);
  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente útil que responde preguntas sobre el cáncer en lo niños, eres de OncoFeliz eso se llama la organizacion, pero solo el cáncer si te hacen cualquier otra pregunta no relacionada no respondes y dices que eres un sistente de cáncer. Si el usuario dice 'hazme un blog' o algo similar, responde solo con un objeto JavaScript con la siguiente estructura (sin explicación ni texto adicional): titulo: '', excerpt: '', autor: '', idCategoria: '', tags: [], contenidos: titulo: '', texto: '', orden: 0 ",
            },
            { role: "user", content: question },
          ],
        }),
      });

      const data = await res.json();
      if (!data.choices) {
        toast.error("No se obtuvo respuesta del modelo.");
        return;
      }

      const botMessage = data.choices[0].message.content;

      setResponses((prev) => [
        ...prev,
        {
          user: question,
          results: [botMessage],
        },
      ]);
      setQuestion("");
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener la respuesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ChatBox>
        {responses.map((entry, idx) => (
          <ChatEntry key={idx}>
            <UserMessage>🧑 {entry.user}</UserMessage>
            <BotResponse>
              {entry.results.map((text, i) => {
                let parsed;
                try {
                  parsed = JSON.parse(text);
                } catch (_) {}

                return (
                  <BotMessage key={i}>
                    {parsed && parsed.titulo && parsed.contenidos ? (
                      <BlogPreview blog={parsed} />
                    ) : (
                      text
                    )}
                  </BotMessage>
                );
              })}
            </BotResponse>
          </ChatEntry>
        ))}
        {loading && <Loading>✍️ Pensando respuesta...</Loading>}
      </ChatBox>

      <InputBar>
        <input
          type="text"
          placeholder="¿Qué quieres saber sobre el cáncer?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <SendButton onClick={handleSend}>
          <IoSend size={20} />
        </SendButton>
      </InputBar>
    </Container>
  );
};

export default CancerNewsChat;

const Container = styled.div`
  padding: 20px;
  max-width: 700px;
  margin: auto;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const ChatEntry = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
`;

const UserMessage = styled.div`
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
`;

const BotResponse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BotMessage = styled.div`
  background: #eaf3ff;
  padding: 10px;
  border-radius: 6px;
  color: #333;
  font-size: 14px;
`;

const InputBar = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;

  input {
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  border: none;
  padding: 0 15px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Loading = styled.div`
  color: #888;
  font-size: 14px;
  font-style: italic;
`;
