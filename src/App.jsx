import { Route, Routes } from "react-router-dom";
import NewSalesInvoice from "./components/NewSalesInvoice";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Invoices from "./components/Invoices";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/new-sale" element={<NewSalesInvoice />} />
        <Route path="/" element={<Invoices />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
