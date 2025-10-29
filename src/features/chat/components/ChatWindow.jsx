import { Modal } from 'react-native';
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from '../chat.module.css';

const ChatWindow = ({ messages, onSendMessage, isLoading }) => {
  return (
    <div className={styles.chatWindow}>
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
