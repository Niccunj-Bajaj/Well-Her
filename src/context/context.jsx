import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const delay = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setLoadingProgress(0);
    setShowResult(true);
    let response;
    
    try {
      if (prompt !== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompt((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }
      
      // The response is already in markdown format, so we don't need to process it
      // Just display it word by word with the delay function
      const words = response.split(" ");
      const totalWords = words.length;
      
      for (let i = 0; i < words.length; i++) {
        const nextWord = words[i];
        delay(i, nextWord + " ");
        
        // Update loading progress
        const progress = Math.min(((i + 1) / totalWords) * 100, 100);
        setLoadingProgress(progress);
      }
    } catch (error) {
      console.error("Error processing response:", error);
      setResultData("Sorry, there was an error processing your request.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    loadingProgress,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
