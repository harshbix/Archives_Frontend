import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadPage = () => {
    return (
        <>
        <div className='container'>
            <h1 className='text-center'>Upload Resources</h1>
            <form>
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
                            placeholder="Browse" 
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-secondary me-2">Cancel</button>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
        </>
    );
};

export default UploadPage;