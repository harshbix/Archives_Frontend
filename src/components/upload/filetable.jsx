import React, { useEffect, useRef, useState } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import DT from "datatables.net-bs5";

const FileTable = () => {
    const [files, setFiles] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setFiles(data))
            .catch((err) => {
                console.error("Error loading files:", err);
                setFiles([]);
            });
    }, []);

    useEffect(() => {
        if (files.length > 0) {
            const table = new DT(tableRef.current, {
                data: files,
                columns: [
                    { title: "File Name", data: "fileName" },
                    { title: "Uploaded By", data: "name" },
                    {
                        title: "Actions",
                        data: null,
                        render: (data, type, row) => {
                            return `
                                <button 
                                    class="btn btn-dark btn-sm" 
                                    style="border-radius: 5px;" 
                                    onclick="downloadFile('${row.fileUrl}', '${row.fileName}')">
                                    Download
                                </button>`;
                        },
                    },
                ],
            });

            // Cleanup on component unmount
            return () => {
                table.destroy();
            };
        }
    }, [files]);

    // Handle the file download
    const downloadFile = (fileUrl, fileName) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <div className="mt-4">
            <table ref={tableRef} className="table table-bordered shadow-sm" style={{ borderRadius: "5px", overflow: "hidden" }}></table>
        </div>
    );
};

export default FileTable;
