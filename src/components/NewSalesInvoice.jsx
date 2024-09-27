import { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import InvoiceDetails from "./InvoiceDetails";
import { useDispatch } from "react-redux";
import { addItem } from "../invoiceSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewSalesInvoice() {
  const [items, setItems] = useState([
    {
      item: "",
      quantity: 1,
      unitPrice: 0,
      discountPercent: 0,
      taxPercent: 0,
    },
  ]);
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(
    generateRandomInvoiceNumber()
  );
  const [state, setState] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totals, setTotals] = useState({
    totalWithoutTax: 0,
    totalWithTax: 0,
    finalTotal: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function generateRandomInvoiceNumber() {
    return Math.floor(Math.random() * 10000);
  }

  const saveInvoice = () => {
    if (!phone || !address || !state) {
      alert("Please fill out all customer details!");
      return;
    }

    // Check if there are items in the invoice and if each item has necessary details
    if (
      !items ||
      items.length === 0 ||
      items.some(
        (item) => !item.item || item.quantity <= 0 || item.unitPrice <= 0
      )
    ) {
      alert("Please add valid items to the invoice!");
      return;
    }
    let invoice = {
      customer: {
        name: selectedCustomerId?.name,
        phone,
        address,
        invoiceNumber,
        invoiceDate,
        state,
      },
      items: items,
      totals: {
        totalWithoutTax: totals.totalWithoutTax,
        totalWithTax: totals.totalWithTax,
        finalTotal: totals.finalTotal,
      },
    };
    toast.success("Invoice sucessfully created!");
    dispatch(addItem(invoice));
    navigate("/");
  };

  return (
    <>
      <CustomerDetails
        selectedCustomerId={selectedCustomerId}
        setSelectedCustomerId={setSelectedCustomerId}
        phone={phone}
        setPhone={setPhone}
        address={address}
        setAddress={setAddress}
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        generateRandomInvoiceNumber={generateRandomInvoiceNumber}
        state={state}
        setState={setState}
      />
      <InvoiceDetails items={items} setItems={setItems} getTotals={setTotals} />
      <div className="save-btn">
        {" "}
        <button onClick={saveInvoice}>Save</button>
      </div>
    </>
  );
}

export default NewSalesInvoice;
