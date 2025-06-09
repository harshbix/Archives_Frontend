import React from "react";
import "./DocumentViewer.css";
import { FaDownload, FaShareAlt, FaHeart, FaExpand, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const DocumentViewer = ({ document }) => {
  return (
    <div className="document-viewer-container">
      {/* Header */}
      <div className="viewer-header">
        <div className="doc-info">
          <h2>{document.title}</h2>
          <span className="doc-meta">{document.type.toUpperCase()} • {document.size}</span>
        </div>
        <div className="doc-actions">
          <button><FaDownload /> Download</button>
          <button><FaShareAlt /> Share</button>
          <button><FaHeart /> Like</button>
        </div>
      </div>

      {/* Viewer */}
      <div className="viewer-body">
        <iframe 
          src={document.url} 
          title={document.title} 
          frameBorder="0" 
          className="doc-frame"
        ></iframe>

        {/* Sidebar Info */}
        <div className="viewer-sidebar">
          <p><strong>Uploaded by:</strong> {document.uploader}</p>
          <p><strong>Date:</strong> {document.uploadDate}</p>
          <p><strong>Category:</strong> {document.category}</p>
          <p><strong>Program:</strong> {document.program}</p>
          <p><strong>Semester/Year:</strong> {document.semester}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="viewer-controls">
        <button><FaSearchMinus /></button>
        <button><FaSearchPlus /></button>
        <button><FaExpand /></button>
      </div>
    </div>
  );
};

export default DocumentViewer;
