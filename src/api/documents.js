// src/api/documents.js
import apiClient from './apiClient';

export const getDocumentById = async (id) => {
  const response = await fetch(`/api/documents/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) throw new Error('Failed to fetch document');
  return await response.json();
};