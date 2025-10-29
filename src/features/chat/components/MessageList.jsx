import React, { useEffect, useRef } from 'react';
import Message from './Message';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import styles from '../chat.module.css';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messageList}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
          <span className={styles.loadingText}>Thinking...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
