import { configureStore } from "@reduxjs/toolkit";
import invoiceRuducer from "./invoiceSlice";

const store = configureStore({
  reducer: {
    invoices: invoiceRuducer,
  },
});

export default store;
