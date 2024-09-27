import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InvoiceList from "./InvoiceList";

function Invoices() {
  const navigate = useNavigate();
  const { invoices } = useSelector((state) => state.invoices);
  console.log(invoices);

  return (
    <>
      <div className="sale-page">
        <h2>Sales Invoices</h2>
        <button
          onClick={() => {
            navigate("/new-sale");
          }}
        >
          Add Sales
        </button>
      </div>
      {invoices.length > 0 ? (
        <InvoiceList invoices={invoices} />
      ) : (
        <p style={{ textAlign: "center" }}>Please add invoices to display</p>
      )}
    </>
  );
}

export default Invoices;
