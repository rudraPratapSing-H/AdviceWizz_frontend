import { useState, useCallback } from 'react';
import { sendMessage } from '../services/chatbotAPI';

export const useChat = (userId, styleTypeId = 'default') => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = useCallback(async (userMessage) => {
    // Add user message to chat
    const userMessageObj = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);
    setError(null);

    try {
      // Call API
      const response = await sendMessage(userId, userMessage, styleTypeId);
      
      // Add bot response to chat with all endpoint data
      const botMessageObj = {
        text: response.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        // Store all additional data from endpoint
        fullData: {
          memories: response.memories,
          emotion: response.emotion,
          retrieved_meta: response.retrieved_meta,
          history: response.history,
          style: response.style,
          message: response.message
        }
      };
      
      setMessages((prev) => [...prev, botMessageObj]);
    } catch (err) {
      setError(err.message);
      
      // Add error message
      const errorMessageObj = {
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, [userId, styleTypeId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage,
    clearMessages,
  };
};
