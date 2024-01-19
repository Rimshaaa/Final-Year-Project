import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractTerms: `1 - The supplier commits to providing a detailed list of items with clear specifications, .
  2 - Transparent pricing and payment schedule. 
  3 - The supplier undertakes to ensure timely delivery of the specified items to the agreed-upon address. 
  4 - With a dedication to maintaining high standards, the supplier guarantees the quality of the supplied items. 
  5 - Supplier guarantees quality, restaurant can reject non-compliant items.`,
  contractDetails: `This contract outlines the terms and conditions between restaurant and supplier for the procurement of essential items. The agreement specifies the items to be supplied, pricing details, and payment terms. The contract emphasizes quality assurance, allowing the restaurant to inspect and reject items that do not meet the agreed standards upon delivery. Additionally, it covers the logistics of delivery, the duration of the agreement, and the conditions for termination. Both parties commit to honoring the terms outlined in this agreement, fostering a transparent and mutually beneficial business relationship`,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateContract: (state, action) => {
      state.contractTerms = action.payload.contractTerms;
      state.contractDetails = action.payload.contractDetails;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateContract } = globalSlice.actions;

export default globalSlice.reducer;
