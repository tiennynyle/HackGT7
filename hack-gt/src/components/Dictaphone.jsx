import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useVoiceCommands } from "../data/useVoiceCommands";
import MicIcon from "@material-ui/icons/Mic";

export const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [voice, setVoice] = React.useState("How can I help you today?");

  const resetVoice = (str) => {
    setVoice(str);
  };

  useVoiceCommands({ transcript, resetTranscript, resetVoice });

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MicIcon />
        <span>{voice}</span>
      </div>
      <p>{transcript}</p>
    </>
  );
};
