// src/components/documentViewer/DocumentViewer.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { getDocumentById } from "../../api/documents";
import './DocumentViewer.css';

export default function DocumentViewer({ onLogout }) {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocumentById(documentId);
        setDocument(doc);
      } catch (error) {
        console.error("Failed to load document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [documentId]);

  return (
    
    <div className="document-viewer">
      <h1>DOCUMENT VIEWER</h1>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <button 
            onClick={() => window.history.back()}
            className="back-button"
          >
            <IoArrowBack className="back-icon" />
            Back to Archive
          </button>
          
          <button 
            onClick={onLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Document Container */}
      <main className="main-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : document ? (
          <div className="document-container">
            {/* Document Metadata */}
            <div className="document-header">
              <h1 className="document-title">{document.title}</h1>
              <p className="document-date">
                Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
              </p>
            </div>
            
            {/* Document Embed */}
            <div className="document-embed">
              <iframe 
                src={document.url} 
                className="document-iframe"
                title={document.title}
                frameBorder="0"
              />
            </div>
          </div>
        ) : (
          <div className="error-container">
            <p className="error-message">Document not found</p>
          </div>
        )}
      </main>
    </div>
  );
}