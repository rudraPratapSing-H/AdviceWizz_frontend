import { apiClient } from '../../../services/api';

/**
 * Send a message to the chatbot API
 * @param {string} userId - User identifier
 * @param {string} query - User's message
 * @param {string} styleTypeId - Therapist persona (hannibal, kneeting, ANDY, default)
 * @returns {Promise} API response
 */
export const sendMessage = async (userId, query, styleTypeId = 'default') => {
  try {
    const response = await apiClient.post('/chat/', {
      user_id: userId,
      query: query,
      style_type_id: styleTypeId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(error.response?.data?.detail || 'Failed to send message');
  }
};

/**
 * Get conversation history for a user
 * @param {string} userId - User identifier
 * @returns {Promise} Conversation history
 */
export const getConversationHistory = async (userId) => {
  try {
    const response = await apiClient.get(`/chat/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw new Error('Failed to fetch conversation history');
  }
};
