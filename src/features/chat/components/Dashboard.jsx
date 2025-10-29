import React, { useState } from 'react';
import TherapistSelector from './TherapistSelector';
import ChatWindow from './ChatWindow';
import styles from './Dashboard.module.css';

const Dashboard = ({ userId, messages, isLoading, onSendMessage, onSelectTherapist, selectedTherapist }) => {
  const [showChat, setShowChat] = useState(false);

  const handleTherapistSelect = (therapistId) => {
    onSelectTherapist(therapistId);
    setShowChat(true);
  };

  const handleBackToDashboard = () => {
    setShowChat(false);
  };

  return (
    <div className={styles.dashboard}>
      {!showChat ? (
        <TherapistSelector
          selectedTherapist={selectedTherapist}
          onSelectTherapist={handleTherapistSelect}
        />
      ) : (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <button className={styles.backButton} onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h3 className={styles.currentTherapist}>
              Current Therapist: <span>{getTherapistName(selectedTherapist)}</span>
            </h3>
          </div>
          <ChatWindow
            messages={messages}
            onSendMessage={onSendMessage}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

const getTherapistName = (id) => {
  const names = {
    'default': 'Default Therapist',
    'normal': 'Direct Assistant',
    'hannibal': 'Dr. Hannibal Lecter',
    'kneeting': 'John Keating',
    'ANDY': 'Dr. Victor Blaine'
  };
  return names[id] || 'Unknown';
};

export default Dashboard;
