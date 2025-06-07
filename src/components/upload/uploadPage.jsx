import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload } from 'react-icons/fa';
import FileTable from './filetable';
import Navbar from '../navBar/Navbar';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(null);

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

    const handleUpload = (event) => {
        event.preventDefault();
        if (file) {
            console.log('File uploaded:', file.name);
            setAlert({ type: 'success', message: 'File uploaded successfully!' });
            setFile(null);
        } else {
            setAlert({ type: 'danger', message: 'No file selected!' });
        }
    };

    const handleCancel = () => {
        setFile(null);
        setAlert(null);
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
                                <input type="text" className="form-control" placeholder="Enter the Year" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Course</label>
                                <input type="text" className="form-control" placeholder="Enter the Course" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Subject</label>
                                <input type="text" className="form-control" placeholder="Enter the Subject" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Level</label>
                                <input type="text" className="form-control" placeholder="Enter level" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Department</label>
                                <input type="text" className="form-control" placeholder="Enter the department" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Semester</label>
                                <input type="text" className="form-control" placeholder="Enter Semester " />
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
