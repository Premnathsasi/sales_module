import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addItem(state, action) {
      state.invoices.push(action.payload);
    },
  },
});

export const { addItem } = invoiceSlice.actions;
export default invoiceSlice.reducer;
