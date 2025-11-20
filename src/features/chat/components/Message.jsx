import React, { useState } from "react";
import styles from "../chat.module.css";
import Modal from "../../../components/common/Modal/Modal";

const Message = ({ message }) => {
  const isUser = message.sender === "user";
  const [showModal, setShowModal] = useState(false);

  const hasFullData = message.fullData && !isUser;

  return (
    <>
      <div
        className={`${styles.messageContainer} ${
          isUser ? styles.userMessage : styles.botMessage
        }`}
      >
        <div className={styles.messageBubble}>
          <p className={styles.messageText}>{message.text}</p>
          <div className={styles.messageFooter}>
            {message.timestamp && (
              <span className={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
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
                <pre className={styles.dataValue}>
                  {message.fullData.emotion}
                </pre>
              </div>
            )}

            {message.fullData.memories && (
              <div className={styles.dataSection}>
                <h3>Retrieved Memories</h3>
                <pre className={styles.dataValue}>
                  {message.fullData.memories}
                </pre>
              </div>
            )}

            {message.retrieved_sources &&
              message.retrieved_sources.length > 0 && (
                <div className="retrieved-sources">
                  <h4>Sources Used:</h4>
                  {message.retrieved_sources.map((src, idx) => (
                    <div key={idx} className="source-chunk">
                      <strong>Book:</strong> {src.book} <br />
                      <strong>Page:</strong> {src.page} <br />
                      <strong>Text:</strong> <span>{src.chunk}</span>
                      <hr />
                    </div>
                  ))}
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
                <pre className={styles.dataValue}>
                  {JSON.stringify(message.fullData.history, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Message;
