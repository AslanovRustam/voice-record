import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Flex, Button, Typography } from "antd";
import { MessageTwoTone } from "@ant-design/icons";
import useSpeachToText from "./hooks/useSpeachToText";

const { Title } = Typography;

function App() {
  const [text, setText] = useState("");

  const { isListening, transcript, startListening, stopListening } =
    useSpeachToText({ continuous: true });

  const togleListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setText(
      (prev) =>
        prev + (transcript.length ? (prev.length ? " " : "") + transcript : "")
    );
    stopListening();
  };

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <Flex gap="middle" vertical style={{ width: "90vw" }}>
      <Title style={{ color: "white" }}>Сonvert your voice(ENG) to text</Title>
      <Flex style={{ position: "relative" }}>
        <TextArea
          rows={6}
          placeholder="start to record your voice"
          onChange={onChange}
          value={
            isListening
              ? text +
                (transcript.length ? (text.length ? " " : "") + transcript : "")
              : text
          }
        />
        {isListening && <MessageTwoTone className="blinking-icon" />}
      </Flex>

      <Button
        type="primary"
        size="large"
        danger={isListening}
        onClick={() => togleListening()}
      >
        {isListening ? "Stop" : "Start recording"}
      </Button>
    </Flex>
  );
}

export default App;
