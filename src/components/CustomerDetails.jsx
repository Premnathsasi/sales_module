/* eslint-disable react/prop-types */
import { customers, indianStates } from "../data";

function CustomerDetails({
  selectedCustomerId,
  setSelectedCustomerId,
  phone,
  setPhone,
  address,
  setAddress,
  invoiceNumber,
  setInvoiceNumber,
  invoiceDate,
  setInvoiceDate,
  generateRandomInvoiceNumber,
  state,
  setState,
}) {
  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    const customer = customers.find((c) => c.id === parseInt(customerId));

    if (customer) {
      setSelectedCustomerId(customer);
      setPhone(customer.phone);
      setAddress(customer.address);
      setInvoiceNumber(generateRandomInvoiceNumber());
    } else {
      setSelectedCustomerId("");
      setPhone("");
      setAddress("");
    }
  };

  return (
    <div className="container">
      <div className="form-area">
        <div className="form-area1">
          <div className="form-group">
            <select
              id="customer"
              onChange={handleCustomerChange}
              value={selectedCustomerId.id}
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <label htmlFor="customer">Customer</label>
          </div>
          <div className="form-group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label htmlFor="phone">Phone No</label>
          </div>
        </div>
        <div className="form-group">
          <textarea
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></textarea>
          <label htmlFor="address">Billing Address</label>
        </div>
      </div>
      <div className="invoice-details">
        <div>
          <label htmlFor="">Invoice Number</label>
          <input type="number" value={invoiceNumber} readOnly />
        </div>
        <div>
          <label htmlFor="">Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => {
              setInvoiceDate(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">State of Supply</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            {indianStates.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
