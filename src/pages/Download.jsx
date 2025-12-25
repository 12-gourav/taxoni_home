import { useEffect, useRef, useState } from "react";
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

const Download = () => {
  const componentRef = useRef(null);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const id = location?.search?.split("?id=")[1]

  const fetchInvoice = async () => {
    try {
      setLoading(true);

      const result = await axios.get(
        "https://gst-app-backend.onrender.com/api/v1/invoice/detail",
        {
          params:{
            id
          }
        }
      );
      if (result?.data?.data) {
        setState(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: "invoice",
  });


  useEffect(() => {
    if(id){
    fetchInvoice();

    }
  }, [location.search]);

  return (
    <div>
      <div className="invoice-download-container">
        <div className="invoice-card">
          <h2 className="title">Invoice Preview</h2>
          <p className="subtitle">
            Review the invoice below and click the button to download your PDF.
          </p>

          <button className="download-btn" onClick={handlePrint}>
            ⬇ Download Invoice
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", left: "-9999px" }}>
        <Invoice ref={componentRef} products={state} />
      </div>
    </div>
  );
};

export default Download;
