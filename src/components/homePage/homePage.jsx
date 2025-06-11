import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShareAlt, FaDownload, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import DocumentViewer from "./DocumentViewer";
import "./homePage.css";
import mockDocuments from "../../api/mockDocuments";

function HomePage() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    degree: "",
    department: "",
    semester: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get("http://127.0.0.1:8001/api/documents")
      .then((response) => {
        // Map backend docs to match mock structure
        const backendDocs = response.data.map(doc => ({
          ...doc,
         name: doc.name || doc.title || doc.subject || "Untitled",
          id: doc.id,
          type: doc.type || "pdf", // or whatever type field you expect
          size: doc.size || doc.fileSize || "Unknown size",
          rating: doc.rating || 0,
          liked: doc.liked || false,
        }));
        setDocuments([...backendDocs, ...mockDocuments]);
        setLoading(false);
      })
      .catch(() => {
        setDocuments([...mockDocuments]);
        setError("Failed to fetch from backend, showing mock data only.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.name && doc.name.toLowerCase().includes(searchQuery) &&
      (filters.year === "" || doc.year === filters.year) &&
      (filters.degree === "" || doc.degree === filters.degree) &&
      (filters.department === "" || doc.department === filters.department) &&
      (filters.semester === "" || doc.semester === filters.semester)
    );
  });

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return "📕";
      case "doc":
        return "📘";
      case "ppt":
        return "📙";
      default:
        return "📄";
    }
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />

      {/* Filter Section */}
      <div className="filters">
        <select
          className="filter-select"
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          <option value="">Year</option>
          <option value="first">First</option>
          <option value="second">Second</option>
          <option value="third">Third</option>
          <option value="fourth">Fourth</option>
        </select>
        <select
          className="filter-select"
          onChange={(e) => handleFilterChange("degree", e.target.value)}
        >
          <option value="">Level</option>
          <option value="bachelor">Bachelor</option>
          <option value="diploma">Diploma</option>
          <option value="masters">Masters</option>
        </select>
        <select
          className="filter-select"
          onChange={(e) => handleFilterChange("department", e.target.value)}
        >
          <option value="">Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Engineering">Engineering</option>
        </select>
        <select
          className="filter-select"
          onChange={(e) => handleFilterChange("semester", e.target.value)}
        >
          <option value="">Semester</option>
          <option value="first">First</option>
          <option value="second">Second</option>
        </select>
      </div>

      {loading && <p>Loading documents...</p>}
      {error && <p className="error">{error}</p>}

      <div className="documents-section">
        {filteredDocuments.map((doc) => (
          <div className="document-card" key={doc.id}>
            <div className="image-container" title={doc.name}>
              <div className="doc-image">{getFileIcon(doc.type)}</div>
              <div className="image-hover">
                <p className="hover-title">{doc.name}</p>
                <p className="hover-size">{doc.size}</p>
                <Link to={`/documents/${doc.id}`}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div className="action-container">
              <div className="action-container-inner">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star-icon ${doc.rating >= star ? 'active' : ''}`}
                      onClick={() => {
                        const updatedDocs = documents.map((d) => 
                          d.id === doc.id ? {...d, rating: star} : d
                        );
                        setDocuments(updatedDocs);
                      }}
                    />
                  ))}
                </div>
                <div className="icons">
                  <FaShareAlt className="share-icon" />
                  <FaDownload className="download-icon" />
                  <FaHeart 
                    className={`like-icon ${doc.liked ? 'liked' : ''}`}
                    onClick={() => {
                      const updatedDocs = documents.map((d) => 
                        d.id === doc.id ? {...d, liked: !doc.liked} : d
                      );
                      setDocuments(updatedDocs);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedDocument && (
        <div className="document-viewer-modal">
          <button className="close-button" onClick={() => setSelectedDocument(null)}>Close</button>
          <DocumentViewer document={selectedDocument} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
