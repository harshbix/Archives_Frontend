import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileTable from './filetable';
import Navbar from '../navBar/Navbar';

const UploadPage = () => {
    return (
        <>
        <Navbar />
        <div 
            className="container-fluid d-flex justify-content-center align-items-center" 
            style={{ 
                minHeight: '90vh' // Full height of the viewport
                , overflow: 'hidden'
            }}
        >
            <div 
                className="w-100" 
                style={{ 
                    maxWidth: '800px' // Centered and constrained width on large screens
                }}
            >
                <form>
                    <h1 className="text-center">Upload Resources</h1>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input 
                                type="text" 
                                id="year" 
                                name="year" 
                                className="form-control" 
                                placeholder="Enter Year" 
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
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label">File Upload</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-upload"></i>
                            </span>
                            <input 
                                type="file" 
                                id="fileUpload" 
                                name="fileUpload" 
                                className="form-control" 
                                style={{ display: 'none' }} // Hide the default file input
                            />
                            <label 
                                htmlFor="fileUpload" 
                                className="form-control text-muted" 
                                style={{ cursor: 'pointer' }}
                            >
                                Browse
                            </label>
                        </div>
                    </div>
                    <div className="d-flex">
                        <button type="button" className="btn btn-sm me-2">Cancel</button>
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
