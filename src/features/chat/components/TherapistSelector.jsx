import React from 'react';
import styles from './TherapistSelector.module.css';

const therapists = [
  {
    id: 'default',
    name: 'Default Therapist',
    description: 'Friendly and knowledgeable assistant with clear, concise answers',
    icon: '🧑‍⚕️',
    color: '#4a9eff'
  },
  {
    id: 'normal',
    name: 'Direct Assistant',
    description: 'Straightforward answers based purely on context, no extras',
    icon: '💼',
    color: '#6c757d'
  },
  {
    id: 'hannibal',
    name: 'Dr. Hannibal Lecter',
    description: 'Brilliant, perceptive psychiatrist with chillingly insightful analysis',
    icon: '🎭',
    color: '#8b0000'
  },
  {
    id: 'kneeting',
    name: 'John Keating',
    description: 'Inspirational teacher who ignites authentic voice and challenges conformity',
    icon: '📚',
    color: '#ff6b35'
  },
  {
    id: 'ANDY',
    name: 'Dr. Victor Blaine',
    description: 'Brutally honest therapist who delivers unfiltered truth with no sympathy',
    icon: '⚡',
    color: '#dc3545'
  }
];

const TherapistSelector = ({ selectedTherapist, onSelectTherapist }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Therapist</h2>
      <p className={styles.subtitle}>Select the therapeutic approach that resonates with you</p>
      
      <div className={styles.grid}>
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className={`${styles.card} ${
              selectedTherapist === therapist.id ? styles.selected : ''
            }`}
            onClick={() => onSelectTherapist(therapist.id)}
            style={{ '--therapist-color': therapist.color }}
          >
            <div className={styles.icon}>{therapist.icon}</div>
            <h3 className={styles.name}>{therapist.name}</h3>
            <p className={styles.description}>{therapist.description}</p>
            {selectedTherapist === therapist.id && (
              <div className={styles.selectedBadge}>✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistSelector;
