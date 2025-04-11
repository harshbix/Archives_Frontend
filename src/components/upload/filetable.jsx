import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FileTable = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .catch((error) => console.error("Error loading data:", error));
    }, []);

    return (
        <div className="mt-4">
            <div className="table-responsive">
                <table
                    className="table table-bordered shadow-sm table-responsive-sm"
                    style={{ borderRadius: "5px", overflow: "hidden" }}
                >
                    <thead className="table table-light">
                        <tr>
                            <th>File Name</th>
                            <th className="d-none d-sm-table-cell">Uploaded By</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.fileName}</td>
                                <td className="d-none d-sm-table-cell">{file.name}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-dark btn-sm"
                                        style={{ borderRadius: "5px" }}
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileTable;
