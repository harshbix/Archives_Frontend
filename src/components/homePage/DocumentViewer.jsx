// src/components/documentViewer/DocumentViewer.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoArrowBack, IoDownload, IoTrash, IoCreate } from 'react-icons/io5';
import { getDocumentById } from '../../api/documents';
import './DocumentViewer.css';

export default function DocumentViewer({ onLogout }) {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(25); // This should come from document data
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocumentById(documentId);
        setDocument(doc);
        // Set total pages from document data if available
        if (doc.totalPages) {
          setTotalPages(doc.totalPages);
        }
      } catch (error) {
        console.error("Failed to load document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [documentId]);

  const handleDownload = () => {
    if (document?.downloadUrl) {
      window.open(document.downloadUrl, '_blank');
    }
  };

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit document');
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete document');
  };

  const handleApprove = () => {
    // Implement approve functionality
    console.log('Approve document');
  };

  const handleReject = () => {
    // Implement reject functionality
    console.log('Reject document');
  };

  return (
    <div className="document-viewer">
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
    <button onClick={handleDownload} className="download-header-button">
      <IoDownload className="download-icon" />
      <span className="download-text">Download</span>
    </button>
  </div>
</header>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && !document && (
        <div className="error-container">
          <p className="error-message">Document not found</p>
        </div>
      )}

      {/* Main Content - Three Column Layout (Only when document is loaded) */}
      {!isLoading && document && (
        <main className="main-content">
        
        {/* Left Sidebar - Document Pages */}
        <aside className="pages-sidebar">
          <div className="pages-list">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index + 1}
                className={`page-thumbnail ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                <div className="page-preview">
                  <div className="page-content">
                    <div className="page-lines"></div>
                    <div className="page-lines"></div>
                    <div className="page-lines"></div>
                  </div>
                </div>
                <span className="page-number">Page {index + 1}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Document Preview */}
        <section className="document-preview">
          <div className="preview-controls">
            <div className="page-info">
              Page {currentPage} / {totalPages}
            </div>
            <div className="zoom-controls">
              <button 
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                className="zoom-button"
              >
                -
              </button>
              <span className="zoom-level">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                className="zoom-button"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="preview-container">
            <div className="document-page" style={{ transform: `scale(${zoomLevel / 100})` }}>
              <iframe 
                src={`${document.url}#page=${currentPage}`}
                className="document-iframe"
                title={`${document.title} - Page ${currentPage}`}
                frameBorder="0"
              />
            </div>
          </div>
        </section>

        {/* Right Sidebar - Document Details */}
        <aside className="details-sidebar">
          <div className="details-header">
            <h3>Details</h3>
          </div>
          
          <div className="details-content">
            <div className="detail-item">
              <label>File name</label>
              <span>{document.fileName || document.title}</span>
            </div>
            
            <div className="detail-item">
              <label>File size</label>
              <span>{document.fileSize || '200 KB'}</span>
            </div>
            
            <div className="detail-item">
              <label>Status</label>
              <span className={`status ${document.status?.toLowerCase() || 'need-approval'}`}>
                {document.status || 'Need Approval'}
              </span>
            </div>
            
            <div className="detail-item">
              <label>Category</label>
              <span>{document.category || 'Script'}</span>
            </div>
            
            <div className="detail-item">
              <label>Uploaded by</label>
              <div className="user-info">
                <div className="user-avatar">
                  {document.uploadedBy?.name?.charAt(0) || 'U'}
                </div>
                <span>{document.uploadedBy?.name || 'Unknown'}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <label>Date Uploaded</label>
              <span>{new Date(document.uploadDate).toLocaleDateString() || '11 January 2024'}</span>
            </div>
          </div>
          
        </aside>
        </main>
        
      )}
    </div>
  
  );
}
