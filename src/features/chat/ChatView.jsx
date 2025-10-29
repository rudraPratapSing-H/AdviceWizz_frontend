import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import Dashboard from './components/Dashboard';

const ChatView = () => {
  const userId = 'user123';
  const [styleTypeId, setStyleTypeId] = useState('default');

  const { messages, isLoading, error, sendMessage } = useChat(userId, styleTypeId);

  return (
    <Dashboard
      userId={userId}
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      onSelectTherapist={setStyleTypeId}
      selectedTherapist={styleTypeId}
    />
  );
};

export default ChatView;
