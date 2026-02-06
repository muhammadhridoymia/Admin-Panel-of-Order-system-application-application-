import React from "react";
import "../Styles/BillPopup.css";



function BillPopup({ order, close }) {
  if (!order) return null;

  const totalPrice = order.items.reduce(
    (sum, item) => sum + (item.foodId?.price || 0) * item.quantity,
    0
  );

  const handlePrint = () => {
    const printContent = document.getElementById("bill-print");
    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write("<html><head><title>Bill</title></head><body>");
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="bill-overlay">
      <div className="bill-popup">
        <div id="bill-print">
          <h3>Bill for {order.name}</h3>

          <div className="bill-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="bill-item">
                <span>{item.foodId?.name} × {item.quantity}</span>
                <span>{(item.foodId?.price || 0) * item.quantity}৳</span>
              </div>
            ))}
          </div>

          <hr />

          <div className="bill-total">
            <strong>Total: {totalPrice}৳</strong>
          </div>
        </div>

        <button className="close-btn" onClick={close}>Close</button>
        <button
          style={{marginTop:"10px", background:"#007bff"}}
          onClick={handlePrint}
        >
          Print Bill
        </button>
      </div>
    </div>
  );
}
 
export default BillPopup;