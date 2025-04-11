import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import "datatables.net-dt/css/jquery.dataTables.css";

const FileTable = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Error loading files:", err));
  }, []);

  const columns = [
    { title: "File Name", data: "fileName" },
    { title: "Uploaded By", data: "name" },
    {
      title: "Actions",
      data: null,
      className: "text-center",
      createdCell: (td, _, rowData) => {
        const button = document.createElement("button");
        button.className = "btn btn-dark btn-sm";
        button.style.borderRadius = "5px";
        button.textContent = "Download";

        button.onclick = () => {
          const link = document.createElement("a");
          link.href = rowData.fileUrl;
          link.download = rowData.fileName;
          link.click();
        };

        td.innerHTML = "";
        td.appendChild(button);
      },
    },
  ];

  return (
    <div className="mt-4">
      <DataTable
        data={files}
        columns={columns}
        className="table table-bordered shadow-sm"
        style={{ borderRadius: "5px", overflow: "hidden" }}
      />
    </div>
  );
};

export default FileTable;
