import { useEffect, useRef, useState } from "react";
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

const DownloadCsv = () => {
  const componentRef = useRef(null);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const id = location?.search?.split("?id=")[1];
  const start = location?.search?.split("?start=")[1];
  const end = location?.search?.split("?start=")[1];

const downloadExcel = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      "https://gst-app-backend.onrender.com/api/v1/export/excel/report",
      {
        params: {
          userId: id,
          start,
          end,
        },
        responseType: "blob",
      }
    );

    // Create blob URL
    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );


    const link = document.createElement("a");
    link.href = url;
    link.download = "GSTR1_Report.xlsx";
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Excel download failed", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div>
      <div className="invoice-download-container">
        <div className="invoice-card">
          <h2 className="title">Invoice Report</h2>
          <p className="subtitle">
            Review the invoice below and click the button to download your PDF.
          </p>

          <button className="download-btn" onClick={downloadExcel}>
            ⬇ Download Report
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", left: "-9999px" }}>
        <Invoice ref={componentRef} products={state} />
      </div>
    </div>
  );
};

export default DownloadCsv;
