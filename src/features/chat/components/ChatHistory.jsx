import React, { useState, useEffect } from 'react';
import { getConversationHistory } from '../services/chatbotAPI';
import styles from './ChatHistory.module.css';

const ChatHistory = ({ userId, currentTherapist, onLoadConversation, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getConversationHistory(userId);
      
      // Transform the history data and filter by current therapist
      const allHistory = data[userId] || [];
      const filteredHistory = allHistory.filter(
        conv => conv.therapist === currentTherapist
      );
      setHistory(filteredHistory);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentTherapist]);

  const handleConversationClick = (index) => {
    setSelectedIndex(index);
  };

  const handleLoadConversation = () => {
    if (selectedIndex !== null && history[selectedIndex]) {
      const conversation = history[selectedIndex];
      onLoadConversation(conversation);
    }
  };

  const getConversationPreview = (conversation) => {
    if (!conversation || !conversation.query) return 'Empty conversation';
    return conversation.query.length > 50 
      ? conversation.query.substring(0, 50) + '...' 
      : conversation.query;
  };

  const getTherapistName = (therapistId) => {
    const names = {
      'default': 'Default',
      'normal': 'Direct',
      'hannibal': 'Hannibal',
      'kneeting': 'Keating',
      'ANDY': 'Victor'
    };
    return names[therapistId] || therapistId;
  };

  if (loading) {
    return (
      <div className={styles.chatHistory}>
        <div className={styles.header}>
          <h2>Chat History</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.loading}>Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.chatHistory}>
        <div className={styles.header}>
          <h2>Chat History</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.error}>Error: {error}</div>
        <button className={styles.retryButton} onClick={loadHistory}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.chatHistory}>
      <div className={styles.header}>
        <h2>Chat History</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      
      <div className={styles.historyList}>
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No chat history yet</p>
            <p className={styles.emptyHint}>Start a conversation to see it here!</p>
          </div>
        ) : (
          history.map((conversation, index) => (
            <div
              key={index}
              className={`${styles.historyItem} ${selectedIndex === index ? styles.selected : ''}`}
              onClick={() => handleConversationClick(index)}
            >
              <div className={styles.conversationPreview}>
                <div className={styles.previewQuery}>
                  <strong>Q:</strong> {getConversationPreview(conversation)}
                </div>
                {conversation.response && (
                  <div className={styles.previewResponse}>
                    <strong>A:</strong> {conversation.response.substring(0, 100)}...
                  </div>
                )}
                {conversation.therapist && (
                  <div className={styles.therapistBadge}>
                    {getTherapistName(conversation.therapist)}
                  </div>
                )}
              </div>
              <div className={styles.conversationNumber}>
                #{index + 1}
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className={styles.footer}>
          <button 
            className={styles.loadButton}
            onClick={handleLoadConversation}
            disabled={selectedIndex === null}
          >
            {selectedIndex !== null ? `View Conversation #${selectedIndex + 1}` : 'Select a conversation'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
