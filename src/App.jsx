import React from 'react';
import ChatView from './features/chat/ChatView';
import { ChatProvider } from './context/ChatContext';
import './styles/global.css';

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <ChatView />
      </div>
    </ChatProvider>
  );
}

export default App;
