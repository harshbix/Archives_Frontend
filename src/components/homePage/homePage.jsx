import React, { useState } from "react";
import { FaShareAlt, FaDownload, FaHeart, FaStar } from "react-icons/fa";
import Navbar from "../navBar/Navbar";
import "./homePage.css";

function HomePage() {
  // Sample document data for testing search functionality
  const [documents, setDocuments] = useState([
    { id: 1, name: "Mathematics Syllabus", type: "pdf", size: "2.4 MB", degree: "bachelor", year: "1st", semester: "first", department: "it", rating: 0, liked: false },
    { id: 2, name: "Programming Lab Manual", type: "doc", size: "1.8 MB", degree: "diploma", year: "2nd", semester: "second", department: "cs", rating: 0, liked: false },
    { id: 3, name: "Database Systems Notes", type: "pdf", size: "3.2 MB", degree: "bachelor", year: "3rd", semester: "first", department: "it", rating: 0, liked: false },
    { id: 4, name: "Computer Networks Slides", type: "ppt", size: "5.1 MB", degree: "bachelor", year: "2nd", semester: "second", department: "it", rating: 0, liked: false },
    { id: 5, name: "Algorithms Textbook", type: "pdf", size: "8.7 MB", degree: "masters", year: "1st", semester: "first", department: "cs", rating: 0, liked: false },
    { id: 6, name: "Operating Systems Guide", type: "pdf", size: "4.5 MB", degree: "bachelor", year: "3rd", semester: "second", department: "coe", rating: 0, liked: false },
    { id: 7, name: "Web Development Cheatsheet", type: "pdf", size: "1.2 MB", degree: "diploma", year: "2nd", semester: "first", department: "it", rating: 0, liked: false },
    { id: 8, name: "Data Structures Exercises", type: "doc", size: "2.9 MB", degree: "bachelor", year: "1st", semester: "second", department: "cs", rating: 0, liked: false },
    { id: 9, name: "Software Engineering Case Studies", type: "pdf", size: "6.3 MB", degree: "masters", year: "2nd", semester: "first", department: "coe", rating: 0, liked: false },
    { id: 10, name: "AI Fundamentals", type: "pdf", size: "7.8 MB", degree: "bachelor", year: "4th", semester: "second", department: "it", rating: 0, liked: false },
    { id: 11, name: "Computer Graphics Tutorial", type: "pdf", size: "3.6 MB", degree: "bachelor", year: "3rd", semester: "first", department: "cs", rating: 0, liked: false },
    { id: 12, name: "Network Security Handbook", type: "pdf", size: "9.2 MB", degree: "masters", year: "1st", semester: "second", department: "it", rating: 0, liked: false },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    degree: "",
    department: "",
    semester: "",
  });

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
      doc.name.toLowerCase().includes(searchQuery) &&
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
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        <select
          className="filter-select"
          onChange={(e) => handleFilterChange("degree", e.target.value)}
        >
          <option value="">Degree</option>
          <option value="bachelor">BSc (Hons)</option>
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

      <div className="documents-section">
        {filteredDocuments.map((doc) => (
          <div className="document-card" key={doc.id}>
            <div className="image-container" title={doc.name}>
              <div className="doc-image">{getFileIcon(doc.type)}</div>
              <div className="image-hover">
                <p className="hover-title">{doc.name}</p>
                <p className="hover-size">{doc.size}</p>
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
    </div>
  );
}

export default HomePage;