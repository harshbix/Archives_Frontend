// src/api/documents.js
import apiClient from './apiClient';
import mockDocuments from './mockDocuments';

export const getDocumentById = async (id) => {
  // Try to find the document in mock data
  const doc = mockDocuments.find(d => String(d.id) === String(id));
  if (!doc) throw new Error('Document not found');
  return doc;
};