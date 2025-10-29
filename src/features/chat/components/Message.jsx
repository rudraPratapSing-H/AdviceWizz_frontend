import React, { useState } from 'react';
import styles from '../chat.module.css';
import Modal from '../../../components/common/Modal/Modal';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  const [showModal, setShowModal] = useState(false);

  const hasFullData = message.fullData && !isUser;

  return (
    <>
      <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.botMessage}`}>
        <div className={styles.messageBubble}>
          <p className={styles.messageText}>{message.text}</p>
          <div className={styles.messageFooter}>
            {message.timestamp && (
              <span className={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
            {hasFullData && (
              <button 
                className={styles.detailsButton}
                onClick={() => setShowModal(true)}
                title="View response details"
              >
                ℹ️ Details
              </button>
            )}
          </div>
        </div>
      </div>

      {hasFullData && (
        <Modal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)}
          title="Response Details"
        >
          <div className={styles.modalContent}>
            
            {message.fullData.emotion && (
              <div className={styles.dataSection}>
                <h3>Emotion Analysis</h3>
                <pre className={styles.dataValue}>{message.fullData.emotion}</pre>
              </div>
            )}

            {message.fullData.memories && (
              <div className={styles.dataSection}>
                <h3>Retrieved Memories</h3>
                <pre className={styles.dataValue}>{message.fullData.memories}</pre>
              </div>
            )}

            {message.fullData.retrieved_meta && message.fullData.retrieved_meta.length > 0 && (
              <div className={styles.dataSection}>
                <h3>Retrieved Context Metadata</h3>
                <div className={styles.metadataList}>
                  {message.fullData.retrieved_meta.map((meta, index) => (
                    <div key={index} className={styles.metadataItem}>
                      <strong>Source {index + 1}:</strong>
                      <pre className={styles.dataValue}>{JSON.stringify(meta, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message.fullData.style && (
              <div className={styles.dataSection}>
                <h3>Response Style</h3>
                <pre className={styles.dataValue}>{message.fullData.style}</pre>
              </div>
            )}

            {message.fullData.history && (
              <div className={styles.dataSection}>
                <h3>Conversation History</h3>
                <pre className={styles.dataValue}>{JSON.stringify(message.fullData.history, null, 2)}</pre>
              </div>
            )}

          </div>
        </Modal>
      )}
    </>
  );
};

export default Message;
