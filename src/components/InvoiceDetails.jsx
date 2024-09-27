/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { HiTrash } from "react-icons/hi2";

function InvoiceDetails({ items, setItems, getTotals }) {
  useEffect(() => {
    getTotals({
      totalWithoutTax: totalAmountWithoutTax(),
      totalWithTax: totalAmount(),
      finalTotal: finalTotalAmount(),
    });
  }, [items]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const calculateDiscountAmount = (index) => {
    const { unitPrice, discountPercent, quantity } = items[index];
    return ((unitPrice * discountPercent) / 100) * quantity;
  };

  const calculateTaxAmount = (index) => {
    const { unitPrice, discountPercent, taxPercent, quantity } = items[index];
    const priceAfterDiscount = unitPrice - (unitPrice * discountPercent) / 100;
    return ((priceAfterDiscount * taxPercent) / 100) * quantity;
  };

  const calculateLastAmount = (index) => {
    const { unitPrice, discountPercent, taxPercent, quantity } = items[index];
    const priceAfterDiscount = unitPrice - (unitPrice * discountPercent) / 100;
    const taxAmount = (priceAfterDiscount * taxPercent) / 100;
    return (priceAfterDiscount + taxAmount) * quantity;
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        item: "",
        quantity: 1,
        unitPrice: 0,
        discountPercent: 0,
        taxPercent: 0,
      },
    ]);
  };

  const deleteItem = (index) => {
    if (index !== 0) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  const totalDiscountAmount = () => {
    return items
      .reduce((total, _, index) => total + calculateDiscountAmount(index), 0)
      .toFixed(2);
  };

  const totalTaxAmount = () => {
    return items
      .reduce((total, _, index) => total + calculateTaxAmount(index), 0)
      .toFixed(2);
  };

  const totalAmount = () => {
    return items
      .reduce((total, _, index) => total + calculateLastAmount(index), 0)
      .toFixed(2);
  };

  const totalAmountWithoutTax = () => {
    return items
      .reduce((total, item) => {
        const { unitPrice, discountPercent, quantity } = item;
        const priceAfterDiscount =
          unitPrice - (unitPrice * discountPercent) / 100;
        return total + priceAfterDiscount * quantity;
      }, 0)
      .toFixed(2);
  };

  const roundOffAmount = () => {
    const totalWithTax = parseFloat(totalAmount());
    return (Math.round(totalWithTax) - totalWithTax).toFixed(2);
  };

  const finalTotalAmount = () => {
    return (parseFloat(totalAmount()) + parseFloat(roundOffAmount())).toFixed(
      2
    );
  };

  return (
    <div className="invoice-container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Discount %</th>
              <th>Discount Amount</th>
              <th>Tax %</th>
              <th>Tax Amount</th>
              <th> Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  {index + 1}
                  {index !== 0 && <HiTrash onClick={() => deleteItem(index)} />}
                </td>
                <td>
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) =>
                      handleInputChange(index, "item", e.target.value)
                    }
                    className="item-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    className="quantity-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleInputChange(index, "unitPrice", e.target.value)
                    }
                    className="unitPrice-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={item.discountPercent}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "discountPercent",
                        e.target.value
                      )
                    }
                    className="discountPercent-input"
                  />
                </td>
                <td>{calculateDiscountAmount(index).toFixed(2)}</td>
                <td>
                  <select
                    value={item.taxPercent}
                    onChange={(e) =>
                      handleInputChange(index, "taxPercent", e.target.value)
                    }
                    className="tax-input"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </td>
                <td>{calculateTaxAmount(index).toFixed(2)}</td>
                <td>{calculateLastAmount(index).toFixed(2)}</td>
              </tr>
            ))}

            <tr>
              <td colSpan="5" style={{ textAlign: "right" }}>
                Total:
              </td>
              <td>
                <strong>{totalDiscountAmount()}</strong>
              </td>
              <td></td>
              <td>
                <strong>{totalTaxAmount()}</strong>
              </td>
              <td>
                <strong>{totalAmount()}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="totals-summary">
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Total Amount (Without Tax):</strong>
              </td>
              <td>{totalAmountWithoutTax()}</td>
            </tr>
            <tr>
              <td>
                <strong>Total Amount (With Tax):</strong>
              </td>
              <td>{totalAmount()}</td>
            </tr>
            <tr>
              <td>
                <strong>Round-off Amount:</strong>
              </td>
              <td>{roundOffAmount()}</td>
            </tr>
            <tr>
              <td>
                <strong>Final Total Amount:</strong>
              </td>
              <td>{finalTotalAmount()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={addItem}>Add New Item</button>
    </div>
  );
}

export default InvoiceDetails;
