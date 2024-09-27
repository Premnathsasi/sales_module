function InvoiceList({ invoices }) {
  return (
    <div className="invoice-list">
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Final Total</th>
            <th>Total Without Tax</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.customer.name}</td>
              <td>{invoice.customer.invoiceNumber}</td>
              <td>{invoice.customer.invoiceDate}</td>
              <td>{invoice.totals.finalTotal}</td>
              <td>{invoice.totals.totalWithoutTax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
