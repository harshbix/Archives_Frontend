import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload } from 'react-icons/fa';
import FileTable from './filetable';
import Navbar from '../navBar/Navbar';

const UploadPage = ({ onLogout }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [year, setYear] = useState('');
    const [course, setCourse] = useState('');
    const [subject, setSubject] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '');
    };

    const handleUpload = (event) => {
        event.preventDefault();

        if (!file || !year || !course || !subject) {
            alert("Please fill all fields and choose a file.");
            return;
        }

        console.log("Uploading File:");
        console.log("Year:", year);
        console.log("Course:", course);
        console.log("Subject:", subject);
        console.log("File Name:", file.name);

        // Add your real upload logic here...

        // Clear inputs
        setYear('');
        setCourse('');
        setSubject('');
        setFileName('');
        setFile(null);
    };

    const handleCancel = () => {
        setYear('');
        setCourse('');
        setSubject('');
        setFileName('');
        setFile(null);
    };

    return (
        <>
            <Navbar onLogout={onLogout} />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="w-100 p-4 rounded shadow-sm" style={{ maxWidth: '800px', backgroundColor: '#F8FAFC' }}>
                    <form onSubmit={handleUpload}>
                        <h1 className="text-center mb-4">Upload Resources</h1>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="year" className="form-label">Year</label>
                                <input
                                    type="text"
                                    id="year"
                                    name="year"
                                    className="form-control"
                                    placeholder="e.g. 2023/2024"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="course" className="form-label">Course</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    className="form-control"
                                    placeholder="Enter Course"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Enter Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fileUpload" className="form-label">File Upload</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUpload />
                                </span>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    name="fileUpload"
                                    className="form-control d-none"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="fileUpload"
                                    className="form-control text-muted"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {fileName || 'Browse'}
                                </label>
                            </div>
                        </div>

                        <div className="d-flex">
                            <button type="button" className="btn btn-outline-secondary btn-sm me-2" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="btn btn-dark btn-sm">Upload</button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <FileTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadPage;
