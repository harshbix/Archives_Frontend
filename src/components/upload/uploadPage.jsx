import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload } from 'react-icons/fa';
import FileTable from './filetable';
import Navbar from '../navBar/Navbar';
import axios from 'axios';

const UploadPage = () => {
    const [file, setFile] = useState(null);
const [alert, setAlert] = useState(null);

// State variables for form inputs
const [year, setYear] = useState('');
const [course, setCourse] = useState('');
const [subject, setSubject] = useState('');
const [level, setLevel] = useState('');
const [department, setDepartment] = useState('');
const [semester, setSemester] = useState('');

    const handleFileChange = (event) => {
        const selected = event.target.files[0];
        if (selected) {
            setFile(selected);
            setAlert(null);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setAlert(null);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
        formData.append('document', file);
    }
    formData.append('year', year);
    formData.append('course', course);
    formData.append('subject', subject);
    formData.append('level', level);
    formData.append('department', department);
    formData.append('semester', semester);

    try {
        const response = await axios.post('http://127.0.0.1:8001/api/documents/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setAlert({ type: 'success', message: 'File uploaded successfully!' });
        setFile(null);
        setYear('');
        setCourse('');
        setSubject('');
        setLevel('');
        setDepartment('');
        setSemester('');
    } catch (error) {
        setAlert({ type: 'danger', message: 'Upload failed. Please try again.' });
        console.error('Upload error:', error);
    }
};

const handleCancel = () => {
    setFile(null);
    setAlert(null);
    setYear('');
    setCourse('');
    setSubject('');
    setLevel('');
    setDepartment('');
    setSemester('');
};

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="w-100 p-4 rounded shadow-sm" style={{ maxWidth: '800px', backgroundColor: '#F8FAFC' }}>
                    <form onSubmit={handleUpload}>
                        <h1 className="text-center mb-4">Upload Resources</h1>

                        {alert && (
                            <div className={`alert alert-${alert.type}`} role="alert">
                                {alert.message}
                            </div>
                        )}

                        <div className="row mb-3">
                            <div className="col-md-4">
<label className="form-label">Year</label>
<select
    className="form-select"
    value={year}
    onChange={(e) => setYear(e.target.value)}
>
    <option value="">Select Year</option>
    <option value="first">First</option>
    <option value="second">Second</option>
    <option value="third">Third</option>
    <option value="fourth">Fourth</option>
</select>
                            </div>
                            <div className="col-md-4">
<label className="form-label">Course</label>
<input
    type="text"
    className="form-control"
    placeholder="Enter the Course"
    value={course}
    onChange={(e) => setCourse(e.target.value)}
/>
                            </div>
                            <div className="col-md-4">
<label className="form-label">Subject</label>
<input
    type="text"
    className="form-control"
    placeholder="Enter the Subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
/>
                            </div>
                            <div className="col-md-4">
<label className="form-label">Level</label>
<select
    className="form-select"
    value={level}
    onChange={(e) => setLevel(e.target.value)}
>
    <option value="">Select Level</option>
    <option value="bachelor">Bachelor</option>
    <option value="diploma">Diploma</option>
    <option value="masters">Masters</option>
</select>
                            </div>
                            <div className="col-md-4">
<label className="form-label">Department</label>
<select
    className="form-select"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
>
    <option value="">Select Department</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Engineering">Engineering</option>
</select>
                            </div>
                            <div className="col-md-4">
<label className="form-label">Semester</label>
<select
    className="form-select"
    value={semester}
    onChange={(e) => setSemester(e.target.value)}
>
    <option value="">Select Semester</option>
    <option value="first">First</option>
    <option value="second">Second</option>
</select>
                            </div>
                        </div>

                        <div
                            className="border rounded p-4 mb-3 text-center"
                            style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <FaUpload size={30} className="mb-2 text-secondary" />
                            <p className="text-muted mb-0">Drag and drop a file here, or click to browse</p>
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileUpload" />
                            <label htmlFor="fileUpload" className="btn btn-outline-secondary mt-2">Browse</label>
                            {file && (
                                <div className="mt-3 text-start">
                                    <strong>Selected File:</strong> {file.name}
                                    <br />
                                    {file.type.startsWith("image/") && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="img-thumbnail mt-2"
                                            style={{ maxWidth: '200px' }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="d-flex">
                            <button type="button" className="btn btn-outline-secondary me-2" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="btn btn-dark">Upload</button>
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
