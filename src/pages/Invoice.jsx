import React, { forwardRef } from "react";
import { formatCurrency } from "num-format-utils";

const Invoice = forwardRef((props, ref) => {
  const state = props.products;
  let totalDiscount = 0;
  let totalTax = 0;
  let totalSubamount = 0;

  state.products?.map((d) => {
    totalDiscount = totalDiscount + Number(d.disount || 0);
    totalSubamount = totalSubamount + Number(d?.sub_amount);
    totalTax = totalTax + Number(d?.total_tax);
  });

  const format = (value) => {
    return formatCurrency({ value, currency: "INR", locale: "en-IN" });
  };
  return (
    <section ref={ref} className="invoice">
      <div className="top">
        <div className="top_left">
          <div className="tl1">
            <div className="logo">
              <img src={state?.logo?.url} />
            </div>
            <div className="name">
              <h1>{state?.bussinessName}</h1>
              <div className="flex">
                <b>Address:</b>
                <p>
                  {state?.bussinessAddress?.street},{" "}
                  {state?.bussinessAddress?.city},{" "}
                  {state?.bussinessAddress?.state},{" "}
                  {state?.bussinessAddress?.pincode}
                </p>
              </div>
              <div className="flex2">
                <div className="ak">
                  <b>Phone:</b>
                  <p>{state?.bussinessPhone}</p>
                </div>
                <div className="ak">
                  <b>Email:</b>
                  <p>{state?.bussinessEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="top_right">
          <div className="flex">
            <b>Invoice No:</b> <p>{state?.invoice_no}</p>
          </div>
          <div className="flex">
            <b>Invoice Date:</b>{" "}
            <p>{new Date(state?.invoice_date).toDateString()}</p>
          </div>
        </div>
      </div>

      <div className="top2">
        <h2>Customer Details</h2>

        <div className="form_wrap">
          <div className="form_group">
            <label>Name:</label>
            <p>{state?.party_name}</p>
          </div>
          <div className="form_group">
            <label>Email:</label>
            <p>{state?.email}</p>
          </div>
        </div>

        <div className="form_wrap">
          <div className="form_group">
            <label>Phone:</label>
            <p>{state?.phone}</p>
          </div>
          <div className="form_group">
            <label>GST No:</label>
            <p>{state?.gst_no}</p>
          </div>
        </div>

        <div className="form_wrap">
          <div className="form_group">
            <label>Place of Supply:</label>
            <p>
              {state?.state_name}({state?.state_code})
            </p>
          </div>
          <div className="form_group">
            <label>Billing Address:</label>
            <p>{state?.party_billing_address}</p>
          </div>
        </div>

        <div className="form_wrap">
          <div className="form_group">
            <label>Final Amount:</label>
            <p>{format(state?.final_amount)}</p>
          </div>
        </div>
      </div>

      <div className="top3">
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>S.no</th>
              <th style={{ width: "220px" }}>Product Details</th>
              <th style={{ width: "80px" }}>HSN/SAC</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "80px" }}>Rate</th>
              <th style={{ width: "120px" }}>Taxable Amount</th>
              <th style={{ width: "120px" }}>Total</th>
            </tr>
          </thead>

          <tbody>
            {state.products?.map((d, i) => (
              <tr key={d?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="details">
                    <h4>{d?.product_name}</h4>
                    {d?.tax?.map((t) => (
                      <p>
                        {t?.title} {t?.percentage}%
                      </p>
                    ))}
                  </div>
                </td>
                <td>{d?.hsn_code}</td>
                <td>{d?.quantity} {d?.unit}</td>
                <td>{format(d?.product_amount)}</td>
                <td>{format(d?.total_tax)}</td>
                <td>{format(d?.sub_amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div className="tleft">
            <h5>Terms & Conditions:</h5>
            <ul>
              <li>Goods once sold will not be taken back or exchanged.</li>
              <li>Warranty/Guarantee is subject to manufacturer policies.</li>
            </ul>

            <br />

            <h5>Declaration</h5>
            <p>
              We declare that the invoice shows the actual price of
              goods/services provided and that all particulars are true and
              correct. This is a computer-generated invoice and does not require
              a signature.
            </p>
          </div>

          <div className="tright">
            <div className="flex">
              <b>Total Amount:</b> <b>{format(state?.final_amount)}</b>
            </div>
            <div className="flex">
              <b>Total Tax:</b> <b>{format(totalTax)}</b>
            </div>
            <div className="flex">
              <b>Total Discount:</b> <b>{format(totalDiscount)}</b>
            </div>
            <div className="flex">
              <b>Total Amount Before Tax:</b> <b>{format(totalSubamount)}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="top4">
        <p>
          This invoice was generated automatically using Taxonic Billing
          Software.
        </p>
      </div>
    </section>
  );
});

export default Invoice;
